import React, { useState } from "react";
import { db, storage } from "../firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const FIRForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    phone: "",
    email: "",
    address: "",
    complaint: "",
    crime: "",
    date: "",
    location: "",
    mediaURL: "",
  });

  const [mediaFile, setMediaFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedMediaURL = "";

      if (mediaFile) {
        const storageRef = ref(
          storage,
          `FIR_Media/${mediaFile.name}_${Date.now()}`
        );
        const snapshot = await uploadBytes(storageRef, mediaFile);
        uploadedMediaURL = await getDownloadURL(snapshot.ref);
      }

      const firNumber = `FIR-${uuidv4().slice(0, 8).toUpperCase()}`;

      const firData = {
        ...formData,
        mediaURL: uploadedMediaURL,
        firNumber,
        timestamp: Timestamp.now(),
        status: "Submitted",
      };

      await addDoc(collection(db, "firs"), firData);

      alert(`✅ FIR submitted successfully! Your FIR Number is: ${firNumber}`);
      setFormData({
        name: "",
        aadhaar: "",
        phone: "",
        email: "",
        address: "",
        complaint: "",
        crime: "",
        date: "",
        location: "",
        mediaURL: "",
      });
      setMediaFile(null);
    } catch (err) {
      console.error("Error submitting FIR:", err);
      alert("❌ Something went wrong. Check console.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 pt-12">
      <div className="max-w-3xl mx-auto p-8 bg-gray-900 text-white rounded-2xl shadow-2xl border border-emerald-500">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-emerald-400">
          📝 File a New FIR
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="👤 Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600"
          />

          <input
            type="text"
            name="aadhaar"
            placeholder="🔢 Aadhaar Number"
            value={formData.aadhaar}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600"
          />

          <input
            type="tel"
            name="phone"
            placeholder="📞 Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600"
          />

          <input
            type="email"
            name="email"
            placeholder="📧 Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600"
          />

          <textarea
            name="address"
            placeholder="🏠 Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600"
          />

          <textarea
            name="complaint"
            placeholder="📝 Write your complaint here..."
            value={formData.complaint}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600"
          />

          {/* 🔥 New Fields Below 🔥 */}
          <input
            type="text"
            name="crime"
            placeholder="🚔 Type of Crime"
            value={formData.crime}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600"
          />

          <input
            type="date"
            name="date"
            placeholder="📅 Date of Incident"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600"
          />

          <input
            type="text"
            name="location"
            placeholder="📍 Location of Incident"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-800 text-white rounded-md border border-gray-600"
          />

          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-500"
            accept="image/*,video/*"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-semibold py-3 rounded-md shadow-md"
          >
            {loading ? "Submitting..." : "🚨 Submit FIR"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FIRForm;
