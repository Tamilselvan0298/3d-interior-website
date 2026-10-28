import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#141210',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '28px', marginBottom: '12px', color: '#D6C2A5' }}>Aura Architectural Atelier</h1>
          <p style={{ maxWidth: '480px', color: '#d4cfc8', lineHeight: 1.6, marginBottom: '24px' }}>
            We encountered an unexpected display issue. Please refresh the page to reload the architectural experience.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 28px',
              borderRadius: '999px',
              border: '1px solid #D6C2A5',
              background: '#D6C2A5',
              color: '#141210',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Reload Atelier
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

