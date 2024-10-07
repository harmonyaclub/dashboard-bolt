import React, { useState, useEffect } from 'react';
import LanguageSelector from './components/LanguageSelector';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import { useTranslation } from './hooks/useTranslation';
import { isAuthenticated, logout } from './services/auth';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAdmin(true);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setShowAdmin(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{t('businessDashboard')}</h1>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            {!isLoggedIn && (
              <button
                onClick={() => setShowAdmin(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {t('adminLogin')}
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                {t('logout')}
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showAdmin ? (
          isLoggedIn ? <AdminDashboard /> : <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
};

export default App;