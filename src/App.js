import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './context/AppContext';
import ReflectionPage from './pages/ReflectionPage';

function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <ReflectionPage />
      </AppProvider>
    </HelmetProvider>
  );
}

export default App;
