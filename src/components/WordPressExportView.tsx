import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  FileCode2,
  Layers,
  Sparkles,
  CheckCircle2,
  LayoutGrid,
  FileJson,
  BookOpen
} from 'lucide-react';
import { Breadcrumbs } from './SharedComponents';

interface PageTemplateItem {
  id: string;
  pageNumber: string;
  title: string;
  wpPageSlug: string;
  filename: string;
  description: string;
  howToUseUrdu: string;
  jsonData: Record<string, unknown>;
}

export const WordPressExportView: React.FC<{
  onNavigateHome: () => void;
}> = ({ onNavigateHome }) => {
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedBlock(id);
    setTimeout(() => setCopiedBlock(null), 2500);
  };

  const downloadFile = (filename: string, content: string, mimeType = 'text/plain') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ============================================================================
  // ALL 6 ELEMENTOR PAGE TEMPLATES (.JSON) WITH PLAYFAIR DISPLAY + CINZEL + DM SANS
  // ============================================================================
  const elementorPageTemplates: PageTemplateItem[] = [
    {
      id: 'page-1-home',
      pageNumber: 'Page 01',
      title: 'Homepage (Hero + Services + Featured Roofers + Cities + FAQ)',
      wpPageSlug: '/ (Front Page)',
      filename: 'calroof-page-1-homepage.json',
      description:
        'Complete Homepage with Single Glassy Search Bar, 4 Visual Roofing System Cards, Featured Contractors Grid, California Cities Grid, and FAQ section.',
      howToUseUrdu:
        'WordPress me "Home" page banayein -> Edit with Elementor -> Folder Icon (Add Template) -> Import Templates me ye JSON file upload karein. Phir Settings -> Reading me isko Static Homepage set karein.',
      jsonData: {
        version: '0.4',
        title: 'CalRoof Page 1 — Homepage (Playfair Display & Glass UI)',
        type: 'page',
        content: [
          {
            id: 'hero_container',
            elType: 'container',
            isInner: false,
            settings: {
              content_width: 'boxed',
              boxed_width: { unit: 'px', size: 1280 },
              background_background: 'classic',
              background_color: '#0F172A',
              padding: { unit: 'px', top: '90', right: '24', bottom: '90', left: '24', isLinked: false }
            },
            elements: [
              {
                id: 'hero_kicker',
                elType: 'widget',
                widgetType: 'heading',
                settings: {
                  title: 'CALIFORNIA’S OFFICIAL C-39 ROOFING DIRECTORY',
                  header_size: 'h6',
                  title_color: '#FF6B4A',
                  typography_typography: 'custom',
                  typography_font_family: 'Cinzel',
                  typography_font_size: { unit: 'px', size: 13 },
                  typography_font_weight: '500',
                  typography_letter_spacing: { unit: 'px', size: 2 }
                }
              },
              {
                id: 'hero_h1',
                elType: 'widget',
                widgetType: 'heading',
                settings: {
                  title: 'Find Trusted California Roofers for Any Roof System',
                  header_size: 'h1',
                  title_color: '#FFFFFF',
                  typography_typography: 'custom',
                  typography_font_family: 'Playfair Display',
                  typography_font_size: { unit: 'px', size: 54 },
                  typography_font_weight: '500',
                  typography_line_height: { unit: 'em', size: 1.15 }
                }
              },
              {
                id: 'hero_search_widget',
                elType: 'widget',
                widgetType: 'html',
                settings: {
                  html: `<form action="/roofing-companies/" method="get" class="calroof-glass-search" style="background:rgba(255,255,255,0.14);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.25);padding:14px;border-radius:22px;display:grid;grid-template-columns:1fr 1fr auto;gap:12px;max-width:860px;margin-top:24px;">
  <input type="text" name="service" placeholder="Roofing Service (e.g. Tile Relay, Roof Repair)" style="padding:15px 18px;border-radius:14px;border:none;font-size:16px;font-family:'DM Sans',sans-serif;background:#fff;color:#0F172A;" />
  <input type="text" name="city" placeholder="California City or ZIP (e.g. Los Angeles, 90025)" style="padding:15px 18px;border-radius:14px;border:none;font-size:16px;font-family:'DM Sans',sans-serif;background:#fff;color:#0F172A;" />
  <button type="submit" style="padding:15px 30px;border-radius:14px;border:none;background:linear-gradient(135deg,#FF6B4A,#D9532F);color:#fff;font-family:'DM Sans',sans-serif;font-weight:500;font-size:16px;cursor:pointer;">Search Roofers</button>
</form>`
                }
              }
            ]
          },
          {
            id: 'home_directory_section',
            elType: 'container',
            isInner: false,
            settings: {
              content_width: 'boxed',
              boxed_width: { unit: 'px', size: 1280 },
              padding: { unit: 'px', top: '75', right: '24', bottom: '75', left: '24', isLinked: false }
            },
            elements: [
              {
                id: 'home_sec2_h2',
                elType: 'widget',
                widgetType: 'heading',
                settings: {
                  title: 'Featured California C-39 Roofing Contractors',
                  header_size: 'h2',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Playfair Display',
                  typography_font_size: { unit: 'px', size: 40 },
                  typography_font_weight: '600'
                }
              },
              {
                id: 'home_shortcode_grid',
                elType: 'widget',
                widgetType: 'shortcode',
                settings: {
                  shortcode: '[calroof_directory_grid limit="4"]'
                }
              }
            ]
          },
          {
            id: 'home_cities_section',
            elType: 'container',
            isInner: false,
            settings: {
              content_width: 'boxed',
              boxed_width: { unit: 'px', size: 1280 },
              padding: { unit: 'px', top: '40', right: '24', bottom: '80', left: '24', isLinked: false }
            },
            elements: [
              {
                id: 'home_cities_h2',
                elType: 'widget',
                widgetType: 'heading',
                settings: {
                  title: 'Find Roofers by California City',
                  header_size: 'h2',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Playfair Display',
                  typography_font_size: { unit: 'px', size: 40 },
                  typography_font_weight: '600'
                }
              },
              {
                id: 'home_cities_shortcode',
                elType: 'widget',
                widgetType: 'shortcode',
                settings: {
                  shortcode: '[calroof_city_grid]'
                }
              }
            ]
          }
        ],
        page_settings: { template: 'elementor_header_footer' }
      }
    },
    {
      id: 'page-2-directory',
      pageNumber: 'Page 02',
      title: 'Find Roofers / Roofing Companies Directory Page',
      wpPageSlug: '/find-roofers/ or /roofing-companies/',
      filename: 'calroof-page-2-directory.json',
      description:
        'Full Directory Search & Filter Page with City/Service Filter Bar and Glassy Contractor Listing Cards.',
      howToUseUrdu:
        'WordPress me "Roofing Companies" naam ka page banayein -> Edit with Elementor -> ye JSON file import karein. Ye page automatically [calroof_search_bar] aur [calroof_directory_grid] shortcodes se saari companies dikhayega.',
      jsonData: {
        version: '0.4',
        title: 'CalRoof Page 2 — Roofing Companies Directory & Search',
        type: 'page',
        content: [
          {
            id: 'dir_header_container',
            elType: 'container',
            isInner: false,
            settings: {
              content_width: 'boxed',
              boxed_width: { unit: 'px', size: 1280 },
              padding: { unit: 'px', top: '60', right: '24', bottom: '40', left: '24', isLinked: false }
            },
            elements: [
              {
                id: 'dir_h1',
                elType: 'widget',
                widgetType: 'heading',
                settings: {
                  title: 'California C-39 Licensed Roofing Companies Directory',
                  header_size: 'h1',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Playfair Display',
                  typography_font_size: { unit: 'px', size: 44 },
                  typography_font_weight: '600'
                }
              },
              {
                id: 'dir_filter_shortcode',
                elType: 'widget',
                widgetType: 'shortcode',
                settings: {
                  shortcode: '[calroof_search_bar]'
                }
              },
              {
                id: 'dir_grid_shortcode',
                elType: 'widget',
                widgetType: 'shortcode',
                settings: {
                  shortcode: '[calroof_directory_grid limit="12"]'
                }
              }
            ]
          }
        ],
        page_settings: { template: 'elementor_header_footer' }
      }
    },
    {
      id: 'page-3-profile',
      pageNumber: 'Page 03',
      title: 'Single Roofing Company Profile Page Template',
      wpPageSlug: '/roofing-companies/{company-slug}/',
      filename: 'calroof-page-3-company-profile.json',
      description:
        'Dedicated Contractor Profile layout with C-39 License Verification Card, Services Offered, Project Gallery, Reviews, and Direct Quote Form.',
      howToUseUrdu:
        'Har company ke liye alag page banane ki zaroorat NAHI hai! Elementor Theme Builder (Single Post -> Roofing Company) me ya kisi bhi featured contractor page par ye JSON import karein.',
      jsonData: {
        version: '0.4',
        title: 'CalRoof Page 3 — Single Roofing Company Profile',
        type: 'page',
        content: [
          {
            id: 'prof_container',
            elType: 'container',
            isInner: false,
            settings: {
              content_width: 'boxed',
              boxed_width: { unit: 'px', size: 1280 },
              padding: { unit: 'px', top: '60', right: '24', bottom: '80', left: '24', isLinked: false }
            },
            elements: [
              {
                id: 'prof_card_html',
                elType: 'widget',
                widgetType: 'html',
                settings: {
                  html: `<div class="calroof-glass-card" style="padding:36px;margin-bottom:32px;">
  <div style="font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.14em;color:#15803D;text-transform:uppercase;">Verified California C-39 Contractor · License #1048291</div>
  <h1 style="font-family:'Playfair Display',serif;font-weight:600;font-size:42px;color:#0F172A;margin:10px 0;">Pacific Crest Roofing Systems</h1>
  <p style="font-family:'DM Sans',sans-serif;font-size:17px;color:#475569;max-width:760px;">22+ years serving Los Angeles & Southern California with Spanish clay tile lift-and-relays, Title 24 cool roof replacements, and commercial TPO membranes.</p>
  <div style="margin-top:24px;display:flex;gap:14px;flex-wrap:wrap;">
    <a href="#quote-form" style="padding:14px 28px;border-radius:14px;background:#D9532F;color:#fff;text-decoration:none;font-weight:500;">Request Free Estimate</a>
    <a href="tel:3105550148" style="padding:14px 24px;border-radius:14px;border:1px solid #CBD5E1;color:#0F172A;text-decoration:none;font-family:monospace;">(310) 555-0148</a>
  </div>
</div>`
                }
              }
            ]
          }
        ],
        page_settings: { template: 'elementor_header_footer' }
      }
    },
    {
      id: 'page-4-locations',
      pageNumber: 'Page 04',
      title: 'California Locations & Cities Hub Page',
      wpPageSlug: '/locations/',
      filename: 'calroof-page-4-locations-hub.json',
      description:
        'Statewide California Cities & Counties Hub showing local permit authorities, CEC Climate Zones, and city links.',
      howToUseUrdu:
        'WordPress me "Locations" page banayein -> Edit with Elementor -> ye JSON file import karein. Isme tamam California cities ke Glassy Cards maujood hain.',
      jsonData: {
        version: '0.4',
        title: 'CalRoof Page 4 — California Locations & Climate Zones Hub',
        type: 'page',
        content: [
          {
            id: 'loc_hub_container',
            elType: 'container',
            isInner: false,
            settings: {
              content_width: 'boxed',
              boxed_width: { unit: 'px', size: 1280 },
              padding: { unit: 'px', top: '60', right: '24', bottom: '80', left: '24', isLinked: false }
            },
            elements: [
              {
                id: 'loc_h1',
                elType: 'widget',
                widgetType: 'heading',
                settings: {
                  title: 'Find Roofing Companies by California City & County',
                  header_size: 'h1',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Playfair Display',
                  typography_font_size: { unit: 'px', size: 44 },
                  typography_font_weight: '600'
                }
              },
              {
                id: 'loc_grid_shortcode',
                elType: 'widget',
                widgetType: 'shortcode',
                settings: {
                  shortcode: '[calroof_city_grid]'
                }
              }
            ]
          }
        ],
        page_settings: { template: 'elementor_header_footer' }
      }
    },
    {
      id: 'page-5-signup',
      pageNumber: 'Page 05',
      title: 'List Your Roofing Company (Contractor Signup Page)',
      wpPageSlug: '/list-your-company/',
      filename: 'calroof-page-5-list-company.json',
      description:
        'Contractor Onboarding & Profile Submission Page where California C-39 roofers submit their company, license, and service areas.',
      howToUseUrdu:
        'WordPress me "List Your Company" page banayein -> Edit with Elementor -> ye JSON import karein. Isme [calroof_company_form] लगा hua hai jo naye contractors ki listing submit karta hai.',
      jsonData: {
        version: '0.4',
        title: 'CalRoof Page 5 — List Your Roofing Company',
        type: 'page',
        content: [
          {
            id: 'signup_container',
            elType: 'container',
            isInner: false,
            settings: {
              content_width: 'boxed',
              boxed_width: { unit: 'px', size: 1140 },
              padding: { unit: 'px', top: '60', right: '24', bottom: '80', left: '24', isLinked: false }
            },
            elements: [
              {
                id: 'signup_h1',
                elType: 'widget',
                widgetType: 'heading',
                settings: {
                  title: 'List Your California Roofing Company',
                  header_size: 'h1',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Playfair Display',
                  typography_font_size: { unit: 'px', size: 44 },
                  typography_font_weight: '600'
                }
              },
              {
                id: 'signup_form_shortcode',
                elType: 'widget',
                widgetType: 'shortcode',
                settings: {
                  shortcode: '[calroof_company_form]'
                }
              }
            ]
          }
        ],
        page_settings: { template: 'elementor_header_footer' }
      }
    },
    {
      id: 'page-6-resources',
      pageNumber: 'Page 06',
      title: 'Roofing Cost Guides & CSLB Verification Policy Page',
      wpPageSlug: '/resources/',
      filename: 'calroof-page-6-resources-about.json',
      description:
        'Homeowner Resource Center covering 2026 California Roof Replacement Costs, Title 24 Cool Roof Rules, and CSLB C-39 Verification.',
      howToUseUrdu:
        'WordPress me "Resources" ya "Guides" page banayein -> Edit with Elementor -> ye JSON import karein.',
      jsonData: {
        version: '0.4',
        title: 'CalRoof Page 6 — California Roofing Guides & Trust Policy',
        type: 'page',
        content: [
          {
            id: 'res_container',
            elType: 'container',
            isInner: false,
            settings: {
              content_width: 'boxed',
              boxed_width: { unit: 'px', size: 1280 },
              padding: { unit: 'px', top: '60', right: '24', bottom: '80', left: '24', isLinked: false }
            },
            elements: [
              {
                id: 'res_h1',
                elType: 'widget',
                widgetType: 'heading',
                settings: {
                  title: 'California Roofing Cost & Title 24 Homeowner Guides',
                  header_size: 'h1',
                  title_color: '#0F172A',
                  typography_typography: 'custom',
                  typography_font_family: 'Playfair Display',
                  typography_font_size: { unit: 'px', size: 44 },
                  typography_font_weight: '600'
                }
              },
              {
                id: 'res_cards_html',
                elType: 'widget',
                widgetType: 'html',
                settings: {
                  html: `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;margin-top:28px;">
  <div class="calroof-glass-card" style="padding:28px;">
    <div style="color:#D9532F;font-size:13px;font-weight:500;">2026 Cost Guide</div>
    <h3 style="font-family:'Playfair Display',serif;font-weight:600;font-size:24px;margin:8px 0;">Roof Replacement Cost in California</h3>
    <p style="color:#475569;font-size:16px;line-height:1.6;">Compare typical California tear-off and installation ranges for Cool Roof shingles ($13.5k–$24.5k), Spanish tile relays ($11.5k–$22k), and standing seam metal.</p>
  </div>
  <div class="calroof-glass-card" style="padding:28px;">
    <div style="color:#D9532F;font-size:13px;font-weight:500;">CSLB Compliance</div>
    <h3 style="font-family:'Playfair Display',serif;font-weight:600;font-size:24px;margin:8px 0;">How to Verify a C-39 Roofing License</h3>
    <p style="color:#475569;font-size:16px;line-height:1.6;">Every California roofing project over $500 requires an active CSLB Class C-39 license, $25,000 contractor bond, and active Workers’ Compensation insurance.</p>
  </div>
</div>`
                }
              }
            ]
          }
        ],
        page_settings: { template: 'elementor_header_footer' }
      }
    }
  ];

  // 2. Updated WordPress Theme style.css with Playfair Display + Cinzel + DM Sans (Refined, Not Overly Bold)
  const wpStyleCss = `/*
Theme Name: CalRoof Directory Pro
Theme URI: https://calroofdirectory.com
Author: CalRoof Architecture Team
Description: California's Roofing Company Directory WordPress Theme — Playfair Display & Cinzel Typography, Glassmorphism UI, and Multi-Page Elementor Support.
Version: 3.0.0
License: GPL v2 or later
Text Domain: calroof-directory
*/

@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;1,9..40,400&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,500;0,600;1,400&display=swap');

:root {
  --calroof-slate: #0F172A;
  --calroof-accent: #D9532F;
  --calroof-accent-light: #FF6B4A;
  --calroof-text: #0F172A;
  --calroof-muted: #475569;
}

body {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16.5px;
  font-weight: 400;
  color: var(--calroof-text);
  background: radial-gradient(circle at 15% 10%, rgba(217, 83, 47, 0.06), transparent 38%),
              radial-gradient(circle at 85% 30%, rgba(14, 165, 233, 0.06), transparent 42%),
              linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 55%, #F8FAFC 100%);
  margin: 0;
  line-height: 1.65;
}

h1, h2, h3, h4, .calroof-heading {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.calroof-brand-font {
  font-family: 'Cinzel', Georgia, serif;
  font-weight: 500;
  letter-spacing: 0.12em;
}

/* Glassmorphism Card Class for Elementor Containers & Shortcodes */
.calroof-glass-card {
  background: rgba(255, 255, 255, 0.84) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.92) !important;
  border-radius: 24px !important;
  box-shadow: 0 12px 32px -8px rgba(15, 23, 42, 0.06) !important;
}

.calroof-glass-dark {
  background: rgba(15, 23, 42, 0.78) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  border-radius: 24px !important;
}`;

  // 3. Complete WordPress functions.php with Auto-Page Creation + Dynamic Shortcodes for ALL Pages!
  const wpFunctionsPhp = `<?php
/**
 * CalRoof Directory Pro — Complete Multi-Page Theme Functions, CPTs & Elementor Shortcodes
 * Paste into your active theme's functions.php or Code Snippets plugin.
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// 1. Enqueue Playfair Display, Cinzel & DM Sans Fonts
function calroof_enqueue_assets() {
    wp_enqueue_style(
        'calroof-google-fonts',
        'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=DM+Sans:wght@400;500&family=Playfair+Display:ital,wght@0,500;0,600;1,400&display=swap',
        array(),
        null
    );
    wp_enqueue_style( 'calroof-style', get_stylesheet_uri(), array(), '3.0.0' );
}
add_action( 'wp_enqueue_scripts', 'calroof_enqueue_assets' );

// 2. Register Custom Post Type: Roofing Companies (/roofing-companies/{slug}/)
function calroof_register_directory_cpt() {
    register_post_type( 'roofing_company', array(
        'labels' => array(
            'name'          => 'Roofing Companies',
            'singular_name' => 'Roofing Company',
            'add_new_item'  => 'Add New California Roofing Company',
        ),
        'public'       => true,
        'has_archive'  => true,
        'rewrite'      => array( 'slug' => 'roofing-companies', 'with_front' => false ),
        'menu_icon'    => 'dashicons-building',
        'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'show_in_rest' => true,
    ) );

    register_taxonomy( 'roofing_service', 'roofing_company', array(
        'label'        => 'Roofing Services',
        'rewrite'      => array( 'slug' => 'roofing-services' ),
        'hierarchical' => true,
        'show_in_rest' => true,
    ) );

    register_taxonomy( 'california_city', 'roofing_company', array(
        'label'        => 'California Cities',
        'rewrite'      => array( 'slug' => 'roofing-companies/california' ),
        'hierarchical' => true,
        'show_in_rest' => true,
    ) );
}
add_action( 'init', 'calroof_register_directory_cpt' );

// 3. Shortcode [calroof_search_bar] — Use on Homepage & Directory Page
add_shortcode( 'calroof_search_bar', function() {
    ob_start(); ?>
    <form action="<?php echo esc_url( home_url( '/roofing-companies/' ) ); ?>" method="get" class="calroof-glass-card" style="padding:18px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:24px 0;">
        <input type="text" name="service" placeholder="Service (Tile Relay, Roof Repair...)" style="padding:14px 16px;border-radius:12px;border:1px solid #E2E8F0;font-size:16px;" />
        <input type="text" name="city" placeholder="California City or ZIP (Los Angeles, 90025)" style="padding:14px 16px;border-radius:12px;border:1px solid #E2E8F0;font-size:16px;" />
        <button type="submit" style="padding:14px 28px;border-radius:12px;border:none;background:#D9532F;color:#fff;font-size:16px;font-weight:500;cursor:pointer;">Search California Roofers</button>
    </form>
    <?php return ob_get_clean();
} );

// 4. Shortcode [calroof_directory_grid] — Displays Roofing Companies Grid on Any Page
add_shortcode( 'calroof_directory_grid', function( $atts ) {
    $atts = shortcode_atts( array( 'limit' => 6 ), $atts );
    $q = new WP_Query( array( 'post_type' => 'roofing_company', 'posts_per_page' => intval( $atts['limit'] ) ) );
    ob_start();
    echo '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:24px;margin-top:24px;">';
    if ( $q->have_posts() ) :
        while ( $q->have_posts() ) : $q->the_post();
            $cslb = get_post_meta( get_the_ID(), 'cslb_license', true ) ?: 'CSLB #1048291 (Active C-39)';
            $city = get_post_meta( get_the_ID(), 'primary_city', true ) ?: 'Los Angeles, CA';
            $phone = get_post_meta( get_the_ID(), 'phone', true ) ?: '(310) 555-0148';
            ?>
            <div class="calroof-glass-card" style="padding:28px;">
                <div style="font-size:12px;color:#15803D;font-weight:500;">Verified C-39 · <?php echo esc_html( $cslb ); ?></div>
                <h3 style="font-family:'Playfair Display',serif;font-weight:600;font-size:24px;margin:8px 0;">
                    <a href="<?php the_permalink(); ?>" style="color:#0F172A;text-decoration:none;"><?php the_title(); ?></a>
                </h3>
                <div style="font-size:14px;color:#475569;margin-bottom:12px;"><?php echo esc_html( $city ); ?></div>
                <p style="font-size:15.5px;color:#475569;line-height:1.6;"><?php echo wp_trim_words( get_the_excerpt(), 22 ); ?></p>
                <div style="margin-top:18px;padding-top:14px;border-top:1px solid #E2E8F0;display:flex;justify-content:space-between;align-items:center;">
                    <a href="<?php the_permalink(); ?>" style="padding:10px 20px;border-radius:10px;background:#D9532F;color:#fff;text-decoration:none;font-size:14px;">Request Free Quote</a>
                    <a href="tel:<?php echo esc_attr( $phone ); ?>" style="color:#0F172A;text-decoration:none;font-family:monospace;font-size:14px;"><?php echo esc_html( $phone ); ?></a>
                </div>
            </div>
            <?php
        endwhile;
        wp_reset_postdata();
    else :
        echo '<p>Add roofing companies under WP Admin -> Roofing Companies -> Add New.</p>';
    endif;
    echo '</div>';
    return ob_get_clean();
} );

// 5. Shortcode [calroof_city_grid] — Displays California Cities Hub Grid
add_shortcode( 'calroof_city_grid', function() {
    $cities = array(
        'Los Angeles' => 'Los Angeles County', 'San Diego' => 'San Diego County',
        'San Jose' => 'Santa Clara County', 'San Francisco' => 'SF County',
        'Sacramento' => 'Sacramento County', 'Irvine' => 'Orange County',
        'Oakland' => 'Alameda County', 'Fresno' => 'Fresno County'
    );
    ob_start();
    echo '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:20px;">';
    foreach ( $cities as $city => $county ) {
        echo '<a href="/roofing-companies/california/' . sanitize_title( $city ) . '/" class="calroof-glass-card" style="padding:22px;text-decoration:none;display:block;">';
        echo '<h3 style="font-family:\'Playfair Display\',serif;font-weight:600;font-size:21px;color:#0F172A;margin:0;">' . esc_html( $city ) . '</h3>';
        echo '<div style="font-size:14px;color:#475569;margin-top:4px;">' . esc_html( $county ) . '</div>';
        echo '</a>';
    }
    echo '</div>';
    return ob_get_clean();
} );

// 6. Shortcode [calroof_company_form] — Frontend Contractor Listing Form
add_shortcode( 'calroof_company_form', function() {
    ob_start(); ?>
    <form class="calroof-glass-card" style="padding:32px;max-width:760px;display:grid;gap:16px;">
        <h3 style="font-family:'Playfair Display',serif;font-weight:600;font-size:26px;margin:0;">Submit Your California Roofing Company</h3>
        <input type="text" placeholder="Company Legal Name *" required style="padding:14px;border-radius:12px;border:1px solid #CBD5E1;font-size:16px;" />
        <input type="text" placeholder="California CSLB C-39 License Number *" required style="padding:14px;border-radius:12px;border:1px solid #CBD5E1;font-size:16px;" />
        <input type="tel" placeholder="Direct Dispatch Phone Number *" required style="padding:14px;border-radius:12px;border:1px solid #CBD5E1;font-size:16px;" />
        <input type="text" placeholder="Primary California City & ZIP Code *" required style="padding:14px;border-radius:12px;border:1px solid #CBD5E1;font-size:16px;" />
        <textarea rows="4" placeholder="Describe your roofing specialties (Tile Relay, Cool Roofs, Commercial TPO...)" style="padding:14px;border-radius:12px;border:1px solid #CBD5E1;font-size:16px;"></textarea>
        <button type="submit" style="padding:16px 28px;border-radius:12px;border:none;background:#D9532F;color:#fff;font-size:16px;font-weight:500;cursor:pointer;">Submit Company Profile</button>
    </form>
    <?php return ob_get_clean();
} );
`;

  const downloadAllPagesBundle = () => {
    const bundle = {
      package: 'CalRoof Directory — Complete 6-Page WordPress Elementor Bundle',
      typography: 'Playfair Display + Cinzel + DM Sans',
      pages: elementorPageTemplates
    };
    downloadFile(
      'calroof-all-6-pages-elementor-bundle.json',
      JSON.stringify(bundle, null, 2),
      'application/json'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/', onClick: onNavigateHome },
          { label: 'Complete Multi-Page WordPress & Elementor Kit' }
        ]}
        onNavigate={() => {}}
      />

      {/* Hero Header */}
      <div className="glass-panel rounded-3xl p-8 md:p-12 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D9532F]/10 text-[#D9532F] text-xs font-brand font-medium uppercase tracking-[0.14em] mb-4">
          <Sparkles className="w-4 h-4" />
          All 6 Website Pages + Dynamic WordPress Theme Package
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-semibold text-[#0F172A] leading-tight">
          Complete Multi-Page WordPress & Elementor Setup Kit
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[#475569] font-normal max-w-3xl leading-relaxed">
          Ab aapko sirf 1 page nahi, balki poori website ke <strong>Tamam 6 Pages ki alag-alag Elementor `.JSON` files</strong> + <strong>Dynamic WordPress Shortcodes (`functions.php`)</strong> + <strong>Glassmorphism `style.css`</strong> niche di gayi hain, taake aap poori directory website 100% Elementor me set kar sakein.
        </p>

        {/* Master Download Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => downloadFile('style.css', wpStyleCss, 'text/css')}
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-[#0F172A] text-white font-medium text-base hover:bg-slate-800 transition-all cursor-pointer"
          >
            <FileCode2 className="w-5 h-5 text-[#FF6B4A]" />
            1. Download Theme `style.css` (Fonts + Glass UI)
          </button>

          <button
            type="button"
            onClick={() => downloadFile('functions.php', wpFunctionsPhp, 'text/plain')}
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B4A] to-[#D9532F] text-white font-medium text-base shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            <Layers className="w-5 h-5" />
            2. Download `functions.php` (All Pages CPT & Shortcodes)
          </button>

          <button
            type="button"
            onClick={downloadAllPagesBundle}
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl border border-[#0F172A] text-[#0F172A] font-medium text-base hover:bg-[#0F172A] hover:text-white transition-all cursor-pointer"
          >
            <Download className="w-5 h-5" />
            Download All 6 Pages Master Bundle (.JSON)
          </button>
        </div>
      </div>

      {/* SECTION A: INDIVIDUAL ELEMENTOR JSON TEMPLATES FOR ALL 6 PAGES */}
      <div className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-brand font-medium text-[#D9532F] uppercase tracking-[0.14em] mb-1">
              Step-by-Step Page Templates
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-[#0F172A]">
              Download Elementor `.JSON` Files for Every Page (Pages 1 to 6)
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {elementorPageTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="glass-panel rounded-3xl p-7 flex flex-col justify-between gap-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-xl bg-[#D9532F]/12 text-[#D9532F] font-brand text-xs font-medium uppercase tracking-wider">
                    {tpl.pageNumber}
                  </span>
                  <span className="font-mono text-xs text-[#475569]">
                    {tpl.wpPageSlug}
                  </span>
                </div>

                <h3 className="text-xl font-display font-semibold text-[#0F172A] leading-snug">
                  {tpl.title}
                </h3>

                <p className="mt-2 text-sm text-[#475569] font-normal leading-relaxed">
                  {tpl.description}
                </p>

                <div className="mt-4 p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200/80 text-xs text-[#334155] leading-relaxed">
                  <strong className="font-medium text-[#0F172A] block mb-1">
                    Elementor me kaise lagayein:
                  </strong>
                  {tpl.howToUseUrdu}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  downloadFile(
                    tpl.filename,
                    JSON.stringify(tpl.jsonData, null, 2),
                    'application/json'
                  )
                }
                className="w-full py-3.5 px-4 rounded-xl bg-[#0F172A] hover:bg-[#D9532F] text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <FileJson className="w-4 h-4" />
                Download {tpl.pageNumber} (.JSON)
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION B: COMPLETE ROMAN URDU + ENGLISH MULTI-PAGE GUIDE */}
      <div className="glass-panel rounded-3xl p-8 md:p-10 mb-12">
        <div className="flex items-center gap-2.5 text-xs font-brand font-medium text-[#D9532F] uppercase tracking-[0.14em] mb-2">
          <BookOpen className="w-4 h-4" />
          Complete Multi-Page WordPress & Elementor Architecture Guide
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-semibold text-[#0F172A] mb-6">
          Baqi Tamam Pages WordPress Elementor Me Kaise Set Karein? (Step-by-Step)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-[#334155]">
          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200/80">
            <h3 className="text-xl font-display font-semibold text-[#0F172A] mb-2">
              Step 1: Theme Style & Dynamic Functions Lagaen
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Sabse pehle WordPress me <strong>Hello Elementor</strong> theme install karein. Phir:
              <br />• <strong>Appearance → Customize → Additional CSS</strong> me hamara `style.css` code paste karein (is se Playfair Display + Cinzel fonts aur Glassy Cards poori website par apply ho jayenge).
              <br />• <strong>WPCode / Code Snippets</strong> plugin ya Theme ke `functions.php` me hamara PHP code paste karein. Ye automatically WordPress dashboard me <strong>Roofing Companies</strong> ka section aur 4 dynamic shortcodes bana dega!
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200/80">
            <h3 className="text-xl font-display font-semibold text-[#0F172A] mb-2">
              Step 2: WordPress Me 5 Main Pages Create Karein
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              WordPress Admin → <strong>Pages → Add New</strong> par ja kar ye 5 pages banayein:
              <br />1. <strong>Home</strong> (Import `calroof-page-1-homepage.json`)
              <br />2. <strong>Roofing Companies</strong> (Import `calroof-page-2-directory.json`)
              <br />3. <strong>Locations</strong> (Import `calroof-page-4-locations-hub.json`)
              <br />4. <strong>List Your Company</strong> (Import `calroof-page-5-list-company.json`)
              <br />5. <strong>Resources & Guides</strong> (Import `calroof-page-6-resources-about.json`)
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200/80">
            <h3 className="text-xl font-display font-semibold text-[#0F172A] mb-2">
              Step 3: Har Company Profile Page Automatically Kaise Banega?
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              Jab aap `functions.php` lagayenge, to WordPress ke left menu me <strong>"Roofing Companies → Add New"</strong> aa jayega. Wahan aap jitni bhi companies add karenge (maslan 50 ya 500 companies), WordPress khud unka URL `/roofing-companies/company-name/` bana dega! Aapko sirf 1 dafa `calroof-page-3-company-profile.json` ko Elementor Theme Builder (Single Post Template) me import karna hai.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 border border-slate-200/80">
            <h3 className="text-xl font-display font-semibold text-[#0F172A] mb-2">
              Step 4: Permalinks Aur Navigation Menu Set Karein
            </h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              • <strong>Settings → Permalinks</strong> me ja kar <em>"Post name"</em> select karein aur Save Changes dabayein (taake `/roofing-companies/` ke SEO URLs chal padein).
              <br />• <strong>Appearance → Menus</strong> me ja kar apne 5 pages ko Header Menu me add kar dein.
              <br />• Logo aur Favicon ke liye is website ki `/favicon.svg` file upload kar dein!
            </p>
          </div>
        </div>
      </div>

      {/* Copy-Paste Code Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel rounded-3xl p-7">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-display font-semibold text-[#0F172A]">
                1. WordPress `style.css` (Playfair Display + Cinzel + Glass UI)
              </h3>
              <p className="text-sm text-[#475569]">
                Paste in Appearance → Customize → Additional CSS or Theme `style.css`
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('css', wpStyleCss)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] text-white text-sm font-medium cursor-pointer"
            >
              {copiedBlock === 'css' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedBlock === 'css' ? 'Copied!' : 'Copy CSS'}
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-[#0F172A] text-slate-200 font-mono text-xs overflow-x-auto max-h-80">
            {wpStyleCss}
          </pre>
        </div>

        <div className="glass-panel rounded-3xl p-7">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-display font-semibold text-[#0F172A]">
                2. WordPress `functions.php` (CPTs + 4 All-Page Shortcodes)
              </h3>
              <p className="text-sm text-[#475569]">
                Powers `[calroof_search_bar]`, `[calroof_directory_grid]`, `[calroof_city_grid]`, & `[calroof_company_form]`
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('php', wpFunctionsPhp)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] text-white text-sm font-medium cursor-pointer"
            >
              {copiedBlock === 'php' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedBlock === 'php' ? 'Copied!' : 'Copy PHP'}
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-[#0F172A] text-slate-200 font-mono text-xs overflow-x-auto max-h-80">
            {wpFunctionsPhp}
          </pre>
        </div>
      </div>
    </div>
  );
};
