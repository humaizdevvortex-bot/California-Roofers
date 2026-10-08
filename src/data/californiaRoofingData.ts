import heroImage from '../assets/images/hero_california_roofing_1791405433982.jpg';
import tileRoofImg from '../assets/images/project_tile_roof_san_diego_1791405448972.jpg';
import metalRoofImg from '../assets/images/project_standing_seam_metal_1791405460416.jpg';
import commercialTpoImg from '../assets/images/project_commercial_tpo_flat_1791405472554.jpg';
import shingleRoofImg from '../assets/images/project_architectural_shingle_1791405482933.jpg';

export const ASSETS = {
  heroImage,
  tileRoofImg,
  metalRoofImg,
  commercialTpoImg,
  shingleRoofImg,
};

export interface ReviewItem {
  id: string;
  authorName: string;
  city: string;
  servicePerformed: string;
  rating: number;
  date: string;
  comment: string;
  verifiedProject: boolean;
  ownerResponse?: string;
}

export interface ProjectPhoto {
  id: string;
  url: string;
  caption: string;
  city: string;
  roofType: string;
}

export interface RoofingBusiness {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  logoInitials: string;
  primaryCity: string;
  citySlug: string;
  county: string;
  countySlug: string;
  zipCode: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  yearsInBusiness: number;
  foundedYear: number;
  cslbLicense: string; // Marked clearly as DEMO
  cslbStatus: 'Verified Active (Demo)' | 'Pending Verification (Demo)';
  workersCompStatus: 'Active Certificate on File (Demo)' | 'Exempt / Sole Proprietor (Demo)';
  generalLiabilityAmount: string;
  verificationBadge: 'Verified Business' | 'Claimed Profile' | 'Unclaimed';
  isFeatured: boolean;
  planTier: 'Free Listing' | 'Premium Listing' | 'Featured Partner';
  rating: number;
  reviewCount: number;
  residentialShare: number; // %
  commercialShare: number; // %
  emergency24Hr: boolean;
  title24CoolRoofCertified: boolean;
  services: string[]; // slugs
  serviceNames: string[];
  serviceAreas: string[]; // city names
  certifications: string[];
  businessHours: {
    mondayFriday: string;
    saturday: string;
    sunday: string;
  };
  photos: ProjectPhoto[];
  reviews: ReviewItem[];
  faqs: { question: string; answer: string }[];
  profileCompletion: number;
}

export interface RoofingServiceInfo {
  slug: string;
  name: string;
  shortName: string;
  category: 'Core' | 'Material' | 'Specialty';
  shortSummary: string;
  whatItInvolves: string;
  whenHomeownersNeedIt: string[];
  californiaConsiderations: string;
  averageCostRangeCA: string;
  typicalLifespanYears: string;
  contractorChecklist: string[];
  faqs: { question: string; answer: string }[];
}

export interface CaliforniaLocation {
  slug: string;
  name: string;
  county: string;
  countySlug: string;
  region: 'Southern California' | 'Bay Area' | 'Central Valley' | 'Sacramento Metro';
  climateZoneSummary: string;
  dominantRoofMaterials: string[];
  localPermitAuthority: string;
  businessCount: number;
  isIndexable: boolean;
  seoIntro: string;
}

export interface ResourceArticle {
  slug: string;
  title: string;
  category: 'Roofing Costs' | 'Contractor Selection' | 'California Roofing' | 'Roofing Materials' | 'Roof Replacement';
  author: string;
  authorRole: string;
  publishedDate: string;
  updatedDate: string;
  readTimeMinutes: number;
  heroImage: string;
  excerpt: string;
  keyTakeaways: string[];
  sections: { heading: string; body: string }[];
  relatedServices: string[];
  relatedLocations: string[];
}

export interface LeadSubmission {
  id: string;
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
  createdAt: string;
  status: 'New' | 'Contacted' | 'Estimate Scheduled';
}

export const ROOFING_SERVICES: RoofingServiceInfo[] = [
  {
    slug: 'roof-repair',
    name: 'Roof Repair',
    shortName: 'Roof Repair',
    category: 'Core',
    shortSummary: 'Targeted leak diagnostics, flashing restoration, broken tile replacement, and storm damage repairs across California.',
    whatItInvolves: 'Professional roof repair addresses localized water intrusion, deteriorated pipe boots, valley flashing corrosion, cracked clay or concrete tiles, and wind-lifted shingles without replacing the entire roof system. In California, repairs frequently involve replacing aged underlayment ("felt paper") beneath Spanish barrel tiles while salvaging and relaying the original clay tiles.',
    whenHomeownersNeedIt: [
      'Water stains appearing on interior ceilings after atmospheric river rainstorms',
      'Cracked, slipped, or displaced clay/concrete tiles along eaves and ridges',
      'Deteriorated mortar around chimneys, skylights, or solar array penetrations',
      'Granule accumulation in gutters indicating localized shingle wear'
    ],
    californiaConsiderations: 'California Title 24 Building Energy Efficiency Standards apply when repairs exceed a specific percentage of total roof area (often 50%), requiring Cool Roof CRRC-rated materials in designated climate zones.',
    averageCostRangeCA: '$650 – $3,800 (localized repair) · $4,200 – $8,500 (tile lift & relay section)',
    typicalLifespanYears: '5 – 15+ years depending on surrounding underlayment age',
    contractorChecklist: [
      'Confirm active CSLB C-39 Roofing license before authorizing roof access',
      'Ask for photo documentation of sub-tile underlayment and flashing condition',
      'Ensure replacement tiles or shingles match existing profile and Cool Roof rating',
      'Request written workmanship warranty on leak repairs (minimum 2 years)'
    ],
    faqs: [
      {
        question: 'Can you repair a clay tile roof without replacing all the tiles?',
        answer: 'Yes. In California, clay and concrete tiles often last 50+ years, while the asphalt or synthetic underlayment beneath them lasts 20–25 years. A qualified C-39 roofer can perform a localized or full "tile lift and relay," replacing the waterproof underlayment and flashings while reusing up to 90% of your existing tiles.'
      },
      {
        question: 'Do roof repairs require a building permit in California cities?',
        answer: 'Minor spot repairs ( typically under 100 sq. ft. or 1 roofing square) generally do not require a permit in most California jurisdictions, whereas structural decking repairs or large section relays require municipal inspection.'
      }
    ]
  },
  {
    slug: 'roof-replacement',
    name: 'Roof Replacement',
    shortName: 'Roof Replacement',
    category: 'Core',
    shortSummary: 'Full tear-off, Title 24 Cool Roof installation, structural decking inspection, and multi-decade warranty coverage.',
    whatItInvolves: 'A complete roof replacement includes tearing off existing roofing materials down to the structural wood sheathing (plywood or OSB), replacing dry-rot or termite-damaged decking, installing code-compliant synthetic underlayment, ice/water barriers at eaves, new galvanized or copper sheet metal flashings, ridge ventilation, and Title 24 Cool Roof certified outer materials.',
    whenHomeownersNeedIt: [
      'Asphalt shingle roof is 20–25+ years old with widespread curling or bald spots',
      'Tile roof underlayment has become brittle and leaks in multiple valleys',
      'Preparing residential roof structure prior to installing a rooftop solar PV system',
      'Insurance carrier non-renewal notice requiring documented roof replacement'
    ],
    californiaConsiderations: 'All California full roof replacements require a municipal building permit, mid-roof or nailing inspection, and compliance with California Energy Commission Title 24 Part 6 Cool Roof reflectance and thermal emittance requirements, plus Class A fire rating in Wildland-Urban Interface (WUI) zones.',
    averageCostRangeCA: '$14,500 – $34,000+ (depending on square footage, pitch, and material)',
    typicalLifespanYears: '25 – 50+ years depending on material system',
    contractorChecklist: [
      'Verify CSLB C-39 license and active Workers Compensation certificate',
      'Confirm the quote includes city permit fees and Title 24 Cool Roof certification paperwork',
      'Check per-sheet unit pricing for damaged plywood sheathing replacement',
      'Obtain unconditional lien releases upon progress payments'
    ],
    faqs: [
      {
        question: 'What is a Title 24 Cool Roof requirement in California?',
        answer: 'California Title 24 mandates that new and replacement roofs meet minimum solar reflectance and thermal emittance values rated by the Cool Roof Rating Council (CRRC) to reduce urban heat islands and cooling loads.'
      },
      {
        question: 'Should I replace my roof before installing solar panels?',
        answer: 'If your existing roof has less than 10–12 years of remaining underlayment life, replacing the roof (or at minimum performing a solar under-array re-roof) prior to mounting solar racking saves $4,000–$8,000 in future panel removal and reinstallation fees.'
      }
    ]
  },
  {
    slug: 'commercial-roofing',
    name: 'Commercial Roofing',
    shortName: 'Commercial',
    category: 'Core',
    shortSummary: 'TPO, PVC, EPDM single-ply membranes, elastomeric silicone coatings, and industrial flat roof maintenance.',
    whatItInvolves: 'Commercial roofing covers low-slope and flat roof assemblies for retail centers, warehouses, HOA multi-family complexes, medical offices, and industrial facilities. Solutions include heat-welded TPO and PVC single-ply membranes, modified bitumen, built-up roofing (BUR), and Title 24 reflective silicone or acrylic fluid-applied restoration coatings.',
    whenHomeownersNeedIt: [
      'Ponding water remaining on flat commercial deck more than 48 hours after rain',
      'Blistering, seam separation, or punctures around rooftop HVAC package units',
      'High summer warehouse cooling costs requiring CRRC high-reflectance white membrane',
      'Multi-family HOA reserve study calling for scheduled roof asset renewal'
    ],
    californiaConsiderations: 'California commercial low-slope roofs face strict Title 24 aged solar reflectance minimums (often >= 0.63) and South Coast AQMD low-VOC adhesive and coating regulations.',
    averageCostRangeCA: '$8.50 – $16.00 per sq. ft. (Single-Ply TPO/PVC) · $4.50 – $8.00 per sq. ft. (Silicone Restoration)',
    typicalLifespanYears: '20 – 30 years (with preventative maintenance program)',
    contractorChecklist: [
      'Verify minimum $2,000,000 commercial general liability insurance endorsement',
      'Confirm manufacturer-certified applicator status (GAF Commercial, Carlisle, Johns Manville, Sika)',
      'Request NDL (No Dollar Limit) manufacturer system warranty options',
      'Check AQMD VOC compliance for adhesives and coatings in Southern California'
    ],
    faqs: [
      {
        question: 'Can a commercial flat roof be coated instead of torn off?',
        answer: 'If the underlying insulation is dry (verified via infrared moisture scan) and seams are structurally sound, a fluid-applied silicone or acrylic elastomeric coating can extend roof life by 10–20 years at roughly half the cost of a full tear-off.'
      }
    ]
  },
  {
    slug: 'residential-roofing',
    name: 'Residential Roofing',
    shortName: 'Residential',
    category: 'Core',
    shortSummary: 'Architectural shingle, clay/concrete tile, synthetic slate, and steep-slope systems for California homes.',
    whatItInvolves: 'Complete residential roofing services tailored to single-family homes, townhomes, and coastal or hillside estates. Focuses on curb appeal, Class A fire protection, attic ventilation balance, and long-term weatherproofing.',
    whenHomeownersNeedIt: [
      'Home inspection report flagging roof age during real estate escrow',
      'Upgrading from old wood shake to Class A fire-rated tile or metal for insurance compliance',
      'Adding skylights, solar tubes, or attic ridge ventilation systems'
    ],
    californiaConsiderations: 'Most California municipalities prohibit untreated wood shake roofs and require Class A fire-rated assemblies, especially in Cal Fire Very High Fire Hazard Severity Zones (VHFHSZ).',
    averageCostRangeCA: '$14,000 – $38,000 depending on home size and roof material',
    typicalLifespanYears: '25 – 50+ years',
    contractorChecklist: [
      'Ensure Class A fire assembly documentation for home insurance underwriters',
      'Verify proper net free ventilation area (intake soffit/eave vents + exhaust ridge vents)'
    ],
    faqs: []
  },
  {
    slug: 'tile-roofing',
    name: 'Tile Roofing',
    shortName: 'Tile Roofing',
    category: 'Material',
    shortSummary: 'Spanish clay barrel tile, S-tile, flat concrete tile installations, and two-layer underlayment lift-and-relay.',
    whatItInvolves: 'Installation and restoration of authentic kiln-fired clay and concrete roof tiles—the signature architectural standard across Southern California, coastal communities, and Central Valley developments. Includes corrosion-resistant stainless or copper fasteners, bird-stop eave closures, and double-layer 40-lb or breathable synthetic underlayment.',
    whenHomeownersNeedIt: [
      'Original 20-year paper underlayment beneath intact concrete or clay tiles has failed',
      'Building a Spanish Revival, Mediterranean, or Monterey-style residence',
      'Replacing slipped or broken field and ridge cap tiles before winter rains'
    ],
    californiaConsiderations: 'Tile roofs are inherently heavy (900–1,100 lbs per square for standard weight). Converting from asphalt shingle to tile requires structural engineering verification of rafters and framing.',
    averageCostRangeCA: '$18,500 – $42,000 (New Tile System) · $11,500 – $22,000 (Tile Lift & Relay)',
    typicalLifespanYears: '50 – 75+ years (tiles) · 25 – 40 years (premium synthetic underlayment)',
    contractorChecklist: [
      'Ask whether the contractor installs two layers of underlayment or heavy-duty peel-and-stick in valleys',
      'Confirm use of galvanized, copper, or stainless steel flashing rather than thin aluminum'
    ],
    faqs: []
  },
  {
    slug: 'metal-roofing',
    name: 'Metal Roofing',
    shortName: 'Metal Roofing',
    category: 'Material',
    shortSummary: 'Standing seam architectural steel, aluminum coastal roofs, and Class A wildfire-resistant stone-coated steel.',
    whatItInvolves: 'Precision fabrication and installation of concealed-fastener standing seam metal panels (24-gauge PVDF Kynar 500 coated steel or marine-grade aluminum) and stone-coated steel systems that replicate tile or shake with lightweight seismic and wildfire performance.',
    whenHomeownersNeedIt: [
      'Home located in Sierra foothills, Malibu canyons, San Diego backcountry, or WUI wildfire zones',
      'Lightweight seismic structural requirement where heavy clay tile cannot be supported',
      'Installing clamp-on solar racking (S-5! clamps) with zero roof deck penetrations'
    ],
    californiaConsiderations: 'In High Fire Hazard Severity Zones, standing seam and stone-coated steel roofs offer non-combustible Class A protection with ember-resistant closed eaves.',
    averageCostRangeCA: '$22,000 – $48,000+',
    typicalLifespanYears: '40 – 70 years',
    contractorChecklist: [
      'Confirm 24-gauge minimum thickness for standing seam panels (avoid thin 29-gauge agricultural panels)',
      'Verify Kynar 500 / Hylar 5000 PVDF paint finish for UV fade resistance'
    ],
    faqs: []
  },
  {
    slug: 'flat-roofing',
    name: 'Flat Roofing',
    shortName: 'Flat Roofing',
    category: 'Material',
    shortSummary: 'Residential mid-century modern low-slope roofs, torch-down modified bitumen, TPO, and tapered drainage.',
    whatItInvolves: 'Specialized waterproofing for flat and low-slope residential and commercial structures (<2:12 pitch), including Eichler homes, coastal modern rooftop decks, and parapet-wall architecture. Utilizes tapered polyiso insulation crickets to eliminate ponding water.',
    whenHomeownersNeedIt: [
      'Alligator cracking or seam lifting on older cap-sheet or gravel built-up roofs',
      'Converting an uninsulated mid-century flat roof to a cool-roof insulated TPO assembly',
      'Waterproofing scuppers, internal drains, and parapet wall coping metal'
    ],
    californiaConsiderations: 'Flat roofs in sunny California experience intense UV thermal cycling; white CRRC-rated TPO or silicone topcoats drop roof surface temperatures by up to 50°F.',
    averageCostRangeCA: '$11,000 – $26,000',
    typicalLifespanYears: '20 – 30 years',
    contractorChecklist: [
      'Verify tapered insulation plan around scuppers and drains to prevent standing water',
      'Ensure flashings at parapet walls are terminated with counter-flashing or full coping cap'
    ],
    faqs: []
  },
  {
    slug: 'shingle-roofing',
    name: 'Shingle Roofing',
    shortName: 'Shingle Roofing',
    category: 'Material',
    shortSummary: 'Title 24 Cool Roof dimensional asphalt shingles, Class 4 impact resistance, and high-wind coastal nailing.',
    whatItInvolves: 'Installation of multi-layered architectural (dimensional) and luxury composition shingles engineered with solar-reflective granules to meet California Cool Roof standards without sacrificing rich, dark or earth-tone color palettes.',
    whenHomeownersNeedIt: [
      'Cost-effective, high-performance replacement for aging 3-tab or dimensional shingles',
      'Seeking Owens Corning Platinum or GAF Master Elite extended system warranties'
    ],
    californiaConsiderations: 'Standard non-cool shingles sold in other states often fail California Title 24 inspection; contractors must supply CRRC Product ID labels for the city inspector.',
    averageCostRangeCA: '$13,500 – $24,500',
    typicalLifespanYears: '25 – 35 years',
    contractorChecklist: [
      'Confirm CRRC Cool Roof compliance for your specific California Climate Zone (1–16)',
      'Verify starter strip shingle and matching high-profile ridge cap installation'
    ],
    faqs: []
  },
  {
    slug: 'roof-inspection',
    name: 'Roof Inspection & Certification',
    shortName: 'Roof Inspection',
    category: 'Specialty',
    shortSummary: 'NRCA-standard escrow roof certifications, insurance underwriting inspections, and infrared moisture diagnostics.',
    whatItInvolves: 'Comprehensive multi-point evaluation of roof coverings, flashings, penetrations, gutters, and attic structural framing/ventilation, complete with high-resolution photo reports and remaining useful life estimates.',
    whenHomeownersNeedIt: [
      'Buying or selling a California property requiring a 2-year or 3-year Roof Certification',
      'Homeowners insurance carrier requesting proof of roof condition and remaining life',
      'Post-windstorm or pre-rainy-season preventative checkup'
    ],
    californiaConsiderations: 'With tightening California homeowners insurance underwriting, a formal inspection report signed by a licensed C-39 contractor frequently prevents policy non-renewal.',
    averageCostRangeCA: '$225 – $495 (Inspection Report) · $350 – $650 (Escrow Certification)',
    typicalLifespanYears: '2 – 3 year certification validity',
    contractorChecklist: [
      'Ensure report includes timestamped photos of roof planes, flashings, and attic underside',
      'Confirm license number is printed on the official certification document for insurance underwriters'
    ],
    faqs: []
  },
  {
    slug: 'emergency-roofing',
    name: 'Emergency Roof Repair',
    shortName: 'Emergency Repair',
    category: 'Specialty',
    shortSummary: 'Rapid storm tarping, active leak mitigation, fallen tree impact stabilization, and 24/7 weatherproofing.',
    whatItInvolves: 'Immediate dispatch during California winter atmospheric rivers, Santa Ana wind events, or fallen limb impacts to stop active interior water damage using heavy-duty sandbagged or batten-secured tarps and emergency flashing seals.',
    whenHomeownersNeedIt: [
      'Active water dripping through ceiling drywall or light fixtures during a rainstorm',
      'High winds tearing off ridge caps or exposing bare roof sheathing',
      'Fallen eucalyptus or oak branch puncturing roof structure'
    ],
    californiaConsiderations: 'Emergency tarping prevents secondary mold growth and preserves insurance claim eligibility under standard policy duties to mitigate further damage.',
    averageCostRangeCA: '$450 – $1,600 (Emergency Tarping & Stabilization)',
    typicalLifespanYears: 'Temporary stabilization until dry-weather permanent repair',
    contractorChecklist: [
      'Avoid storm-chasing out-of-state operators; verify local California physical office and C-39 license',
      'Ensure itemized invoice and before/after photos are provided for insurance adjusters'
    ],
    faqs: []
  }
];

export const CALIFORNIA_LOCATIONS: CaliforniaLocation[] = [
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    county: 'Los Angeles County',
    countySlug: 'los-angeles-county',
    region: 'Southern California',
    climateZoneSummary: 'CEC Climate Zones 6, 8, 9 — Intense solar UV exposure, Santa Ana wind corridors, and hillside Very High Fire Hazard Severity Zones.',
    dominantRoofMaterials: ['Spanish Clay Tile', 'Title 24 Cool Shingles', 'Flat Roof TPO & Torch-Down', 'Standing Seam Metal'],
    localPermitAuthority: 'Los Angeles Department of Building and Safety (LADBS)',
    businessCount: 42,
    isIndexable: true,
    seoIntro: 'Compare licensed C-39 roofing contractors serving Los Angeles, from historic Spanish tile restorations in Hancock Park and Santa Monica to commercial cool-roof TPO installations across the San Fernando Valley and Downtown LA.'
  },
  {
    slug: 'san-diego',
    name: 'San Diego',
    county: 'San Diego County',
    countySlug: 'san-diego-county',
    region: 'Southern California',
    climateZoneSummary: 'CEC Climate Zones 7 & 10 — Marine layer coastal salt air corrosion near La Jolla/Coronado and arid inland heat in Poway/Escondido.',
    dominantRoofMaterials: ['Concrete & Clay S-Tile', 'Marine-Grade Standing Seam Metal', 'Cool Roof Dimensional Shingles'],
    localPermitAuthority: 'City of San Diego Development Services Department (DSD)',
    businessCount: 31,
    isIndexable: true,
    seoIntro: 'Find San Diego roofing companies experienced in coastal marine-grade flashing, Spanish mission tile lift-and-relay systems, and WUI Class A wildfire-resistant roofing for inland canyons.'
  },
  {
    slug: 'san-jose',
    name: 'San Jose',
    county: 'Santa Clara County',
    countySlug: 'santa-clara-county',
    region: 'Bay Area',
    climateZoneSummary: 'CEC Climate Zone 4 — Warm Silicon Valley summers and seasonal winter rain requiring high-efficiency attic ventilation and solar-ready roof decks.',
    dominantRoofMaterials: ['Solar-Ready Architectural Shingles', 'Concrete Flat Tile', 'Low-Slope Foam & TPO (Eichler Homes)'],
    localPermitAuthority: 'City of San Jose Planning, Building and Code Enforcement (PBCE)',
    businessCount: 24,
    isIndexable: true,
    seoIntro: 'Connect with San Jose and Silicon Valley roofing contractors specializing in solar-integrated re-roofing, mid-century Eichler low-slope systems, and commercial tech-campus waterproofing.'
  },
  {
    slug: 'san-francisco',
    name: 'San Francisco',
    county: 'San Francisco County',
    countySlug: 'san-francisco-county',
    region: 'Bay Area',
    climateZoneSummary: 'CEC Climate Zone 3 — Persistent coastal fog, wind-driven rain, and zero-lot-line Victorian/Edwardian flat and Mansard roof assemblies.',
    dominantRoofMaterials: ['Modified Bitumen & Built-Up Flat Roofs', 'Single-Ply PVC/TPO', 'Copper Flashing & Natural Slate'],
    localPermitAuthority: 'San Francisco Department of Building Inspection (DBI)',
    businessCount: 19,
    isIndexable: true,
    seoIntro: 'Browse San Francisco roofing specialists equipped for tight urban access, multi-unit HOA flat roofs, parapet coping waterproofing, and historic district architectural compliance.'
  },
  {
    slug: 'sacramento',
    name: 'Sacramento',
    county: 'Sacramento County',
    countySlug: 'sacramento-county',
    region: 'Sacramento Metro',
    climateZoneSummary: 'CEC Climate Zone 12 — Triple-digit Central Valley summer highs and heavy winter valley rainstorms demanding high CRRC solar reflectance.',
    dominantRoofMaterials: ['CRRC Cool Roof Shingles', 'Concrete Tile', 'Standing Seam Metal', 'Commercial Acrylic/Silicone Coatings'],
    localPermitAuthority: 'City of Sacramento Community Development Department',
    businessCount: 22,
    isIndexable: true,
    seoIntro: 'Evaluate Sacramento roofing contractors specializing in Title 24 Zone 12 high-reflectance Cool Roof replacements, concrete tile maintenance, and storm damage repairs across the capital region.'
  },
  {
    slug: 'fresno',
    name: 'Fresno',
    county: 'Fresno County',
    countySlug: 'fresno-county',
    region: 'Central Valley',
    climateZoneSummary: 'CEC Climate Zone 13 — Extreme summer thermal loads requiring maximum attic ventilation and reflective roofing assemblies.',
    dominantRoofMaterials: ['Cool Roof Composition Shingles', 'Concrete Tile', 'Agricultural & Commercial Metal/TPO'],
    localPermitAuthority: 'City of Fresno Planning and Development Department',
    businessCount: 14,
    isIndexable: true,
    seoIntro: 'Find licensed Fresno and Central Valley roofers delivering energy-efficient residential re-roofs and large-span commercial/agricultural roofing systems.'
  },
  {
    slug: 'long-beach',
    name: 'Long Beach',
    county: 'Los Angeles County',
    countySlug: 'los-angeles-county',
    region: 'Southern California',
    climateZoneSummary: 'CEC Climate Zone 6 — Coastal salt air exposure and high proportion of Belmont Shore Spanish homes and Cliff May ranch flat roofs.',
    dominantRoofMaterials: ['Clay Barrel Tile', 'Low-Slope Torch-Down & TPO', 'Coastal Dimensional Shingles'],
    localPermitAuthority: 'Long Beach Development Services',
    businessCount: 16,
    isIndexable: true,
    seoIntro: 'Discover Long Beach roofing contractors skilled in Cliff May mid-century flat roofs, Spanish clay tile underlayment relays, and coastal commercial roofing.'
  },
  {
    slug: 'oakland',
    name: 'Oakland',
    county: 'Alameda County',
    countySlug: 'alameda-county',
    region: 'Bay Area',
    climateZoneSummary: 'CEC Climate Zone 3 — East Bay hills wildfire WUI zones and varied Craftsman, Mediterranean, and industrial architecture.',
    dominantRoofMaterials: ['Class A Fire-Rated Shingles', 'Standing Seam Metal', 'Modified Bitumen Flat Roofs'],
    localPermitAuthority: 'Oakland Bureau of Building',
    businessCount: 15,
    isIndexable: true,
    seoIntro: 'Compare Oakland and East Bay roofing companies offering Class A wildfire-hardened roofs in the Oakland Hills and commercial flat roofing along the I-880 corridor.'
  },
  {
    slug: 'bakersfield',
    name: 'Bakersfield',
    county: 'Kern County',
    countySlug: 'kern-county',
    region: 'Central Valley',
    climateZoneSummary: 'CEC Climate Zone 13 — Prolonged desert-valley heat and strong seasonal gusting winds.',
    dominantRoofMaterials: ['High-Wind Cool Shingles', 'Concrete Tile', 'Elastomeric Commercial Roof Coatings'],
    localPermitAuthority: 'City of Bakersfield Building Division',
    businessCount: 11,
    isIndexable: true,
    seoIntro: 'Search Bakersfield roofing contractors providing wind-rated shingle replacements, tile roof repairs, and insulated commercial membranes.'
  },
  {
    slug: 'anaheim',
    name: 'Anaheim',
    county: 'Orange County',
    countySlug: 'orange-county',
    region: 'Southern California',
    climateZoneSummary: 'CEC Climate Zone 8 — Warm inland Orange County basin with Santa Ana canyon wind exposure in Anaheim Hills.',
    dominantRoofMaterials: ['Concrete S-Tile & Flat Tile', 'Stone-Coated Steel', 'Commercial TPO'],
    localPermitAuthority: 'City of Anaheim Building Division',
    businessCount: 18,
    isIndexable: true,
    seoIntro: 'Connect with Anaheim and Orange County roofing contractors for residential tile relays, Anaheim Hills ember-resistant re-roofs, and commercial industrial park roofing.'
  },
  {
    slug: 'santa-ana',
    name: 'Santa Ana',
    county: 'Orange County',
    countySlug: 'orange-county',
    region: 'Southern California',
    climateZoneSummary: 'CEC Climate Zone 8 — Historic Floral Park residential architecture and dense commercial/industrial business districts.',
    dominantRoofMaterials: ['Architectural Shingles', 'Spanish Tile', 'Commercial Single-Ply TPO'],
    localPermitAuthority: 'City of Santa Ana Planning and Building Agency',
    businessCount: 14,
    isIndexable: true,
    seoIntro: 'Find Santa Ana roofing specialists serving residential homeowners, multi-family HOAs, and Orange County commercial facilities.'
  },
  {
    slug: 'riverside',
    name: 'Riverside',
    county: 'Riverside County',
    countySlug: 'riverside-county',
    region: 'Southern California',
    climateZoneSummary: 'CEC Climate Zone 10 — Inland Empire high summer heat and seasonal Santa Ana wind events.',
    dominantRoofMaterials: ['Concrete & Clay Tile', 'Cool Roof Shingles', 'Industrial Logistics Warehouse TPO'],
    localPermitAuthority: 'City of Riverside Building & Safety Division',
    businessCount: 17,
    isIndexable: true,
    seoIntro: 'Compare Inland Empire and Riverside roofing contractors specializing in concrete tile underlayment replacement and large-scale logistics warehouse TPO roofing.'
  },
  {
    slug: 'stockton',
    name: 'Stockton',
    county: 'San Joaquin County',
    countySlug: 'san-joaquin-county',
    region: 'Central Valley',
    climateZoneSummary: 'CEC Climate Zone 12 — Delta breezes paired with hot Central Valley summers.',
    dominantRoofMaterials: ['Cool Roof Shingles', 'Concrete Tile', 'Commercial Metal & Single-Ply'],
    localPermitAuthority: 'City of Stockton Community Development Department',
    businessCount: 9,
    isIndexable: true,
    seoIntro: 'Browse licensed Stockton and San Joaquin County roofers for residential roof replacement, leak inspections, and commercial roof coatings.'
  },
  {
    slug: 'irvine',
    name: 'Irvine',
    county: 'Orange County',
    countySlug: 'orange-county',
    region: 'Southern California',
    climateZoneSummary: 'CEC Climate Zone 8 — Master-planned HOA communities with strict architectural committee tile standards and commercial tech corridors.',
    dominantRoofMaterials: ['Lightweight Concrete & Clay Tile', 'Synthetic Slate/Tile', 'Commercial Cool TPO'],
    localPermitAuthority: 'City of Irvine Community Development',
    businessCount: 21,
    isIndexable: true,
    seoIntro: 'Locate Irvine roofing contractors familiar with master-planned village HOA guidelines, Eagle and Boral tile profiles, and commercial R&D facility roofs.'
  },
  {
    slug: 'chula-vista',
    name: 'Chula Vista',
    county: 'San Diego County',
    countySlug: 'san-diego-county',
    region: 'Southern California',
    climateZoneSummary: 'CEC Climate Zones 7 & 10 — South Bay coastal influence transitioning to warm inland master-planned communities in Otay Ranch.',
    dominantRoofMaterials: ['Spanish Clay & Concrete Tile', 'Solar-Integrated Shingles', 'Flat Torch-Down'],
    localPermitAuthority: 'City of Chula Vista Development Services',
    businessCount: 12,
    isIndexable: true,
    seoIntro: 'Find Chula Vista and South Bay San Diego roofing companies for tile roof lift-and-relays, solar prep re-roofing, and leak repairs.'
  },
  {
    slug: 'alpine-meadows-unincorporated',
    name: 'Alpine Meadows (Unincorporated)',
    county: 'Placer County',
    countySlug: 'placer-county',
    region: 'Sacramento Metro',
    climateZoneSummary: 'CEC Climate Zone 16 — High Sierra snow load engineering requirement.',
    dominantRoofMaterials: ['Heavy Gauge Standing Seam Metal', 'Cold-Roof Ventilated Assemblies'],
    localPermitAuthority: 'Placer County Building Services',
    businessCount: 1,
    isIndexable: false, // Demonstrates Programmatic SEO Noindex safety rule (<3 businesses)
    seoIntro: 'Directory listing preview for Alpine Meadows. Held from search indexation until minimum verified contractor threshold (3+ active businesses) is met.'
  }
];

export const SAMPLE_BUSINESSES: RoofingBusiness[] = [
  {
    id: 'biz-1',
    slug: 'pacific-crest-roofing-systems',
    name: 'Pacific Crest Roofing Systems',
    tagline: 'Spanish Clay Tile, Title 24 Cool Roofs & Solar-Ready Re-Roofing in Southern California',
    shortDescription: 'Family-owned Los Angeles & Orange County roofing contractor specializing in historic Spanish tile lift-and-relays, Owens Corning Platinum shingle systems, and commercial TPO.',
    fullDescription: 'Founded in 2004, Pacific Crest Roofing Systems provides residential and commercial roofing across Greater Los Angeles and Orange County. Our in-house crews—never sub-brokered day labor—specialize in Spanish clay and concrete tile underlayment restoration, Title 24 Cool Roof dimensional shingle replacements, and heat-welded commercial TPO membranes. Every proposal includes a 38-point photographic deck and flashing inspection, city building permit coordination, and written workmanship coverage.',
    logoInitials: 'PC',
    primaryCity: 'Los Angeles',
    citySlug: 'los-angeles',
    county: 'Los Angeles County',
    countySlug: 'los-angeles-county',
    zipCode: '90025',
    address: '11840 W Olympic Blvd, Suite 210, Los Angeles, CA 90025 (Demo)',
    phone: '(310) 555-0194',
    website: 'https://pacificcrestroofing-demo.example.com',
    email: 'estimates@pacificcrestroofing-demo.example.com',
    yearsInBusiness: 22,
    foundedYear: 2004,
    cslbLicense: 'CSLB #894102 (C-39 Roofing — Demo Record)',
    cslbStatus: 'Verified Active (Demo)',
    workersCompStatus: 'Active Certificate on File (Demo)',
    generalLiabilityAmount: '$2,000,000 Occurrence / $4,000,000 Aggregate',
    verificationBadge: 'Verified Business',
    isFeatured: true,
    planTier: 'Featured Partner',
    rating: 4.9,
    reviewCount: 128,
    residentialShare: 70,
    commercialShare: 30,
    emergency24Hr: true,
    title24CoolRoofCertified: true,
    services: ['roof-replacement', 'roof-repair', 'tile-roofing', 'flat-roofing', 'commercial-roofing', 'roof-inspection'],
    serviceNames: ['Roof Replacement', 'Roof Repair', 'Tile Roofing', 'Flat Roofing', 'Commercial Roofing', 'Roof Inspection'],
    serviceAreas: ['Los Angeles', 'Santa Monica', 'Beverly Hills', 'Pasadena', 'Long Beach', 'Culver City', 'Torrance', 'Irvine', 'Anaheim'],
    certifications: [
      'CA CSLB Class C-39 Roofing Classification (Demo)',
      'Owens Corning Platinum Preferred Contractor (Demo)',
      'Tile Roofing Industry (TRI) Alliance High-Wind Certified (Demo)',
      'CRRC Title 24 Cool Roof Compliance Specialist'
    ],
    businessHours: {
      mondayFriday: '7:00 AM – 6:00 PM',
      saturday: '8:00 AM – 2:00 PM',
      sunday: 'Emergency Leak Dispatch Only'
    },
    photos: [
      {
        id: 'ph-1',
        url: tileRoofImg,
        caption: 'Two-layer synthetic underlayment lift-and-relay with salvaged 1928 Spanish clay barrel tiles and 16oz copper valley flashing.',
        city: 'Los Angeles (Hancock Park)',
        roofType: 'Spanish Clay Barrel Tile'
      },
      {
        id: 'ph-2',
        url: commercialTpoImg,
        caption: '60-mil GAF EverGuard TPO cool roof membrane installation with tapered polyiso crickets around 14 HVAC curbs.',
        city: 'Torrance, CA',
        roofType: 'Commercial TPO Membrane'
      }
    ],
    reviews: [
      {
        id: 'rev-101',
        authorName: 'Marcus Vance (Demo Homeowner)',
        city: 'Los Angeles, CA',
        servicePerformed: 'Tile Roof Lift & Relay + Copper Flashing',
        rating: 5,
        date: 'August 2026',
        comment: 'Our 1930s Spanish home in Westwood had two active valley leaks. Pacific Crest lifted all existing clay tiles, replaced 18 sheets of dry-rotted plywood, installed two layers of breathable synthetic underlayment, and relayed our original tiles while sourcing matching vintage tiles for the 8% breakage. Passed LADBS inspection on the first visit.',
        verifiedProject: true,
        ownerResponse: 'Thank you, Marcus! Preserving original 1930s clay tile while upgrading the concealed waterproofing and copper valleys is our favorite type of restoration work.'
      },
      {
        id: 'rev-102',
        authorName: 'Elena Rostova (Demo Property Manager)',
        city: 'Long Beach, CA',
        servicePerformed: 'Commercial Flat Roof TPO Replacement',
        rating: 5,
        date: 'June 2026',
        comment: 'Managed a 28,000 sq. ft. medical office re-roof in Long Beach without disrupting ground-floor clinic tenants. Clean daily magnet sweeps, full Title 24 documentation, and zero ponding after the first rain.',
        verifiedProject: true
      }
    ],
    faqs: [
      {
        question: 'Do you pull LADBS and municipal permits for every full roof replacement?',
        answer: 'Yes. We handle all permit applications, LADBS mid-roof nailing/sheathing inspections, final inspections, and Title 24 Cool Roof CRRC certificate filings as part of every replacement contract.'
      },
      {
        question: 'Do you subcontract your roofing installations?',
        answer: 'Never. All tear-off, carpentry, sheet metal flashing, and installation personnel are W-2 employees covered under our California Workers Compensation policy.'
      }
    ],
    profileCompletion: 98
  },
  {
    id: 'biz-2',
    slug: 'san-diego-mission-tile-metal',
    name: 'San Diego Mission Tile & Metal Roofing',
    tagline: 'Coastal Marine-Grade Standing Seam Metal & Spanish Tile Craftsmanship',
    shortDescription: 'San Diego County C-39 contractor specializing in salt-air resistant standing seam aluminum/steel roofs, Spanish clay tile relays, and WUI Class A wildfire protection.',
    fullDescription: 'San Diego Mission Tile & Metal Roofing serves coastal and inland San Diego County from Chula Vista and Coronado up to Carlsbad and Escondido. We engineer roof assemblies specifically for Southern California microclimates: marine-grade PVDF aluminum and stainless steel fasteners within 3,000 feet of the Pacific coastline, and Class A ember-resistant stone-coated steel and clay tile systems for inland foothills.',
    logoInitials: 'SD',
    primaryCity: 'San Diego',
    citySlug: 'san-diego',
    county: 'San Diego County',
    countySlug: 'san-diego-county',
    zipCode: '92121',
    address: '9450 Scranton Rd, Suite 114, San Diego, CA 92121 (Demo)',
    phone: '(619) 555-0148',
    website: 'https://sdmissionroofing-demo.example.com',
    email: 'info@sdmissionroofing-demo.example.com',
    yearsInBusiness: 18,
    foundedYear: 2008,
    cslbLicense: 'CSLB #931480 (C-39 Roofing — Demo Record)',
    cslbStatus: 'Verified Active (Demo)',
    workersCompStatus: 'Active Certificate on File (Demo)',
    generalLiabilityAmount: '$2,000,000 Occurrence',
    verificationBadge: 'Verified Business',
    isFeatured: true,
    planTier: 'Featured Partner',
    rating: 4.9,
    reviewCount: 94,
    residentialShare: 85,
    commercialShare: 15,
    emergency24Hr: false,
    title24CoolRoofCertified: true,
    services: ['tile-roofing', 'metal-roofing', 'roof-replacement', 'roof-repair', 'residential-roofing', 'roof-inspection'],
    serviceNames: ['Tile Roofing', 'Metal Roofing', 'Roof Replacement', 'Roof Repair', 'Residential Roofing', 'Roof Inspection'],
    serviceAreas: ['San Diego', 'Chula Vista', 'La Jolla', 'Carlsbad', 'Encinitas', 'Poway', 'Escondido', 'Del Mar'],
    certifications: [
      'CA CSLB Class C-39 Roofing Classification (Demo)',
      'Eagle & Westlake Royal Tile Certified Installer (Demo)',
      'Cal Fire WUI Class A Assembly Specialist'
    ],
    businessHours: {
      mondayFriday: '7:30 AM – 5:30 PM',
      saturday: '8:30 AM – 1:00 PM',
      sunday: 'Closed'
    },
    photos: [
      {
        id: 'ph-3',
        url: tileRoofImg,
        caption: 'Custom two-piece Mission clay barrel tile installation with custom copper eave closures and concealed valley metal.',
        city: 'San Diego (Point Loma)',
        roofType: 'Clay Mission Tile'
      },
      {
        id: 'ph-4',
        url: metalRoofImg,
        caption: '24-gauge matte charcoal standing seam metal roof with S-5! non-penetrating solar mounting clamps.',
        city: 'Poway, CA',
        roofType: 'Standing Seam Metal'
      }
    ],
    reviews: [
      {
        id: 'rev-201',
        authorName: 'David & Sarah Chen (Demo Homeowner)',
        city: 'San Diego, CA',
        servicePerformed: 'Standing Seam Metal Roof + Solar Prep',
        rating: 5,
        date: 'September 2026',
        comment: 'Our insurers threatened non-renewal on our canyon-rim home due to an aging 24-year shingle roof. San Diego Mission installed a Class A standing seam metal roof with ember-mesh vents, and our solar installer clamped directly to the seams without drilling a single hole.',
        verifiedProject: true
      }
    ],
    faqs: [
      {
        question: 'What roofing materials hold up best near the San Diego coastline?',
        answer: 'Within one mile of the surf line, galvanized steel flashings corrode prematurely. We specify 0.032 aluminum with Kynar 500 finish or 16oz copper flashings paired with stainless steel ring-shank fasteners.'
      }
    ],
    profileCompletion: 95
  },
  {
    id: 'biz-3',
    slug: 'bay-area-architectural-roofing',
    name: 'Bay Area Architectural & Eichler Roofing',
    tagline: 'Silicon Valley Solar-Ready Re-Roofs, Standing Seam Metal & Mid-Century Flat Roofs',
    shortDescription: 'Serving San Jose, San Francisco, and Oakland with insulated low-slope Eichler roofing, standing seam metal, and Title 24 architectural shingle systems.',
    fullDescription: 'Headquartered in San Jose with a secondary dispatch yard in Oakland, Bay Area Architectural & Eichler Roofing serves homeowners and commercial building owners across all nine Bay Area counties. We are recognized specialists in insulated low-slope foam and single-ply TPO systems for mid-century modern Eichler homes, as well as wildfire-resilient Class A metal and dimensional shingle roofs in the East Bay and Peninsula hills.',
    logoInitials: 'BA',
    primaryCity: 'San Jose',
    citySlug: 'san-jose',
    county: 'Santa Clara County',
    countySlug: 'santa-clara-county',
    zipCode: '95112',
    address: '1420 Industrial Ave, San Jose, CA 95112 (Demo)',
    phone: '(408) 555-0172',
    website: 'https://bayarearoofing-demo.example.com',
    email: 'projects@bayarearoofing-demo.example.com',
    yearsInBusiness: 16,
    foundedYear: 2010,
    cslbLicense: 'CSLB #958214 (C-39 Roofing — Demo Record)',
    cslbStatus: 'Verified Active (Demo)',
    workersCompStatus: 'Active Certificate on File (Demo)',
    generalLiabilityAmount: '$2,000,000 Occurrence',
    verificationBadge: 'Verified Business',
    isFeatured: true,
    planTier: 'Featured Partner',
    rating: 4.8,
    reviewCount: 112,
    residentialShare: 75,
    commercialShare: 25,
    emergency24Hr: true,
    title24CoolRoofCertified: true,
    services: ['flat-roofing', 'metal-roofing', 'shingle-roofing', 'roof-replacement', 'commercial-roofing', 'emergency-roofing'],
    serviceNames: ['Flat Roofing', 'Metal Roofing', 'Shingle Roofing', 'Roof Replacement', 'Commercial Roofing', 'Emergency Roof Repair'],
    serviceAreas: ['San Jose', 'San Francisco', 'Oakland', 'Palo Alto', 'Sunnyvale', 'Santa Clara', 'Fremont', 'Berkeley'],
    certifications: [
      'CA CSLB Class C-39 Roofing Classification (Demo)',
      'GAF Master Elite Residential & Low-Slope Contractor (Demo)',
      'Diamond Certified Bay Area Contractor (Demo)'
    ],
    businessHours: {
      mondayFriday: '7:00 AM – 5:30 PM',
      saturday: '9:00 AM – 1:00 PM',
      sunday: 'Closed'
    },
    photos: [
      {
        id: 'ph-5',
        url: metalRoofImg,
        caption: 'Standing seam metal roof with integrated rooftop solar PV array in the Santa Cruz / Los Gatos foothills.',
        city: 'San Jose, CA',
        roofType: 'Standing Seam Metal'
      },
      {
        id: 'ph-6',
        url: commercialTpoImg,
        caption: 'High-reflectance white TPO membrane with rigid polyiso R-30 insulation board over tongue-and-groove decking.',
        city: 'Palo Alto, CA',
        roofType: 'Insulated Low-Slope TPO'
      }
    ],
    reviews: [
      {
        id: 'rev-301',
        authorName: 'Priya Natarajan (Demo Homeowner)',
        city: 'San Jose, CA',
        servicePerformed: 'Eichler Insulated Low-Slope TPO Roof',
        rating: 5,
        date: 'July 2026',
        comment: 'Owning an Eichler with exposed tongue-and-groove ceilings means any nail penetration shows inside the living room. Their crew installed tapered polyiso insulation and heat-welded TPO without a single interior ceiling blemish. Indoor summer temps dropped by 8 degrees.',
        verifiedProject: true
      }
    ],
    faqs: [
      {
        question: 'How do you insulate a flat roof with exposed wood beam ceilings?',
        answer: 'Because there is no attic cavity above tongue-and-groove decking, we install rigid polyisocyanurate (polyiso) insulation boards directly above the deck before laying the waterproof TPO membrane, protecting the interior beam aesthetic.'
      }
    ],
    profileCompletion: 94
  },
  {
    id: 'biz-4',
    slug: 'capital-valley-cool-roofing',
    name: 'Capital Valley Cool Roofing Co.',
    tagline: 'Sacramento & Central Valley Title 24 Zone 12 Cool Roof Specialists',
    shortDescription: 'Sacramento, Stockton, and Fresno licensed roofing contractor delivering energy-saving Title 24 Cool Roofs, concrete tile repairs, and 24-hour winter storm response.',
    fullDescription: 'Capital Valley Cool Roofing Co. is built for the extreme temperature swings of California Climate Zones 12 and 13. From 108°F July heatwaves to atmospheric river windstorms in January, our roofs combine Owens Corning Cool Roof solar-reflective shingles, radiant barrier OSB sheathing, and O’Hagin low-profile attic ventilation to slash SMUD and PG&E summer cooling bills.',
    logoInitials: 'CV',
    primaryCity: 'Sacramento',
    citySlug: 'sacramento',
    county: 'Sacramento County',
    countySlug: 'sacramento-county',
    zipCode: '95819',
    address: '5200 Folsom Blvd, Suite B, Sacramento, CA 95819 (Demo)',
    phone: '(916) 555-0163',
    website: 'https://capitalvalleyroofing-demo.example.com',
    email: 'office@capitalvalleyroofing-demo.example.com',
    yearsInBusiness: 15,
    foundedYear: 2011,
    cslbLicense: 'CSLB #967041 (C-39 Roofing — Demo Record)',
    cslbStatus: 'Verified Active (Demo)',
    workersCompStatus: 'Active Certificate on File (Demo)',
    generalLiabilityAmount: '$1,000,000 Occurrence / $2,000,000 Aggregate',
    verificationBadge: 'Verified Business',
    isFeatured: true,
    planTier: 'Premium Listing',
    rating: 4.8,
    reviewCount: 79,
    residentialShare: 80,
    commercialShare: 20,
    emergency24Hr: true,
    title24CoolRoofCertified: true,
    services: ['shingle-roofing', 'roof-replacement', 'roof-repair', 'tile-roofing', 'emergency-roofing', 'roof-inspection'],
    serviceNames: ['Shingle Roofing', 'Roof Replacement', 'Roof Repair', 'Tile Roofing', 'Emergency Roof Repair', 'Roof Inspection'],
    serviceAreas: ['Sacramento', 'Stockton', 'Roseville', 'Folsom', 'Elk Grove', 'Davis', 'Fresno'],
    certifications: [
      'CA CSLB Class C-39 Roofing Classification (Demo)',
      'SMUD Participating Cool Roof Rebate Contractor (Demo)',
      'CertainTeed SELECT ShingleMaster (Demo)'
    ],
    businessHours: {
      mondayFriday: '7:00 AM – 6:00 PM',
      saturday: '8:00 AM – 3:00 PM',
      sunday: 'Emergency Storm Dispatch'
    },
    photos: [
      {
        id: 'ph-7',
        url: shingleRoofImg,
        caption: 'Title 24 Cool Roof dimensional asphalt shingle replacement with radiant barrier decking and ridge ventilation.',
        city: 'Sacramento (East Sacramento)',
        roofType: 'Title 24 Cool Roof Shingles'
      }
    ],
    reviews: [
      {
        id: 'rev-401',
        authorName: 'Robert Miller (Demo Homeowner)',
        city: 'Sacramento, CA',
        servicePerformed: 'Cool Roof Shingle Replacement + Gutter Guards',
        rating: 5,
        date: 'August 2026',
        comment: 'Replaced our 23-year-old builder-grade roof in Land Park. The crew completed tear-off, dry-rot fascia replacement, and new Cool Roof shingles in 3 days flat. Very transparent per-foot wood replacement pricing.',
        verifiedProject: true
      }
    ],
    faqs: [],
    profileCompletion: 91
  },
  {
    id: 'biz-5',
    slug: 'orange-county-hoa-commercial-roofers',
    name: 'Orange County HOA & Commercial Roofers',
    tagline: 'Irvine, Anaheim & Santa Ana Multi-Family Tile Maintenance & Commercial Membranes',
    shortDescription: 'Dedicated commercial, industrial, and HOA community roofing contractor in Orange County and Riverside. Infrared leak detection, TPO, and annual maintenance programs.',
    fullDescription: 'Serving Orange County and the Inland Empire since 1999, Orange County HOA & Commercial Roofers partners with community association managers, industrial REITs, and residential homeowners in master-planned communities. We provide drone thermal imaging moisture audits, South Coast AQMD-compliant silicone roof restorations, and large-scale concrete tile underlayment renewal programs.',
    logoInitials: 'OC',
    primaryCity: 'Irvine',
    citySlug: 'irvine',
    county: 'Orange County',
    countySlug: 'orange-county',
    zipCode: '92618',
    address: '15375 Barranca Pkwy, Irvine, CA 92618 (Demo)',
    phone: '(949) 555-0188',
    website: 'https://ochoaroofing-demo.example.com',
    email: 'bids@ochoaroofing-demo.example.com',
    yearsInBusiness: 27,
    foundedYear: 1999,
    cslbLicense: 'CSLB #784910 (C-39 Roofing — Demo Record)',
    cslbStatus: 'Verified Active (Demo)',
    workersCompStatus: 'Active Certificate on File (Demo)',
    generalLiabilityAmount: '$5,000,000 Commercial Umbrella',
    verificationBadge: 'Verified Business',
    isFeatured: false,
    planTier: 'Premium Listing',
    rating: 4.9,
    reviewCount: 64,
    residentialShare: 40,
    commercialShare: 60,
    emergency24Hr: true,
    title24CoolRoofCertified: true,
    services: ['commercial-roofing', 'tile-roofing', 'flat-roofing', 'roof-inspection', 'roof-repair', 'emergency-roofing'],
    serviceNames: ['Commercial Roofing', 'Tile Roofing', 'Flat Roofing', 'Roof Inspection', 'Roof Repair', 'Emergency Roof Repair'],
    serviceAreas: ['Irvine', 'Anaheim', 'Santa Ana', 'Riverside', 'Costa Mesa', 'Newport Beach', 'Huntington Beach', 'Ontario'],
    certifications: [
      'CA CSLB Class C-39 & B General Building (Demo)',
      'CAI (Community Associations Institute) Educated Business Partner (Demo)',
      'Carlisle SynTec Golden Seal Applicator (Demo)'
    ],
    businessHours: {
      mondayFriday: '6:30 AM – 5:00 PM',
      saturday: 'By Appointment',
      sunday: '24/7 Commercial Emergency Hotline'
    },
    photos: [
      {
        id: 'ph-8',
        url: commercialTpoImg,
        caption: '85,000 sq. ft. industrial distribution facility Cool Roof TPO installation in the Orange County / Inland Empire corridor.',
        city: 'Irvine, CA',
        roofType: 'Commercial TPO'
      }
    ],
    reviews: [],
    faqs: [],
    profileCompletion: 88
  },
  {
    id: 'biz-6',
    slug: 'golden-state-timberline-roofing',
    name: 'Golden State Timberline Roofing',
    tagline: 'Central Valley Residential Re-Roofing, Leak Repairs & Escrow Certifications',
    shortDescription: 'Honest, itemized roofing repairs and full shingle/tile replacements across Fresno, Bakersfield, and the San Joaquin Valley.',
    fullDescription: 'Golden State Timberline Roofing provides straightforward residential roofing and real estate escrow roof certifications throughout Fresno County and Kern County. We focus on high-wind rated dimensional shingles, evaporative cooler (swamp cooler) curb eliminations, and dry-rot eave restoration.',
    logoInitials: 'GS',
    primaryCity: 'Fresno',
    citySlug: 'fresno',
    county: 'Fresno County',
    countySlug: 'fresno-county',
    zipCode: '93711',
    address: '7410 N Ingram Ave, Fresno, CA 93711 (Demo)',
    phone: '(559) 555-0129',
    website: 'https://gstimberlineroofing-demo.example.com',
    email: 'service@gstimberlineroofing-demo.example.com',
    yearsInBusiness: 11,
    foundedYear: 2015,
    cslbLicense: 'CSLB #1014289 (C-39 Roofing — Demo Record)',
    cslbStatus: 'Verified Active (Demo)',
    workersCompStatus: 'Active Certificate on File (Demo)',
    generalLiabilityAmount: '$1,000,000 Occurrence',
    verificationBadge: 'Claimed Profile',
    isFeatured: false,
    planTier: 'Free Listing',
    rating: 4.7,
    reviewCount: 41,
    residentialShare: 90,
    commercialShare: 10,
    emergency24Hr: false,
    title24CoolRoofCertified: true,
    services: ['roof-repair', 'roof-replacement', 'shingle-roofing', 'roof-inspection', 'residential-roofing'],
    serviceNames: ['Roof Repair', 'Roof Replacement', 'Shingle Roofing', 'Roof Inspection', 'Residential Roofing'],
    serviceAreas: ['Fresno', 'Bakersfield', 'Clovis', 'Visalia', 'Madera'],
    certifications: [
      'CA CSLB Class C-39 Roofing Classification (Demo)'
    ],
    businessHours: {
      mondayFriday: '7:30 AM – 5:00 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    photos: [
      {
        id: 'ph-9',
        url: shingleRoofImg,
        caption: 'High-reflectance dimensional shingle installation with upgraded ridge ventilation.',
        city: 'Fresno, CA',
        roofType: 'Cool Roof Shingles'
      }
    ],
    reviews: [],
    faqs: [],
    profileCompletion: 82
  },
  {
    id: 'biz-7',
    slug: 'peninsula-slate-copper-works',
    name: 'Peninsula Slate & Copper Works',
    tagline: 'San Francisco & East Bay Historic Slate, Copper Gutters & Flat Roof Waterproofing',
    shortDescription: 'Architectural sheet metal, Victorian flat roof membranes, and Class A fire-hardened roofing in San Francisco and Oakland.',
    fullDescription: 'Peninsula Slate & Copper Works combines old-world custom coppersmithing with modern single-ply waterproofing for San Francisco Victorians, Pacific Heights estates, and Oakland Hills residences. Our sheet metal shop fabricates custom cornice gutters, chimney shrouds, and standing seam panels in-house.',
    logoInitials: 'PS',
    primaryCity: 'San Francisco',
    citySlug: 'san-francisco',
    county: 'San Francisco County',
    countySlug: 'san-francisco-county',
    zipCode: '94107',
    address: '2150 Cesar Chavez St, San Francisco, CA 94107 (Demo)',
    phone: '(415) 555-0155',
    website: 'https://peninsulaslate-demo.example.com',
    email: 'atelier@peninsulaslate-demo.example.com',
    yearsInBusiness: 31,
    foundedYear: 1995,
    cslbLicense: 'CSLB #712098 (C-39 Roofing & C-43 Sheet Metal — Demo Record)',
    cslbStatus: 'Verified Active (Demo)',
    workersCompStatus: 'Active Certificate on File (Demo)',
    generalLiabilityAmount: '$3,000,000 Occurrence',
    verificationBadge: 'Verified Business',
    isFeatured: false,
    planTier: 'Premium Listing',
    rating: 4.9,
    reviewCount: 53,
    residentialShare: 65,
    commercialShare: 35,
    emergency24Hr: false,
    title24CoolRoofCertified: true,
    services: ['flat-roofing', 'metal-roofing', 'roof-repair', 'roof-replacement', 'commercial-roofing'],
    serviceNames: ['Flat Roofing', 'Metal Roofing', 'Roof Repair', 'Roof Replacement', 'Commercial Roofing'],
    serviceAreas: ['San Francisco', 'Oakland', 'Berkeley', 'San Mateo', 'Marin County'],
    certifications: [
      'CA CSLB C-39 Roofing & C-43 Sheet Metal (Demo)',
      'National Slate Association Member (Demo)'
    ],
    businessHours: {
      mondayFriday: '7:30 AM – 4:30 PM',
      saturday: 'Closed',
      sunday: 'Closed'
    },
    photos: [
      {
        id: 'ph-10',
        url: metalRoofImg,
        caption: 'Custom standing seam metal and architectural skylight flashing in the Oakland Hills WUI zone.',
        city: 'Oakland, CA',
        roofType: 'Standing Seam & Sheet Metal'
      }
    ],
    reviews: [],
    faqs: [],
    profileCompletion: 90
  },
  {
    id: 'biz-8',
    slug: 'inland-empire-tile-restoration',
    name: 'Inland Empire Tile & Roof Restoration',
    tagline: 'Riverside, Anaheim & Chula Vista Concrete Tile Lift-and-Relay Specialists',
    shortDescription: 'Focused exclusively on Southern California concrete and clay tile roof underlayment replacement, broken tile swaps, and pigeon/solar exclusion.',
    fullDescription: 'Most Southern California tract homes built between 1985 and 2006 have lifetime concrete tiles sitting on top of 20-year paper felt that is now cracking. Inland Empire Tile & Roof Restoration specializes in lifting your existing concrete tiles, installing breathable 40-year synthetic underlayment and heavy-gauge valley metal, and relaying your original tiles—saving homeowners 35–45% compared to buying all-new tiles.',
    logoInitials: 'IE',
    primaryCity: 'Riverside',
    citySlug: 'riverside',
    county: 'Riverside County',
    countySlug: 'riverside-county',
    zipCode: '92507',
    address: '3890 Market St, Riverside, CA 92507 (Demo)',
    phone: '(951) 555-0137',
    website: 'https://ietilerestoration-demo.example.com',
    email: 'quotes@ietilerestoration-demo.example.com',
    yearsInBusiness: 14,
    foundedYear: 2012,
    cslbLicense: 'CSLB #981332 (C-39 Roofing — Demo Record)',
    cslbStatus: 'Verified Active (Demo)',
    workersCompStatus: 'Active Certificate on File (Demo)',
    generalLiabilityAmount: '$1,000,000 Occurrence',
    verificationBadge: 'Claimed Profile',
    isFeatured: false,
    planTier: 'Free Listing',
    rating: 4.8,
    reviewCount: 67,
    residentialShare: 95,
    commercialShare: 5,
    emergency24Hr: true,
    title24CoolRoofCertified: true,
    services: ['tile-roofing', 'roof-repair', 'roof-replacement', 'emergency-roofing', 'residential-roofing'],
    serviceNames: ['Tile Roofing', 'Roof Repair', 'Roof Replacement', 'Emergency Roof Repair', 'Residential Roofing'],
    serviceAreas: ['Riverside', 'Anaheim', 'Santa Ana', 'Corona', 'Temecula', 'Chula Vista'],
    certifications: [
      'CA CSLB Class C-39 Roofing Classification (Demo)',
      'TRI Concrete & Clay Tile Installation Certified (Demo)'
    ],
    businessHours: {
      mondayFriday: '7:00 AM – 5:00 PM',
      saturday: '8:00 AM – 12:00 PM',
      sunday: 'Closed'
    },
    photos: [
      {
        id: 'ph-11',
        url: tileRoofImg,
        caption: 'Concrete S-tile lift and relay with upgraded synthetic underlayment and new lead pipe flashings.',
        city: 'Riverside, CA',
        roofType: 'Concrete Tile Lift & Relay'
      }
    ],
    reviews: [],
    faqs: [],
    profileCompletion: 85
  }
];

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    slug: 'how-much-does-roof-replacement-cost-in-california',
    title: 'How Much Does Roof Replacement Cost in California? (2026 Price Guide)',
    category: 'Roofing Costs',
    author: 'CalRoof Editorial & Estimating Board',
    authorRole: 'California C-39 Industry Research',
    publishedDate: 'September 14, 2026',
    updatedDate: 'October 2, 2026',
    readTimeMinutes: 7,
    heroImage: shingleRoofImg,
    excerpt: 'An itemized breakdown of California roof replacement costs by material (Title 24 cool shingles, clay tile lift-and-relay, standing seam metal, and TPO), labor rates, and city permit fees.',
    keyTakeaways: [
      'A typical 2,000 sq. ft. California single-family home roof replacement ranges from $14,500 to $26,500 for Title 24 Cool Roof dimensional shingles.',
      'Spanish clay or concrete tile "Lift & Relay" (reusing existing tiles with new underlayment) costs $12,500 to $22,000, compared to $24,000–$42,000+ for all-new tile.',
      'City building permits and Title 24 CRRC compliance documentation add $450 to $1,400 depending on the California municipality.',
      'Higher California Workers Compensation insurance rates for C-39 roofing classifications account for roughly 35–42% of direct contractor labor overhead.'
    ],
    sections: [
      {
        heading: '1. California Roof Cost by Material Type (2,000 Sq. Ft. Roof Area)',
        body: 'In California, roofing prices differ significantly from national averages due to mandatory Title 24 Cool Roof energy standards, high seismic and wind-uplift fastening codes, and state disposal recycling mandates (CalGreen). Title 24 Cool Roof Asphalt Shingles average $7.25–$12.50 per sq. ft. installed. Concrete Tile Lift & Relay averages $6.50–$11.00 per sq. ft. New Concrete or Clay Tile runs $11.50–$21.00 per sq. ft., while 24-gauge Standing Seam Metal ranges from $13.00 to $23.00 per sq. ft.'
      },
      {
        heading: '2. Hidden Cost Factors: Decking Dry-Rot, Title 24 & Solar Prep',
        body: 'Until the old roof covering is torn off, contractors cannot see concealed termite damage or dry-rot in the plywood sheathing or fascia boards. Reputable California C-39 roofers specify an upfront per-sheet price for CDX plywood or radiant-barrier OSB ($95–$135 per 4x8 sheet installed) in the contract so homeowners are never surprised.'
      }
    ],
    relatedServices: ['roof-replacement', 'shingle-roofing', 'tile-roofing', 'metal-roofing'],
    relatedLocations: ['los-angeles', 'san-diego', 'sacramento', 'san-jose']
  },
  {
    slug: 'how-to-choose-a-california-roofing-contractor',
    title: 'How to Choose a Roofing Contractor in California: CSLB C-39 Checklist',
    category: 'Contractor Selection',
    author: 'CalRoof Verification Team',
    authorRole: 'Compliance & Licensing Standards',
    publishedDate: 'August 22, 2026',
    updatedDate: 'September 30, 2026',
    readTimeMinutes: 6,
    heroImage: tileRoofImg,
    excerpt: 'How to verify a California Contractors State License Board (CSLB) C-39 license, check active Workers Compensation insurance, and spot illegal down-payment demands.',
    keyTakeaways: [
      'California law requires a C-39 Roofing license for any roofing contract valued at $500 or more (labor and materials combined).',
      'Under California Business & Professions Code § 7159.5, a contractor cannot legally request a down payment exceeding $1,000 or 10% of the contract price, whichever is LESS.',
      'All C-39 roofing contractors in California are legally required to carry active Workers Compensation insurance, even if they claim to have no employees.'
    ],
    sections: [
      {
        heading: '1. Verify the CSLB C-39 License & Workers Compensation Mandate',
        body: 'Unlike general handymen, California law mandates that every active C-39 Roofing contractor maintain a Workers Compensation insurance policy or state compensation insurance fund certificate on file with the CSLB. If an unlicensed or uninsured worker is injured on your roof, the homeowner can be held financially liable.'
      },
      {
        heading: '2. Know California’s 10% / $1,000 Down Payment Law',
        body: 'Never pay 30% or 50% upfront before materials or work begin. In California, home improvement down payments are strictly capped at 10% of the total contract price or $1,000—whichever amount is lower.'
      }
    ],
    relatedServices: ['roof-replacement', 'roof-repair', 'roof-inspection'],
    relatedLocations: ['los-angeles', 'san-francisco', 'irvine', 'riverside']
  },
  {
    slug: 'questions-to-ask-a-roofer-before-hiring',
    title: '12 Essential Questions to Ask a California Roofer Before Signing a Contract',
    category: 'Contractor Selection',
    author: 'CalRoof Editorial & Estimating Board',
    authorRole: 'Consumer Protection Guide',
    publishedDate: 'August 10, 2026',
    updatedDate: 'September 18, 2026',
    readTimeMinutes: 5,
    heroImage: metalRoofImg,
    excerpt: 'Compare roofing bids apples-to-apples by asking about underlayment weight, valley sheet metal gauge, city permit inspections, and unconditional lien releases.',
    keyTakeaways: [
      'Ask for the exact underlayment specification—two layers of 40-lb felt or high-temp synthetic underlayment outlast standard single-layer paper by 15+ years.',
      'Confirm whether the contractor replaces all pipe flashings, t-top vents, and valley metal down to bare wood rather than roofing over old flashing.',
      'Require unconditional mechanics lien releases from material suppliers before making final payment.'
    ],
    sections: [
      {
        heading: '1. Underlayment & Flashing Specifications Matter More Than Outer Tile',
        body: 'On a California tile roof, the outer clay or concrete tile is primarily a UV shield and watershed; the true waterproof barrier is the underlayment and sheet metal flashing underneath. Always ask contractors to specify the exact brand, thickness, and warranty of the underlayment.'
      }
    ],
    relatedServices: ['tile-roofing', 'roof-replacement'],
    relatedLocations: ['san-diego', 'anaheim', 'long-beach']
  },
  {
    slug: 'how-long-does-a-roof-last-in-california',
    title: 'How Long Does a Roof Last in California’s Coastal, Valley & Mountain Climates?',
    category: 'Roofing Materials',
    author: 'CalRoof Building Science Desk',
    authorRole: 'Materials & Weathering Analysis',
    publishedDate: 'July 29, 2026',
    updatedDate: 'September 12, 2026',
    readTimeMinutes: 6,
    heroImage: commercialTpoImg,
    excerpt: 'Expected lifespans for clay tile, concrete tile, Cool Roof asphalt shingles, standing seam metal, and TPO flat roofs across California Climate Zones 1 through 16.',
    keyTakeaways: [
      'Cool Roof Dimensional Asphalt Shingles: 22–30 years in inland valleys; 25–35 years in mild coastal zones.',
      'Clay & Concrete Tile Systems: Tiles last 50–75+ years, but the underlying waterproof felt/synthetic membrane requires replacement ("lift and relay") every 22–30 years.',
      'Standing Seam Metal (24-gauge PVDF): 45–70 years with minimal maintenance and Class A wildfire performance.',
      'Single-Ply TPO / PVC Flat Roofs: 20–28 years when properly sloped and cleaned annually.'
    ],
    sections: [
      {
        heading: 'Why Tile Roofs Need Maintenance at Year 22 Even Though Tiles Last 60 Years',
        body: 'Homeowners in San Diego, Orange County, and Sacramento are often surprised when a 22-year-old concrete tile roof begins leaking. While the concrete tiles themselves remain structurally sound, thermal expansion and UV penetration through tile joints eventually degrade the asphalt-saturated felt paper underneath.'
      }
    ],
    relatedServices: ['tile-roofing', 'shingle-roofing', 'metal-roofing', 'flat-roofing'],
    relatedLocations: ['sacramento', 'fresno', 'bakersfield', 'oakland']
  },
  {
    slug: 'signs-you-need-a-new-roof-or-underlayment-relay',
    title: '7 Warning Signs You Need a New Roof (Or Tile Underlayment Relay) Before California Winter Rains',
    category: 'Roof Replacement',
    author: 'CalRoof Editorial & Estimating Board',
    authorRole: 'Homeowner Inspection Guide',
    publishedDate: 'July 11, 2026',
    updatedDate: 'September 5, 2026',
    readTimeMinutes: 5,
    heroImage: heroImage,
    excerpt: 'How to distinguish between a $950 localized flashing repair and a full roof replacement before atmospheric river storms arrive.',
    keyTakeaways: [
      'Slipped tiles in multiple roof planes indicate corroded fasteners or rotted wood battens beneath the tile.',
      'Daylight visible through attic roof boards or dark water rings around roof nails signal active underlayment failure.',
      'Granules filling downspouts and curled shingle edges mean asphalt oils have volatilized under California sun exposure.'
    ],
    sections: [
      {
        heading: 'Inspecting Your Attic & Eaves Before October',
        body: 'The best time to schedule a California roof inspection is late summer or early autumn—before the first atmospheric river saturates contractor schedules. Check eave starter boards for dry-rot and look inside the attic with a flashlight around chimney and plumbing vent penetrations.'
      }
    ],
    relatedServices: ['roof-inspection', 'roof-repair', 'emergency-roofing'],
    relatedLocations: ['los-angeles', 'san-jose', 'chula-vista', 'stockton']
  }
];

export const HOMEPAGE_FAQS = [
  {
    question: 'How does CalRoof Directory verify California roofing companies?',
    answer: 'Every company displaying the "Verified Business" badge has undergone checks against California Contractors State License Board (CSLB) Class C-39 Roofing records, active Workers Compensation insurance status, and verified California service addresses. Profiles marked "Claimed Profile" have verified business ownership via corporate domain email and phone authentication. (Note: In this interactive prototype, all contractor records and license numbers are clearly labeled as demonstration data.)'
  },
  {
    question: 'Is CalRoof Directory free for California homeowners and property managers?',
    answer: 'Yes. Searching the directory, filtering by roofing specialty or city, reviewing contractor credentials, calling companies directly, and requesting project quotes are 100% free for homeowners, HOA boards, and commercial property owners.'
  },
  {
    question: 'Does CalRoof sell my contact info to 10 random contractors like lead-generation broker sites?',
    answer: 'No. Unlike national pay-per-lead aggregators that auction your phone number to multiple undisclosed callers, when you request a quote on a company’s profile page, your inquiry is routed directly to that specific roofing company.'
  },
  {
    question: 'What is the difference between a C-39 Roofing Contractor and a Class B General Contractor in California?',
    answer: 'Under California law, a Class C-39 Roofing Contractor holds a specialty license dedicated specifically to examining, installing, and waterproofing roof coverings. A Class B General Building Contractor cannot legally contract for roofing-only projects unless the contract involves at least two unrelated building trades or the contractor also holds a C-39 classification.'
  },
  {
    question: 'What is a California Title 24 Cool Roof requirement?',
    answer: 'California’s Building Energy Efficiency Standards (Title 24, Part 6) require most residential and commercial roof replacements to use Cool Roof Rating Council (CRRC) certified materials that reflect solar radiation and emit thermal heat, helping lower indoor cooling costs and urban heat island effects across California Climate Zones 1 through 16.'
  }
];
