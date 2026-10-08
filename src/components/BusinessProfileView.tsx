import React, { useState } from 'react';
import {
  Phone,
  Globe,
  Star,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
  Send,
  Code2,
  ArrowUpRight,
  MessageSquarePlus
} from 'lucide-react';
import {
  RoofingBusiness,
  ROOFING_SERVICES,
  CALIFORNIA_LOCATIONS,
  ReviewItem
} from '../data/californiaRoofingData';
import {
  Breadcrumbs,
  VerificationStatusText,
  ResilientImage,
  BusinessCard
} from './SharedComponents';

interface BusinessProfileViewProps {
  business: RoofingBusiness;
  allBusinesses: RoofingBusiness[];
  onNavigateHome: () => void;
  onNavigateDirectory: () => void;
  onSelectCity: (citySlug: string) => void;
  onSelectService: (serviceSlug: string) => void;
  onViewProfile: (slug: string) => void;
  onRequestQuote: (business: RoofingBusiness) => void;
  onSubmitLead: (leadData: {
    businessId: string;
    businessName: string;
    consumerName: string;
    phone: string;
    email: string;
    zipCode: string;
    serviceNeeded: string;
    propertyType: 'Residential' | 'Commercial' | 'Multi-Family / HOA';
    message: string;
    preferredContact: 'Phone Call' | 'Email' | 'Text Message';
  }) => void;
  onAddReview: (businessId: string, review: Omit<ReviewItem, 'id' | 'date'>) => void;
  onOpenVerificationModal: () => void;
}

export const BusinessProfileView: React.FC<BusinessProfileViewProps> = ({
  business,
  allBusinesses,
  onNavigateHome,
  onNavigateDirectory,
  onSelectCity,
  onSelectService,
  onViewProfile,
  onRequestQuote,
  onSubmitLead,
  onAddReview,
  onOpenVerificationModal
}) => {
  const [showSchemaJson, setShowSchemaJson] = useState(false);

  // Embedded Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadZip, setLeadZip] = useState(business.zipCode);
  const [leadService, setLeadService] = useState(business.serviceNames[0] || 'Roof Replacement');
  const [leadPropType, setLeadPropType] = useState<'Residential' | 'Commercial' | 'Multi-Family / HOA'>('Residential');
  const [leadMessage, setLeadMessage] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadError, setLeadError] = useState('');

  // Customer Review Submission State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [revAuthor, setRevAuthor] = useState('');
  const [revCity, setRevCity] = useState(`${business.primaryCity}, CA`);
  const [revService, setRevService] = useState(business.serviceNames[0] || 'Roof Replacement');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');
  const [revSuccess, setRevSuccess] = useState(false);

  const similarCompanies = allBusinesses
    .filter((b) => b.id !== business.id && (b.citySlug === business.citySlug || b.services.some((s) => business.services.includes(s))))
    .slice(0, 2);

  const handleEmbeddedLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim() || !leadEmail.trim()) {
      setLeadError('Please enter your name, phone number, and email address.');
      return;
    }
    setLeadError('');
    onSubmitLead({
      businessId: business.id,
      businessName: business.name,
      consumerName: leadName,
      phone: leadPhone,
      email: leadEmail,
      zipCode: leadZip,
      serviceNeeded: leadService,
      propertyType: leadPropType,
      message: leadMessage || 'Requesting on-site roof inspection and written estimate.',
      preferredContact: 'Phone Call'
    });
    setLeadSubmitted(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revAuthor.trim() || !revComment.trim()) return;
    onAddReview(business.id, {
      authorName: `${revAuthor} (Submitted Demo Review)`,
      city: revCity,
      servicePerformed: revService,
      rating: revRating,
      comment: revComment,
      verifiedProject: true
    });
    setRevAuthor('');
    setRevComment('');
    setRevSuccess(true);
    setShowReviewForm(false);
  };

  // Legitimate Schema.org JSON-LD (RoofingContractor + BreadcrumbList)
  const schemaOrgJson = {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': `https://calroofdirectory.example.com/roofing-companies/${business.slug}/#contractor`,
    name: business.name,
    description: business.shortDescription,
    url: `https://calroofdirectory.example.com/roofing-companies/${business.slug}/`,
    telephone: business.phone,
    email: business.email,
    foundingDate: String(business.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: business.primaryCity,
      addressRegion: 'CA',
      postalCode: business.zipCode,
      addressCountry: 'US'
    },
    areaServed: business.serviceAreas.map((city) => ({
      '@type': 'City',
      name: `${city}, California`
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'California Roofing Services',
      itemListElement: business.serviceNames.map((srv) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: srv
        }
      }))
    },
    ...(business.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: business.rating,
            reviewCount: business.reviewCount,
            bestRating: 5,
            worstRating: 1
          }
        }
      : {})
  };

  return (
    <div className="pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/', onClick: onNavigateHome },
            { label: 'Roofing Companies', path: '/roofing-companies/', onClick: onNavigateDirectory },
            {
              label: `${business.primaryCity}, CA`,
              path: `/roofing-companies/california/${business.citySlug}/`,
              onClick: () => onSelectCity(business.citySlug)
            },
            { label: business.name }
          ]}
          onNavigate={() => {}}
        />

        {/* ABOVE THE FOLD PROFILE HEADER */}
        <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-8 mt-2">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-[#E2E8F0]">
            <VerificationStatusText
              badge={business.verificationBadge}
              cslbLicense={business.cslbLicense}
              onOpenPolicyModal={onOpenVerificationModal}
            />
            <div className="flex items-center gap-3 text-xs text-[#475569] font-mono tabular-nums">
              <span>Clean SEO Slug: `/roofing-companies/{business.slug}/`</span>
              <button
                type="button"
                onClick={() => setShowSchemaJson(!showSchemaJson)}
                className="inline-flex items-center gap-1 text-[#0F172A] hover:text-[#D9532F] font-sans font-semibold underline underline-offset-2 cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5" />
                {showSchemaJson ? 'Hide Schema JSON-LD' : 'Inspect Schema.org JSON-LD'}
              </button>
            </div>
          </div>

          {showSchemaJson && (
            <div className="mb-6 p-4 rounded-lg bg-[#0F172A] text-slate-200 font-mono text-xs overflow-x-auto">
              <div className="text-[11px] text-slate-400 mb-2">
                // Embedded Schema.org `RoofingContractor` Structured Data for `/roofing-companies/{business.slug}/`
              </div>
              <pre>{JSON.stringify(schemaOrgJson, null, 2)}</pre>
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#0F172A] text-white font-display font-bold text-2xl flex items-center justify-center shrink-0">
                {business.logoInitials}
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                  {business.name}
                </h1>
                <p className="mt-1.5 text-sm sm:text-base font-medium text-[#475569]">
                  {business.tagline}
                </p>

                {/* Rating + Location + Experience Inline Row */}
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#475569]">
                  <span className="inline-flex items-center gap-1 font-bold text-[#0F172A] font-mono tabular-nums">
                    <Star className="w-4 h-4 fill-[#D9532F] text-[#D9532F]" />
                    {business.rating.toFixed(1)} ({business.reviewCount} reviews)
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#0F172A]">
                    {business.primaryCity}, CA ({business.county})
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {business.yearsInBusiness} Years in Business (Est. {business.foundedYear})
                  </span>
                  {business.title24CoolRoofCertified && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#15803D] font-semibold">Title 24 Cool Roof Specialist</span>
                    </>
                  )}
                </div>

                {/* Primary Services Summary */}
                <div className="mt-3 text-xs text-[#475569] flex flex-wrap items-center gap-1.5">
                  <span className="font-semibold text-[#0F172A]">Primary Specialties:</span>
                  {business.serviceNames.map((name, i) => (
                    <React.Fragment key={name}>
                      {i > 0 && <span aria-hidden="true">·</span>}
                      <span>{name}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Above-the-Fold Conversion Actions */}
            <div className="flex flex-wrap sm:flex-nowrap lg:flex-col gap-2.5 shrink-0 lg:min-w-[230px]">
              <button
                type="button"
                onClick={() => onRequestQuote(business)}
                className="w-full px-5 py-3 rounded-lg bg-[#D9532F] hover:bg-[#c04422] text-white text-xs sm:text-sm font-semibold text-center transition-colors cursor-pointer"
              >
                Request a Quote
              </button>
              <a
                href={`tel:${business.phone.replace(/[^0-9]/g, '')}`}
                className="w-full px-5 py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-xs sm:text-sm font-mono font-semibold text-center flex items-center justify-center gap-2 transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#D9532F]" />
                {business.phone}
              </a>
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] hover:border-[#0F172A] text-xs font-semibold text-[#0F172A] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#475569]" />
                Visit Official Website
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* TWO-COLUMN MAIN PROFILE ARCHITECTURE */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 8 COLUMNS: Detailed Sections */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. ABOUT THE COMPANY */}
            <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#0F172A] mb-3">
                About {business.name}
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                {business.fullDescription}
              </p>

              <div className="mt-6 pt-6 border-t border-[#E2E8F0] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-[#475569] block">Residential Mix</span>
                  <span className="text-base font-bold text-[#0F172A] font-mono tabular-nums">
                    {business.residentialShare}%
                  </span>
                </div>
                <div>
                  <span className="text-[#475569] block">Commercial / HOA Mix</span>
                  <span className="text-base font-bold text-[#0F172A] font-mono tabular-nums">
                    {business.commercialShare}%
                  </span>
                </div>
                <div>
                  <span className="text-[#475569] block">Years in California</span>
                  <span className="text-base font-bold text-[#0F172A] font-mono tabular-nums">
                    {business.yearsInBusiness} Years
                  </span>
                </div>
                <div>
                  <span className="text-[#475569] block">Emergency Service</span>
                  <span className="text-base font-bold text-[#0F172A]">
                    {business.emergency24Hr ? '24/7 Dispatch' : 'Standard Hours'}
                  </span>
                </div>
              </div>
            </section>

            {/* 2. ROOFING SERVICES OFFERED */}
            <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#0F172A] mb-2">
                Roofing Services & Material Specialties
              </h2>
              <p className="text-xs text-[#475569] mb-5">
                Click any roofing specialty below to view California cost guides and service specifications.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {business.services.map((srvSlug) => {
                  const srvObj = ROOFING_SERVICES.find((s) => s.slug === srvSlug);
                  return (
                    <div
                      key={srvSlug}
                      onClick={() => onSelectService(srvSlug)}
                      className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0F172A] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-[#0F172A]">
                          {srvObj ? srvObj.name : srvSlug}
                        </h3>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#D9532F]" />
                      </div>
                      {srvObj && (
                        <p className="mt-1.5 text-xs text-[#475569] leading-relaxed">
                          {srvObj.shortSummary}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. CREDENTIALS, LICENSE & INSURANCE */}
            <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-8">
              <div className="flex items-center justify-between gap-2 mb-4">
                <h2 className="text-xl font-bold text-[#0F172A]">
                  California Licensing, Insurance & Manufacturer Credentials
                </h2>
                <span className="text-xs font-mono text-[#15803D] font-semibold">
                  CSLB C-39 Tracked (Demo)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#475569] block">California State License Number</span>
                  <span className="text-sm font-bold text-[#0F172A] font-mono tabular-nums mt-0.5 block">
                    {business.cslbLicense}
                  </span>
                  <span className="text-[#15803D] font-medium mt-1 block">
                    Status: {business.cslbStatus}
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#475569] block">Workers’ Compensation & General Liability</span>
                  <span className="text-sm font-bold text-[#0F172A] mt-0.5 block">
                    {business.workersCompStatus}
                  </span>
                  <span className="text-[#475569] font-mono tabular-nums mt-1 block">
                    Liability Coverage: {business.generalLiabilityAmount}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-xs font-bold text-[#0F172A] mb-2.5">
                  Manufacturer Certifications & Trade Associations
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#475569]">
                  {business.certifications.map((cert, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 4. PROJECT PHOTOS GALLERY */}
            {business.photos.length > 0 && (
              <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#0F172A] mb-2">
                  Recent California Roofing Projects & Installations
                </h2>
                <p className="text-xs text-[#475569] mb-5">
                  Documented residential and commercial installations completed by {business.name}.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {business.photos.map((photo) => (
                    <figure
                      key={photo.id}
                      className="rounded-xl overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC]"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-slate-900">
                        <ResilientImage
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <figcaption className="p-4">
                        <div className="flex items-center gap-2 text-xs text-[#475569] mb-1">
                          <span className="font-semibold text-[#0F172A]">{photo.roofType}</span>
                          <span aria-hidden="true">·</span>
                          <span>{photo.city}</span>
                        </div>
                        <p className="text-xs text-[#475569] leading-relaxed">{photo.caption}</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* 5. SERVICE AREAS & LOCAL COVERAGE MAP */}
            <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#0F172A] mb-2">
                California Service Areas & Dispatch Coverage
              </h2>
              <p className="text-xs text-[#475569] mb-4">
                Primary Dispatch Office: <span className="font-semibold text-[#0F172A]">{business.address}</span>
              </p>

              <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] mb-4">
                <div className="text-xs font-semibold text-[#0F172A] mb-2">
                  Cities & Communities Served in {business.county} and Surrounding Areas:
                </div>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-[#475569]">
                  {business.serviceAreas.map((city, idx) => {
                    const matchedLoc = CALIFORNIA_LOCATIONS.find(
                      (l) => l.name.toLowerCase() === city.toLowerCase()
                    );
                    return (
                      <React.Fragment key={city}>
                        {idx > 0 && <span aria-hidden="true">·</span>}
                        {matchedLoc ? (
                          <button
                            type="button"
                            onClick={() => onSelectCity(matchedLoc.slug)}
                            className="font-medium text-[#0F172A] hover:text-[#D9532F] underline underline-offset-2 cursor-pointer"
                          >
                            {city}, CA
                          </button>
                        ) : (
                          <span>{city}, CA</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 6. CUSTOMER REVIEWS & OWNER RESPONSES */}
            <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">
                    Customer Reviews ({business.reviewCount})
                  </h2>
                  <p className="text-xs text-[#475569] mt-0.5">
                    Reviews require project scope and California city verification to discourage spam.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#0F172A] text-xs font-semibold text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-colors cursor-pointer"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  {showReviewForm ? 'Cancel Review' : 'Write a Project Review'}
                </button>
              </div>

              {revSuccess && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-[#15803D] font-medium">
                  Thank you! Your project review has been added to this demonstration profile and queued in the Admin Moderation Log.
                </div>
              )}

              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="mb-6 p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4"
                >
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    Submit a Review for {business.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={revAuthor}
                        onChange={(e) => setRevAuthor(e.target.value)}
                        placeholder="Carlos Mendoza"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#E2E8F0] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] mb-1">California City</label>
                      <input
                        type="text"
                        value={revCity}
                        onChange={(e) => setRevCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#E2E8F0] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] mb-1">Rating</label>
                      <select
                        value={revRating}
                        onChange={(e) => setRevRating(Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#E2E8F0] rounded-lg font-mono"
                      >
                        <option value={5}>5.0 Stars — Excellent</option>
                        <option value={4}>4.0 Stars — Good</option>
                        <option value={3}>3.0 Stars — Average</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Roofing Service Performed
                    </label>
                    <input
                      type="text"
                      value={revService}
                      onChange={(e) => setRevService(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E2E8F0] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Review Details (Inspection, crew cleanliness, city permit inspection) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={revComment}
                      onChange={(e) => setRevComment(e.target.value)}
                      placeholder="Describe your experience with this roofing contractor..."
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E2E8F0] rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#D9532F] text-white text-xs font-semibold hover:bg-[#c04422] cursor-pointer"
                  >
                    Publish Review
                  </button>
                </form>
              )}

              {business.reviews.length > 0 ? (
                <div className="space-y-5">
                  {business.reviews.map((rev) => (
                    <div key={rev.id} className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200/70">
                        <div>
                          <span className="text-sm font-bold text-[#0F172A]">{rev.authorName}</span>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#475569] mt-0.5">
                            <span>{rev.city}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-medium text-[#0F172A]">{rev.servicePerformed}</span>
                            <span aria-hidden="true">·</span>
                            <span>{rev.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 font-mono text-xs font-bold text-[#0F172A] tabular-nums">
                          <Star className="w-3.5 h-3.5 fill-[#D9532F] text-[#D9532F]" />
                          {rev.rating.toFixed(1)}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-[#0F172A] leading-relaxed">
                        “{rev.comment}”
                      </p>
                      {rev.ownerResponse && (
                        <div className="mt-4 pl-4 border-l-2 border-[#D9532F] text-xs text-[#475569]">
                          <span className="font-bold text-[#0F172A] block mb-0.5">
                            Response from {business.name}:
                          </span>
                          {rev.ownerResponse}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#475569]">
                  No detailed written reviews displayed yet. Click “Write a Project Review” above to add the first review.
                </p>
              )}
            </section>

            {/* 7. COMPANY-SPECIFIC FAQs */}
            {business.faqs.length > 0 && (
              <section className="bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">
                  Frequently Asked Questions About {business.name}
                </h2>
                <div className="space-y-4">
                  {business.faqs.map((f, i) => (
                    <div key={i} className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                      <h3 className="text-sm font-bold text-[#0F172A]">{f.question}</h3>
                      <p className="mt-1.5 text-xs text-[#475569] leading-relaxed">{f.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT 4 COLUMNS: Business Information Card + Direct Quote Form */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Business Information & Hours */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
              <h2 className="text-base font-bold text-[#0F172A] pb-3 mb-4 border-b border-[#E2E8F0]">
                Business Information & Hours
              </h2>
              <dl className="space-y-3 text-xs">
                <div>
                  <dt className="text-[#475569]">Business Address</dt>
                  <dd className="font-semibold text-[#0F172A] mt-0.5">{business.address}</dd>
                </div>
                <div>
                  <dt className="text-[#475569]">Direct Phone</dt>
                  <dd className="font-mono font-bold text-[#0F172A] mt-0.5 tabular-nums">
                    {business.phone}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#475569]">Website</dt>
                  <dd className="mt-0.5 truncate">
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D9532F] hover:underline font-medium"
                    >
                      {business.website}
                    </a>
                  </dd>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <dt className="font-semibold text-[#0F172A] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D9532F]" />
                    Operating & Dispatch Hours
                  </dt>
                  <dd className="space-y-1 text-[#475569] font-mono text-[11px] tabular-nums">
                    <div className="flex justify-between">
                      <span>Mon – Fri:</span>
                      <span className="text-[#0F172A]">{business.businessHours.mondayFriday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="text-[#0F172A]">{business.businessHours.saturday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="text-[#0F172A]">{business.businessHours.sunday}</span>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Embedded Direct Quote Form */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
              <div className="text-xs font-semibold text-[#D9532F] mb-1">
                Direct Lead Routing
              </div>
              <h2 className="text-lg font-bold text-[#0F172A]">
                Request an Estimate from {business.name}
              </h2>
              <p className="mt-1 text-xs text-[#475569]">
                Sent directly to this contractor’s dashboard.
              </p>

              {leadSubmitted ? (
                <div className="mt-4 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-[#15803D]">
                  <p className="font-bold">Estimate Request Delivered!</p>
                  <p className="mt-1">
                    {business.name} has received your request. You can inspect this lead live inside the “Business Dashboard” view.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEmbeddedLeadSubmit} className="mt-4 space-y-3">
                  {leadError && (
                    <div className="p-2.5 rounded bg-red-50 text-[#B91C1C] text-xs">{leadError}</div>
                  )}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] mb-1">Phone *</label>
                      <input
                        type="tel"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="(310) 555-0199"
                        className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A] mb-1">ZIP Code *</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={leadZip}
                        onChange={(e) => setLeadZip(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-lg font-mono tabular-nums"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">Email *</label>
                    <input
                      type="email"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">Service Needed</label>
                    <select
                      value={leadService}
                      onChange={(e) => setLeadService(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-lg bg-white"
                    >
                      {business.serviceNames.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">Project Notes</label>
                    <textarea
                      rows={2}
                      value={leadMessage}
                      onChange={(e) => setLeadMessage(e.target.value)}
                      placeholder="Roof type, approximate square footage, or leak details..."
                      className="w-full px-3 py-2 text-xs border border-[#E2E8F0] rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#D9532F] hover:bg-[#c04422] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Send Estimate Request
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>

        {/* SIMILAR ROOFING COMPANIES & INTERNAL LINKING FOOTER */}
        <section className="mt-12 pt-10 border-t border-[#E2E8F0]">
          <h2 className="text-xl font-bold text-[#0F172A] mb-6">
            Similar California Roofing Companies in {business.primaryCity} & Nearby
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {similarCompanies.map((sim) => (
              <BusinessCard
                key={sim.id}
                business={sim}
                onViewProfile={onViewProfile}
                onRequestQuote={onRequestQuote}
                onOpenVerificationModal={onOpenVerificationModal}
                onSelectService={onSelectService}
                onSelectCity={onSelectCity}
              />
            ))}
          </div>
        </section>
      </div>

      {/* MOBILE STICKY CTA BAR (Strictly <= 15% mobile viewport height) */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t border-[#E2E8F0] px-4 py-2.5 flex items-center gap-3 shadow-lg">
        <a
          href={`tel:${business.phone.replace(/[^0-9]/g, '')}`}
          className="flex-1 py-2.5 rounded-lg bg-[#0F172A] text-white text-xs font-mono font-semibold text-center flex items-center justify-center gap-1.5 tabular-nums"
        >
          <Phone className="w-3.5 h-3.5 text-[#D9532F]" />
          Call Now
        </a>
        <button
          type="button"
          onClick={() => onRequestQuote(business)}
          className="flex-1 py-2.5 rounded-lg bg-[#D9532F] text-white text-xs font-semibold text-center"
        >
          Get Quote
        </button>
      </div>
    </div>
  );
};
