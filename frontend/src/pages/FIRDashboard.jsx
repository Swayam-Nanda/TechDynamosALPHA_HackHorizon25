import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const FIRDashboard = () => {
  const [firs, setFIRs] = useState([]);

  useEffect(() => {
    const fetchFIRs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "firs"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFIRs(data);
      } catch (error) {
        console.error("Error fetching FIRs:", error);
      }
    };

    fetchFIRs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">FIR Dashboard</h1>
      {firs.length === 0 ? (
        <p>No FIRs found.</p>
      ) : (
        <table className="table-auto w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {firs.map((fir) => (
              <tr key={fir.id}>
                <td className="border px-4 py-2">{fir.name}</td>
                <td className="border px-4 py-2">{fir.email}</td>
                <td className="border px-4 py-2">{fir.address}</td>
                <td className="border px-4 py-2">{fir.complaint}</td>
                <td className="border px-4 py-2">
                  {fir.timestamp?.toDate().toLocaleString() || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FIRDashboard;
