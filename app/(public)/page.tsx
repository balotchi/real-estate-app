import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <h2 className="text-5xl font-extrabold tracking-tight sm:text-6xl mb-6 text-gray-900">
        Find Your Dream Home Today
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mb-10">
        Browse our exclusive listings and discover the perfect property for you and your family.
      </p>
      <Link 
        href="/properties" 
        className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
      >
        View All Properties
      </Link>
    </div>
  );
}