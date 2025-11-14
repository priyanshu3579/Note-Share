import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth0 } from "@auth0/auth0-react";
import toast, { Toaster } from "react-hot-toast";

const NotesMain = () => {
  const [notes, setNotes] = useState([]);
  const { user, isAuthenticated } = useAuth0();

  // CHECK ADMIN ROLE
  const isAdmin =
    isAuthenticated && user?.["https://noteshare.com/roles"]?.includes("admin");

  // Fetch notes
  const fetchNotes = async () => {
    const { data } = await supabase
      .from("notes")
      .select("*")
      .order("id", { ascending: false });

    setNotes(data || []);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // DELETE FUNCTION
  const deleteNote = async (note) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const filePath = note.pdf_url.split("/").pop(); // PDF file name

      // 1️⃣ DELETE FROM STORAGE
      await supabase.storage.from("notes").remove([filePath]);

      // 2️⃣ DELETE FROM DATABASE
      await supabase.from("notes").delete().eq("id", note.id);

      toast.success("Note deleted successfully!");

      // Refresh
      fetchNotes();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed!");
    }
  };

  return (
    <main
      className="min-h-screen px-6 py-10 
      bg-[repeating-linear-gradient(to_bottom,#f7fbff_0,#f7fbff_28px,#d0ebff_29px,#f7fbff_30px)]"
    >
      <Toaster />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Uploaded Notes
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {notes.map((note) => {
            const fileName = note.pdf_url.split("/").pop();

            return (
              <div
                key={note.id}
                className="rounded-xl shadow-md bg-white p-4 hover:shadow-lg transition"
              >
                <div className="flex flex-col items-center justify-center py-5">
                  <i className="fas fa-file-pdf text-red-600 text-5xl"></i>
                  <p className="text-xs text-gray-500 mt-2 truncate w-full text-center">
                    {fileName}
                  </p>
                </div>

                <hr className="my-3" />

                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Course Code:</span>{" "}
                    {note.course_code}
                  </p>
                  <p>
                    <span className="font-semibold">Program Code:</span>{" "}
                    {note.program_code}
                  </p>
                </div>

                <div className="flex justify-center mt-4 gap-3">
                  {/* View Button */}
                  <a
                    href={note.pdf_url}
                    target="_blank"
                    className="text-sm px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  >
                    View
                  </a>

                  {/* DELETE FOR ADMIN ONLY */}
                  {isAdmin && (
                    <button
                      onClick={() => deleteNote(note)}
                      className="text-sm px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default NotesMain;
