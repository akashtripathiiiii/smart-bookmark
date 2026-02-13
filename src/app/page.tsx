"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl space-y-5"
      >
        <h1 className="text-2xl font-bold mb-6">Smart Bookmark</h1>

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-medium"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
