"use client";

import { Bookmark } from "@/types/bookmark";
import { supabase } from "@/lib/supabaseClient";

interface Props {
  bookmarks: Bookmark[];
}

export default function BookmarkList({ bookmarks }: Props) {
  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };


  return (
    <div className="space-y-5">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
        >
          <div className="flex justify-between items-start">
            <div className="max-w-[80%]">
              <h3 className="font-semibold text-lg">{bookmark.title}</h3>

              <a
                href={bookmark.url}
                target="_blank"
                className="text-blue-400 hover:underline text-sm break-words"
              >
                {bookmark.url}
              </a>
            </div>

            <button
              onClick={() => deleteBookmark(bookmark.id)}
              className="text-red-400 hover:text-red-300 text-sm transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

}