import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const statusSteps = ["Registered", "Under Investigation", "Resolved"];

const TrackFIR = () => {
  const [firNumber, setFirNumber] = useState("");
  const [firData, setFirData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setFirData(null);
    try {
      const q = query(
        collection(db, "firs"),
        where("firNumber", "==", firNumber)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setFirData(data);
      } else {
        setError("FIR not found. Please check the FIR Number.");
      }
    } catch (err) {
      console.error("Error fetching FIR:", err);
      setError("An error occurred while fetching FIR data.");
    }
  };

  const getStatusIndex = (status) => {
    const index = statusSteps.findIndex((step) => step === status);
    return index === -1 ? 0 : index;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl shadow-xl border border-emerald-500">
        <h2 className="text-3xl font-bold text-center text-emerald-400 mb-6">
          🔍 Track FIR Status
        </h2>
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={firNumber}
            onChange={(e) => setFirNumber(e.target.value)}
            placeholder="Enter FIR Number (e.g., FIR-1234ABCD)"
            className="flex-1 p-3 bg-gray-800 rounded-md border border-gray-600"
          />
          <button
            onClick={handleSearch}
            className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-md text-white font-semibold"
          >
            Track
          </button>
        </div>

        {error && <p className="text-red-400">{error}</p>}

        {firData && (
          <>
            <div className="space-y-3 bg-gray-800 p-5 rounded-lg border border-gray-700">
              <p>
                <span className="font-semibold text-emerald-400">Name:</span>{" "}
                {firData.name}
              </p>
              <p>
                <span className="font-semibold text-emerald-400">Aadhaar:</span>{" "}
                {firData.aadhaar}
              </p>
              <p>
                <span className="font-semibold text-emerald-400">Phone:</span>{" "}
                {firData.phone}
              </p>
              <p>
                <span className="font-semibold text-emerald-400">Email:</span>{" "}
                {firData.email}
              </p>
              <p>
                <span className="font-semibold text-emerald-400">Address:</span>{" "}
                {firData.address}
              </p>
              <p>
                <span className="font-semibold text-emerald-400">
                  Complaint:
                </span>{" "}
                {firData.complaint}
              </p>
              <p>
                <span className="font-semibold text-emerald-400">Status:</span>{" "}
                {firData.status}
              </p>
            </div>

            {/* Horizontal Status Progress */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3">FIR Progress</h3>
              <div className="flex justify-between items-center relative">
                {statusSteps.map((step, index) => {
                  const currentIndex = getStatusIndex(firData.status);
                  const isActive = index <= currentIndex;

                  return (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center relative"
                    >
                      {/* Connector Line */}
                      {index !== 0 && (
                        <div
                          className={`absolute top-3 -left-1/2 w-full h-1 ${
                            index <= currentIndex
                              ? "bg-emerald-500"
                              : "bg-gray-700"
                          }`}
                        />
                      )}
                      {/* Step Dot */}
                      <div
                        className={`w-6 h-6 rounded-full z-10 ${
                          isActive ? "bg-emerald-500" : "bg-gray-500"
                        }`}
                      ></div>
                      <span className="mt-2 text-sm text-center">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrackFIR;
// import React, { useState } from "react";
