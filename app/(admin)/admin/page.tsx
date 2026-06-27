import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // 1. Secure the route: verify the user session on the server
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return redirect('/login?error=Please log in to access the dashboard');
  }

  // 2. Fetch real data from Prisma to display quick metrics
  const totalProperties = await prisma.property.count({
    where: { agentId: user.id },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Welcome back, {user.email?.split('@')[0]}!
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here is what is happening with your real estate portfolio today.
        </p>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">My Active Listings</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{totalProperties}</dd>
        </div>

        {/* Card 2 */}
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Total Leads Received</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
        </div>

        {/* Card 3 */}
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Closed Deals</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
        </div>
      </div>

      {/* Placeholder for recent activity */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Recent Activity</h3>
        <p className="text-sm text-gray-500">You haven't listed any properties or received any client inquiries yet.</p>
      </div>
    </div>
  );
}