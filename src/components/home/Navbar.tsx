import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  isAuthenticated?: boolean;
  onSignIn?: () => void;
  onGoToWorkspace?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated = false,
  onSignIn,
  onGoToWorkspace,
}) => {
  return (
    <>
      <style>{`
        .glass-nav {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          padding: 0.5rem 1.5rem;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          margin-top: 0px;!
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-1px);
        }
      `}</style>

      <nav className="glass-nav fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-white text-2xl font-extrabold tracking-tight">
              OnePage<span className="text-red-400">Builder</span>
            </span>
          </Link>
        </div>

        {/* Right-side button */}
        <div>
          {!isAuthenticated ? (
            <button className="nav-btn" onClick={onSignIn}>
              Sign In
            </button>
          ) : (
            <button className="nav-btn" onClick={onGoToWorkspace}>
              My Workspace
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
