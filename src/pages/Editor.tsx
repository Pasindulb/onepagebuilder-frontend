import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SideNav from "../components/SideNav";
import { NavbarConfig } from "../types/navbar.types";
import { Navbar } from "../components/editor/Navbar";
import NavbarEditor from "../components/editor/NavbarEditor";
import { saveDraft, publishSite, getProject } from "../api/project";

// pages/Editor.tsx
const Editor = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  
  const [draftConfig, setDraftConfig] = useState<NavbarConfig>();
  const [isPublished, setIsPublished] = useState(false);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [projectName, setProjectName] = useState('My Website');
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
            // Ensure navItems exists
            if (!config.navItems) {
              config.navItems = [];
            }
            setNavbarConfig(config);
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

  // Auto-save draft when config changes
  useEffect(() => {
    if (!projectId || !draftConfig) return;

    const timer = setTimeout(async () => {
      await handleSaveDraft();
      setHasUnpublishedChanges(true);
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timer);
  }, [draftConfig, projectId]);

  // Update draftConfig when navbarConfig changes
  useEffect(() => {
    setDraftConfig(navbarConfig);
  }, [navbarConfig]);

  const handleSaveDraft = async () => {
    if (!projectId || isSaving) return;

    try {
      setIsSaving(true);
      await saveDraft(Number(projectId), navbarConfig);
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
      await publishSite(Number(projectId), navbarConfig);
      setIsPublished(true);
      setHasUnpublishedChanges(false);
      alert('Site published successfully!');
    } catch (error) {
      console.error('Failed to publish site:', error);
      alert('Failed to publish site. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      
      {/* Middle: Properties Panel (NavbarEditor) */}
      <div className="w-96 border-r border-gray-200 bg-white overflow-y-auto">
        <NavbarEditor 
          config={navbarConfig}
          onChange={setNavbarConfig}
        />
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
        
        {/* Preview Area - scrollable */}
        <div className="flex-1 overflow-y-auto bg-[hsl(var(--bg-secondary))]">
          <div className="p-4">
            <div className="rounded-lg shadow-sm bg-white mb-4">
              {/* Preview container with overflow for sticky behavior */}
              <div className="rounded-lg overflow-auto border border-gray-200" style={{ maxHeight: '600px' }}>
                <Navbar config={navbarConfig} />
                
                {/* Placeholder content to show navbar behavior */}
                <div className="p-8 space-y-4">
                  <h2 className="text-2xl font-bold">Preview Content</h2>
                  <p className="text-gray-600">Your page content will appear here.</p>
                  <p className="text-gray-600">
                    {navbarConfig.position === 'fixed' 
                      ? 'Scroll down to see the navbar stick to the top ↓' 
                      : 'Navbar will scroll with the page'}
                  </p>
                  
                  {/* Add more content to enable scrolling */}
                  {[...Array(20)].map((_, i) => (
                    <p key={i} className="text-gray-500">Sample content line {i + 1}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;