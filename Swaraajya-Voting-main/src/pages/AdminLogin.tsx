
import React from 'react';
import Header from '@/components/Header';
import AdminLoginCard from '@/components/admin/AdminLoginCard';
import LanguageSelector from '@/components/LanguageSelector';

const AdminLogin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header />
      
      <div className="container mx-auto mt-8 px-4 flex justify-end">
        <LanguageSelector />
      </div>
      
      <div className="container mx-auto max-w-md py-8">
        <AdminLoginCard />
      </div>
    </div>
  );
};

export default AdminLogin;
