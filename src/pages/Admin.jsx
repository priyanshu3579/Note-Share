import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Main from '../components/Main';

const Admin = () => {
  return (
    <>
    <Navbar/>
    <Main/>
    <Footer/>
    </>
  )
}

export default Admin;

// const deleteNote = async (note) => {
//   if (!window.confirm("Delete this file?")) return;

//   // Delete from storage
//   const filePath = note.pdf_url.split("/").pop();

//   await supabase.storage.from("notes").remove([filePath]);

//   // Delete from DB
//   await supabase.from("notes").delete().eq("id", note.id);

//   alert("Deleted!");
// };
