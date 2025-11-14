import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import toast, { Toaster } from "react-hot-toast";

const UploadContent = () => {
  const [courseCode, setCourseCode] = useState("");
  const [programCode, setProgramCode] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const inputRef = useRef();
  const navigate = useNavigate();
  const MAX_FILE_MB = 10;

  // ---------------- FILE VALIDATION ----------------
  const handleFileChange = (e) => {
    setError("");
    const f = e.target.files[0];

    if (!f) return;

    if (f.type !== "application/pdf") {
      toast.error("Sirf PDF file allowed.");
      inputRef.current.value = "";
      return;
    }

    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(`File must be smaller than ${MAX_FILE_MB}MB.`);
      inputRef.current.value = "";
      return;
    }

    setFile(f);
    setFilePreviewUrl(URL.createObjectURL(f));
  };

  // ---------------- UPLOAD FUNCTION ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!courseCode.trim() || !programCode.trim()) {
      toast.error("Course code aur Program code zaruri hai.");
      return;
    }

    if (!file) {
      toast.error("Please select a PDF.");
      return;
    }

    try {
      setUploading(true);

      // UNIQUE NAME
      const fileName = `${Date.now()}_${file.name}`;

      // 1️⃣ Upload to "notes" bucket
      const { error: uploadError } = await supabase.storage
        .from("notes")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // 2️⃣ Public URL
      const { data: publicUrlData } = supabase.storage
        .from("notes")
        .getPublicUrl(fileName);

      const pdfUrl = publicUrlData.publicUrl;

      // 3️⃣ Insert metadata into table
      const { error: insertError } = await supabase.from("notes").insert({
        course_code: courseCode,
        program_code: programCode,
        description,
        pdf_url: pdfUrl,
      });

      if (insertError) throw insertError;

      setUploading(false);
      toast.success("Upload Successful!");
      navigate("/notes");
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      setUploading(false);
      toast.error("Upload failed. Try again.");
    }
  };

  // ---------------- CLEAR FORM ----------------
  const clearForm = () => {
    setCourseCode("");
    setProgramCode("");
    setDescription("");
    setFile(null);
    setFilePreviewUrl(null);
    inputRef.current.value = "";
    setError("");
  };

  return (
    <main
      className="min-h-[calc(100vh-140px)] flex items-center justify-center px-6 py-12
      bg-[repeating-linear-gradient(to_bottom,#f7fbff_0,#f7fbff_28px,#d0ebff_29px,#f7fbff_30px)]"
    >
      <Toaster />

      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4">Upload Notes</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* COURSE + PROGRAM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="Course Code (CS101)"
              className="border px-4 py-2 rounded-lg"
            />

            <input
              value={programCode}
              onChange={(e) => setProgramCode(e.target.value)}
              placeholder="Program Code (BTECH-CSE)"
              className="border px-4 py-2 rounded-lg"
            />
          </div>

          {/* DESCRIPTION */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Description..."
            className="border px-4 py-3 rounded-lg w-full"
          />

          {/* FILE */}
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="border px-3 py-2 rounded-lg w-full"
          />

          {file && <p className="text-sm mt-2">{file.name}</p>}

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>

            <button
              type="button"
              onClick={clearForm}
              className="px-4 py-2 border rounded-lg"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UploadContent;
