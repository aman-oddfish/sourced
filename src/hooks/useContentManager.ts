'use client';

import { useState, useEffect } from 'react';

// Types for content management
interface ContentSection {
  id: string;
  title: string;
  type: 'text' | 'textarea' | 'image' | 'array';
  value: string | string[];
  placeholder?: string;
  maxLength?: number;
}

interface ContentData {
  hero: ContentSection[];
  navigation: ContentSection[];
  footer: ContentSection[];
  general: ContentSection[];
  whySourced: ContentSection[];
}

// Default content structure
const defaultContent: ContentData = {
  hero: [
    {
      id: 'hero-title',
      title: 'Hero Title',
      type: 'text',
      value: 'Manage. Book. Create.',
      placeholder: 'Enter hero title'
    },
    {
      id: 'hero-subtitle',
      title: 'Hero Subtitle',
      type: 'text',
      value: 'Sourced simplifies creative connections',
      placeholder: 'Enter hero subtitle'
    },
    {
      id: 'hero-image',
      title: 'Hero Background Image',
      type: 'image',
      value: '/image.png',
      placeholder: 'Upload hero image'
    },
    {
      id: 'morphing-texts',
      title: 'Morphing Text Options',
      type: 'array',
      value: [
        'Photographer', 'Videographer', 'VEHICLE OWNER', 'MODEL', 
        'INFLUENCER', 'ACTOR', 'STYLIST', 'HAIR STYLIST', 
        'MAKEUP ARTIST', 'EQUIPTMENT', 'LOCATION', 'OTHER'
      ]
    },
    {
      id: 'launching-text',
      title: 'Launching Text',
      type: 'text',
      value: 'Launching Soon.',
      placeholder: 'Enter launching text'
    }
  ],
  navigation: [
    {
      id: 'brand-name',
      title: 'Brand Name',
      type: 'text',
      value: 'SOURCED',
      placeholder: 'Enter brand name'
    },
    {
      id: 'how-it-works-items',
      title: 'How It Works Menu Items',
      type: 'array',
      value: ['For Talent', 'For Agents', 'Pricing', 'Security']
    },
    {
      id: 'company-items',
      title: 'Company Menu Items',
      type: 'array',
      value: ['About', 'Information', 'Team', 'Careers']
    }
  ],
  footer: [
    {
      id: 'subscription-title',
      title: 'Subscription Title',
      type: 'text',
      value: 'SUBSCRIBE FOR FIRST ACCESS',
      placeholder: 'Enter subscription title'
    },
    {
      id: 'subscription-subtitle',
      title: 'Subscription Subtitle',
      type: 'text',
      value: 'NO SALES OR SPAM',
      placeholder: 'Enter subscription subtitle'
    },
    {
      id: 'copyright-text',
      title: 'Copyright Text',
      type: 'text',
      value: '© Sourced. 2025 All rights reserved.',
      placeholder: 'Enter copyright text'
    },
    {
      id: 'instagram-icon',
      title: 'Instagram Icon',
      type: 'image',
      value: '/insta.png',
      placeholder: 'Upload Instagram icon'
    },
    {
      id: 'linkedin-icon',
      title: 'LinkedIn Icon',
      type: 'image',
      value: '/linkdin.png',
      placeholder: 'Upload LinkedIn icon'
    }
  ],
  general: [
    {
      id: 'site-title',
      title: 'Site Title',
      type: 'text',
      value: 'Sourced - Creative Network',
      placeholder: 'Enter site title'
    },
    {
      id: 'meta-description',
      title: 'Meta Description',
      type: 'textarea',
      value: 'Sourced simplifies creative connections. Find and hire top photographers, videographers, models, and more.',
      placeholder: 'Enter meta description',
      maxLength: 160
    }
  ],
  whySourced: [
    {
      id: 'why-sourced-badge',
      title: 'Section Badge Text',
      type: 'text',
      value: 'WHY SOURCED?',
      placeholder: 'Enter badge text'
    },
    {
      id: 'why-sourced-title',
      title: 'Section Title',
      type: 'text',
      value: 'How We Make Creative Collaborations Simple',
      placeholder: 'Enter section title'
    },
    {
      id: 'accordion-items',
      title: 'Accordion Items',
      type: 'array',
      value: [
        'Find and Shortlist Talent|Discover a curated network of top creative professionals. Browse portfolios, filter by specialization, and easily shortlist the perfect collaborators for your project needs.|Users',
        'Post Your Job in Minutes|Create detailed job postings in just a few clicks. Specify your project requirements, timeline, and budget, then share it with our network of talented professionals.|FileText'
      ]
    }
  ]
};

export const useContentManager = () => {
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load content from localStorage (in production, this would be an API call)
    const loadContent = () => {
      try {
        const savedContent = localStorage.getItem('site-content');
        if (savedContent) {
          const parsedContent = JSON.parse(savedContent);
          setContent(parsedContent);
        }
      } catch (error) {
        console.error('Error loading content:', error);
        // Fallback to default content
        setContent(defaultContent);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  // Helper function to get content by section and ID
  const getContent = (section: keyof ContentData, id: string): string | string[] => {
    const sectionContent = content[section];
    const item = sectionContent.find(item => item.id === id);
    return item?.value || '';
  };

  // Helper function to get text content
  const getText = (section: keyof ContentData, id: string): string => {
    const value = getContent(section, id);
    return Array.isArray(value) ? value.join(', ') : value;
  };

  // Helper function to get array content
  const getArray = (section: keyof ContentData, id: string): string[] => {
    const value = getContent(section, id);
    return Array.isArray(value) ? value : [value];
  };

  // Helper function to get image URL
  const getImage = (section: keyof ContentData, id: string): string => {
    const value = getContent(section, id);
    return Array.isArray(value) ? value[0] || '' : value;
  };

  return {
    content,
    isLoading,
    getContent,
    getText,
    getArray,
    getImage,
    // Specific content getters for common use cases
    heroTitle: getText('hero', 'hero-title'),
    heroSubtitle: getText('hero', 'hero-subtitle'),
    heroImage: getImage('hero', 'hero-image'),
    morphingTexts: getArray('hero', 'morphing-texts'),
    launchingText: getText('hero', 'launching-text'),
    brandName: getText('navigation', 'brand-name'),
    howItWorksItems: getArray('navigation', 'how-it-works-items'),
    companyItems: getArray('navigation', 'company-items'),
    subscriptionTitle: getText('footer', 'subscription-title'),
    subscriptionSubtitle: getText('footer', 'subscription-subtitle'),
    copyrightText: getText('footer', 'copyright-text'),
    instagramIcon: getImage('footer', 'instagram-icon'),
    linkedinIcon: getImage('footer', 'linkedin-icon'),
    siteTitle: getText('general', 'site-title'),
    metaDescription: getText('general', 'meta-description'),
    // Why Sourced section getters
    whySourcedBadge: getText('whySourced', 'why-sourced-badge'),
    whySourcedTitle: getText('whySourced', 'why-sourced-title'),
    accordionItems: getArray('whySourced', 'accordion-items')
  };
};

export type { ContentData, ContentSection }; 