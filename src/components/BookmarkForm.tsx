"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Props {
  userId: string;
}

export default function BookmarkForm({ userId }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: userId,
    });

    setTitle("");
    setUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl space-y-5"
    >
      <h2 className="text-lg font-semibold mb-2">Add New Bookmark</h2>

      <input
        type="text"
        placeholder="Bookmark Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-black/40 border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full bg-black/40 border border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-medium"
      >
        Add Bookmark
      </button>
    </form>
  );

}
