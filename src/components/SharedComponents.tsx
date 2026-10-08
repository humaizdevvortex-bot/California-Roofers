import React, { useState } from 'react';
import {
  Phone,
  CheckCircle2,
  ShieldCheck,
  Star,
  ArrowUpRight,
  ChevronRight,
  X,
  Building2,
  MapPin
} from 'lucide-react';
import { ASSETS, RoofingBusiness, ROOFING_SERVICES } from '../data/californiaRoofingData';

// 0. Sleek Architectural Brand Crest & Wordmark
export const BrandLogo: React.FC<{ darkText?: boolean }> = ({ darkText = true }) => {
  return (
    <span className="inline-flex items-center gap-3 select-none">
      <svg
        width="38"
        height="38"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="brandGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E05A3A" />
            <stop offset="100%" stopColor="#B83B1E" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill={darkText ? '#18181B' : '#27272A'} />
        <path d="M12 35L32 17L52 35H45L32 23.5L19 35H12Z" fill="url(#brandGrad)" />
        <path
          d="M21 36.5L32 26.5L43 36.5V47C43 48.1046 42.1046 49 41 49H23C21.8954 49 21 48.1046 21 47V36.5Z"
          fill="#FFFFFF"
          fillOpacity="0.95"
        />
      </svg>
      <span className="flex flex-col text-left">
        <span
          className={`font-brand text-lg font-medium tracking-[0.15em] leading-none ${
            darkText ? 'text-[#18181B]' : 'text-white'
          }`}
        >
          CAL<span className="text-[#D9532F]">ROOF</span>
        </span>
        <span
          className={`text-[10px] tracking-[0.12em] uppercase mt-1 leading-none ${
            darkText ? 'text-[#71717A]' : 'text-[#A1A1AA]'
          }`}
        >
          California Directory
        </span>
      </span>
    </span>
  );
};

// 1. Resilient Image with Zero-Broken-Image Policy
export const ResilientImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}> = ({ src, alt, className = '', fallbackLabel = 'California Architectural Roof' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#18181B] to-[#27272A] text-white p-6 text-center ${className}`}
      >
        <Building2 className="w-7 h-7 text-[#D9532F] mb-2 opacity-90" />
        <span className="text-xs tracking-wide text-zinc-300 max-w-[200px]">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

// 2. Clean Unboxed Breadcrumbs
export interface BreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; onNavigate: (path: string) => void }> = ({
  items,
  onNavigate
}) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4 text-xs text-[#71717A]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-2">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />}
              {isLast || !item.path ? (
                <span className="font-medium text-[#18181B] truncate max-w-[340px]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => (item.onClick ? item.onClick() : item.path && onNavigate(item.path))}
                  className="hover:text-[#D9532F] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// 3. Streamlined Verification Status Line
export const VerificationStatusText: React.FC<{
  badge: RoofingBusiness['verificationBadge'];
  cslbLicense: string;
  onOpenPolicyModal?: () => void;
}> = ({ badge, cslbLicense, onOpenPolicyModal }) => {
  const shortLicense = cslbLicense.split('(')[0].trim();

  if (badge === 'Verified Business') {
    return (
      <div className="flex flex-wrap items-center gap-2.5 text-xs">
        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          CSLB C-39 Verified
        </span>
        <span aria-hidden="true" className="text-zinc-300">·</span>
        <span className="font-mono text-zinc-600 tabular-nums">{shortLicense}</span>
        {onOpenPolicyModal && (
          <>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenPolicyModal();
              }}
              className="text-zinc-500 hover:text-[#18181B] underline underline-offset-4 cursor-pointer"
            >
              Verification Info
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-600">
      <span className="inline-flex items-center gap-1.5 font-medium text-amber-700">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        {badge}
      </span>
      <span aria-hidden="true" className="text-zinc-300">·</span>
      <span className="font-mono tabular-nums">{shortLicense}</span>
    </div>
  );
};

// 4. Unboxed Open-Canvas Visual Showcase Listing (Zero Outer Box Container!)
export const BusinessCard: React.FC<{
  business: RoofingBusiness;
  onViewProfile: (slug: string) => void;
  onRequestQuote: (business: RoofingBusiness) => void;
  onOpenVerificationModal?: () => void;
  onSelectService?: (serviceSlug: string) => void;
  onSelectCity?: (citySlug: string) => void;
}> = ({
  business,
  onViewProfile,
  onRequestQuote,
  onSelectService,
  onSelectCity
}) => {
  const shortLicense = (business.cslbLicense || '').split('(')[0].trim();
  const coverImage = business.photos?.[0]?.url || ASSETS.tileRoofImg;

  return (
    <article className="group py-8 border-b border-zinc-200/90 flex flex-col md:flex-row items-start gap-7 transition-all">
      {/* Left Visual Project Image */}
      <div
        onClick={() => onViewProfile(business.slug)}
        className="w-full md:w-72 lg:w-80 h-56 rounded-2xl overflow-hidden bg-zinc-900 relative shrink-0 cursor-pointer"
      >
        <ResilientImage
          src={coverImage}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

        {/* Top-Left Rating Pill */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0F172A] text-xs font-medium flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-mono">{business.rating.toFixed(1)}</span>
          <span className="text-zinc-400">({business.reviewCount})</span>
        </div>

        {/* Bottom-Left City & Experience */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <span className="inline-flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#FF7A59]" />
            {business.primaryCity}, CA
          </span>
          <span className="font-mono text-[11px] text-white/85">
            {business.yearsInBusiness} Yrs Active
          </span>
        </div>
      </div>

      {/* Right Open-Canvas Details (No Box Wrapper!) */}
      <div className="flex-1 min-w-0 flex flex-col justify-between w-full">
        <div>
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-emerald-700 font-medium mb-1.5">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              Verified California C-39
            </span>
            <span className="text-zinc-300">·</span>
            <span className="font-mono text-zinc-500">{shortLicense}</span>
            {business.emergency24Hr && (
              <>
                <span className="text-zinc-300">·</span>
                <span className="text-[#D9532F]">24/7 Emergency Dispatch</span>
              </>
            )}
          </div>

          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#0F172A] leading-snug">
              <button
                type="button"
                onClick={() => onViewProfile(business.slug)}
                className="text-left hover:text-[#D9532F] transition-colors cursor-pointer"
              >
                {business.name}
              </button>
            </h3>

            <button
              type="button"
              onClick={() => onViewProfile(business.slug)}
              className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-[#D9532F] transition-colors shrink-0 mt-1.5 cursor-pointer"
            >
              View Profile
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-2.5 text-base text-zinc-600 font-normal leading-relaxed max-w-3xl">
            {business.shortDescription}
          </p>

          {/* Open Inline Specialties */}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-zinc-500">
            <span className="font-medium text-zinc-800">Specialties:</span>
            {business.services.slice(0, 4).map((srvSlug, index) => {
              const srvName = business.serviceNames[index] || srvSlug;
              return (
                <React.Fragment key={srvSlug}>
                  {index > 0 && <span aria-hidden="true" className="text-zinc-300">·</span>}
                  <button
                    type="button"
                    onClick={() => onSelectService && onSelectService(srvSlug)}
                    className="hover:text-[#D9532F] text-zinc-700 transition-colors cursor-pointer"
                  >
                    {srvName}
                  </button>
                </React.Fragment>
              );
            })}
            {onSelectCity && (
              <>
                <span className="text-zinc-300">|</span>
                <button
                  type="button"
                  onClick={() => onSelectCity(business.citySlug)}
                  className="text-[#D9532F] hover:underline cursor-pointer"
                >
                  {business.county}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Open Action Row */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onRequestQuote(business)}
            className="px-6 py-2.5 rounded-full bg-[#0F172A] hover:bg-[#D9532F] text-white text-xs font-medium tracking-wide transition-colors cursor-pointer"
          >
            Request Free Quote
          </button>

          <a
            href={`tel:${business.phone.replace(/[^0-9]/g, '')}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-300 hover:border-[#0F172A] text-xs font-mono font-medium text-[#0F172A] transition-colors tabular-nums"
          >
            <Phone className="w-3.5 h-3.5 text-[#D9532F]" />
            {business.phone}
          </a>
        </div>
      </div>
    </article>
  );
};

// 5. Quote / Lead Generation Modal
export const QuoteRequestModal: React.FC<{
  business: RoofingBusiness | null;
  onClose: () => void;
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
}> = ({ business, onClose, onSubmitLead }) => {
  const [consumerName, setConsumerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState(business?.zipCode || '');
  const [serviceNeeded, setServiceNeeded] = useState(business?.serviceNames[0] || 'Roof Replacement');
  const [propertyType, setPropertyType] = useState<'Residential' | 'Commercial' | 'Multi-Family / HOA'>('Residential');
  const [preferredContact] = useState<'Phone Call' | 'Email' | 'Text Message'>('Phone Call');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!business) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consumerName.trim() || !phone.trim() || !email.trim() || !zipCode.trim()) {
      setError('Please complete your name, phone number, email, and California ZIP code.');
      return;
    }
    if (!/^\d{5}$/.test(zipCode.trim())) {
      setError('Please enter a valid 5-digit California ZIP code (e.g., 90025, 92121, 95819).');
      return;
    }
    setError('');
    onSubmitLead({
      businessId: business.id,
      businessName: business.name,
      consumerName,
      phone,
      email,
      zipCode,
      serviceNeeded,
      propertyType,
      message: message || 'Interested in scheduling a roof inspection and itemized estimate.',
      preferredContact
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] max-w-lg w-full p-7 md:p-9 relative shadow-2xl my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-zinc-800 rounded-full cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-display font-medium text-[#18181B]">Quote Request Sent</h3>
            <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
              Your inquiry for <span className="font-medium text-[#18181B]">{serviceNeeded}</span> in ZIP{' '}
              <span className="font-mono">{zipCode}</span> has been sent directly to{' '}
              <span className="font-medium text-[#18181B]">{business.name}</span>.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#18181B] text-white text-xs font-medium hover:bg-[#D9532F] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs font-medium text-[#D9532F] mb-1">
              100% Free Estimate · Direct to Contractor
            </div>
            <h3 className="text-2xl font-display font-medium text-[#18181B]">
              Get a Quote from {business.name}
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              {business.primaryCity}, CA · {business.cslbLicense.split('(')[0]}
            </p>

            {error && (
              <div className="mt-4 p-3.5 rounded-2xl bg-red-50 text-xs text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={consumerName}
                    onChange={(e) => setConsumerName(e.target.value)}
                    placeholder="Jane Morales"
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D9532F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(310) 555-0199"
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D9532F] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D9532F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    CA ZIP Code *
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="90025"
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D9532F] font-mono tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Roofing System
                  </label>
                  <select
                    value={serviceNeeded}
                    onChange={(e) => setServiceNeeded(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D9532F]"
                  >
                    {ROOFING_SERVICES.map((s) => (
                      <option key={s.slug} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as any)}
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D9532F]"
                  >
                    <option value="Residential">Residential Home</option>
                    <option value="Commercial">Commercial Building</option>
                    <option value="Multi-Family / HOA">HOA / Multi-Family</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Project Details
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe roof age, material, or repair needs..."
                  className="w-full px-4 py-3 text-sm bg-[#FAF8F5] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D9532F]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-zinc-600 hover:text-[#18181B] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#D9532F] hover:bg-[#c04422] text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Send Quote Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// 6. Verification & E-E-A-T Policy Modal
export const VerificationPolicyModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] max-w-2xl w-full p-7 md:p-9 relative shadow-2xl my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-zinc-800 rounded-full cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 mb-2">
          <ShieldCheck className="w-4 h-4" />
          CalRoof State License Verification Standard
        </div>
        <h3 className="text-2xl font-display font-medium text-[#18181B]">
          CSLB Class C-39 Verification Policy
        </h3>
        <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
          Every Verified contractor profile on CalRoof Directory is checked against California Contractors State License Board (CSLB) records for active Class C-39 roofing licensure and Workers’ Compensation insurance.
        </p>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#18181B] text-white text-xs font-medium hover:bg-[#D9532F] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
