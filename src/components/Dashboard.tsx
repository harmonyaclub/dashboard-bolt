import React from 'react';
import { Info, Video, FileText, Calculator } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const sections = [
    { icon: Info, title: t('businessInfo'), link: '#' },
    { icon: Video, title: t('tutorials'), link: '#' },
    { icon: FileText, title: t('presentations'), link: '#' },
    { icon: Calculator, title: t('calculators'), link: '#' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {sections.map((section, index) => (
        <a
          key={index}
          href={section.link}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center text-center"
        >
          <section.icon className="w-12 h-12 mb-4 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
        </a>
      ))}
    </div>
  );
};

export default Dashboard;