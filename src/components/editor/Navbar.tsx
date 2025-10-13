// components/Navbar.tsx
import React from "react";
import { NavbarConfig } from "../../types/navbar.types";

interface NavbarProps {
  config: NavbarConfig;
  isEditing?: boolean;
  onEdit?: (config: NavbarConfig) => void;
}

export const Navbar = ({ config, isEditing, onEdit }: NavbarProps) => {
  // Group nav items by alignment
  const leftItems = (config.navItems || []).filter(item => !item.alignment || item.alignment === 'left');
  const centerItems = (config.navItems || []).filter(item => item.alignment === 'center');
  const rightItems = (config.navItems || []).filter(item => item.alignment === 'right');

  // Determine if we have items in different sections
  const hasLeftItems = leftItems.length > 0;
  const hasCenterItems = centerItems.length > 0;
  const hasRightItems = rightItems.length > 0;

  return (
    <nav 
      className={`w-full shadow-md ${config.position === 'fixed' ? 'sticky top-0 z-50' : 'relative'}`}
      style={{ 
        backgroundColor: config.backgroundColor,
        color: config.textColor,
        fontSize: config.fontSize || '16px',
        fontFamily: config.fontFamily || 'inherit',
        height: config.height || 'auto'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start"
          style={{ height: config.height || '4rem' }}
        >
          {/* Brand/Logo */}
          <div className="flex items-center space-x-3">
            {config.logo && (
              <img 
                src={config.logo} 
                alt="Logo" 
                className="h-8 w-8 rounded"
              />
            )}
            <span className="font-bold text-xl">{config.brandName}</span>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center flex-1 ml-8">
            {/* Left Aligned Items */}
            {hasLeftItems && (
              <div className="flex items-center space-x-6">
                {leftItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    className="hover:opacity-80 transition-opacity font-medium"
                    style={{ color: config.textColor }}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}

            {/* Center Aligned Items */}
            {hasCenterItems && (
              <div className={`flex items-center space-x-6 ${
                !hasLeftItems && !hasRightItems 
                  ? 'mx-auto' 
                  : hasLeftItems && !hasRightItems
                    ? 'mx-auto' 
                    : !hasLeftItems && hasRightItems
                      ? 'flex-1 justify-center' 
                      : 'mx-auto' 
              }`}>
                {centerItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    className="hover:opacity-80 transition-opacity font-medium"
                    style={{ color: config.textColor }}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}

            {/* Right Aligned Items */}
            {hasRightItems && (
              <div className="flex items-center space-x-6 ml-auto">
                {rightItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    className="hover:opacity-80 transition-opacity font-medium"
                    style={{ color: config.textColor }}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
            <button className="p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};