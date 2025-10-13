import React, { useEffect, useState } from 'react';

/**
 * Debug Panel Component
 * Shows authentication and API state for troubleshooting
 * 
 * TO USE:
 * 1. Import this component: import DebugPanel from './components/DebugPanel';
 * 2. Add to any page: <DebugPanel />
 * 3. Remove after debugging is complete
 */

const DebugPanel: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState({
    token: null as string | null,
    userData: null as any,
    hasToken: false,
    hasUserData: false,
    userId: null as number | null,
  });

  const refreshDebugInfo = () => {
    const token = localStorage.getItem('token');
    const userDataStr = localStorage.getItem('userData');
    let userData = null;
    let userId = null;

    if (userDataStr) {
      try {
        userData = JSON.parse(userDataStr);
        userId = userData?.id || null;
      } catch (e) {
        console.error('Failed to parse userData:', e);
      }
    }

    setDebugInfo({
      token: token ? `${token.substring(0, 20)}...` : null,
      userData,
      hasToken: !!token,
      hasUserData: !!userDataStr,
      userId,
    });
  };

  useEffect(() => {
    refreshDebugInfo();
    
    // Refresh every 2 seconds
    const interval = setInterval(refreshDebugInfo, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleClearStorage = () => {
    if (window.confirm('Clear all localStorage and reload?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleForceLogin = () => {
    localStorage.clear();
    window.location.href = '/signin';
  };

  const styles = {
    panel: {
      position: 'fixed' as const,
      bottom: '20px',
      right: '20px',
      backgroundColor: '#1a1a1a',
      color: '#fff',
      padding: '15px',
      borderRadius: '8px',
      border: '2px solid #333',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
      minWidth: '300px',
      maxWidth: '400px',
      fontSize: '12px',
      fontFamily: 'monospace',
    },
    header: {
      fontSize: '14px',
      fontWeight: 'bold' as const,
      marginBottom: '10px',
      borderBottom: '1px solid #333',
      paddingBottom: '5px',
      color: '#4ade80',
    },
    row: {
      marginBottom: '8px',
      display: 'flex',
      gap: '8px',
    },
    label: {
      fontWeight: 'bold' as const,
      color: '#9ca3af',
      minWidth: '80px',
    },
    value: {
      color: '#fff',
      wordBreak: 'break-all' as const,
    },
    status: (isOk: boolean) => ({
      display: 'inline-block',
      padding: '2px 6px',
      borderRadius: '4px',
      backgroundColor: isOk ? '#22c55e' : '#ef4444',
      color: '#fff',
      fontWeight: 'bold' as const,
    }),
    button: {
      padding: '6px 12px',
      marginRight: '8px',
      marginTop: '10px',
      backgroundColor: '#3b82f6',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '11px',
    },
    dangerButton: {
      backgroundColor: '#ef4444',
    },
  };

  return (
    <div style={styles.panel}>
      <div style={styles.header}>🐛 Debug Panel</div>
      
      <div style={styles.row}>
        <span style={styles.label}>Token:</span>
        <span style={styles.status(debugInfo.hasToken)}>
          {debugInfo.hasToken ? '✓ EXISTS' : '✗ MISSING'}
        </span>
      </div>

      {debugInfo.token && (
        <div style={styles.row}>
          <span style={styles.label}>Token:</span>
          <span style={styles.value}>{debugInfo.token}</span>
        </div>
      )}

      <div style={styles.row}>
        <span style={styles.label}>UserData:</span>
        <span style={styles.status(debugInfo.hasUserData)}>
          {debugInfo.hasUserData ? '✓ EXISTS' : '✗ MISSING'}
        </span>
      </div>

      {debugInfo.userData && (
        <>
          <div style={styles.row}>
            <span style={styles.label}>User ID:</span>
            <span style={styles.value}>
              {debugInfo.userId || '❌ NO ID'}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Email:</span>
            <span style={styles.value}>
              {debugInfo.userData.sub || debugInfo.userData.email || 'N/A'}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Name:</span>
            <span style={styles.value}>
              {debugInfo.userData.name || 'N/A'}
            </span>
          </div>

          <div style={styles.row}>
            <span style={styles.label}>Role:</span>
            <span style={styles.value}>
              {debugInfo.userData.role || 'N/A'}
            </span>
          </div>
        </>
      )}

      <div style={styles.row}>
        <span style={styles.label}>Status:</span>
        <span style={styles.status(debugInfo.hasToken && debugInfo.hasUserData && !!debugInfo.userId)}>
          {debugInfo.hasToken && debugInfo.hasUserData && debugInfo.userId
            ? '✓ READY'
            : '✗ NOT READY'}
        </span>
      </div>

      <div style={{ borderTop: '1px solid #333', paddingTop: '10px', marginTop: '10px' }}>
        <button
          style={styles.button}
          onClick={refreshDebugInfo}
        >
          🔄 Refresh
        </button>
        <button
          style={{ ...styles.button, ...styles.dangerButton }}
          onClick={handleClearStorage}
        >
          🗑️ Clear Storage
        </button>
        <button
          style={styles.button}
          onClick={handleForceLogin}
        >
          🔐 Force Login
        </button>
      </div>

      <div style={{ marginTop: '10px', fontSize: '10px', color: '#6b7280' }}>
        💡 User-Id header will be: {debugInfo.userId || 'NOT SET'}
      </div>
    </div>
  );
};

export default DebugPanel;
