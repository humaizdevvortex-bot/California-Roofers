import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Wrench,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  ASSETS,
  ROOFING_SERVICES,
  CALIFORNIA_LOCATIONS,
  RoofingBusiness,
  RESOURCE_ARTICLES,
  HOMEPAGE_FAQS
} from '../data/californiaRoofingData';
import { BusinessCard, ResilientImage } from './SharedComponents';

interface HomeViewProps {
  businesses: RoofingBusiness[];
  onSearchSubmit: (serviceQuery: string, locationQuery: string) => void;
  onSelectService: (serviceSlug: string) => void;
  onSelectLocation: (citySlug: string) => void;
  onViewAllLocations: () => void;
  onViewAllCompanies: () => void;
  onViewProfile: (slug: string) => void;
  onRequestQuote: (business: RoofingBusiness) => void;
  onListYourCompany: () => void;
  onSelectArticle: (articleSlug: string) => void;
  onOpenVerificationModal: () => void;
  onOpenWordPressKit?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  businesses,
  onSearchSubmit,
  onSelectService,
  onSelectLocation,
  onViewAllLocations,
  onViewAllCompanies,
  onViewProfile,
  onRequestQuote,
  onListYourCompany,
  onSelectArticle,
  onOpenVerificationModal,
  onOpenWordPressKit
}) => {
  const [serviceInput, setServiceInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [howItWorksTab, setHowItWorksTab] = useState<'consumers' | 'businesses'>('consumers');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const featuredBusinesses = businesses.filter((b) => b.isFeatured).slice(0, 4);
  const indexableLocations = CALIFORNIA_LOCATIONS.filter((loc) => loc.isIndexable);
  const filteredLocations = indexableLocations
    .filter((loc) => selectedRegion === 'All' || loc.region === selectedRegion)
    .slice(0, 12);

  const visualMosaicServices = [
    {
      slug: 'tile-roofing',
      tag: 'Coastal & SoCal Villas',
      title: 'Spanish Clay & Concrete Tile',
      subtitle: 'New terracotta barrel roofs & 40-year synthetic underlayment lift-and-relays.',
      priceHint: '$11,500 – $38,000',
      image: ASSETS.tileRoofImg
    },
    {
      slug: 'metal-roofing',
      tag: 'Wildfire WUI Class A',
      title: 'Standing Seam Metal',
      subtitle: 'Concealed-fastener architectural steel & coastal aluminum roof systems.',
      priceHint: '$22,000 – $48,000',
      image: ASSETS.metalRoofImg
    },
    {
      slug: 'commercial-roofing',
      tag: 'Industrial & HOA Flat',
      title: 'Commercial TPO & PVC',
      subtitle: 'Solar-reflective single-ply membranes, tapered insulation & silicone coatings.',
      priceHint: '$8.50 – $16 / sq.ft.',
      image: ASSETS.commercialTpoImg
    },
    {
      slug: 'shingle-roofing',
      tag: 'CEC Title 24 Compliant',
      title: 'Cool Roof Shingles',
      subtitle: 'CRRC-rated dimensional asphalt shingles engineered for California heat.',
      priceHint: '$13,500 – $24,500',
      image: ASSETS.shingleRoofImg
    }
  ];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(serviceInput, locationInput);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* =====================================================================
          SECTION 1 — 100% FULL-WIDTH EDGE-TO-EDGE CINEMATIC HERO (NOT BOXED!)
      ===================================================================== */}
      <section className="relative w-full min-h-[78vh] flex items-center bg-[#0F141C] text-white overflow-hidden">
        {/* 100% Full-Screen Edge-to-Edge Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <ResilientImage
            src={ASSETS.heroImage}
            alt="California luxury residential tile and slate roof at golden hour"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F141C]/95 via-[#0F141C]/80 to-[#0F141C]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F141C] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs font-brand tracking-[0.2em] uppercase text-[#FF7A59] mb-5">
              <ShieldCheck className="w-4 h-4" />
              <span>California’s Official C-39 Roofing Directory</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-display font-normal text-white leading-[1.05] tracking-tight">
              Find Trusted{' '}
              <span className="italic text-[#FF7A59]">California Roofers</span>{' '}
              Across All 58 Counties.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-200/90 font-normal leading-relaxed max-w-2xl">
              Compare state-verified CSLB Class C-39 roofing contractors for Spanish clay tile relays, standing seam metal, Title 24 cool roofs, and commercial TPO.
            </p>

            {/* SINGLE FULL-WIDTH INLINE PILL SEARCH BAR */}
            <form
              onSubmit={handleHeroSearch}
              className="mt-10 p-2 sm:p-2.5 rounded-3xl sm:rounded-full bg-white/95 backdrop-blur-xl shadow-2xl grid grid-cols-1 sm:grid-cols-12 gap-2 items-center max-w-3xl"
            >
              <div className="sm:col-span-5 flex items-center px-5 py-3">
                <Wrench className="w-5 h-5 text-[#D9532F] mr-3.5 shrink-0" />
                <div className="w-full">
                  <label
                    htmlFor="hero-service"
                    className="block text-[10px] font-medium uppercase tracking-wider text-zinc-400"
                  >
                    Roofing Service
                  </label>
                  <input
                    id="hero-service"
                    type="text"
                    list="service-suggestions"
                    value={serviceInput}
                    onChange={(e) => setServiceInput(e.target.value)}
                    placeholder="Tile relay, cool roof, repair..."
                    className="w-full bg-transparent text-sm sm:text-base font-medium text-[#0F172A] placeholder-zinc-400 focus:outline-none"
                  />
                  <datalist id="service-suggestions">
                    {ROOFING_SERVICES.map((s) => (
                      <option key={s.slug} value={s.name} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="sm:col-span-4 flex items-center px-5 py-3 sm:border-l border-zinc-200">
                <MapPin className="w-5 h-5 text-[#D9532F] mr-3.5 shrink-0" />
                <div className="w-full">
                  <label
                    htmlFor="hero-location"
                    className="block text-[10px] font-medium uppercase tracking-wider text-zinc-400"
                  >
                    City or ZIP Code
                  </label>
                  <input
                    id="hero-location"
                    type="text"
                    list="city-suggestions"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="Los Angeles, 90025..."
                    className="w-full bg-transparent text-sm sm:text-base font-medium text-[#0F172A] placeholder-zinc-400 focus:outline-none"
                  />
                  <datalist id="city-suggestions">
                    {indexableLocations.map((c) => (
                      <option key={c.slug} value={c.name} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="sm:col-span-3 flex">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl sm:rounded-full bg-[#D9532F] hover:bg-[#c04422] text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-all whitespace-nowrap cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </form>

            {/* Open Inline Popular Links (No Boxes!) */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-300">
              <span className="text-slate-400">Popular:</span>
              {[
                { label: 'Spanish Tile Relay', slug: 'tile-roofing' },
                { label: 'Standing Seam Metal', slug: 'metal-roofing' },
                { label: 'Roof Replacement', slug: 'roof-replacement' },
                { label: 'Commercial Flat TPO', slug: 'commercial-roofing' },
                { label: 'Emergency Leak Repair', slug: 'emergency-roof-repair' }
              ].map((item, idx) => (
                <React.Fragment key={item.slug}>
                  {idx > 0 && <span aria-hidden="true" className="text-white/25">·</span>}
                  <button
                    type="button"
                    onClick={() => onSelectService(item.slug)}
                    className="text-white hover:text-[#FF7A59] underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Open Canvas Metrics Strip (Zero Boxes!) */}
            <div className="mt-14 pt-8 border-t border-white/15 flex flex-wrap items-center gap-x-12 gap-y-6">
              <div>
                <div className="text-3xl sm:text-4xl font-display font-normal text-white">100% C-39</div>
                <div className="text-xs text-slate-400 mt-0.5">CSLB State License Verified</div>
              </div>
              <div className="h-10 w-px bg-white/15 hidden sm:block" />
              <div>
                <div className="text-3xl sm:text-4xl font-display font-normal text-white">58 Counties</div>
                <div className="text-xs text-slate-400 mt-0.5">Statewide California Coverage</div>
              </div>
              <div className="h-10 w-px bg-white/15 hidden sm:block" />
              <div>
                <div className="text-3xl sm:text-4xl font-display font-normal text-white">4.9 ★</div>
                <div className="text-xs text-slate-400 mt-0.5">Verified Homeowner Reviews</div>
              </div>
              <div className="h-10 w-px bg-white/15 hidden sm:block" />
              <div>
                <div className="text-3xl sm:text-4xl font-display font-normal text-[#FF7A59]">Direct</div>
                <div className="text-xs text-slate-400 mt-0.5">Zero Lead-Broker Spam</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2 — FULL-WIDTH FRAMELESS ROOFING SYSTEMS SHOWCASE
      ===================================================================== */}
      <section className="w-full py-24">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-brand uppercase tracking-[0.2em] text-[#D9532F] block mb-2">
                California Roof Systems
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-normal text-[#0F172A]">
                Explore Specialists by <span className="italic text-[#D9532F]">Roof Material</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={onViewAllCompanies}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0F172A] hover:text-[#D9532F] transition-colors cursor-pointer"
            >
              View All Roofing Contractors
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Frameless Visual Photography Showcases (Image + Open Text Below, No Card Box!) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {visualMosaicServices.map((item) => (
              <div
                key={item.slug}
                onClick={() => onSelectService(item.slug)}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 relative mb-5">
                  <ResilientImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-amber-300">
                    Avg CA: {item.priceHint}
                  </span>
                </div>

                <div className="text-xs font-mono uppercase tracking-wider text-[#D9532F] mb-1">
                  {item.tag}
                </div>
                <h3 className="text-2xl font-display font-medium text-[#0F172A] group-hover:text-[#D9532F] transition-colors flex items-center justify-between gap-2">
                  <span>{item.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[#D9532F] shrink-0" />
                </h3>
                <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Open Flowing Horizontal Hairline List for Remaining 6 Services (Zero Boxes!) */}
          <div className="mt-16 pt-10 border-t border-zinc-200/90 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
            {ROOFING_SERVICES.filter(
              (s) => !['tile-roofing', 'metal-roofing', 'commercial-roofing', 'shingle-roofing'].includes(s.slug)
            ).map((service) => (
              <button
                key={service.slug}
                type="button"
                onClick={() => onSelectService(service.slug)}
                className="group text-left py-4 border-b border-zinc-200/80 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div>
                  <h3 className="text-xl font-display font-medium text-[#0F172A] group-hover:text-[#D9532F] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                    {service.shortSummary}
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-500 group-hover:text-[#D9532F] shrink-0 flex items-center gap-1">
                  {(service.averageCostRangeCA || '').split(' ')[0]}
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3 — 100% FULL-WIDTH FEATURED ROOFERS (OPEN EDITORIAL ROWS!)
      ===================================================================== */}
      <section className="w-full py-24 bg-white">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
            <div>
              <span className="text-xs font-brand uppercase tracking-[0.2em] text-[#D9532F] block mb-2">
                CSLB C-39 Verified Directory
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-normal text-[#0F172A]">
                Featured <span className="italic text-[#D9532F]">California</span> Roofing Contractors
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenVerificationModal}
                className="text-xs font-medium text-zinc-600 hover:text-[#0F172A] underline underline-offset-4 cursor-pointer"
              >
                CSLB Verification Policy
              </button>
              <button
                type="button"
                onClick={onViewAllCompanies}
                className="px-6 py-3 rounded-full bg-[#0F172A] hover:bg-[#D9532F] text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Browse All {businesses.length} Contractors →
              </button>
            </div>
          </div>

          {/* Unboxed Open Editorial Listing Rows */}
          <div className="divide-y divide-zinc-200/90">
            {featuredBusinesses.map((biz) => (
              <BusinessCard
                key={biz.id}
                business={biz}
                onViewProfile={onViewProfile}
                onRequestQuote={onRequestQuote}
                onOpenVerificationModal={onOpenVerificationModal}
                onSelectService={onSelectService}
                onSelectCity={onSelectLocation}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4 — 100% FULL-WIDTH EDGE-TO-EDGE DARK SECTION: HOW IT WORKS
      ===================================================================== */}
      <section className="w-full py-24 bg-[#0F141C] text-white">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
            <div>
              <span className="text-xs font-brand uppercase tracking-[0.2em] text-[#FF7A59] block mb-2">
                Simple & Direct Process
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-normal text-white">
                How <span className="italic text-[#FF7A59]">CalRoof</span> Works
              </h2>
            </div>

            <div className="inline-flex p-1 rounded-full bg-white/10 self-start">
              <button
                type="button"
                onClick={() => setHowItWorksTab('consumers')}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  howItWorksTab === 'consumers'
                    ? 'bg-white text-[#0F141C]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                For Homeowners
              </button>
              <button
                type="button"
                onClick={() => setHowItWorksTab('businesses')}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  howItWorksTab === 'businesses'
                    ? 'bg-white text-[#0F141C]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                For Roofing Companies
              </button>
            </div>
          </div>

          {/* Open Canvas 3-Column Flow (Zero Boxes Around Steps!) */}
          {howItWorksTab === 'consumers' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-14">
              <div>
                <div className="text-5xl font-display italic text-[#FF7A59] mb-4">01.</div>
                <h3 className="text-2xl font-display font-normal text-white">
                  Search by Roof System & City
                </h3>
                <p className="mt-3 text-base text-slate-300 leading-relaxed">
                  Filter specifically for contractors certified in your roof material—whether Spanish clay tile lift-and-relay, standing seam metal, or flat commercial TPO.
                </p>
              </div>

              <div>
                <div className="text-5xl font-display italic text-[#FF7A59] mb-4">02.</div>
                <h3 className="text-2xl font-display font-normal text-white">
                  Verify Active C-39 Credentials
                </h3>
                <p className="mt-3 text-base text-slate-300 leading-relaxed">
                  Inspect each company’s California CSLB C-39 license number, Workers’ Compensation status, years in business, and real California project gallery.
                </p>
              </div>

              <div>
                <div className="text-5xl font-display italic text-[#FF7A59] mb-4">03.</div>
                <h3 className="text-2xl font-display font-normal text-white">
                  Call or Request a Direct Quote
                </h3>
                <p className="mt-3 text-base text-slate-300 leading-relaxed">
                  Call the roofer’s local office directly or send a quote inquiry that goes exclusively to your chosen contractor—never sold to lead brokers.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-14">
              <div>
                <div className="text-5xl font-display italic text-[#FF7A59] mb-4">01.</div>
                <h3 className="text-2xl font-display font-normal text-white">
                  Create Your Company Profile
                </h3>
                <p className="mt-3 text-base text-slate-300 leading-relaxed">
                  Submit your business details, California CSLB C-39 license number, and insurance credentials to earn a dedicated SEO profile URL.
                </p>
              </div>

              <div>
                <div className="text-5xl font-display italic text-[#FF7A59] mb-4">02.</div>
                <h3 className="text-2xl font-display font-normal text-white">
                  Highlight Systems & Service Areas
                </h3>
                <p className="mt-3 text-base text-slate-300 leading-relaxed">
                  Showcase your project photos and map every California city and county your crews serve.
                </p>
              </div>

              <div>
                <div className="text-5xl font-display italic text-[#FF7A59] mb-4">03.</div>
                <h3 className="text-2xl font-display font-normal text-white">
                  Receive Direct Homeowner Calls
                </h3>
                <p className="mt-3 text-base text-slate-300 leading-relaxed">
                  Get discovered organically and receive direct phone calls and estimate requests without shared lead fees.
                </p>
              </div>
            </div>
          )}

          {/* Open Contractor Onboarding Strip */}
          <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-display font-normal text-white">
                Own a Licensed California Roofing Company?
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Join California’s dedicated C-39 contractor directory or download the 6-page WordPress & Elementor package.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onListYourCompany}
                className="px-7 py-3.5 rounded-full bg-[#D9532F] hover:bg-[#e06342] text-white text-sm font-medium transition-colors cursor-pointer"
              >
                List Your Company Free →
              </button>
              {onOpenWordPressKit && (
                <button
                  type="button"
                  onClick={onOpenWordPressKit}
                  className="px-6 py-3.5 rounded-full border border-white/25 hover:bg-white/10 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  6-Page WordPress Kit
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5 — OPEN-CANVAS CALIFORNIA CITIES DIRECTORY (ZERO BOXES!)
      ===================================================================== */}
      <section className="w-full py-24">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
            <div>
              <span className="text-xs font-brand uppercase tracking-[0.2em] text-[#D9532F] block mb-2">
                Local California Coverage
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-normal text-[#0F172A]">
                Find Roofers by <span className="italic text-[#D9532F]">California City</span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Southern California', 'Bay Area', 'Sacramento Metro', 'Central Valley'].map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selectedRegion === region
                      ? 'bg-[#0F172A] text-white'
                      : 'text-zinc-600 hover:text-[#0F172A]'
                  }`}
                >
                  {region === 'All' ? 'All California' : region}
                </button>
              ))}
            </div>
          </div>

          {/* Open Flowing Hairline City Rows (Zero Boxes!) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-14">
            {filteredLocations.map((city) => (
              <button
                key={city.slug}
                type="button"
                onClick={() => onSelectLocation(city.slug)}
                className="group text-left py-6 border-b border-zinc-200/80 flex items-baseline justify-between gap-4 cursor-pointer"
              >
                <div>
                  <h3 className="text-2xl font-display font-normal text-[#0F172A] group-hover:text-[#D9532F] transition-colors">
                    {city.name}
                  </h3>
                  <div className="text-xs text-zinc-500 mt-1">
                    {city.county} · {city.dominantRoofMaterials[0]}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 group-hover:text-[#D9532F] shrink-0">
                  <span>{city.businessCount} roofers</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={onViewAllLocations}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#D9532F] hover:underline cursor-pointer"
            >
              Explore All California Municipalities & Climate Zones
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6 — OPEN EDITORIAL GUIDES & FAQS (ZERO BOXES!)
      ===================================================================== */}
      <section className="w-full py-24 bg-white">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="pb-8 border-b border-zinc-200 mb-12">
            <span className="text-xs font-brand uppercase tracking-[0.2em] text-[#D9532F] block mb-2">
              Homeowner Research
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-normal text-[#0F172A]">
              California Roofing Cost & <span className="italic text-[#D9532F]">Title 24</span> Guides
            </h2>
          </div>

          {/* Frameless Magazine Articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {RESOURCE_ARTICLES.slice(0, 3).map((article) => (
              <article
                key={article.slug}
                onClick={() => onSelectArticle(article.slug)}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-900 mb-5">
                  <ResilientImage
                    src={article.heroImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#D9532F] mb-2">
                  {article.category} · {article.readTimeMinutes} min read
                </div>
                <h3 className="text-2xl font-display font-medium text-[#0F172A] group-hover:text-[#D9532F] transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="mt-2.5 text-sm text-zinc-600 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              </article>
            ))}
          </div>

          {/* Open Hairline FAQ Section (Zero Box Wrappers!) */}
          <div className="mt-24 pt-16 border-t border-zinc-200 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="text-xs font-brand uppercase tracking-[0.2em] text-[#D9532F] block mb-2">
                Common Questions
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#0F172A] leading-tight">
                Hiring a Licensed Roofer in California
              </h2>
              <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                Essential licensing, Title 24 Cool Roof, and contract guidelines for California property owners.
              </p>
            </div>

            <div className="lg:col-span-8 divide-y divide-zinc-200">
              {HOMEPAGE_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-6 first:pt-0">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left gap-4 cursor-pointer"
                    >
                      <span className="text-xl font-display font-medium text-[#0F172A]">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#D9532F] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-zinc-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-base text-zinc-600 leading-relaxed max-w-3xl">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
