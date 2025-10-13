// components/NavbarEditor.tsx
import React, { useState } from "react";
import { NavbarConfig, NavItem } from "../../types/navbar.types";
import { ChevronUp, ChevronDown, GripVertical, Trash2, Plus } from "lucide-react";

interface NavbarEditorProps {
  config: NavbarConfig;
  onChange: (config: NavbarConfig) => void;
}

const NavbarEditor: React.FC<NavbarEditorProps> = ({ config, onChange }) => {
const [isNavItemsExpanded, setIsNavItemsExpanded] = useState(true);
  const [isStylesExpanded, setIsStylesExpanded] = useState(true);
  const [isAdvancedExpanded, setIsAdvancedExpanded] = useState(false);
  const addNavItem = () => {
    const newItem: NavItem = {
      id: Date.now().toString(),
      title: 'New Link',
      link: '#',
      alignment: 'left' // Default alignment
    };
    onChange({
      ...config,
      navItems: [...(config.navItems || []), newItem]
    });
  };

  const updateNavItem = (id: string, updates: Partial<NavItem>) => {
    onChange({
      ...config,
      navItems: (config.navItems || []).map((item: NavItem) =>
        item.id === id ? { ...item, ...updates } : item
      )
    });
  };

  const deleteNavItem = (id: string) => {
    onChange({
      ...config,
      navItems: (config.navItems || []).filter((item: NavItem) => item.id !== id)
    });
  };
   const moveNavItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...(config.navItems || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newItems.length) {
      [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
      onChange({ ...config, navItems: newItems });
    }
  };

return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Navbar Settings</h2>

      {/* Brand Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Brand Name
          </label>
          <input
            type="text"
            value={config.brandName}
            onChange={(e) => onChange({ ...config, brandName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="My Website"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Logo URL (Optional)
          </label>
          <input
            type="text"
            value={config.logo || ''}
            onChange={(e) => onChange({ ...config, logo: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="https://example.com/logo.png"
          />
        </div>
      </div>

      {/* Navigation Items Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setIsNavItemsExpanded(!isNavItemsExpanded)}
          className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition"
        >
          <span className="font-semibold text-gray-800">Navigation Links</span>
          {isNavItemsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isNavItemsExpanded && (
          <div className="p-4 space-y-3">
            {!config.navItems || config.navItems.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No navigation links yet</p>
            ) : (
              config.navItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-gray-50 rounded-lg p-3 space-y-2 border border-gray-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveNavItem(index, 'up')}
                        disabled={index === 0}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition"
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        onClick={() => moveNavItem(index, 'down')}
                        disabled={index === (config.navItems || []).length - 1}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition"
                      >
                        <ChevronDown size={14} />
                      </button>
                    </div>
                    <GripVertical size={18} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Link {index + 1}</span>
                    <button
                      onClick={() => deleteNavItem(item.id)}
                      className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateNavItem(item.id, { title: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Link Title"
                  />
                  <input
                    type="text"
                    value={item.link}
                    onChange={(e) => updateNavItem(item.id, { link: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="URL or #section"
                  />
                  
                  {/* Alignment Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Alignment
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateNavItem(item.id, { alignment: 'left' })}
                        className={`flex-1 px-3 py-2 text-xs font-medium rounded transition ${
                          (!item.alignment || item.alignment === 'left')
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Left
                      </button>
                      <button
                        type="button"
                        onClick={() => updateNavItem(item.id, { alignment: 'center' })}
                        className={`flex-1 px-3 py-2 text-xs font-medium rounded transition ${
                          item.alignment === 'center'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Center
                      </button>
                      <button
                        type="button"
                        onClick={() => updateNavItem(item.id, { alignment: 'right' })}
                        className={`flex-1 px-3 py-2 text-xs font-medium rounded transition ${
                          item.alignment === 'right'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Right
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            <button
              onClick={addNavItem}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition"
            >
              <Plus size={18} />
              Add Navigation Link
            </button>
          </div>
        )}
      </div>

      {/* Styles Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setIsStylesExpanded(!isStylesExpanded)}
          className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition"
        >
          <span className="font-semibold text-gray-800">Styles</span>
          {isStylesExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isStylesExpanded && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Background Color
              </label>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => onChange({ ...config, backgroundColor: e.target.value })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    title="Pick a color"
                  />
                  <div 
                    className="h-10 w-16 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition"
                    style={{ backgroundColor: config.backgroundColor }}
                  />
                </div>
                <input
                  type="text"
                  value={config.backgroundColor}
                  onChange={(e) => onChange({ ...config, backgroundColor: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Text Color
              </label>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={config.textColor}
                    onChange={(e) => onChange({ ...config, textColor: e.target.value })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    title="Pick a color"
                  />
                  <div 
                    className="h-10 w-16 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition"
                    style={{ backgroundColor: config.textColor }}
                  />
                </div>
                <input
                  type="text"
                  value={config.textColor}
                  onChange={(e) => onChange({ ...config, textColor: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Settings Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setIsAdvancedExpanded(!isAdvancedExpanded)}
          className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition"
        >
          <span className="font-semibold text-gray-800">Advanced Settings</span>
          {isAdvancedExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isAdvancedExpanded && (
          <div className="p-4 space-y-4">
            {/* Font Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Font Size
              </label>
              <input
                type="text"
                value={config.fontSize || '16px'}
                onChange={(e) => onChange({ ...config, fontSize: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="16px"
              />
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Font Family
              </label>
              <input
                type="text"
                value={config.fontFamily || ''}
                onChange={(e) => onChange({ ...config, fontFamily: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Arial, sans-serif"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Navbar Height
              </label>
              <input
                type="text"
                value={config.height || '64px'}
                onChange={(e) => onChange({ ...config, height: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="64px"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Position
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ ...config, position: 'static' })}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded transition ${
                    (!config.position || config.position === 'static')
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Static
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...config, position: 'fixed' })}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded transition ${
                    config.position === 'fixed'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Fixed (Sticky)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarEditor;