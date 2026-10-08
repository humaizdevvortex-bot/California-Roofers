import React, { useState } from 'react';
import {
  BookOpen,
  ShieldCheck,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Scale
} from 'lucide-react';
import {
  RESOURCE_ARTICLES,
  CALIFORNIA_LOCATIONS,
  ROOFING_SERVICES,
  ResourceArticle
} from '../data/californiaRoofingData';
import { Breadcrumbs, ResilientImage } from './SharedComponents';

// 1. ALL CALIFORNIA LOCATIONS HUB (/locations/)
export const LocationsHubView: React.FC<{
  onNavigateHome: () => void;
  onSelectLocation: (citySlug: string) => void;
  onSelectServiceAndCity: (serviceSlug: string, citySlug: string) => void;
}> = ({ onNavigateHome, onSelectLocation, onSelectServiceAndCity }) => {
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const regions = ['All', 'Southern California', 'Bay Area', 'Sacramento Metro', 'Central Valley'];

  const filteredCities = CALIFORNIA_LOCATIONS.filter(
    (c) => regionFilter === 'All' || c.region === regionFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/', onClick: onNavigateHome },
          { label: 'California Roofing Locations (/roofing-companies/california/)' }
        ]}
        onNavigate={() => {}}
      />

      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-8 mt-2 mb-8">
        <div className="text-xs font-semibold text-[#D9532F] mb-1">
          Scalable California City & County Architecture
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A]">
          Find Roofing Companies by California City & Climate Zone
        </h1>
        <p className="mt-2 text-sm text-[#475569] max-w-3xl leading-relaxed">
          Browse indexable California city hubs below. In compliance with our programmatic SEO safety framework, only cities with 3+ verified roofing contractors and unique local building-department and CEC Climate Zone data are marked `INDEX, FOLLOW`.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-[#F1F5F9] rounded-lg border border-[#E2E8F0] w-fit">
          {regions.map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => setRegionFilter(reg)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                regionFilter === reg ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCities.map((city) => (
          <div
            key={city.slug}
            className="bg-white border border-[#E2E8F0] rounded-xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 text-xs">
                <span className="font-mono text-[#475569]">{city.county}</span>
                <span
                  className={`font-mono text-[11px] font-semibold ${
                    city.isIndexable ? 'text-[#15803D]' : 'text-[#B45309]'
                  }`}
                >
                  {city.isIndexable ? 'INDEX, FOLLOW' : 'NOINDEX (<3 Roofers)'}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-bold text-[#0F172A]">
                  <button
                    type="button"
                    onClick={() => onSelectLocation(city.slug)}
                    className="hover:text-[#D9532F] transition-colors text-left cursor-pointer"
                  >
                    {city.name}, CA
                  </button>
                </h2>
                <span className="text-xs font-mono font-bold text-[#0F172A] tabular-nums">
                  {city.businessCount} listed
                </span>
              </div>

              <p className="mt-2 text-xs text-[#475569] leading-relaxed">{city.seoIntro}</p>

              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-[#475569] space-y-1">
                <div>
                  <span className="font-semibold text-[#0F172A]">Permit Office:</span>{' '}
                  {city.localPermitAuthority}
                </div>
                <div>
                  <span className="font-semibold text-[#0F172A]">Common Systems:</span>{' '}
                  {city.dominantRoofMaterials.join(' · ')}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
              <button
                type="button"
                onClick={() => onSelectLocation(city.slug)}
                className="text-xs font-semibold text-[#D9532F] hover:underline flex items-center gap-1 cursor-pointer"
              >
                View {city.name} Roofers
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-2 text-[11px] text-[#475569]">
                <button
                  type="button"
                  onClick={() => onSelectServiceAndCity('roof-repair', city.slug)}
                  className="hover:text-[#0F172A] underline"
                >
                  Repair
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => onSelectServiceAndCity('tile-roofing', city.slug)}
                  className="hover:text-[#0F172A] underline"
                >
                  Tile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. ROOFING RESOURCE CENTER & ARTICLE READER (/resources/)
export const ResourcesView: React.FC<{
  selectedArticleSlug: string | null;
  onSelectArticle: (slug: string | null) => void;
  onNavigateHome: () => void;
  onSelectService: (serviceSlug: string) => void;
  onSelectLocation: (citySlug: string) => void;
}> = ({
  selectedArticleSlug,
  onSelectArticle,
  onNavigateHome,
  onSelectService,
  onSelectLocation
}) => {
  const activeArticle: ResourceArticle | undefined = RESOURCE_ARTICLES.find(
    (a) => a.slug === selectedArticleSlug
  );

  if (activeArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/', onClick: onNavigateHome },
            { label: 'Roofing Resources', path: '/resources/', onClick: () => onSelectArticle(null) },
            { label: activeArticle.title }
          ]}
          onNavigate={() => {}}
        />

        <article className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden mt-2">
          <div className="aspect-[16/9] max-h-[380px] w-full overflow-hidden bg-slate-900">
            <ResilientImage
              src={activeArticle.heroImage}
              alt={activeArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#475569] mb-3">
              <span className="font-semibold text-[#D9532F]">{activeArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>By {activeArticle.author} ({activeArticle.authorRole})</span>
              <span aria-hidden="true">·</span>
              <span>Updated {activeArticle.updatedDate}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{activeArticle.readTimeMinutes} min read</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] leading-tight">
              {activeArticle.title}
            </h1>

            {/* Key Takeaways Box */}
            <div className="mt-6 p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <h2 className="text-sm font-bold text-[#0F172A] mb-2.5">
                Key California Takeaways & Summary
              </h2>
              <ul className="space-y-2 text-xs text-[#475569]">
                {activeArticle.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Sections */}
            <div className="mt-8 space-y-6">
              {activeArticle.sections.map((sec, idx) => (
                <section key={idx}>
                  <h2 className="text-xl font-bold text-[#0F172A] mb-2">{sec.heading}</h2>
                  <p className="text-sm text-[#475569] leading-relaxed">{sec.body}</p>
                </section>
              ))}
            </div>

            {/* Internal Linking to Related Services & California Locations */}
            <div className="mt-10 pt-6 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <h3 className="font-bold text-[#0F172A] mb-2">Related California Roofing Services</h3>
                <div className="flex flex-wrap gap-2">
                  {activeArticle.relatedServices.map((srvSlug) => {
                    const srv = ROOFING_SERVICES.find((s) => s.slug === srvSlug);
                    return (
                      <button
                        key={srvSlug}
                        type="button"
                        onClick={() => onSelectService(srvSlug)}
                        className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#0F172A] font-semibold text-[#0F172A] cursor-pointer"
                      >
                        {srv ? srv.name : srvSlug} →
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[#0F172A] mb-2">Compare Contractors in These Cities</h3>
                <div className="flex flex-wrap gap-2">
                  {activeArticle.relatedLocations.map((locSlug) => {
                    const loc = CALIFORNIA_LOCATIONS.find((l) => l.slug === locSlug);
                    return (
                      <button
                        key={locSlug}
                        type="button"
                        onClick={() => onSelectLocation(locSlug)}
                        className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] hover:border-[#0F172A] font-semibold text-[#0F172A] cursor-pointer"
                      >
                        {loc ? `${loc.name}, CA` : locSlug} →
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/', onClick: onNavigateHome },
          { label: 'California Roofing Resource Center (/resources/)' }
        ]}
        onNavigate={() => {}}
      />

      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-8 mt-2 mb-8">
        <div className="text-xs font-semibold text-[#D9532F] mb-1">
          Consumer & Commercial Educational Guides
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A]">
          California Roofing Cost, Licensing & Material Guides
        </h1>
        <p className="mt-2 text-sm text-[#475569] max-w-3xl">
          Written specifically for California property owners navigating Title 24 Cool Roof standards, CSLB C-39 contractor verification, Spanish clay tile underlayment relays, and wildfire zone assemblies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESOURCE_ARTICLES.map((art) => (
          <article
            key={art.slug}
            onClick={() => onSelectArticle(art.slug)}
            className="group bg-white border border-[#E2E8F0] hover:border-[#0F172A] rounded-xl overflow-hidden flex flex-col justify-between transition-colors cursor-pointer"
          >
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                <ResilientImage
                  src={art.heroImage}
                  alt={art.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-[#475569] mb-2">
                  <span className="font-semibold text-[#D9532F]">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{art.readTimeMinutes} min read</span>
                </div>
                <h2 className="text-base font-bold text-[#0F172A] group-hover:text-[#D9532F] transition-colors">
                  {art.title}
                </h2>
                <p className="mt-2 text-xs text-[#475569] leading-relaxed">{art.excerpt}</p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0F172A]">
              <span>Read Full Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

// 3. ABOUT, E-E-A-T TRUST STANDARDS & EDITORIAL POLICY (/about/)
export const AboutTrustView: React.FC<{
  onNavigateHome: () => void;
  onListYourCompany: () => void;
}> = ({ onNavigateHome, onListYourCompany }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/', onClick: onNavigateHome },
          { label: 'About CalRoof Directory & E-E-A-T Editorial Policy' }
        ]}
        onNavigate={() => {}}
      />

      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 md:p-10 mt-2 space-y-8">
        <div>
          <div className="text-xs font-semibold text-[#D9532F] mb-1">
            California’s Niche Roofing Company Directory
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A]">
            Built Exclusively for California Homeowners & C-39 Roofing Contractors
          </h1>
          <p className="mt-3 text-sm text-[#475569] leading-relaxed">
            CalRoof Directory was designed to solve two fundamental problems: helping California property owners evaluate legitimate, properly licensed roofing contractors without having their contact information auctioned to telemarketers, and giving reputable California roofing companies an authoritative industry platform to showcase their craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <h2 className="text-base font-bold text-[#0F172A] mb-2">
              Business Verification Policy (No Unsupported Claims)
            </h2>
            <p className="text-xs text-[#475569] leading-relaxed">
              We never label every contractor as “Best” or “Trusted” without a transparent methodology. Companies earning the <strong>Verified Business</strong> designation have documented an active California Contractors State License Board (CSLB) Class C-39 Roofing classification, active Workers’ Compensation coverage, and a verified California operating address.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <h2 className="text-base font-bold text-[#0F172A] mb-2">
              Review Authenticity & Anti-Spam Policy
            </h2>
            <p className="text-xs text-[#475569] leading-relaxed">
              Every submitted review requires the homeowner to specify the California city and the exact roofing service performed (e.g., Spanish tile lift-and-relay, TPO membrane, or shingle replacement). Business owners can post public responses, and suspicious velocity spikes or competitor attacks are quarantined by our moderation queue.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#0F172A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Own a Licensed California Roofing Company?</h3>
            <p className="text-xs text-slate-300 mt-1">
              Claim or create your company profile in under 4 minutes.
            </p>
          </div>
          <button
            type="button"
            onClick={onListYourCompany}
            className="px-5 py-2.5 rounded-lg bg-[#D9532F] text-white text-xs font-semibold hover:bg-[#c04422] whitespace-nowrap cursor-pointer"
          >
            List Your Roofing Company
          </button>
        </div>
      </div>
    </div>
  );
};
