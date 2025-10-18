// src/types/hero.types.ts

// Button in hero section (like "Get Started", "Learn More")
export interface HeroButton {
  id: string;              // Unique identifier
  text: string;            // Button text (e.g., "Get Started")
  link: string;            // Where it goes (e.g., "/signup" or "#contact")
  variant: 'primary' | 'secondary'; // Style variant
}

// The complete hero section configuration
export interface HeroConfig {
  id: string;                      // Unique ID for this hero section
  heading: string;                 // Main headline (e.g., "Welcome to Our Site")
  subheading?: string;             // Secondary text/tagline
  backgroundColor: string;         // Hex color (e.g., "#1a202c")
  textColor: string;               // Hex color (e.g., "#ffffff")
  textAlignment: 'left' | 'center'; // Text alignment
  buttons: HeroButton[];           // Up to 2 buttons
  
  // Additional customization options:
  backgroundImage?: string;        // Optional background image URL
  minHeight?: string;              // e.g., "400px", "60vh"
  fontSize?: string;               // Heading font size e.g., "48px"
  fontFamily?: string;             // e.g., "Arial, sans-serif"
}
