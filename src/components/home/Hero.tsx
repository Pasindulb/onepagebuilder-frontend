import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';

interface HeroAnimationProps {
  title?: string;
  subtitle?: string;
  animationSpeed?: number;
}

const HeroColorAnimation: React.FC<HeroAnimationProps> = ({
  title = "Build in Minutes",
  subtitle = "Empower your service with a stunning no-code website — fast, flexible, and professional.",
  animationSpeed = 6
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    background: '#000000'
  };

  const waveBackgroundStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '3000%',
    height: '100%',
    background: `linear-gradient(
  45deg,
  #ffebee 0%,
  #ffcdd2 5%,
  #ef9a9a 10%,
  #e57373 15%,
  #ef5350 20%,
  #f44336 25%,
  #000000 30%,
  #000000 35%,
  #1a0000 40%,
  #e53935 45%,
  #d32f2f 50%,
  #c62828 55%,
  #b71c1c 60%,
  #290000 65%,
  #000000 70%,
  #000000 75%,
  #000000 80%,
  #3d0000 85%,
  #290000 90%,
  #1a0000 95%,
  #000000 100%
)`,
    animation: `waveFlow ${animationSpeed * 1.8}s ease-in-out infinite`
  };

  const contentStyles: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    color: 'white',
    maxWidth: '800px',
    padding: '2rem',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 1.5s ease-out'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'clamp(2.5rem, 8vw, 6rem)',
    fontWeight: 900,
    marginBottom: '1rem',
    background: 'white',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: '4s ease-in-out infinite alternate'
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    fontWeight: 300,
    opacity: 0.9,
    color: 'white',
    letterSpacing: '0.05em',
    animation: 'fadeInUp 2s ease-out 0.5s both'
  };

  const buttonStyles: React.CSSProperties = {
    marginTop: '2rem',
    padding: '1rem 2.5rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50px',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    animation: 'fadeInUp 2s ease-out 1s both'
  };

  return (
    <>
      <style>{`
        @keyframes waveFlow {
          0% { transform: translateX(-66.66%); }
          50% { transform: translateX(-33.33%); }
          100% { transform: translateX(-66.66%); }
        }

        @keyframes textGlow {
          0% { text-shadow: 0 0 20px rgba(224, 170, 255, 0.5); }
          100% { text-shadow: 0 0 40px rgba(224, 170, 255, 0.8), 0 0 60px rgba(199, 125, 255, 0.4); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-button:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          border-color: rgba(255, 255, 255, 0.6) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      <div style={heroStyles}>
        <div style={waveBackgroundStyles}></div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 py-12 md:py-20 text-center">
          <div
            className="flex flex-col items-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1.5s ease-out'
            }}
          >
            {/* Tagline */}
            <div className="hidden sm:mb-8 sm:flex">
              <div className="glass-effect relative overflow-hidden rounded-full px-4 py-2 text-lg text-white font-medium hover:border-purple-500/40 group transition-all duration-300 hover:scale-105">
                <span className="relative flex items-center">
                  <div className="mr-2 p-1 bg-red-500 bg-opacity-30 rounded-full">
                    <RocketLaunchIcon className="h-4 w-4 text-red-100" />
                  </div>
                  <span>Launch your service website — no coding required.</span>
                </span>
              </div>
            </div>

            {/* Main Content */}
            <div style={contentStyles}>
              <h1 style={titleStyles}>{title}</h1>
              <p style={subtitleStyles}>{subtitle}</p>
              <button
                className="hero-button"
                style={buttonStyles}
                onClick={() => console.log('Get Started clicked')}
              >
                <span className="flex items-center justify-center">
                  Get Started Free
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroColorAnimation;
