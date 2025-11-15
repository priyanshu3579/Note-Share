import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../supabaseClient";
import { useAuth0 } from "@auth0/auth0-react";

const Admin = () => {
  const { user } = useAuth0();

  const [notes, setNotes] = useState([]);
  const [totalNotes, setTotalNotes] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchNotes();
  }, []);

  // 🟢 FETCH NOTES
  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("id", { ascending: false });

    if (!error && data) {
      setNotes(data);
      setTotalNotes(data.length);

      const uniqueUsers = new Set(data.map((n) => n.user_email));
      setTotalUsers(uniqueUsers.size);
    }
  };

  // 🔴 DELETE NOTE (Admin only)
  const deleteNote = async (note) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const filePath = note.pdf_url.split("/").pop();

      await supabase.storage.from("notes").remove([filePath]);

      await supabase.from("notes").delete().eq("id", note.id);

      fetchNotes();
      alert("Note deleted!");
    } catch (err) {
      console.error(err);
      alert("Delete failed!");
    }
  };

  // 🟡 Date Converter
const formatDate = (utcDate) => {
  const date = new Date(utcDate);

  // IST = UTC + 5 hours 30 minutes
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;

  const istTime = new Date(date.getTime() + IST_OFFSET);

  return istTime.toLocaleString("en-IN", {
    hour12: true,
  });
};



  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-140px)] px-6 py-12 bg-gray-100">

        <div className="max-w-6xl mx-auto">

          {/* PAGE TITLE */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mb-8">
            Notes se users tak, sab kuch ek jagha -full control, full power..
          </p>

          {/* STATS BOXES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white border-l-4 border-teal-600 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-gray-700">Total Notes</h2>
              <p className="text-3xl font-bold text-teal-600 mt-3">{totalNotes}</p>
            </div>

            <div className="bg-white border-l-4 border-blue-600 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-gray-700">Total Uploaders</h2>
              <p className="text-3xl font-bold text-blue-600 mt-3">{totalUsers}</p>
            </div>

            <div className="bg-white border-l-4 border-purple-600 p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-gray-700">Logged in as</h2>
              <p className="text-lg font-medium text-gray-700 mt-3">
                {user?.email}
              </p>
            </div>
          </div>

          {/* TABLE TITLE */}
          <h2 className="text-2xl font-bold mb-4">📄 Uploaded Notes</h2>

          {/* NOTES TABLE */}
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3 font-semibold">Course</th>
                  <th className="p-3 font-semibold">Program</th>
                  <th className="p-3 font-semibold">Uploaded By</th>
                  <th className="p-3 font-semibold">Uploaded On</th>
                  <th className="p-3 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {notes.length > 0 ? (
                  notes.map((note) => (
                    <tr key={note.id} className="border-t hover:bg-gray-50">

                      <td className="p-3">{note.course_code}</td>
                      <td className="p-3">{note.program_code}</td>

                      <td className="p-3 text-blue-600">{note.user_email}</td>

                      <td className="p-3">{formatDate(note.created_at)}</td>

                      <td className="p-3 flex gap-3">
                        <a
                          href={note.pdf_url}
                          target="_blank"
                          className="text-green-600 hover:text-green-800 font-semibold"
                        >
                          View
                        </a>

                        <button
                          onClick={() => deleteNote(note)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-6 text-center text-gray-500"
                    >
                      No uploads yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default Admin;
