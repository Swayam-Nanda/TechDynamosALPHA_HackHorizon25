import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await addDoc(collection(db, "messages"), {
        fullName: formData.fullName,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
      });
      setStatus("Message sent successfully 🎉");
      setFormData({ fullName: "", email: "", message: "" }); // clear form
    } catch (error) {
      console.error("Error writing to Firestore:", error);
      setStatus("Something went wrong 💀");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-950 shadow-2xl rounded-2xl p-10 max-w-3xl w-full border border-emerald-700/40">
        <h2 className="text-3xl font-bold text-center text-emerald-500 mb-6">
          Contact Us
        </h2>
        <p className="text-center text-gray-300 mb-10">
          Questions, issues, or confessions to make? We’re listening.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400"
              placeholder="john.doe@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-400"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition duration-300"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p className="text-center mt-6 text-sm text-emerald-400">{status}</p>
        )}

        <div className="mt-10 text-center text-sm text-gray-400">
          Or reach us at: <br />
          📧{" "}
          <a
            href="mailto:support@virtualpolice.in"
            className="text-emerald-400 hover:underline"
          >
            support@virtualpolice.in
          </a>{" "}
          <br />
          ☎️ +91 99999 88888
        </div>
      </div>
    </div>
  );
};

export default Contact;
