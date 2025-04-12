import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function PoliceDashboard() {
  const [firs, setFirs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFIRs = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "firs"));
    const firList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFirs(firList);
    setLoading(false);
  };

  useEffect(() => {
    fetchFIRs();
  }, []);

  const updateStatus = async (id, newStatus) => {
    const firRef = doc(db, "firs", id);
    await updateDoc(firRef, { status: newStatus });
    fetchFIRs(); // Refresh
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h2 className="text-3xl font-bold text-emerald-400 mb-6">
        👮 Police Dashboard
      </h2>

      {loading ? (
        <p className="text-gray-300">Loading FIRs...</p>
      ) : firs.length === 0 ? (
        <p>No FIRs found.</p>
      ) : (
        <div className="grid gap-6">
          {firs.map((fir) => (
            <div
              key={fir.id}
              className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"
            >
              <p>
                <strong>FIR Number:</strong> {fir.firNumber}
              </p>
              <p>
                <strong>Complainant:</strong> {fir.complainant || "N/A"}
              </p>
              <p>
                <strong>Crime:</strong> {fir.crimeType}
              </p>
              <p>
                <strong>Date:</strong> {fir.date}
              </p>
              <p>
                <strong>Location:</strong> {fir.location}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-emerald-400">{fir.status}</span>
              </p>

              <div className="mt-3 space-x-3">
                <button
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded"
                  onClick={() => updateStatus(fir.id, "Under Investigation")}
                >
                  Mark Under Investigation
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded"
                  onClick={() => updateStatus(fir.id, "Resolved")}
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
