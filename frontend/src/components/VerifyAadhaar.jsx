import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig"; // Firebase config
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function VerifyAadhaar() {
  const [aadhaar, setAadhaar] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAadhaarChange = (e) => {
    setAadhaar(e.target.value);
  };

  const verifyAadhaar = async () => {
    if (!aadhaar) {
      setError("Please enter your Aadhaar number.");
      return;
    }

    try {
      const q = query(
        collection(db, "aadhaarData"),
        where("aadhar", "==", aadhaar),
        where("used", "==", false)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();

        // Store Aadhaar and docId for further use if needed
        sessionStorage.setItem("verifiedAadhaar", aadhaar);
        sessionStorage.setItem("aadhaarDocId", querySnapshot.docs[0].id);
        sessionStorage.setItem("phone", docData.phone); // Optional: for OTP
        navigate("/signup"); // Redirect to signup
      } else {
        setError("Aadhaar number not found, already used, or invalid.");
      }
    } catch (err) {
      console.error("Error verifying Aadhaar:", err.message);
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-emerald-400">
          Aadhaar Verification
        </h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Enter Aadhaar Number"
          value={aadhaar}
          onChange={handleAadhaarChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
        />

        <button
          onClick={verifyAadhaar}
          className="w-full bg-emerald-500 hover:bg-emerald-600 py-2 rounded font-semibold"
        >
          Verify Aadhaar
        </button>

        <p className="mt-2 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span
            className="text-emerald-400 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
