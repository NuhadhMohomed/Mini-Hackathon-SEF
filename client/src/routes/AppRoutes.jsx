import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from '@/layouts/PublicLayout';
import AppLayout from '@/layouts/AppLayout';

// Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import AppPlaceholderPage from '@/pages/AppPlaceholderPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Application Shell Layout */}
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<AppPlaceholderPage />} />
      </Route>

      {/* 404 / Catch-all Route */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
