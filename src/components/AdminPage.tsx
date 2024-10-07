import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const AdminPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">{t('adminPanel')}</h1>
      <p>{t('adminWelcome')}</p>
      {/* Qui aggiungeremo in seguito le funzionalità di gestione dei contenuti */}
    </div>
  );
};

export default AdminPage;