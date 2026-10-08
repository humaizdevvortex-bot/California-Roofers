import React, { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import {
  SAMPLE_BUSINESSES,
  RoofingBusiness,
  LeadSubmission,
  ReviewItem
} from './data/californiaRoofingData';
import { HomeView } from './components/HomeView';
import { DirectorySearchView } from './components/DirectorySearchView';
import { BusinessProfileView } from './components/BusinessProfileView';
import {
  BusinessSignupView,
  BusinessOwnerDashboardView,
  AdminDashboardView
} from './components/PlatformFlowsView';
import {
  LocationsHubView,
  ResourcesView,
  AboutTrustView
} from './components/ContentViews';
import { WordPressExportView } from './components/WordPressExportView';
import {
  BrandLogo,
  QuoteRequestModal,
  VerificationPolicyModal
} from './components/SharedComponents';

type ActiveRoute =
  | { view: 'home' }
  | { view: 'directory'; serviceSlug?: string; citySlug?: string; keyword?: string }
  | { view: 'profile'; businessSlug: string }
  | { view: 'locations-hub' }
  | { view: 'resources'; articleSlug: string | null }
  | { view: 'for-companies' }
  | { view: 'owner-dashboard' }
  | { view: 'admin-dashboard' }
  | { view: 'wp-export' }
  | { view: 'about' };

export default function App() {
  const [businesses, setBusinesses] = useState<RoofingBusiness[]>(SAMPLE_BUSINESSES);
  const [route, setRoute] = useState<ActiveRoute>({ view: 'home' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteModalBusiness, setQuoteModalBusiness] = useState<RoofingBusiness | null>(null);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);

  const [leads, setLeads] = useState<LeadSubmission[]>([
    {
      id: 'lead-101',
      businessId: 'biz-1',
      businessName: 'Pacific Crest Roofing Systems',
      consumerName: 'Arthur Pendelton (Demo Inquiry)',
      phone: '(310) 555-0182',
      email: 'arthur.p@example.com',
      zipCode: '90025',
      serviceNeeded: 'Tile Roofing',
      propertyType: 'Residential',
      message: '2,600 sq ft Spanish Revival home in Brentwood needing two-layer synthetic underlayment lift and relay.',
      preferredContact: 'Phone Call',
      createdAt: '2 hours ago',
      status: 'New'
    },
    {
      id: 'lead-102',
      businessId: 'biz-1',
      businessName: 'Pacific Crest Roofing Systems',
      consumerName: 'Westside Medical Plaza HOA (Demo)',
      phone: '(310) 555-0119',
      email: 'facilities@westsidemed-demo.example.com',
      zipCode: '90404',
      serviceNeeded: 'Commercial Roofing',
      propertyType: 'Commercial',
      message: 'Requesting Title 24 60-mil TPO replacement bid for 18,500 sq ft flat medical roof.',
      preferredContact: 'Email',
      createdAt: '1 day ago',
      status: 'Estimate Scheduled'
    }
  ]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (newRoute: ActiveRoute) => {
    setRoute(newRoute);
    setMobileMenuOpen(false);
    scrollToTop();
  };

  const handleSubmitLead = (
    leadData: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>
  ) => {
    const newLead: LeadSubmission = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: 'Just now',
      status: 'New'
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = (
    leadId: string,
    status: LeadSubmission['status']
  ) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );
  };

  const handleAddReview = (
    businessId: string,
    review: Omit<ReviewItem, 'id' | 'date'>
  ) => {
    const newRev: ReviewItem = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'October 2026'
    };
    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id !== businessId) return b;
        const updatedReviews = [newRev, ...b.reviews];
        const newCount = b.reviewCount + 1;
        const newRating = Number(
          ((b.rating * b.reviewCount + review.rating) / newCount).toFixed(1)
        );
        return {
          ...b,
          reviews: updatedReviews,
          reviewCount: newCount,
          rating: newRating
        };
      })
    );
  };

  const handleCreateBusiness = (newBiz: RoofingBusiness) => {
    setBusinesses((prev) => [newBiz, ...prev]);
  };

  const handleToggleVerification = (bizId: string) => {
    setBusinesses((prev) =>
      prev.map((b) =>
        b.id === bizId
          ? {
              ...b,
              verificationBadge:
                b.verificationBadge === 'Verified Business'
                  ? 'Claimed Profile'
                  : 'Verified Business'
            }
          : b
      )
    );
  };

  const handleToggleFeatured = (bizId: string) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === bizId ? { ...b, isFeatured: !b.isFeatured } : b))
    );
  };

  const activeProfileBusiness =
    route.view === 'profile'
      ? businesses.find((b) => b.slug === route.businessSlug) || businesses[0]
      : null;

  return (
    <div className="min-h-screen w-full flex flex-col text-[#0F172A] bg-[#FAF9F6]">
      {/* 100% FULL-WIDTH EDGE-TO-EDGE GLASS HEADER (ZERO BOX MARGINS) */}
      <header className="sticky top-0 z-30 w-full bg-[#0F141C]/90 backdrop-blur-xl border-b border-white/10 text-white">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between gap-6">
          {/* Zone 1: Brand Logo */}
          <button
            type="button"
            onClick={() => navigateTo({ view: 'home' })}
            className="whitespace-nowrap shrink-0 cursor-pointer"
          >
            <BrandLogo darkText={false} />
          </button>

          {/* Zone 2: Open Full-Width Navigation Links */}
          <nav className="hidden lg:flex items-center gap-9 text-[15px] font-normal text-slate-300">
            <button
              type="button"
              onClick={() => navigateTo({ view: 'directory' })}
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
                route.view === 'directory' && !route.serviceSlug ? 'text-[#FF7A59] font-medium' : ''
              }`}
            >
              Find Roofers
            </button>
            <button
              type="button"
              onClick={() => navigateTo({ view: 'directory', serviceSlug: 'roof-replacement' })}
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
                route.view === 'directory' && route.serviceSlug ? 'text-[#FF7A59] font-medium' : ''
              }`}
            >
              Roofing Services
            </button>
            <button
              type="button"
              onClick={() => navigateTo({ view: 'locations-hub' })}
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
                route.view === 'locations-hub' ? 'text-[#FF7A59] font-medium' : ''
              }`}
            >
              California Cities
            </button>
            <button
              type="button"
              onClick={() => navigateTo({ view: 'resources', articleSlug: null })}
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
                route.view === 'resources' ? 'text-[#FF7A59] font-medium' : ''
              }`}
            >
              Cost Guides
            </button>
            <button
              type="button"
              onClick={() => navigateTo({ view: 'wp-export' })}
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
                route.view === 'wp-export' ? 'text-[#FF7A59] font-medium' : ''
              }`}
            >
              WordPress & Elementor Kit
            </button>
          </nav>

          {/* Zone 3: Action Buttons */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => navigateTo({ view: 'wp-export' })}
              className="px-4 py-2.5 text-slate-200 hover:text-[#FF7A59] text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#FF7A59]" />
              6-Page WP Kit
            </button>
            <button
              type="button"
              onClick={() => navigateTo({ view: 'for-companies' })}
              className="px-6 py-2.5 rounded-full bg-[#D9532F] hover:bg-[#e06342] text-white text-sm font-medium transition-all whitespace-nowrap cursor-pointer"
            >
              List Your Company
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Full-Width Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-[#0F141C] border-b border-white/10 px-6 py-6 space-y-3 text-base font-normal text-white">
            <button
              type="button"
              onClick={() => navigateTo({ view: 'directory' })}
              className="block w-full text-left py-2"
            >
              California Contractor Directory
            </button>
            <button
              type="button"
              onClick={() => navigateTo({ view: 'directory', serviceSlug: 'roof-replacement' })}
              className="block w-full text-left py-2"
            >
              Roofing Systems & Services
            </button>
            <button
              type="button"
              onClick={() => navigateTo({ view: 'locations-hub' })}
              className="block w-full text-left py-2"
            >
              California Cities
            </button>
            <button
              type="button"
              onClick={() => navigateTo({ view: 'resources', articleSlug: null })}
              className="block w-full text-left py-2"
            >
              Cost & Title 24 Guides
            </button>
            <button
              type="button"
              onClick={() => navigateTo({ view: 'wp-export' })}
              className="block w-full text-left py-2 text-[#FF7A59]"
            >
              Download 6-Page WordPress & Elementor Kit
            </button>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigateTo({ view: 'for-companies' })}
                className="w-full py-3 rounded-full bg-[#D9532F] text-white text-sm text-center font-medium"
              >
                List Your Roofing Company
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN VIEWPORT CONTENT */}
      <main className="flex-1">
        {route.view === 'home' && (
          <HomeView
            businesses={businesses}
            onSearchSubmit={(serviceQuery, locationQuery) => {
              const matchedService =
                serviceQuery.toLowerCase().includes('repair')
                  ? 'roof-repair'
                  : serviceQuery.toLowerCase().includes('replace')
                  ? 'roof-replacement'
                  : serviceQuery.toLowerCase().includes('tile')
                  ? 'tile-roofing'
                  : serviceQuery.toLowerCase().includes('metal')
                  ? 'metal-roofing'
                  : serviceQuery.toLowerCase().includes('flat') ||
                    serviceQuery.toLowerCase().includes('tpo')
                  ? 'flat-roofing'
                  : serviceQuery.toLowerCase().includes('commercial')
                  ? 'commercial-roofing'
                  : '';

              const matchedCity =
                locationQuery.toLowerCase().includes('los angeles') || locationQuery === '90025'
                  ? 'los-angeles'
                  : locationQuery.toLowerCase().includes('san diego') || locationQuery === '92121'
                  ? 'san-diego'
                  : locationQuery.toLowerCase().includes('san jose') || locationQuery === '95112'
                  ? 'san-jose'
                  : locationQuery.toLowerCase().includes('sacramento') || locationQuery === '95819'
                  ? 'sacramento'
                  : locationQuery.toLowerCase().includes('san francisco')
                  ? 'san-francisco'
                  : locationQuery.toLowerCase().includes('irvine')
                  ? 'irvine'
                  : locationQuery.toLowerCase().includes('oakland')
                  ? 'oakland'
                  : '';

              const combinedKeyword =
                !matchedService && !matchedCity
                  ? `${serviceQuery} ${locationQuery}`.trim()
                  : '';

              navigateTo({
                view: 'directory',
                serviceSlug: matchedService,
                citySlug: matchedCity,
                keyword: combinedKeyword
              });
            }}
            onSelectService={(srvSlug) =>
              navigateTo({ view: 'directory', serviceSlug: srvSlug })
            }
            onSelectLocation={(citySlug) =>
              navigateTo({ view: 'directory', citySlug })
            }
            onViewAllLocations={() => navigateTo({ view: 'locations-hub' })}
            onViewAllCompanies={() => navigateTo({ view: 'directory' })}
            onViewProfile={(slug) =>
              navigateTo({ view: 'profile', businessSlug: slug })
            }
            onRequestQuote={(biz) => setQuoteModalBusiness(biz)}
            onListYourCompany={() => navigateTo({ view: 'for-companies' })}
            onSelectArticle={(slug) =>
              navigateTo({ view: 'resources', articleSlug: slug })
            }
            onOpenVerificationModal={() => setVerificationModalOpen(true)}
            onOpenWordPressKit={() => navigateTo({ view: 'wp-export' })}
          />
        )}

        {route.view === 'directory' && (
          <DirectorySearchView
            businesses={businesses}
            initialServiceSlug={route.serviceSlug}
            initialCitySlug={route.citySlug}
            initialKeyword={route.keyword}
            onViewProfile={(slug) =>
              navigateTo({ view: 'profile', businessSlug: slug })
            }
            onRequestQuote={(biz) => setQuoteModalBusiness(biz)}
            onSelectService={(srvSlug) =>
              navigateTo({
                view: 'directory',
                serviceSlug: srvSlug,
                citySlug: route.citySlug
              })
            }
            onSelectLocation={(citySlug) =>
              navigateTo({
                view: 'directory',
                citySlug,
                serviceSlug: route.serviceSlug
              })
            }
            onResetToDirectoryRoot={() => navigateTo({ view: 'directory' })}
            onNavigateHome={() => navigateTo({ view: 'home' })}
            onOpenVerificationModal={() => setVerificationModalOpen(true)}
          />
        )}

        {route.view === 'profile' && activeProfileBusiness && (
          <BusinessProfileView
            business={activeProfileBusiness}
            allBusinesses={businesses}
            onNavigateHome={() => navigateTo({ view: 'home' })}
            onNavigateDirectory={() => navigateTo({ view: 'directory' })}
            onSelectCity={(citySlug) =>
              navigateTo({ view: 'directory', citySlug })
            }
            onSelectService={(srvSlug) =>
              navigateTo({ view: 'directory', serviceSlug: srvSlug })
            }
            onViewProfile={(slug) =>
              navigateTo({ view: 'profile', businessSlug: slug })
            }
            onRequestQuote={(biz) => setQuoteModalBusiness(biz)}
            onSubmitLead={handleSubmitLead}
            onAddReview={handleAddReview}
            onOpenVerificationModal={() => setVerificationModalOpen(true)}
          />
        )}

        {route.view === 'locations-hub' && (
          <LocationsHubView
            onNavigateHome={() => navigateTo({ view: 'home' })}
            onSelectLocation={(citySlug) =>
              navigateTo({ view: 'directory', citySlug })
            }
            onSelectServiceAndCity={(serviceSlug, citySlug) =>
              navigateTo({ view: 'directory', serviceSlug, citySlug })
            }
          />
        )}

        {route.view === 'resources' && (
          <ResourcesView
            selectedArticleSlug={route.articleSlug}
            onSelectArticle={(slug) =>
              navigateTo({ view: 'resources', articleSlug: slug })
            }
            onNavigateHome={() => navigateTo({ view: 'home' })}
            onSelectService={(srvSlug) =>
              navigateTo({ view: 'directory', serviceSlug: srvSlug })
            }
            onSelectLocation={(citySlug) =>
              navigateTo({ view: 'directory', citySlug })
            }
          />
        )}

        {route.view === 'for-companies' && (
          <BusinessSignupView
            onNavigateHome={() => navigateTo({ view: 'home' })}
            onCreateBusiness={handleCreateBusiness}
            onOpenOwnerDashboard={() => navigateTo({ view: 'owner-dashboard' })}
          />
        )}

        {route.view === 'owner-dashboard' && (
          <BusinessOwnerDashboardView
            businesses={businesses}
            leads={leads}
            onViewProfile={(slug) =>
              navigateTo({ view: 'profile', businessSlug: slug })
            }
            onUpdateLeadStatus={handleUpdateLeadStatus}
          />
        )}

        {route.view === 'admin-dashboard' && (
          <AdminDashboardView
            businesses={businesses}
            onToggleVerification={handleToggleVerification}
            onToggleFeatured={handleToggleFeatured}
            onViewProfile={(slug) =>
              navigateTo({ view: 'profile', businessSlug: slug })
            }
          />
        )}

        {route.view === 'wp-export' && (
          <WordPressExportView
            onNavigateHome={() => navigateTo({ view: 'home' })}
          />
        )}

        {route.view === 'about' && (
          <AboutTrustView
            onNavigateHome={() => navigateTo({ view: 'home' })}
            onListYourCompany={() => navigateTo({ view: 'for-companies' })}
          />
        )}
      </main>

      {/* COMPREHENSIVE CALIFORNIA ROOFING DIRECTORY FOOTER */}
      <footer className="w-full bg-[#0F141C] text-[#D6D1C7] border-t border-white/10">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
            {/* Brand & Positioning Column */}
            <div className="lg:col-span-1">
              <BrandLogo darkText={false} />
              <p className="mt-4 text-[#9E998E] leading-relaxed text-xs">
                California’s independent roofing contractor registry. Connecting property owners, HOA boards, and commercial facility managers with verified CSLB Class C-39 roofing firms across all 58 counties.
              </p>
            </div>

            {/* Column 1: Find Roofers */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#FDFCFB] mb-3">
                01 / Systems
              </h3>
              <ul className="space-y-2 text-[#9E998E] text-xs">
                <li>
                  <button
                    onClick={() => navigateTo({ view: 'directory' })}
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    All C-39 Roofing Firms
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      navigateTo({ view: 'directory', serviceSlug: 'roof-repair' })
                    }
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    Roof Leak & Storm Repair
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      navigateTo({ view: 'directory', serviceSlug: 'roof-replacement' })
                    }
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    Full Roof Replacement
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      navigateTo({ view: 'directory', serviceSlug: 'commercial-roofing' })
                    }
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    Commercial Single-Ply (TPO)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      navigateTo({ view: 'directory', serviceSlug: 'tile-roofing' })
                    }
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    Spanish Clay & Concrete Tile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      navigateTo({ view: 'directory', serviceSlug: 'metal-roofing' })
                    }
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    Standing Seam Metal
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: California Locations */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#FDFCFB] mb-3">
                02 / Municipalities
              </h3>
              <ul className="space-y-2 text-[#9E998E] text-xs">
                <li>
                  <button
                    onClick={() =>
                      navigateTo({ view: 'directory', citySlug: 'los-angeles' })
                    }
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    Los Angeles County
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      navigateTo({ view: 'directory', citySlug: 'san-diego' })
                    }
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    San Diego Municipality
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      navigateTo({ view: 'directory', citySlug: 'san-francisco' })
                    }
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    San Francisco Bay Area
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      navigateTo({ view: 'directory', citySlug: 'san-jose' })
                    }
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    San Jose & Silicon Valley
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      navigateTo({ view: 'directory', citySlug: 'sacramento' })
                    }
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    Sacramento Metro
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      navigateTo({ view: 'directory', citySlug: 'irvine' })
                    }
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    Orange County / Irvine
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo({ view: 'locations-hub' })}
                    className="text-[#E86F52] hover:underline font-mono uppercase tracking-wider cursor-pointer"
                  >
                    All CA Municipalities →
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: For Businesses */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#FDFCFB] mb-3">
                03 / Contractors
              </h3>
              <ul className="space-y-2 text-[#9E998E] text-xs">
                <li>
                  <button
                    onClick={() => navigateTo({ view: 'for-companies' })}
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    Register C-39 Firm Dossier
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo({ view: 'owner-dashboard' })}
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    Contractor Dispatch Portal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo({ view: 'admin-dashboard' })}
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    CSLB Governance & SEO Console
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo({ view: 'wp-export' })}
                    className="text-[#E86F52] hover:underline cursor-pointer"
                  >
                    6-Page WordPress Elementor Kit
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Company & Policies */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#FDFCFB] mb-3">
                04 / Governance
              </h3>
              <ul className="space-y-2 text-[#9E998E] text-xs">
                <li>
                  <button
                    onClick={() => navigateTo({ view: 'about' })}
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    About the Registry
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setVerificationModalOpen(true)}
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    CSLB C-39 Verification Protocol
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo({ view: 'resources', articleSlug: null })}
                    className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
                  >
                    Title 24 & Cost Briefings
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[#262523] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#7A756C]">
            <div>
              © {new Date().getFullYear()} CALROOF DIRECTORY · CALIFORNIA C-39 CONTRACTOR REGISTRY
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateTo({ view: 'owner-dashboard' })}
                className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
              >
                CONTRACTOR PORTAL
              </button>
              <span>/</span>
              <button
                onClick={() => navigateTo({ view: 'admin-dashboard' })}
                className="hover:text-[#FDFCFB] transition-colors cursor-pointer"
              >
                SEO & GOVERNANCE
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* GLOBAL MODALS */}
      <QuoteRequestModal
        business={quoteModalBusiness}
        onClose={() => setQuoteModalBusiness(null)}
        onSubmitLead={handleSubmitLead}
      />

      <VerificationPolicyModal
        isOpen={verificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
      />
    </div>
  );
}

