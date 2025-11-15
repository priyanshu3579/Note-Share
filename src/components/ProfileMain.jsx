import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/logo.png";

const ProfileMain = () => {
  const { user, isAuthenticated } = useAuth0();
  const [myNotes, setMyNotes] = useState([]);

  // 🕒 Convert UTC → IST (Perfect Indian Time)
  const formatDate = (utcDate) => {
    const date = new Date(utcDate);

    // IST = UTC + 5 hours 30 minutes
    const IST_OFFSET = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(date.getTime() + IST_OFFSET);

    return istTime.toLocaleString("en-IN", {
      hour12: true,
    });
  };

  useEffect(() => {
    if (!isAuthenticated || !user?.email) return;

    const fetchMyNotes = async () => {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_email", user.email)
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching notes:", error);
        return;
      }

      setMyNotes(data || []);
    };

    fetchMyNotes();
  }, [isAuthenticated, user]);

  return (
    <main
      className="min-h-screen px-6 py-10 
      bg-[repeating-linear-gradient(to_bottom,#f7fbff_0,#f7fbff_28px,#d0ebff_29px,#f7fbff_30px)]"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* USER HEADER */}
        <div className="bg-white/90 shadow-lg p-6 rounded-2xl mb-10 text-center backdrop-blur-sm">
          
          <img
            src={logo}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-teal-500 shadow-xl"
          />

          <h2 className="text-3xl font-bold mt-4 text-gray-800">
            {user?.name}
          </h2>

          <p className="text-gray-600 mt-1 text-sm">
            Welcome back! Below are all the notes you've uploaded.
          </p>

          <p className="text-gray-500 text-sm mt-1">
            Email: {user?.email}
          </p>
        </div>

        {/* USER NOTES */}
        <h3 className="text-xl font-bold mb-4">Your Uploaded Notes</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {myNotes.length === 0 && (
            <p className="text-gray-600">You haven't uploaded any notes yet.</p>
          )}

          {myNotes.map((note) => {
            const fileName = note.pdf_url.split("/").pop();

            return (
              <div
                key={note.id}
                className="bg-white rounded-xl shadow p-4 hover:shadow-xl transition border"
              >
                <div className="flex flex-col items-center py-4">
                  <i className="fas fa-file-pdf text-red-600 text-4xl"></i>
                  <p className="text-xs text-gray-500 mt-2 truncate w-full text-center">
                    {fileName}
                  </p>
                </div>

                <hr className="my-3" />

                <p className="text-sm">
                  <b className="text-gray-800">Course Code:</b>{" "}
                  {note.course_code}
                </p>

                <p className="text-sm mt-1">
                  <b className="text-gray-800">Program Code:</b>{" "}
                  {note.program_code}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Uploaded on: {formatDate(note.created_at)}
                </p>

                <a
                  href={note.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-center text-sm bg-teal-600 text-white py-1 rounded-md hover:bg-teal-700"
                >
                  View PDF
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default ProfileMain;
