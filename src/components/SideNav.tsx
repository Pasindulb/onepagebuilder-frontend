import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Edit3, 
  CreditCard, 
  Settings, 
  HelpCircle,
  Target,
  Info,
  Wrench,
  Star,
  Mail,
  FileText,
  Receipt,
  RefreshCw,
  Wallet,
  User,
  Lock,
  Bell,
  Palette,
  Sun,
  Moon,
  Navigation
} from "lucide-react";

const SideNav = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage or default to false
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [activeSection, setActiveSection] = useState("editor");
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  // Update active section based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/dashboard")) {
      setActiveSection("dashboard");
    } else if (path.startsWith("/editor")) {
      setActiveSection("editor");
    } else if (path.startsWith("/billing")) {
      setActiveSection("billing");
    } else if (path.startsWith("/settings")) {
      setActiveSection("settings");
    }
  }, [location.pathname]);

  // Apply dark mode class and save to localStorage
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
      localStorage.setItem('darkMode', 'true');
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  const handleSectionClick = (section: any) => {
    setActiveSection(section.id);
    
    // Editor section navigates to /editor page
    if (section.id === "editor") {
      navigate("/editor");
      return;
    }
    
    // Other sections navigate to their first subsection
    if (section.subsections && section.subsections.length > 0) {
      const firstSubsection = section.subsections[0];
      if (firstSubsection.href) {
        navigate(firstSubsection.href);
      }
    }
  };

  const handleSubsectionClick = (item: any) => {
    // If item has href (Dashboard, Billing, Settings), navigate to it
    if (item.href) {
      navigate(item.href);
      return;
    }
    
    // Otherwise (Editor subsections), scroll to element by ID
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const mainSections = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: LayoutDashboard,
      subsections: [
        { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/dashboard/overview" },
        { id: "analytics", label: "Analytics", icon: Star, href: "/dashboard/analytics" },
        { id: "reports", label: "Reports", icon: FileText, href: "/dashboard/reports" },
      ]
    },
    { 
      id: "editor", 
      label: "Editor", 
      icon: Edit3,
      subsections: [
        { id: "navbar", label: "Navbar", icon: Navigation },
        { id: "hero", label: "Hero", icon: Target },
        { id: "about", label: "About", icon: Info },
        { id: "services", label: "Services", icon: Wrench },
        { id: "features", label: "Features", icon: Star },
        { id: "contact", label: "Contact", icon: Mail },
        { id: "footer", label: "Footer", icon: FileText },
      ]
    },
    { 
      id: "billing", 
      label: "Billing", 
      icon: CreditCard,
      subsections: [
        { id: "invoices", label: "Invoices", icon: Receipt, href: "/billing/invoices" },
        { id: "subscriptions", label: "Subscriptions", icon: RefreshCw, href: "/billing/subscriptions" },
        { id: "payment-methods", label: "Payment Methods", icon: Wallet, href: "/billing/payment-methods" },
      ]
    },
    { 
      id: "settings", 
      label: "Settings", 
      icon: Settings,
      subsections: [
        { id: "profile", label: "Profile", icon: User, href: "/settings/profile" },
        { id: "security", label: "Security", icon: Lock, href: "/settings/security" },
        { id: "notifications", label: "Notifications", icon: Bell, href: "/settings/notifications" },
        { id: "appearance", label: "Appearance", icon: Palette, href: "/settings/appearance" },
      ]
    },
  ];

  const activeContent = mainSections.find(s => s.id === activeSection);

  if (!authContext?.user) {
    return null;
  }

  const { name, sub: email } = authContext.user;

  return (
    <>
      {/* Slim Icon Bar */}
      <div className="w-20 bg-[hsl(var(--bg-primary))] border-r border-[hsl(var(--border))] flex flex-col items-center py-6 transition-all duration-300">
        {/* Logo */}
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl flex items-center justify-center mb-8 cursor-pointer hover:scale-105 transition-transform duration-200 shadow-lg shadow-red-500/20">
          <Palette className="w-6 h-6 text-white" />
        </div>
        
        {/* Main Sections */}
          <div className="flex-1 flex flex-col gap-2 w-full px-3">
            {mainSections.map((section) => {
              const IconComponent = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <div 
                  key={section.id} 
                  className="relative"
                  onMouseEnter={() => setHoveredIcon(section.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <button
                    className={`w-full h-12 flex items-center justify-center rounded-xl transition-all duration-200 relative group ${
                      isActive 
                        ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-lg shadow-red-500/30' 
                        : 'text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--hover-bg))]'
                    }`}
                    onClick={() => handleSectionClick(section)}
                  >
                    <IconComponent className="w-5 h-5" />
                    {isActive && (
                      <div className="absolute right-0 w-1 h-6 bg-[hsl(var(--primary))] rounded-l-full" />
                    )}
                  </button>
                  
                  {/* Tooltip */}
                  {hoveredIcon === section.id && (
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[hsl(var(--text-primary))] text-[hsl(var(--bg-primary))] text-sm font-medium rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none">
                      {section.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[hsl(var(--text-primary))]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-2 w-full px-3">
            <div 
              className="relative"
              onMouseEnter={() => setHoveredIcon('help')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <button className="w-full h-12 flex items-center justify-center rounded-xl text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--hover-bg))] transition-all duration-200">
                <HelpCircle className="w-5 h-5" />
              </button>
              
              {/* Tooltip */}
              {hoveredIcon === 'help' && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[hsl(var(--text-primary))] text-[hsl(var(--bg-primary))] text-sm font-medium rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none">
                  Help
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[hsl(var(--text-primary))]" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Content Bar */}
        <div className="w-72 bg-[hsl(var(--bg-primary))] border-r border-[hsl(var(--border))] flex flex-col transition-all duration-300">
          {/* User Info */}
          <div className="p-5 border-b border-[hsl(var(--border))] flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white flex items-center justify-center text-lg font-semibold shadow-md flex-shrink-0">
              {name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[hsl(var(--text-primary))] truncate">
                {name || "User"}
              </div>
              <div className="text-xs text-[hsl(var(--text-tertiary))] truncate">
                {email || "email@example.com"}
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="px-5 py-6 border-b border-[hsl(var(--border))]">
            <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))] mb-1">
              {activeContent?.label}
            </h2>

          </div>

          {/* Section Items */}
          <div className="flex-1 overflow-y-auto p-3">
            {(activeContent?.subsections?.length ?? 0) > 0 ? (
              <div className="space-y-1">
                {activeContent?.subsections?.map((item: any) => {
                  const ItemIcon = item.icon;
                  const isActiveSubsection = item.href && location.pathname === item.href;
                  
                  return (
                    <button
                      key={item.id}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                        isActiveSubsection
                          ? 'bg-[hsl(var(--primary))] text-white'
                          : 'text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--hover-bg))] active:bg-[hsl(var(--active-bg))]'
                      }`}
                      onClick={() => handleSubsectionClick(item)}
                    >
                      <ItemIcon className={`w-5 h-5 transition-colors ${
                        isActiveSubsection
                          ? 'text-white'
                          : 'text-[hsl(var(--text-secondary))] group-hover:text-[hsl(var(--primary))]'
                      }`} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-[hsl(var(--text-tertiary))] text-sm text-center px-4">
                No subsections available<br />for this section
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <div className="p-4 border-t border-[hsl(var(--border))]">
            <div className="flex gap-2 p-1 bg-[hsl(var(--bg-tertiary))] rounded-xl">
              <button
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  !isDarkMode 
                    ? 'bg-[hsl(var(--bg-primary))] text-[hsl(var(--text-primary))] shadow-sm' 
                    : 'text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]'
                }`}
                onClick={() => toggleDarkMode(false)}
              >
                <Sun className="w-4 h-4" />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-[hsl(var(--bg-primary))] text-[hsl(var(--text-primary))] shadow-sm' 
                    : 'text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]'
                }`}
                onClick={() => toggleDarkMode(true)}
              >
                <Moon className="w-4 h-4" />
                <span className="text-sm font-medium">Dark</span>
              </button>
            </div>
          </div>
        </div>
      </>
  );
};

export default SideNav;