import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Wrench,
  X
} from 'lucide-react';
import {
  RoofingBusiness,
  ROOFING_SERVICES,
  CALIFORNIA_LOCATIONS,
  CaliforniaLocation,
  RoofingServiceInfo
} from '../data/californiaRoofingData';
import { Breadcrumbs, BusinessCard } from './SharedComponents';

interface DirectorySearchViewProps {
  businesses: RoofingBusiness[];
  initialServiceSlug?: string;
  initialCitySlug?: string;
  initialKeyword?: string;
  onViewProfile: (slug: string) => void;
  onRequestQuote: (business: RoofingBusiness) => void;
  onSelectService: (serviceSlug: string) => void;
  onSelectLocation: (citySlug: string) => void;
  onResetToDirectoryRoot: () => void;
  onNavigateHome: () => void;
  onOpenVerificationModal: () => void;
}

export const DirectorySearchView: React.FC<DirectorySearchViewProps> = ({
  businesses,
  initialServiceSlug = '',
  initialCitySlug = '',
  initialKeyword = '',
  onViewProfile,
  onRequestQuote,
  onSelectService,
  onSelectLocation,
  onResetToDirectoryRoot,
  onNavigateHome,
  onOpenVerificationModal
}) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedCity, setSelectedCity] = useState(initialCitySlug);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [zipFilter, setZipFilter] = useState('');
  const [selectedService, setSelectedService] = useState(initialServiceSlug);
  const [propertyScope, setPropertyScope] = useState<'all' | 'residential' | 'commercial'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [minYears, setMinYears] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'reviews' | 'newest' | 'az'>('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const itemsPerPage = 4;

  // Sync external route prop updates
  React.useEffect(() => {
    setSelectedService(initialServiceSlug);
    setSelectedCity(initialCitySlug);
    setKeyword(initialKeyword);
    setCurrentPage(1);
  }, [initialServiceSlug, initialCitySlug, initialKeyword]);

  const activeLocationObj: CaliforniaLocation | undefined = useMemo(
    () => CALIFORNIA_LOCATIONS.find((l) => l.slug === selectedCity),
    [selectedCity]
  );

  const activeServiceObj: RoofingServiceInfo | undefined = useMemo(
    () => ROOFING_SERVICES.find((s) => s.slug === selectedService),
    [selectedService]
  );

  const uniqueCounties = useMemo(() => {
    const set = new Set(CALIFORNIA_LOCATIONS.map((c) => c.county));
    return Array.from(set).sort();
  }, []);

  // Natural Language Query Parser (understands e.g. "Commercial roofing San Diego" or "Metal roof Sacramento")
  const filteredBusinesses = useMemo(() => {
    return businesses
      .filter((biz) => {
        // Keyword / Natural Language search
        if (keyword.trim()) {
          const q = keyword.toLowerCase();
          const searchableBlob = [
            biz.name,
            biz.tagline,
            biz.shortDescription,
            biz.primaryCity,
            biz.county,
            biz.zipCode,
            ...biz.serviceNames,
            ...biz.serviceAreas
          ]
            .join(' ')
            .toLowerCase();
          // Check if all meaningful tokens match
          const tokens = q.split(/\s+/).filter((t) => !['in', 'near', 'me', 'california', 'ca', 'roofers', 'roofer', 'companies', 'contractor', 'contractors'].includes(t));
          if (tokens.length > 0 && !tokens.every((tok) => searchableBlob.includes(tok))) {
            return false;
          }
        }

        // City filter (matches primaryCity slug OR serviceAreas list)
        if (selectedCity) {
          const cityObj = CALIFORNIA_LOCATIONS.find((c) => c.slug === selectedCity);
          const matchesPrimary = biz.citySlug === selectedCity;
          const matchesArea = cityObj
            ? biz.serviceAreas.some((a) => a.toLowerCase() === cityObj.name.toLowerCase())
            : false;
          if (!matchesPrimary && !matchesArea) return false;
        }

        // County filter
        if (selectedCounty && biz.county !== selectedCounty) {
          return false;
        }

        // ZIP code prefix or exact match
        if (zipFilter.trim() && !biz.zipCode.startsWith(zipFilter.trim())) {
          return false;
        }

        // Roofing service filter
        if (selectedService && !biz.services.includes(selectedService)) {
          return false;
        }

        // Residential vs Commercial scope
        if (propertyScope === 'residential' && biz.residentialShare < 50) return false;
        if (propertyScope === 'commercial' && biz.commercialShare < 25) return false;

        // Rating
        if (minRating > 0 && biz.rating < minRating) return false;

        // Years in business
        if (minYears > 0 && biz.yearsInBusiness < minYears) return false;

        // Verified badge only
        if (verifiedOnly && biz.verificationBadge !== 'Verified Business') return false;

        // 24/7 Emergency
        if (emergencyOnly && !biz.emergency24Hr) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'recommended') {
          if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
          return b.rating - a.rating;
        }
        if (sortBy === 'rating') return b.rating - a.rating || b.reviewCount - a.reviewCount;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        if (sortBy === 'newest') return b.foundedYear - a.foundedYear;
        if (sortBy === 'az') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [
    businesses,
    keyword,
    selectedCity,
    selectedCounty,
    zipFilter,
    selectedService,
    propertyScope,
    minRating,
    minYears,
    verifiedOnly,
    emergencyOnly,
    sortBy
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredBusinesses.length / itemsPerPage));
  const paginatedBusinesses = filteredBusinesses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Programmatic SEO Indexation Rule Evaluator
  const seoIndexStatus = useMemo(() => {
    const hasQueryParams = Boolean(
      keyword.trim() ||
        selectedCounty ||
        zipFilter.trim() ||
        propertyScope !== 'all' ||
        minRating > 0 ||
        minYears > 0 ||
        verifiedOnly ||
        emergencyOnly
    );
    if (hasQueryParams) {
      return {
        directive: 'NOINDEX, FOLLOW',
        reason: 'Dynamic user filter parameters active — canonicalized to clean parent hub URL.'
      };
    }
    if (activeLocationObj && !activeLocationObj.isIndexable) {
      return {
        directive: 'NOINDEX, FOLLOW',
        reason: `Thin location protection triggered (${activeLocationObj.businessCount} contractor < minimum 3 verified threshold).`
      };
    }
    if (selectedCity && selectedService && filteredBusinesses.length < 2) {
      return {
        directive: 'NOINDEX, FOLLOW',
        reason: 'Combined City + Service page has fewer than 2 matching local specialists.'
      };
    }
    return {
      directive: 'INDEX, FOLLOW',
      reason: 'Sufficient verified California business listings and unique regional building-code context.'
    };
  }, [
    keyword,
    selectedCounty,
    zipFilter,
    propertyScope,
    minRating,
    minYears,
    verifiedOnly,
    emergencyOnly,
    activeLocationObj,
    selectedCity,
    selectedService,
    filteredBusinesses.length
  ]);

  // Dynamic Canonical Path Display
  const canonicalUrlPath = useMemo(() => {
    if (selectedCity && selectedService) {
      return `/roofing-companies/california/${selectedCity}/${selectedService}/`;
    }
    if (selectedCity) {
      return `/roofing-companies/california/${selectedCity}/`;
    }
    if (selectedService) {
      return `/roofing-services/${selectedService}/`;
    }
    return `/roofing-companies/${currentPage > 1 ? `?page=${currentPage}` : ''}`;
  }, [selectedCity, selectedService, currentPage]);

  // Dynamic H1 Title
  const pageHeading = useMemo(() => {
    if (activeLocationObj && activeServiceObj) {
      return `${activeServiceObj.name} Contractors in ${activeLocationObj.name}, California`;
    }
    if (activeLocationObj) {
      return `Roofing Companies in ${activeLocationObj.name}, California`;
    }
    if (activeServiceObj) {
      return `${activeServiceObj.name} Companies in California`;
    }
    return 'Roofing Companies in California';
  }, [activeLocationObj, activeServiceObj]);

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedCity('');
    setSelectedCounty('');
    setZipFilter('');
    setSelectedService('');
    setPropertyScope('all');
    setMinRating(0);
    setMinYears(0);
    setVerifiedOnly(false);
    setEmergencyOnly(false);
    setSortBy('recommended');
    setCurrentPage(1);
    onResetToDirectoryRoot();
  };

  const breadcrumbItems = useMemo(() => {
    const list: { label: string; path?: string; onClick?: () => void }[] = [
      { label: 'Home', path: '/', onClick: onNavigateHome },
      { label: 'Roofing Companies', path: '/roofing-companies/', onClick: handleResetFilters }
    ];
    if (activeLocationObj) {
      list.push({
        label: 'California',
        path: '/roofing-companies/california/',
        onClick: handleResetFilters
      });
      list.push({
        label: activeLocationObj.name,
        path: `/roofing-companies/california/${activeLocationObj.slug}/`,
        onClick: () => {
          setSelectedService('');
          onSelectLocation(activeLocationObj.slug);
        }
      });
    }
    if (activeServiceObj) {
      list.push({
        label: activeServiceObj.name
      });
    }
    return list;
  }, [activeLocationObj, activeServiceObj]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <Breadcrumbs items={breadcrumbItems} onNavigate={() => {}} />

      {/* CLEAN DIRECTORY PAGE HEADER */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 mb-8">
        <div className="text-xs font-semibold text-[#D9532F] mb-2">
          California C-39 Licensed Roofing Directory
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A]">
          {pageHeading}
        </h1>

        <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">
          {activeLocationObj
            ? activeLocationObj.seoIntro
            : activeServiceObj
            ? activeServiceObj.whatItInvolves
            : 'Search, filter, and compare California roofing companies by city, county, ZIP code, CSLB C-39 license verification, and specialized residential or commercial roofing systems.'}
        </p>

        {/* Regional California Climate & Permit Metadata Box when a City is selected */}
        {activeLocationObj && (
          <div className="mt-6 pt-5 border-t border-[#E2E8F0] grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div>
              <span className="font-semibold text-[#0F172A] block">Climate & Wildfire Context</span>
              <span className="text-[#475569] mt-1 block">{activeLocationObj.climateZoneSummary}</span>
            </div>
            <div>
              <span className="font-semibold text-[#0F172A] block">Common Local Roof Systems</span>
              <span className="text-[#475569] mt-1 block">
                {activeLocationObj.dominantRoofMaterials.join(' · ')}
              </span>
            </div>
            <div>
              <span className="font-semibold text-[#0F172A] block">Building Permit Authority</span>
              <span className="text-[#475569] mt-1 block">{activeLocationObj.localPermitAuthority}</span>
            </div>
          </div>
        )}

        {/* Service Technical Breakdown when a Service is selected */}
        {activeServiceObj && (
          <div className="mt-6 pt-5 border-t border-[#E2E8F0] grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div>
              <span className="font-semibold text-[#0F172A] block">Typical California Cost Range</span>
              <span className="text-[#475569] font-mono tabular-nums mt-1 block">
                {activeServiceObj.averageCostRangeCA}
              </span>
            </div>
            <div>
              <span className="font-semibold text-[#0F172A] block">Expected Lifespan</span>
              <span className="text-[#475569] font-mono tabular-nums mt-1 block">
                {activeServiceObj.typicalLifespanYears}
              </span>
            </div>
            <div>
              <span className="font-semibold text-[#0F172A] block">Title 24 & Code Requirement</span>
              <span className="text-[#475569] mt-1 block">{activeServiceObj.californiaConsiderations}</span>
            </div>
          </div>
        )}
      </div>

      {/* MAIN SEARCH + FILTER + RESULTS LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Mobile Filter Drawer Trigger */}
        <div className="lg:hidden flex items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E2E8F0]">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F172A]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#D9532F]" />
            {mobileFiltersOpen ? 'Hide Directory Filters' : 'Show Directory Filters'}
          </button>
          <span className="text-xs font-mono text-[#475569] tabular-nums">
            {filteredBusinesses.length} matching roofers
          </span>
        </div>

        {/* LEFT FILTER SIDEBAR */}
        <aside
          className={`lg:col-span-4 xl:col-span-3 bg-white border border-[#E2E8F0] rounded-xl p-5 space-y-5 ${
            mobileFiltersOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <h2 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#D9532F]" />
              Filter Roofing Companies
            </h2>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#475569] hover:text-[#D9532F] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Natural Language Search Bar */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              Keyword or Natural Search
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="e.g. Spanish tile Los Angeles"
                className="w-full pl-8 pr-3 py-2 text-xs border border-[#E2E8F0] rounded-lg focus:outline-none focus:border-[#0F172A]"
              />
            </div>
          </div>

          {/* City Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              California City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:border-[#0F172A]"
            >
              <option value="">All California Cities</option>
              {CALIFORNIA_LOCATIONS.map((loc) => (
                <option key={loc.slug} value={loc.slug}>
                  {loc.name} ({loc.county})
                </option>
              ))}
            </select>
          </div>

          {/* County Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              California County
            </label>
            <select
              value={selectedCounty}
              onChange={(e) => {
                setSelectedCounty(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:border-[#0F172A]"
            >
              <option value="">All Counties</option>
              {uniqueCounties.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>

          {/* ZIP Code */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              ZIP Code
            </label>
            <input
              type="text"
              maxLength={5}
              value={zipFilter}
              onChange={(e) => {
                setZipFilter(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="90025, 92121, 95112..."
              className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-lg font-mono tabular-nums focus:outline-none focus:border-[#0F172A]"
            />
          </div>

          {/* Roofing Service */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              Roofing Service / System
            </label>
            <select
              value={selectedService}
              onChange={(e) => {
                setSelectedService(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:border-[#0F172A]"
            >
              <option value="">All Roofing Services</option>
              {ROOFING_SERVICES.map((srv) => (
                <option key={srv.slug} value={srv.slug}>
                  {srv.name}
                </option>
              ))}
            </select>
          </div>

          {/* Residential / Commercial */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
              Property Focus
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#F1F5F9] rounded-lg border border-[#E2E8F0]">
              {(['all', 'residential', 'commercial'] as const).map((scope) => (
                <button
                  key={scope}
                  type="button"
                  onClick={() => {
                    setPropertyScope(scope);
                    setCurrentPage(1);
                  }}
                  className={`py-1.5 rounded-md text-[11px] font-semibold capitalize transition-colors cursor-pointer ${
                    propertyScope === scope
                      ? 'bg-white text-[#0F172A] shadow-xs'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {scope}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Rating & Years in Business */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Min Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => {
                  setMinRating(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full px-2.5 py-2 text-xs border border-[#E2E8F0] rounded-lg bg-white font-mono tabular-nums"
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.8}>4.8+ Stars</option>
                <option value={4.9}>4.9+ Stars</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                Experience
              </label>
              <select
                value={minYears}
                onChange={(e) => {
                  setMinYears(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full px-2.5 py-2 text-xs border border-[#E2E8F0] rounded-lg bg-white font-mono tabular-nums"
              >
                <option value={0}>Any Tenure</option>
                <option value={10}>10+ Years</option>
                <option value={15}>15+ Years</option>
                <option value={20}>20+ Years</option>
              </select>
            </div>
          </div>

          {/* Checkboxes: Verified & Emergency */}
          <div className="pt-2 border-t border-slate-100 space-y-2.5">
            <label className="flex items-center gap-2.5 text-xs text-[#0F172A] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => {
                  setVerifiedOnly(e.target.checked);
                  setCurrentPage(1);
                }}
                className="rounded border-slate-300 text-[#D9532F] focus:ring-[#D9532F]"
              />
              <span>Verified C-39 Businesses Only</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-[#0F172A] font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={emergencyOnly}
                onChange={(e) => {
                  setEmergencyOnly(e.target.checked);
                  setCurrentPage(1);
                }}
                className="rounded border-slate-300 text-[#D9532F] focus:ring-[#D9532F]"
              />
              <span>24/7 Emergency Leak Dispatch</span>
            </label>
          </div>
        </aside>

        {/* RIGHT RESULTS LIST & SEO PAGINATION */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Sorting & Count Bar */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#475569]">
              Showing{' '}
              <span className="font-mono font-bold text-[#0F172A] tabular-nums">
                {filteredBusinesses.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–
                {Math.min(currentPage * itemsPerPage, filteredBusinesses.length)}
              </span>{' '}
              of{' '}
              <span className="font-mono font-bold text-[#0F172A] tabular-nums">
                {filteredBusinesses.length}
              </span>{' '}
              California roofing companies
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs font-semibold text-[#475569]">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 text-xs font-semibold text-[#0F172A] border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="newest">Recently Added</option>
                <option value="az">Company Name (A–Z)</option>
              </select>
            </div>
          </div>

          {/* Results Cards or Empty State */}
          {paginatedBusinesses.length > 0 ? (
            <div className="space-y-4">
              {paginatedBusinesses.map((biz) => (
                <BusinessCard
                  key={biz.id}
                  business={biz}
                  onViewProfile={onViewProfile}
                  onRequestQuote={onRequestQuote}
                  onOpenVerificationModal={onOpenVerificationModal}
                  onSelectService={(srv) => {
                    setSelectedService(srv);
                    setCurrentPage(1);
                  }}
                  onSelectCity={(city) => {
                    setSelectedCity(city);
                    setCurrentPage(1);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-10 text-center">
              <AlertTriangle className="w-8 h-8 text-[#B45309] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#0F172A]">
                No California Roofing Companies Match Those Exact Filters
              </h3>
              <p className="mt-1.5 text-xs text-[#475569] max-w-md mx-auto leading-relaxed">
                In accordance with our programmatic SEO quality rules, combinations with zero verified contractors are marked non-indexable. Try broadening your city or specialty filter.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-5 px-4 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Reset All Search Filters
              </button>
            </div>
          )}

          {/* CRAWLABLE SEO PAGINATION (Never Infinite Scroll Only) */}
          {totalPages > 1 && (
            <nav
              aria-label="Directory Pagination"
              className="bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 flex items-center justify-between"
            >
              <div className="text-xs text-[#475569] font-mono tabular-nums">
                Page {currentPage} of {totalPages} · Crawl-safe pagination (`?page={currentPage}`)
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold tabular-nums transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#0F172A] text-white'
                        : 'border border-[#E2E8F0] text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};
