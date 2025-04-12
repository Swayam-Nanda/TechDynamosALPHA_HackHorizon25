import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function VerifyAadhaar() {
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAadhaarSubmit = async () => {
    setError("");
    try {
      const q = query(
        collection(db, "aadhaarData"),
        where("aadhar", "==", aadhaar)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("❌ Aadhaar not found. Please try again.");
        return;
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);

      // Show OTP in alert (mocking email send)
      alert(`📧 OTP sent to registered email: ${otp}`);

      setStep(2); // move to OTP input step
    } catch (err) {
      console.error(err);
      setError("⚠️ Something went wrong while verifying Aadhaar.");
    }
  };

  const handleOtpVerify = () => {
    if (otp === generatedOtp) {
      sessionStorage.setItem("verifiedAadhaar", aadhaar);
      alert("✅ Aadhaar verified successfully!");
      navigate("/signup");
    } else {
      setError("❌ Incorrect OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex justify-center items-center">
      <div className="max-w-md bg-gray-900 p-8 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-emerald-400">
          Verify Aadhaar
        </h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter Aadhaar Number"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
            />
            <button
              onClick={handleAadhaarSubmit}
              className="w-full bg-emerald-500 hover:bg-emerald-600 py-2 rounded font-semibold"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
            />
            <button
              onClick={handleOtpVerify}
              className="w-full bg-emerald-500 hover:bg-emerald-600 py-2 rounded font-semibold"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
