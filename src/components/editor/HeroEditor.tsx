// components/editor/HeroEditor.tsx
import React, { useState } from "react";
import { HeroConfig, HeroButton } from "../../types/hero.types";
import { ChevronUp, ChevronDown, Trash2, Plus } from "lucide-react";

interface HeroEditorProps {
  config: HeroConfig;
  onChange: (config: HeroConfig) => void;
}

const HeroEditor: React.FC<HeroEditorProps> = ({ config, onChange }) => {
  const [isContentExpanded, setIsContentExpanded] = useState(true);
  const [isStylesExpanded, setIsStylesExpanded] = useState(true);
  const [isAdvancedExpanded, setIsAdvancedExpanded] = useState(false);

  // Ensure buttons is always an array
  const buttons = config.buttons || [];

  const addButton = () => {
    if (buttons.length >= 2) {
      alert('Maximum 2 buttons allowed');
      return;
    }

    const newButton: HeroButton = {
      id: Date.now().toString(),
      text: 'New Button',
      link: '#',
      variant: buttons.length === 0 ? 'primary' : 'secondary'
    };

    onChange({
      ...config,
      buttons: [...buttons, newButton]
    });
  };

  const updateButton = (id: string, updates: Partial<HeroButton>) => {
    onChange({
      ...config,
      buttons: buttons.map((btn) =>
        btn.id === id ? { ...btn, ...updates } : btn
      )
    });
  };

  const deleteButton = (id: string) => {
    onChange({
      ...config,
      buttons: buttons.filter((btn) => btn.id !== id)
    });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Hero Section Settings</h2>

      {/* Content Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setIsContentExpanded(!isContentExpanded)}
          className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition"
        >
          <span className="font-semibold text-gray-800">Content</span>
          {isContentExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isContentExpanded && (
          <div className="p-4 space-y-4">
            {/* Heading */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Main Heading
              </label>
              <input
                type="text"
                value={config.heading}
                onChange={(e) => onChange({ ...config, heading: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Welcome to Our Site"
              />
            </div>

            {/* Subheading */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subheading (Optional)
              </label>
              <textarea
                value={config.subheading || ''}
                onChange={(e) => onChange({ ...config, subheading: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Your tagline or description"
                rows={3}
              />
            </div>

            {/* Text Alignment */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Text Alignment
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ ...config, textAlignment: 'left' })}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition ${
                    config.textAlignment === 'left'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Left
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...config, textAlignment: 'center' })}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition ${
                    config.textAlignment === 'center'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Center
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Call-to-Action Buttons (Max 2)
              </label>

              {buttons.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No buttons yet</p>
              ) : (
                buttons.map((button, index) => (
                  <div 
                    key={button.id}
                    className="bg-gray-50 rounded-lg p-3 space-y-2 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Button {index + 1}
                      </span>
                      <button
                        onClick={() => deleteButton(button.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={button.text}
                      onChange={(e) => updateButton(button.id, { text: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Button Text"
                    />
                    <input
                      type="text"
                      value={button.link}
                      onChange={(e) => updateButton(button.id, { link: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="URL or #section"
                    />

                    {/* Button Variant */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Style
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => updateButton(button.id, { variant: 'primary' })}
                          className={`flex-1 px-3 py-2 text-xs font-medium rounded transition ${
                            button.variant === 'primary'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Primary
                        </button>
                        <button
                          type="button"
                          onClick={() => updateButton(button.id, { variant: 'secondary' })}
                          className={`flex-1 px-3 py-2 text-xs font-medium rounded transition ${
                            button.variant === 'secondary'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          Secondary
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {buttons.length < 2 && (
                <button
                  onClick={addButton}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition"
                >
                  <Plus size={18} />
                  Add Button
                </button>
              )}
            </div>
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
            {/* Background Color */}
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
                  placeholder="#1a202c"
                />
              </div>
            </div>

            {/* Text Color */}
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
                  placeholder="#ffffff"
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
            {/* Background Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Background Image URL (Optional)
              </label>
              <input
                type="text"
                value={config.backgroundImage || ''}
                onChange={(e) => onChange({ ...config, backgroundImage: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="https://example.com/hero-bg.jpg"
              />
            </div>

            {/* Min Height */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Section Height
              </label>
              <input
                type="text"
                value={config.minHeight || '500px'}
                onChange={(e) => onChange({ ...config, minHeight: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="500px or 60vh"
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Heading Font Size
              </label>
              <input
                type="text"
                value={config.fontSize || '48px'}
                onChange={(e) => onChange({ ...config, fontSize: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="48px"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroEditor;
