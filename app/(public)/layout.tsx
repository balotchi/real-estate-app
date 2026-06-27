import Navbar from "@/components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Import the new responsive Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Placeholder Footer */}
      <footer className="w-full bg-gray-900 text-white py-8 text-center text-sm">
        © {new Date().getFullYear()} LuxeEstates. All rights reserved.
      </footer>
    </div>
  );
}