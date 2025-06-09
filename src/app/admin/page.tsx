'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Eye, EyeOff, Settings, Home, Users, FileText, Image as ImageIcon, Lock, Unlock, Plus, Trash2 } from 'lucide-react';

// Types for content management
interface ContentSection {
  id: string;
  title: string;
  type: 'text' | 'textarea' | 'image' | 'array' | 'accordion';
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

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('hero');
  const [contentData, setContentData] = useState<ContentData>({
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
        type: 'accordion',
        value: [
          'Find and Shortlist Talent|Discover a curated network of top creative professionals. Browse portfolios, filter by specialization, and easily shortlist the perfect collaborators for your project needs.|Users',
          'Post Your Job in Minutes|Create detailed job postings in just a few clicks. Specify your project requirements, timeline, and budget, then share it with our network of talented professionals.|FileText'
        ]
      }
    ]
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Simple authentication (in production, use proper auth)
  const handleLogin = () => {
    if (password === 'admin123') { // Change this to a secure password
      setIsAuthenticated(true);
      localStorage.setItem('admin-auth', 'true');
    } else {
      alert('Invalid password');
    }
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('admin-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleContentChange = (sectionKey: keyof ContentData, itemId: string, newValue: string | string[]) => {
    setContentData(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map(item =>
        item.id === itemId ? { ...item, value: newValue } : item
      )
    }));
    setHasChanges(true);
  };

  const handleArrayItemChange = (sectionKey: keyof ContentData, itemId: string, index: number, newValue: string) => {
    setContentData(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map(item => {
        if (item.id === itemId && Array.isArray(item.value)) {
          const newArray = [...item.value];
          newArray[index] = newValue;
          return { ...item, value: newArray };
        }
        return item;
      })
    }));
    setHasChanges(true);
  };

  const addArrayItem = (sectionKey: keyof ContentData, itemId: string) => {
    setContentData(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map(item => {
        if (item.id === itemId && Array.isArray(item.value)) {
          return { ...item, value: [...item.value, ''] };
        }
        return item;
      })
    }));
    setHasChanges(true);
  };

  const removeArrayItem = (sectionKey: keyof ContentData, itemId: string, index: number) => {
    setContentData(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map(item => {
        if (item.id === itemId && Array.isArray(item.value)) {
          const newArray = item.value.filter((_, i) => i !== index);
          return { ...item, value: newArray };
        }
        return item;
      })
    }));
    setHasChanges(true);
  };

  const handleImageUpload = (sectionKey: keyof ContentData, itemId: string, file: File) => {
    // In a real implementation, you'd upload to a cloud service
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      handleContentChange(sectionKey, itemId, result);
    };
    reader.readAsDataURL(file);
  };

  const saveChanges = async () => {
    try {
      // In a real implementation, save to database/API
      localStorage.setItem('site-content', JSON.stringify(contentData));
      setHasChanges(false);
      alert('Changes saved successfully!');
    } catch (error) {
      alert('Error saving changes');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-auth');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <div className="text-center mb-6">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600">Enter password to access dashboard</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'navigation', label: 'Navigation', icon: Settings },
    { id: 'whySourced', label: 'Why Sourced', icon: Users },
    { id: 'footer', label: 'Footer', icon: FileText },
    { id: 'general', label: 'General', icon: Users }
  ];

  const renderContentEditor = (section: ContentSection, sectionKey: keyof ContentData) => {
    switch (section.type) {
      case 'text':
        return (
          <input
            type="text"
            value={section.value as string}
            onChange={(e) => handleContentChange(sectionKey, section.id, e.target.value)}
            placeholder={section.placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        );
      
      case 'textarea':
        return (
          <div>
            <textarea
              value={section.value as string}
              onChange={(e) => handleContentChange(sectionKey, section.id, e.target.value)}
              placeholder={section.placeholder}
              maxLength={section.maxLength}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            {section.maxLength && (
              <p className="text-sm text-gray-500 mt-1">
                {(section.value as string).length}/{section.maxLength} characters
              </p>
            )}
          </div>
        );
      
      case 'image':
        return (
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              {section.value && (
                <img
                  src={section.value as string}
                  alt={section.title}
                  className="h-20 w-20 object-cover rounded-lg border"
                />
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(sectionKey, section.id, file);
                    }
                  }}
                  className="hidden"
                  id={`upload-${section.id}`}
                />
                <label
                  htmlFor={`upload-${section.id}`}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </label>
              </div>
            </div>
            <input
              type="text"
              value={section.value as string}
              onChange={(e) => handleContentChange(sectionKey, section.id, e.target.value)}
              placeholder="Or enter image URL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        );
      
      case 'accordion':
        return (
          <div className="space-y-4">
            {(section.value as string[]).map((item, index) => {
              const [title, description, icon] = item.split('|');
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Accordion Item {index + 1}</h4>
                    <button
                      onClick={() => removeArrayItem(sectionKey, section.id, index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={title || ''}
                        onChange={(e) => {
                          const newValue = `${e.target.value}|${description || ''}|${icon || 'Users'}`;
                          handleArrayItemChange(sectionKey, section.id, index, newValue);
                        }}
                        placeholder="Enter accordion title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={description || ''}
                        onChange={(e) => {
                          const newValue = `${title || ''}|${e.target.value}|${icon || 'Users'}`;
                          handleArrayItemChange(sectionKey, section.id, index, newValue);
                        }}
                        placeholder="Enter accordion description"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                      <select
                        value={icon || 'Users'}
                        onChange={(e) => {
                          const newValue = `${title || ''}|${description || ''}|${e.target.value}`;
                          handleArrayItemChange(sectionKey, section.id, index, newValue);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="Users">Users (People)</option>
                        <option value="FileText">FileText (Document)</option>
                        <option value="Calendar">Calendar</option>
                        <option value="CreditCard">CreditCard (Payment)</option>
                        <option value="Settings">Settings</option>
                        <option value="Image">Image</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <button
              onClick={() => {
                const newAccordion = 'New Accordion Title|Enter description here|Users';
                addArrayItem(sectionKey, section.id);
                // Update the last item with the template
                const currentItems = section.value as string[];
                const newItems = [...currentItems];
                newItems[newItems.length - 1] = newAccordion;
                handleContentChange(sectionKey, section.id, newItems);
              }}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Accordion Item
            </button>
          </div>
        );
      
      case 'array':
        return (
          <div className="space-y-3">
            {(section.value as string[]).map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayItemChange(sectionKey, section.id, index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button
                  onClick={() => removeArrayItem(sectionKey, section.id, index)}
                  className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem(sectionKey, section.id)}
              className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
            >
              Add Item
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Content Management Dashboard</h1>
              {hasChanges && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Unsaved Changes
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {previewMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </button>
              <button
                onClick={saveChanges}
                disabled={!hasChanges}
                className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Unlock className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              
              <div className="space-y-6">
                {contentData[activeTab as keyof ContentData].map((section) => (
                  <div key={section.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {section.title}
                    </label>
                    {renderContentEditor(section, activeTab as keyof ContentData)}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 