// src/types/navbar.types.ts

// Single navigation link (like "Home", "About", "Contact")
export interface NavItem {
  id: string;           // Unique identifier (e.g., "1", "2", "3")
  title: string;        // What users see (e.g., "Home")
  link: string;         // Where it goes (e.g., "/home" or "#home")
  alignment?: 'left' | 'center' | 'right'; // Alignment of this specific nav item
}

// The complete navbar configuration
export interface NavbarConfig {
  id: string;              // Unique ID for this navbar
  brandName: string;       // Site/company name (e.g., "My Website")
  logo?: string;           // Optional logo URL
  navItems: NavItem[];     // Array of navigation links
  backgroundColor: string; // Hex color (e.g., "#333333")
  textColor: string;       // Hex color (e.g., "#ffffff")
  
  // Additional customization options:
  fontSize?: string;        // e.g., "16px"
  fontFamily?: string;      // e.g., "Arial, sans-serif"
  position?: 'fixed' | 'static';  // Sticky navbar?
  height?: string;          // e.g., "60px"
}