import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Building2,
  Phone,
  Globe,
  FileText,
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Lock,
  Sparkles,
  Check,
  X
} from 'lucide-react';
import {
  RoofingBusiness,
  ROOFING_SERVICES,
  CALIFORNIA_LOCATIONS,
  LeadSubmission,
  ASSETS
} from '../data/californiaRoofingData';
import { Breadcrumbs, VerificationStatusText } from './SharedComponents';

// ============================================================================
// 1. 8-STEP BUSINESS SIGNUP & ONBOARDING FLOW (/for-roofing-companies/)
// ============================================================================
export const BusinessSignupView: React.FC<{
  onNavigateHome: () => void;
  onCreateBusiness: (newBiz: RoofingBusiness) => void;
  onOpenOwnerDashboard: () => void;
}> = ({ onNavigateHome, onCreateBusiness, onOpenOwnerDashboard }) => {
  const [step, setStep] = useState<number>(1);

  // Form states across 8 steps
  const [accountEmail, setAccountEmail] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [tagline, setTagline] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [primaryCitySlug, setPrimaryCitySlug] = useState('los-angeles');
  const [zipCode, setZipCode] = useState('90025');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'roof-replacement',
    'roof-repair',
    'tile-roofing'
  ]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([
    'Los Angeles',
    'Santa Monica',
    'Pasadena'
  ]);
  const [yearsInBusiness, setYearsInBusiness] = useState(12);
  const [cslbLicense, setCslbLicense] = useState('CSLB #1049281 (C-39 Roofing — Demo)');
  const [liabilityAmount, setLiabilityAmount] = useState('$2,000,000 Occurrence');
  const [description, setDescription] = useState(
    'Licensed California C-39 roofing contractor providing residential and commercial roof replacements, Spanish clay tile underlayment relays, and Title 24 Cool Roof systems.'
  );
  const [monFriHours, setMonFriHours] = useState('7:00 AM – 5:30 PM');
  const [emergency24Hr, setEmergency24Hr] = useState(true);
  const [logoInitials, setLogoInitials] = useState('CR');
  const [selectedTier, setSelectedTier] = useState<'Free Listing' | 'Premium Listing' | 'Featured Partner'>('Free Listing');
  const [submittedSlug, setSubmittedSlug] = useState<string | null>(null);

  const stepsList = [
    '1. Account',
    '2. Business Info',
    '3. Services',
    '4. Service Areas',
    '5. Credentials',
    '6. Photos & Logo',
    '7. Preview',
    '8. Submit'
  ];

  const toggleService = (slug: string) => {
    setSelectedServices((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleArea = (cityName: string) => {
    setSelectedAreas((prev) =>
      prev.includes(cityName) ? prev.filter((c) => c !== cityName) : [...prev, cityName]
    );
  };

  const generatedSlug = (companyName || 'california-roofing-company')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const handleFinalSubmit = () => {
    const cityObj =
      CALIFORNIA_LOCATIONS.find((c) => c.slug === primaryCitySlug) || CALIFORNIA_LOCATIONS[0];
    const mappedServiceNames = selectedServices.map(
      (slug) => ROOFING_SERVICES.find((s) => s.slug === slug)?.name || slug
    );

    const newBiz: RoofingBusiness = {
      id: `biz-${Date.now()}`,
      slug: generatedSlug,
      name: companyName || 'Apex California Roofing Co. (Demo)',
      tagline:
        tagline ||
        `Licensed C-39 Roofing Contractor Serving ${cityObj.name} & ${cityObj.county}`,
      shortDescription: description.slice(0, 165),
      fullDescription: description,
      logoInitials:
        logoInitials ||
        (companyName ? companyName.slice(0, 2).toUpperCase() : 'CA'),
      primaryCity: cityObj.name,
      citySlug: cityObj.slug,
      county: cityObj.county,
      countySlug: cityObj.countySlug,
      zipCode: zipCode || '90025',
      address: address || `100 Main St, ${cityObj.name}, CA ${zipCode} (Demo)`,
      phone: phone || '(310) 555-0190',
      website: website || `https://${generatedSlug}-demo.example.com`,
      email: accountEmail || `office@${generatedSlug}-demo.example.com`,
      yearsInBusiness: Number(yearsInBusiness) || 10,
      foundedYear: 2026 - (Number(yearsInBusiness) || 10),
      cslbLicense: cslbLicense || 'CSLB #1049281 (C-39 Roofing — Demo)',
      cslbStatus: 'Pending Verification (Demo)',
      workersCompStatus: 'Active Certificate on File (Demo)',
      generalLiabilityAmount: liabilityAmount,
      verificationBadge: 'Claimed Profile',
      isFeatured: selectedTier === 'Featured Partner',
      planTier: selectedTier,
      rating: 5.0,
      reviewCount: 1,
      residentialShare: 75,
      commercialShare: 25,
      emergency24Hr,
      title24CoolRoofCertified: true,
      services: selectedServices.length > 0 ? selectedServices : ['roof-replacement'],
      serviceNames: mappedServiceNames.length > 0 ? mappedServiceNames : ['Roof Replacement'],
      serviceAreas: selectedAreas.length > 0 ? selectedAreas : [cityObj.name],
      certifications: [
        'CA CSLB Class C-39 Roofing Classification (Demo)',
        'Title 24 Cool Roof Compliant Installer'
      ],
      businessHours: {
        mondayFriday: monFriHours,
        saturday: '8:00 AM – 1:00 PM',
        sunday: emergency24Hr ? '24/7 Emergency Dispatch' : 'Closed'
      },
      photos: [
        {
          id: `ph-${Date.now()}`,
          url: ASSETS.tileRoofImg,
          caption: `Sample California roof installation by ${companyName || 'Apex California Roofing'}.`,
          city: `${cityObj.name}, CA`,
          roofType: mappedServiceNames[0] || 'California Roof System'
        }
      ],
      reviews: [
        {
          id: `rev-${Date.now()}`,
          authorName: 'Initial Verified Client (Demo)',
          city: `${cityObj.name}, CA`,
          servicePerformed: mappedServiceNames[0] || 'Roof Replacement',
          rating: 5,
          date: 'October 2026',
          comment: 'Clean jobsite, transparent itemized estimate, and passed city building inspection on schedule.',
          verifiedProject: true
        }
      ],
      faqs: [],
      profileCompletion: 92
    };

    onCreateBusiness(newBiz);
    setSubmittedSlug(newBiz.slug);
    setStep(8);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/', onClick: onNavigateHome },
          { label: 'For Roofing Companies — 8-Step Onboarding' }
        ]}
        onNavigate={() => {}}
      />

      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-8 mt-2">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="text-xs font-semibold text-[#D9532F] mb-1">
              California C-39 Contractor Onboarding
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              List Your Roofing Company on CalRoof Directory
            </h1>
            <p className="mt-1 text-xs text-[#475569]">
              Create your dedicated public profile URL (`/roofing-companies/{generatedSlug}/`) in 8 clear steps.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenOwnerDashboard}
            className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] hover:border-[#0F172A] cursor-pointer"
          >
            Already Listed? View Business Owner Dashboard →
          </button>
        </div>

        {/* 8-Step Progress Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
          {stepsList.map((label, idx) => {
            const stepNum = idx + 1;
            const active = step === stepNum;
            const completed = step > stepNum;
            return (
              <button
                key={label}
                type="button"
                onClick={() => stepNum < 8 && setStep(stepNum)}
                className={`px-2.5 py-2 rounded-lg text-left text-[11px] font-semibold border transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                    : completed
                    ? 'bg-emerald-50 text-[#15803D] border-emerald-200'
                    : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* STEP 1: CREATE ACCOUNT */}
        {step === 1 && (
          <div className="space-y-5 max-w-xl">
            <h2 className="text-lg font-bold text-[#0F172A]">
              Step 1: Create Your Contractor Account & Choose Listing Tier
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Corporate Work Email *
                </label>
                <input
                  type="email"
                  value={accountEmail}
                  onChange={(e) => setAccountEmail(e.target.value)}
                  placeholder="owner@yourroofingcompany.com"
                  className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Create Password *
                </label>
                <input
                  type="password"
                  value={accountPassword}
                  onChange={(e) => setAccountPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg"
                />
              </div>
            </div>

            {/* Monetization Tier Selector (Subtle, Non-Cluttered) */}
            <div className="pt-4">
              <label className="block text-xs font-semibold text-[#0F172A] mb-2">
                Select Directory Plan Tier
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    tier: 'Free Listing' as const,
                    price: '$0 / month',
                    desc: 'Public SEO profile URL, phone & website link, up to 3 cities, CSLB badge.'
                  },
                  {
                    tier: 'Premium Listing' as const,
                    price: '$99 / month',
                    desc: 'Direct Quote Lead Form, unlimited California cities, photo gallery, analytics.'
                  },
                  {
                    tier: 'Featured Partner' as const,
                    price: '$249 / month',
                    desc: 'Priority placement on City & Service pages + Homepage Featured showcase.'
                  }
                ].map((plan) => (
                  <div
                    key={plan.tier}
                    onClick={() => setSelectedTier(plan.tier)}
                    className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                      selectedTier === plan.tier
                        ? 'border-[#D9532F] bg-[#F8FAFC]'
                        : 'border-[#E2E8F0] bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#0F172A]">{plan.tier}</div>
                    <div className="text-sm font-mono font-bold text-[#D9532F] mt-0.5 tabular-nums">
                      {plan.price}
                    </div>
                    <p className="text-[11px] text-[#475569] mt-1.5 leading-relaxed">{plan.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: BUSINESS INFORMATION */}
        {step === 2 && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-lg font-bold text-[#0F172A]">
              Step 2: Company Name, Contact & Primary California Office
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Legal or DBA Company Name *
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Sierra Coast Roofing Systems, Inc."
                  className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Clean SEO Profile URL Preview
                </label>
                <div className="px-3.5 py-2 text-xs font-mono bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#475569] truncate">
                  /roofing-companies/{generatedSlug}/
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Business Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(310) 555-0192"
                  className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Company Website URL
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourroofingcompany.com"
                  className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Primary California City *
                </label>
                <select
                  value={primaryCitySlug}
                  onChange={(e) => setPrimaryCitySlug(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg bg-white"
                >
                  {CALIFORNIA_LOCATIONS.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="1450 Industrial Way"
                  className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  CA ZIP Code *
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-[#E2E8F0] rounded-lg font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ROOFING SERVICES */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A]">
              Step 3: Select Your Roofing Services & Material Specialties
            </h2>
            <p className="text-xs text-[#475569]">
              Your profile will automatically appear on the corresponding California service filter views.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {ROOFING_SERVICES.map((srv) => {
                const isSelected = selectedServices.includes(srv.slug);
                return (
                  <button
                    key={srv.slug}
                    type="button"
                    onClick={() => toggleService(srv.slug)}
                    className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#0F172A] text-white border-[#0F172A]'
                        : 'bg-white text-[#0F172A] border-[#E2E8F0] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{srv.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#D9532F]" />}
                    </div>
                    <p
                      className={`text-[11px] mt-1 line-clamp-2 ${
                        isSelected ? 'text-slate-300' : 'text-[#475569]'
                      }`}
                    >
                      {srv.shortSummary}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: SERVICE AREAS */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#0F172A]">
              Step 4: Select California Cities & Service Areas Covered
            </h2>
            <p className="text-xs text-[#475569]">
              Select the cities where your crews actively pull building permits and perform roofing work.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {CALIFORNIA_LOCATIONS.filter((l) => l.isIndexable).map((loc) => {
                const checked = selectedAreas.includes(loc.name);
                return (
                  <button
                    key={loc.slug}
                    type="button"
                    onClick={() => toggleArea(loc.name)}
                    className={`px-3 py-2.5 rounded-lg border text-xs font-semibold text-left flex items-center justify-between cursor-pointer ${
                      checked
                        ? 'bg-[#0F172A] text-white border-[#0F172A]'
                        : 'bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0]'
                    }`}
                  >
                    <span>{loc.name}</span>
                    {checked && <Check className="w-3.5 h-3.5 text-[#D9532F]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: BUSINESS DETAILS & CREDENTIALS */}
        {step === 5 && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-lg font-bold text-[#0F172A]">
              Step 5: CSLB C-39 License, Insurance & Business Description
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  CSLB C-39 License # *
                </label>
                <input
                  type="text"
                  value={cslbLicense}
                  onChange={(e) => setCslbLicense(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono border border-[#E2E8F0] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Years in Business
                </label>
                <input
                  type="number"
                  value={yearsInBusiness}
                  onChange={(e) => setYearsInBusiness(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-mono border border-[#E2E8F0] rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  General Liability Coverage
                </label>
                <input
                  type="text"
                  value={liabilityAmount}
                  onChange={(e) => setLiabilityAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono border border-[#E2E8F0] rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                Detailed Company Description (Unique SEO Profile Copy)
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-[#E2E8F0] rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Mon–Fri Dispatch Hours
                </label>
                <input
                  type="text"
                  value={monFriHours}
                  onChange={(e) => setMonFriHours(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-lg font-mono"
                />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emergency24Hr}
                    onChange={(e) => setEmergency24Hr(e.target.checked)}
                    className="rounded border-slate-300 text-[#D9532F]"
                  />
                  Offer 24/7 Emergency Leak Tarping & Storm Dispatch
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: PHOTOS & LOGO */}
        {step === 6 && (
          <div className="space-y-4 max-w-xl">
            <h2 className="text-lg font-bold text-[#0F172A]">
              Step 6: Company Brand Monogram & Project Gallery
            </h2>
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                2-Letter Logo Monogram Initials
              </label>
              <input
                type="text"
                maxLength={2}
                value={logoInitials}
                onChange={(e) => setLogoInitials(e.target.value.toUpperCase())}
                className="w-24 px-3 py-2 text-sm font-bold font-display border border-[#E2E8F0] rounded-lg uppercase"
              />
            </div>
            <div className="p-5 rounded-xl bg-[#F8FAFC] border border-dashed border-slate-300 text-xs text-[#475569]">
              <p className="font-semibold text-[#0F172A]">
                 California Project Photo Gallery Attached (Demo Mode)
              </p>
              <p className="mt-1">
                Your profile will include high-resolution architectural project photography with California city and roof-type captions.
              </p>
            </div>
          </div>
        )}

        {/* STEP 7: PREVIEW PROFILE */}
        {step === 7 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-[#0F172A]">
              Step 7: Preview Your Public California Directory Profile
            </h2>
            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-xs font-mono text-[#15803D] mb-2">
                Target Public URL: /roofing-companies/{generatedSlug}/
              </div>
              <h3 className="text-xl font-bold text-[#0F172A]">
                {companyName || 'Apex California Roofing Co. (Demo)'}
              </h3>
              <p className="text-xs text-[#475569] mt-1 font-mono">
                {cslbLicense} · {yearsInBusiness} Years in Business · Plan: {selectedTier}
              </p>
              <p className="text-xs text-[#0F172A] mt-3 leading-relaxed">{description}</p>
              <div className="mt-3 text-xs text-[#475569]">
                <span className="font-semibold text-[#0F172A]">Selected Cities:</span>{' '}
                {selectedAreas.join(' · ')}
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: SUBMITTED CONFIRMATION */}
        {step === 8 && (
          <div className="py-8 text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#15803D] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A]">
              Your Roofing Company Profile Has Been Created!
            </h2>
            <p className="mt-2 text-sm text-[#475569] leading-relaxed">
              Your company is now live in the interactive prototype at{' '}
              <span className="font-mono font-semibold text-[#0F172A]">
                /roofing-companies/{submittedSlug}/
              </span>{' '}
              and queued in the Admin Verification Console.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenOwnerDashboard}
                className="px-5 py-2.5 rounded-lg bg-[#D9532F] text-white text-xs font-semibold hover:bg-[#c04422] cursor-pointer"
              >
                Open Business Owner Dashboard
              </button>
              <button
                type="button"
                onClick={onNavigateHome}
                className="px-5 py-2.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        )}

        {/* Step Navigation Footer */}
        {step < 8 && (
          <div className="mt-8 pt-5 border-t border-[#E2E8F0] flex items-center justify-between">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] disabled:opacity-40 cursor-pointer"
            >
              Previous Step
            </button>
            {step < 7 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="px-5 py-2.5 rounded-lg bg-[#0F172A] text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Continue to Step {step + 1} →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 rounded-lg bg-[#D9532F] text-white text-xs font-semibold hover:bg-[#c04422] cursor-pointer"
              >
                Submit Profile for Approval
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 2. BUSINESS OWNER DASHBOARD (/dashboard/business/)
// ============================================================================
export const BusinessOwnerDashboardView: React.FC<{
  businesses: RoofingBusiness[];
  leads: LeadSubmission[];
  onViewProfile: (slug: string) => void;
  onUpdateLeadStatus: (leadId: string, status: LeadSubmission['status']) => void;
}> = ({ businesses, leads, onViewProfile, onUpdateLeadStatus }) => {
  const [selectedBizId, setSelectedBizId] = useState(businesses[0]?.id || 'biz-1');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'leads' | 'services' | 'reviews' | 'subscription'
  >('overview');

  const currentBiz = businesses.find((b) => b.id === selectedBizId) || businesses[0];
  const bizLeads = leads.filter((l) => l.businessId === currentBiz.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Workspace Header */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#D9532F] mb-1">
            Contractor Portal · Non-Indexable (`NOINDEX, NOFOLLOW`)
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">
            Business Owner Dashboard — {currentBiz.name}
          </h1>
          <p className="text-xs text-[#475569] mt-1 font-mono tabular-nums">
            {currentBiz.cslbLicense} · Public URL: /roofing-companies/{currentBiz.slug}/
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="text-xs">
            <label className="text-[#475569] mr-2 font-medium">Switch Demo Business:</label>
            <select
              value={selectedBizId}
              onChange={(e) => setSelectedBizId(e.target.value)}
              className="px-3 py-2 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] text-xs font-semibold text-[#0F172A]"
            >
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.primaryCity})
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => onViewProfile(currentBiz.slug)}
            className="px-4 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
          >
            View Live Public Profile
          </button>
        </div>
      </div>

      {/* Profile Completion Meter */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-sm font-bold text-[#0F172A]">
            Your profile is <span className="font-mono text-[#15803D]">{currentBiz.profileCompletion}%</span> complete
          </span>
          <span className="text-xs text-[#475569]">
            Profiles above 85% completion pass our Programmatic SEO Indexation threshold (`INDEX, FOLLOW`).
          </span>
        </div>
        <div className="w-full h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#15803D] rounded-full transition-all"
            style={{ width: `${currentBiz.profileCompletion}%` }}
          />
        </div>
      </div>

      {/* Analytics KPI Row (Tabular Numerals) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: '30-Day Profile Views', value: '1,420' },
          { label: 'CA Search Appearances', value: '6,890' },
          { label: 'Direct Phone Clicks', value: '84' },
          { label: 'Website Referral Clicks', value: '119' },
          { label: 'Direct Quote Leads', value: String(bizLeads.length) },
          { label: 'Verified Review Score', value: `${currentBiz.rating.toFixed(1)} (${currentBiz.reviewCount})` }
        ].map((metric) => (
          <div key={metric.label} className="bg-white border border-[#E2E8F0] rounded-xl p-4">
            <div className="text-[11px] text-[#475569]">{metric.label}</div>
            <div className="text-xl font-bold text-[#0F172A] font-mono tabular-nums mt-1">
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg mb-6 w-fit">
        {(
          [
            { id: 'overview', label: 'Business Profile & Credentials' },
            { id: 'leads', label: `Direct Leads (${bizLeads.length})` },
            { id: 'services', label: 'Services & CA Cities' },
            { id: 'reviews', label: `Customer Reviews (${currentBiz.reviews.length})` },
            { id: 'subscription', label: 'Plan & Featured Placement' }
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === t.id ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      {activeTab === 'overview' && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#0F172A]">
            Company Record & CSLB Verification Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[#475569] block">Verification Badge</span>
              <span className="text-sm font-bold text-[#15803D] mt-1 block">
                {currentBiz.verificationBadge}
              </span>
            </div>
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[#475569] block">CSLB License Classification</span>
              <span className="text-sm font-bold font-mono text-[#0F172A] mt-1 block">
                {currentBiz.cslbLicense}
              </span>
            </div>
            <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[#475569] block">Workers’ Compensation</span>
              <span className="text-sm font-bold text-[#0F172A] mt-1 block">
                {currentBiz.workersCompStatus}
              </span>
            </div>
          </div>
          <div className="pt-2">
            <span className="font-semibold text-[#0F172A] block mb-1">Public Profile Description:</span>
            <p className="text-[#475569] leading-relaxed">{currentBiz.fullDescription}</p>
          </div>
        </div>
      )}

      {activeTab === 'leads' && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0F172A]">
                Direct Homeowner & Commercial Quote Requests
              </h2>
              <p className="text-xs text-[#475569]">
                Any quote submitted on your profile appears here immediately.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
                  <th className="py-3 px-4 font-semibold">Homeowner / Contact</th>
                  <th className="py-3 px-4 font-semibold">CA ZIP & Type</th>
                  <th className="py-3 px-4 font-semibold">Service Needed</th>
                  <th className="py-3 px-4 font-semibold">Project Message</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {bizLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0F172A]">{lead.consumerName}</div>
                      <div className="font-mono text-[11px] text-[#475569] tabular-nums">
                        {lead.phone} · {lead.email}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums">
                      ZIP {lead.zipCode} · {lead.propertyType}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#0F172A]">{lead.serviceNeeded}</td>
                    <td className="py-3.5 px-4 text-[#475569] max-w-xs">{lead.message}</td>
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          onUpdateLeadStatus(lead.id, e.target.value as LeadSubmission['status'])
                        }
                        className="px-2.5 py-1 rounded border border-[#E2E8F0] text-xs font-semibold bg-white"
                      >
                        <option value="New">New Inquiry</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Estimate Scheduled">Estimate Scheduled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#0F172A]">Active Roofing Specialties & California Cities</h2>
          <div>
            <span className="font-semibold text-[#0F172A] block mb-1.5">Listed Roofing Services:</span>
            <div className="text-[#475569]">{currentBiz.serviceNames.join(' · ')}</div>
          </div>
          <div>
            <span className="font-semibold text-[#0F172A] block mb-1.5">Active California Service Areas:</span>
            <div className="text-[#475569]">{currentBiz.serviceAreas.join(' · ')}</div>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#0F172A]">Verified Customer Reviews & Owner Responses</h2>
          {currentBiz.reviews.length > 0 ? (
            currentBiz.reviews.map((r) => (
              <div key={r.id} className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="font-bold text-[#0F172A]">
                  {r.authorName} · {r.rating.toFixed(1)} Stars ({r.servicePerformed})
                </div>
                <p className="mt-1 text-[#475569]">“{r.comment}”</p>
              </div>
            ))
          ) : (
            <p className="text-[#475569]">No reviews recorded for this business yet.</p>
          )}
        </div>
      )}

      {activeTab === 'subscription' && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#0F172A]">
            Current Directory Plan: <span className="text-[#D9532F]">{currentBiz.planTier}</span>
          </h2>
          <p className="text-[#475569]">
             CalRoof monetization prioritizes homeowner trust: Featured placement highlights verified C-39 contractors without hiding organic listings or selling homeowner phone numbers to aggregators.
          </p>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. ADMIN GOVERNANCE, VERIFICATION & SEO CONSOLE (/admin/)
// ============================================================================
export const AdminDashboardView: React.FC<{
  businesses: RoofingBusiness[];
  onToggleVerification: (bizId: string) => void;
  onToggleFeatured: (bizId: string) => void;
  onViewProfile: (slug: string) => void;
}> = ({ businesses, onToggleVerification, onToggleFeatured, onViewProfile }) => {
  const [adminTab, setAdminTab] = useState<
    'verification' | 'seo-indexation' | 'quality-dedupe' | 'architecture-spec'
  >('verification');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-[#0F172A] text-white rounded-xl p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#D9532F] mb-1">
            Platform Governance & SEO Architecture Console
          </div>
          <h1 className="text-2xl font-bold">
            CalRoof Admin Dashboard & Programmatic SEO Control Center
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Verify CSLB C-39 licenses, govern `INDEX / NOINDEX` thresholds, detect duplicate phone/address records, and inspect the database schema.
          </p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg mb-6 w-fit">
        {(
          [
            { id: 'verification', label: '1. Contractor Verification & Featured Controls' },
            { id: 'seo-indexation', label: '2. Programmatic SEO Indexation Rules & Sitemaps' },
            { id: 'quality-dedupe', label: '3. Duplicate & Spam Quality Scanner' },
            { id: 'architecture-spec', label: '4. Full-Stack Database & System Specification' }
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setAdminTab(tab.id)}
            className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              adminTab === tab.id ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: CONTRACTOR VERIFICATION TABLE */}
      {adminTab === 'verification' && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
          <div className="p-5 border-b border-[#E2E8F0]">
            <h2 className="text-base font-bold text-[#0F172A]">
              California Roofing Companies — License Verification & Featured Placement
            </h2>
            <p className="text-xs text-[#475569] mt-0.5">
              Click “Toggle Verified Badge” or “Toggle Featured” to update directory state in real time.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
                  <th className="py-3 px-4 font-semibold">Company & Slug</th>
                  <th className="py-3 px-4 font-semibold">City & County</th>
                  <th className="py-3 px-4 font-semibold">CSLB C-39 License</th>
                  <th className="py-3 px-4 font-semibold">Badge Status</th>
                  <th className="py-3 px-4 font-semibold">Featured</th>
                  <th className="py-3 px-4 font-semibold text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {businesses.map((biz) => (
                  <tr key={biz.id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => onViewProfile(biz.slug)}
                        className="font-bold text-[#0F172A] hover:text-[#D9532F]"
                      >
                        {biz.name}
                      </button>
                      <div className="font-mono text-[11px] text-[#475569]">
                        /roofing-companies/{biz.slug}/
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {biz.primaryCity} · {biz.county}
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums">{biz.cslbLicense}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-semibold ${
                          biz.verificationBadge === 'Verified Business'
                            ? 'text-[#15803D]'
                            : 'text-[#B45309]'
                        }`}
                      >
                        {biz.verificationBadge}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {biz.isFeatured ? 'Featured' : 'Standard'}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onToggleVerification(biz.id)}
                        className="px-2.5 py-1 rounded border border-[#E2E8F0] hover:border-[#0F172A] text-[11px] font-semibold cursor-pointer"
                      >
                        Toggle Verified Badge
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleFeatured(biz.id)}
                        className="px-2.5 py-1 rounded border border-[#E2E8F0] hover:border-[#D9532F] text-[11px] font-semibold cursor-pointer"
                      >
                        Toggle Featured
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PROGRAMMATIC SEO INDEXATION GUARDRAILS */}
      {adminTab === 'seo-indexation' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
            <h2 className="text-base font-bold text-[#0F172A] mb-2">
              Programmatic SEO Safety Engine & XML Sitemap Partitioning
            </h2>
            <p className="text-xs text-[#475569] leading-relaxed mb-4">
              To prevent thin or duplicate content penalties across thousands of California cities and city+service combinations, the database enforces deterministic `is_indexable` rules before adding any URL to `sitemap-locations.xml` or `sitemap-businesses.xml`.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
                    <th className="py-3 px-4 font-semibold">California Location URL</th>
                    <th className="py-3 px-4 font-semibold">Active Businesses</th>
                    <th className="py-3 px-4 font-semibold">Unique Climate/Permit Copy</th>
                    <th className="py-3 px-4 font-semibold">Meta Robots Directive</th>
                    <th className="py-3 px-4 font-semibold">XML Sitemap Inclusion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {CALIFORNIA_LOCATIONS.map((loc) => (
                    <tr key={loc.slug}>
                      <td className="py-3 px-4 font-mono">
                        /roofing-companies/california/{loc.slug}/
                      </td>
                      <td className="py-3 px-4 font-mono tabular-nums">{loc.businessCount}</td>
                      <td className="py-3 px-4">{loc.localPermitAuthority}</td>
                      <td className="py-3 px-4 font-mono font-semibold">
                        {loc.isIndexable ? (
                          <span className="text-[#15803D]">INDEX, FOLLOW</span>
                        ) : (
                          <span className="text-[#B91C1C]">NOINDEX, FOLLOW (Thin &lt;3)</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {loc.isIndexable ? 'sitemap-locations.xml' : 'Excluded'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DUPLICATE & SPAM QUALITY CONTROL */}
      {adminTab === 'quality-dedupe' && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#0F172A]">
            Automated Business Quality & Duplicate Detection Scanner
          </h2>
          <p className="text-[#475569]">
            Monitors incoming business claims for duplicate phone numbers, shared virtual-office addresses, overlapping CSLB license numbers, or velocity-spike review spam.
          </p>
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-[#B45309] space-y-1">
            <div className="font-bold">Flagged Queue Item #DQ-409 (Simulated Quality Alert)</div>
            <p>
              Submitted Listing: “SoCal Fast Roof Repair LLC” attempted to register phone `(310) 555-0194` — matches existing Verified Business `Pacific Crest Roofing Systems` (`CSLB #894102`). Action: Quarantined for Admin Merge/Reject.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: FULL DATABASE & SYSTEM ARCHITECTURE SPECIFICATION */}
      {adminTab === 'architecture-spec' && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 space-y-6 text-xs">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">
              URL Architecture Recommendation & Relational Database Schema
            </h2>
            <p className="text-[#475569] mt-1 leading-relaxed">
              <strong>Why `/roofing-companies/{'{business-slug}'}/` is superior for business profiles:</strong> Roofing companies in California frequently expand across city and county lines (e.g., an Orange County contractor relocating their warehouse from Santa Ana to Irvine, or serving both Los Angeles and Long Beach). Root-level business slugs (`/roofing-companies/pacific-crest-roofing-systems/`) prevent URL breaking changes and 301 redirect chains if a company moves offices, while Location Hubs (`/roofing-companies/california/los-angeles/`) and Combined City+Service pages (`/roofing-companies/california/los-angeles/roof-repair/`) capture local geographic search intent via many-to-many relational mapping.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0F172A] text-slate-200 font-mono text-[11px] overflow-x-auto">
            <pre>{`-- Core PostgreSQL / Relational Entities for CalRoof Directory
1. users (id, email, password_hash, role ['consumer','business_owner','admin'], email_verified_at, created_at)
2. businesses (id, owner_user_id, slug UNIQUE, name, tagline, cslb_license_number, cslb_verified_status, workers_comp_status, general_liability_amount, verification_badge, plan_tier, is_featured, profile_completion_score, is_indexable)
3. business_profiles (business_id PK, short_description, full_description, primary_phone, website_url, public_email, founded_year, residential_pct, commercial_pct, emergency_24hr, title24_certified, seo_title, seo_meta_description)
4. counties (id, slug UNIQUE, name, region)
5. cities (id, county_id FK, slug UNIQUE, name, cec_climate_zone, permit_authority, active_business_count, is_indexable, unique_seo_intro)
6. business_locations (id, business_id FK, city_id FK, street_address, zip_code, is_headquarters, service_radius_miles)
7. services (id, slug UNIQUE, name, category, avg_cost_range_ca, typical_lifespan, what_it_involves, ca_title24_notes)
8. business_services (business_id FK, service_id FK, PRIMARY KEY (business_id, service_id))
9. city_service_pages (id, city_id FK, service_id FK, active_specialist_count, custom_intro_copy, is_indexable)
10. verification_records (id, business_id FK, admin_reviewer_id FK, cslb_check_timestamp, insurance_cert_url, domain_email_verified, status, audit_notes)
11. claims (id, business_id FK, claimant_user_id FK, corporate_email, phone_otp_verified, status)
12. reviews (id, business_id FK, author_name, project_city, service_id FK, rating INT CHECK 1..5, comment, owner_response, moderation_status ['approved','pending','flagged_spam'])
13. photos (id, business_id FK, image_url, caption, city_name, roof_system_type, sort_order)
14. leads (id, business_id FK, consumer_name, phone, email, zip_code, service_needed, property_type, message, preferred_contact, status, created_at)
15. subscriptions (id, business_id FK, plan_tier, billing_cadence, stripe_subscription_id, active_until)
16. articles (id, slug UNIQUE, title, category_id FK, author_name, published_at, updated_at, body_json, is_indexable)
17. business_hours & social_profiles & analytics_events (daily aggregated profile_views, phone_clicks, website_clicks, quote_submits)`}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
