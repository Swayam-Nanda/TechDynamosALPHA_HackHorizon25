import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth, googleProvider } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google Sign-In Success:", user);

      const aadhaar = sessionStorage.getItem("verifiedAadhaar");
      if (!aadhaar) {
        setError("Aadhaar not verified. Please verify before signing up.");
        return;
      }

      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName || "Google User",
        email: user.email,
        aadhaar,
        provider: "google",
        createdAt: Date.now(),
      });

      sessionStorage.removeItem("verifiedAadhaar");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      setError("Google sign-in failed.");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    setError("");
    const { username, email, password } = form;
    const aadhaar = sessionStorage.getItem("verifiedAadhaar");

    if (!aadhaar) {
      setError("Aadhaar not verified. Please verify before signing up.");
      return;
    }

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        aadhaar,
        provider: "email",
        createdAt: Date.now(),
      });

      sessionStorage.removeItem("verifiedAadhaar");
      alert("✅ Registered successfully! Please verify your email.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    const aadhaar = sessionStorage.getItem("verifiedAadhaar");
    if (!aadhaar) {
      navigate("/verify-aadhaar");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-emerald-400">Sign Up</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none mb-6"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-emerald-500 hover:bg-emerald-600 py-2 rounded font-semibold"
        >
          Sign Up
        </button>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-gray-500 hover:bg-gray-600 py-2 rounded font-semibold mt-4 flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google icon"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already registered?{" "}
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
