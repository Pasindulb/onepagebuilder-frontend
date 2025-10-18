import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import SideNav from "../components/SideNav";
import { NavbarConfig } from "../types/navbar.types";
import { HeroConfig } from "../types/hero.types";
import { Navbar } from "../components/editor/Navbar";
import NavbarEditor from "../components/editor/NavbarEditor";
import { Hero } from "../components/editor/Hero";
import HeroEditor from "../components/editor/HeroEditor";
import { saveDraft, publishSite, getProject } from "../api/project";

// pages/Editor.tsx
const Editor = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  
  const [draftConfig, setDraftConfig] = useState<any>();
  const [isPublished, setIsPublished] = useState(false);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [projectName, setProjectName] = useState('My Website');
  const [activeSection, setActiveSection] = useState('navbar');
  
  const [navbarConfig, setNavbarConfig] = useState<NavbarConfig>({
    id: '1',
    brandName: 'My Site',
    navItems: [
      { id: '1', title: 'Home', link: '#home', alignment: 'left' },
      { id: '2', title: 'About', link: '#about', alignment: 'left' }
    ],
    backgroundColor: '#333',
    textColor: '#fff'
  });

  const [heroConfig, setHeroConfig] = useState<HeroConfig>({
    id: '1',
    heading: 'Welcome to Our Site',
    subheading: 'Build beautiful landing pages in minutes',
    backgroundColor: '#1a202c',
    textColor: '#ffffff',
    textAlignment: 'center',
    buttons: []
  });

  const previewRef = useRef<HTMLDivElement>(null);

  // Helper function to clean old fields from navbar config
  const cleanNavbarConfig = (config: any): NavbarConfig => {
    if (config.navItems) {
      config.navItems = config.navItems.map((item: any) => {
        const { isButton, isExternal, icon, ...cleanItem } = item;
        return cleanItem;
      });
    }
    const { brandAlignment, ...cleanedConfig } = config;
    return cleanedConfig;
  };

  // Load project data on mount
  useEffect(() => {
    const loadProject = async () => {
      if (!projectId) {
        console.warn('No project ID provided');
        return;
      }

      try {
        const project = await getProject(Number(projectId));
        setProjectName(project.name);
        
        // Load draft config if exists
        if (project.draftConfig) {
          try {
            const config = JSON.parse(project.draftConfig);
            
            // Load navbar config
            if (config.navbar) {
              if (!config.navbar.navItems) config.navbar.navItems = [];
              setNavbarConfig(cleanNavbarConfig(config.navbar));
            } else if (config.navItems) {
              // Backward compatibility: old format had navbar at root
              if (!config.navItems) config.navItems = [];
              setNavbarConfig(cleanNavbarConfig(config));
            }
            
            // Load hero config
            if (config.hero) {
              // Ensure buttons array exists
              const heroConfigWithButtons = {
                ...config.hero,
                buttons: config.hero.buttons || []
              };
              setHeroConfig(heroConfigWithButtons);
            }
            
            setDraftConfig(config);
          } catch (e) {
            console.error('Failed to parse draft config:', e);
          }
        }

        // Check if published
        setIsPublished(!!project.publishedAt);
      } catch (error) {
        console.error('Failed to load project:', error);
      }
    };

    loadProject();
  }, [projectId]);

  // Notify SideNav when active section changes
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('editorSectionUpdate', {
      detail: { sectionId: activeSection }
    }));
  }, [activeSection]);

  // Scroll intersection observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
    );

    const sections = ['navbar', 'hero'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Listen for manual section changes from SideNav
  useEffect(() => {
    const handleSectionChange = (e: any) => {
      setActiveSection(e.detail.sectionId);
    };

    window.addEventListener('editorSectionChange', handleSectionChange);
    return () => window.removeEventListener('editorSectionChange', handleSectionChange);
  }, []);

  // Update draftConfig when any section config changes
  useEffect(() => {
    setDraftConfig({
      navbar: navbarConfig,
      hero: heroConfig
    });
  }, [navbarConfig, heroConfig]);

  // Auto-save draft when config changes
  useEffect(() => {
    if (!projectId || !draftConfig) return;

    const timer = setTimeout(async () => {
      await handleSaveDraft();
      setHasUnpublishedChanges(true);
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftConfig, projectId]);

  const handleSaveDraft = async () => {
    if (!projectId || isSaving) return;

    try {
      setIsSaving(true);
      await saveDraft(Number(projectId), draftConfig);
      console.log('Draft saved successfully');
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishSite = async () => {
    if (!projectId || isPublishing) return;

    try {
      setIsPublishing(true);
      const result = await publishSite(Number(projectId), draftConfig);
      setIsPublished(true);
      setHasUnpublishedChanges(false);
      
      // Show success message with live URL
      const message = `Site published successfully!\n\nYour site is now live at:\n${result.liveUrl}`;
      alert(message);
      
      // Optionally open the site in a new tab
      if (window.confirm('Would you like to visit your live site?')) {
        window.open(result.liveUrl, '_blank');
      }
    } catch (error) {
      console.error('Failed to publish site:', error);
      alert('Failed to publish site. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  // Render the appropriate editor based on active section
  const renderEditor = () => {
    switch (activeSection) {
      case 'navbar':
        return <NavbarEditor config={navbarConfig} onChange={setNavbarConfig} />;
      case 'hero':
        return <HeroEditor config={heroConfig} onChange={setHeroConfig} />;
      default:
        return <NavbarEditor config={navbarConfig} onChange={setNavbarConfig} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      
      {/* Middle: Properties Panel - Dynamic Editor */}
      <div className="w-96 border-r border-gray-200 bg-white overflow-y-auto">
        {renderEditor()}
      </div>

      {/* Right: Preview - takes full remaining space */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar with publish button */}
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="font-semibold">{projectName}</h1>
            {isSaving && (
              <span className="text-sm text-blue-600">💾 Saving...</span>
            )}
            {hasUnpublishedChanges && !isSaving && (
              <span className="text-sm text-amber-600">● Unpublished changes</span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Preview
            </button>
            <button 
              onClick={handlePublishSite}
              disabled={isPublishing}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPublishing ? 'Publishing...' : (isPublished ? 'Update Site' : 'Publish Site')}
            </button>
          </div>
        </div>
        
        {/* Preview Area - Full page scrollable with live preview */}
        <div ref={previewRef} className="flex-1 overflow-y-auto bg-white">
          {/* Navbar Section */}
          <div id="navbar">
            <Navbar config={navbarConfig} />
          </div>

          {/* Hero Section */}
          <div id="hero">
            <Hero config={heroConfig} />
          </div>

          {/* Placeholder for future sections */}
          <div className="py-32 text-center text-gray-400 bg-gray-50">
            <p className="text-lg">More sections coming soon...</p>
            <p className="text-sm mt-2">About • Services • Features • Contact • Footer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;