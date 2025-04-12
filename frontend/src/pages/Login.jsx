import React, { useState } from "react";
import { auth, db, googleProvider } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const role = userDoc.data().role;

        if (role === "Police") {
          navigate("/police-dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError("User role not defined in database.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials or user not found.");
    }
  };

  // ✅ Move Google Sign-In function inside the component
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google Sign-In Success:", user);
      navigate("/"); // redirect to home or dashboard
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      setError("Google Sign-In failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 mb-6 text-center">
          🚔 Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md"
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded font-semibold mt-4 flex items-center justify-center gap-2"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google icon"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded-md font-semibold"
          >
            Login
          </button>
          <p className="mt-4 text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <span
              className="text-emerald-400 hover:underline cursor-pointer"
              onClick={() => navigate("/verify-aadhaar")}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
