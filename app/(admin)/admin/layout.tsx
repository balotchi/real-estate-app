import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mini Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex-shrink-0">
        <h2 className="text-xl font-bold tracking-tight text-blue-400">LuxeEstates</h2>
        <div className="mt-4 text-xs text-gray-400 font-mono">Admin Panel</div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}