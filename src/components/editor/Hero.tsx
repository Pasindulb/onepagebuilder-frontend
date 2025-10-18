// components/editor/Hero.tsx
import React from "react";
import { HeroConfig } from "../../types/hero.types";

interface HeroProps {
  config: HeroConfig;
}

export const Hero: React.FC<HeroProps> = ({ config }) => {
  const {
    heading,
    subheading,
    backgroundColor,
    textColor,
    textAlignment,
    buttons = [],
    backgroundImage,
    minHeight = '500px',
    fontSize = '48px',
    fontFamily
  } = config;

  return (
    <section
      className="w-full relative flex items-center justify-center"
      style={{
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight,
        fontFamily: fontFamily || 'inherit'
      }}
    >
      {/* Overlay for better text readability if background image exists */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black opacity-40"></div>
      )}

      <div 
        className={`relative z-10 max-w-6xl mx-auto px-8 py-16 ${
          textAlignment === 'center' ? 'text-center' : 'text-left'
        }`}
        style={{ color: textColor }}
      >
        {/* Heading */}
        <h1 
          className="font-bold mb-6 leading-tight"
          style={{ fontSize }}
        >
          {heading}
        </h1>

        {/* Subheading */}
        {subheading && (
          <p 
            className="text-lg mb-8 opacity-90 max-w-2xl"
            style={{ 
              marginLeft: textAlignment === 'center' ? 'auto' : '0',
              marginRight: textAlignment === 'center' ? 'auto' : '0'
            }}
          >
            {subheading}
          </p>
        )}

        {/* Buttons */}
        {buttons.length > 0 && (
          <div 
            className={`flex gap-4 ${
              textAlignment === 'center' ? 'justify-center' : 'justify-start'
            }`}
          >
            {buttons.slice(0, 2).map((button) => (
              <a
                key={button.id}
                href={button.link}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  button.variant === 'primary'
                    ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl'
                    : 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
                }`}
                style={{
                  ...(button.variant === 'primary' && backgroundColor !== '#ffffff' 
                    ? {} 
                    : button.variant === 'primary'
                    ? { backgroundColor: textColor, color: backgroundColor }
                    : {})
                }}
              >
                {button.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
