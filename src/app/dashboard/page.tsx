"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Bookmark } from "@/types/bookmark";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Dashboard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    let channel: any;

    const init = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        window.location.href = "/";
        return;
      }

      const currentUserId = data.user.id;
      setUserId(currentUserId);

      // Initial fetch
      const { data: initialData, error: fetchError } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });

      if (!fetchError && initialData) {
        setBookmarks(initialData);
      }

      // Realtime subscription scoped to user
      channel = supabase
        .channel("bookmarks-realtime")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
            filter: `user_id=eq.${currentUserId}`,
          },
          (payload) => {
            console.log("Realtime triggered:", payload);

            if (payload.eventType === "INSERT") {
              setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
            }

            if (payload.eventType === "DELETE") {
              setBookmarks((prev) =>
                prev.filter((b) => b.id !== payload.old.id),
              );
            }
          },
        )
        .subscribe((status) => {
          console.log("Subscription status:", status);
        });
    };

    init();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="max-w-3xl mx-auto py-14 px-6">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">My Bookmarks</h1>

        <button
          onClick={logout}
          className="text-sm text-red-400 hover:text-red-300 transition"
        >
          Logout
        </button>
      </div>

      {userId && <BookmarkForm userId={userId} />}

      <div className="mt-10">
        {bookmarks.length === 0 ? (
          <p className="text-gray-400 text-center">No bookmarks yet.</p>
        ) : (
          <BookmarkList bookmarks={bookmarks} />
        )}
      </div>
    </div>
  );
}
