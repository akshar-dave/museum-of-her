"use client";

import { useAuth } from "@/app/lib/useAuth";

export default function AuthStatus() {
  const { user, loading, isAuthenticated, signOut } = useAuth();

  if (loading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  return (
    <div className="text-sm">
      {isAuthenticated ? (
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓ Authenticated</span>
          <span className="text-gray-500">({user?.id?.slice(0, 8)}...)</span>
          <button
            onClick={signOut}
            className="text-red-600 hover:text-red-800 underline"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <span className="text-gray-500">Not authenticated</span>
      )}
    </div>
  );
} 