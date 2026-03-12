// week-8/page.js
"use client";

import React from "react";
import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (err) {
      console.error("GitHub sign in error:", err);
      alert("Sign in failed. Check console for details.");
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (err) {
      console.error("Sign out error:", err);
      alert("Sign out failed. Check console for details.");
    }
  };

  // loading state while auth-context determines current user
  if (user === undefined) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-lg">Checking authentication…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Shopping List App</h1>

        {user ? (
          <div className="space-y-4">
            <p>
              Welcome, <span className="font-semibold">{user.displayName || user.email}</span>
            </p>
            <div className="flex justify-center gap-3">
              <Link href="/week-8/shopping-list" className="px-4 py-2 bg-blue-600 text-white rounded">
                Go to Shopping List
              </Link>
              <button onClick={handleSignOut} className="px-4 py-2 border rounded">
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Sign in with GitHub to access your shopping list.</p>
            <div className="flex justify-center gap-3">
              <button onClick={handleSignIn} className="px-4 py-2 bg-black text-white rounded">
                Sign in with GitHub
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}