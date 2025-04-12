import React from "react";

const teamMembers = [
  {
    name: "Swayam Nanda",
    role: "Team Leader & Frontend Dev",
    image: "https://via.placeholder.com/150", // Replace with actual pic URL
    bio: "Leads with code and chaos. UI wizard and bug hunter.",
  },
  {
    name: "Roshan",
    role: "Firebase & Integration",
    image: "https://via.placeholder.com/150",
    bio: "Keeps the backend from burning. Talks to Firestore like it’s a therapist.",
  },
  {
    name: "Om",
    role: "UI Designer & Docs",
    image: "https://via.placeholder.com/150",
    bio: "Designs interfaces that even your grandma can use. Probably drinking chai.",
  },
  {
    name: "Kunal",
    role: "Testing & Debugging",
    image: "https://via.placeholder.com/150",
    bio: "Finds bugs faster than mosquitoes in monsoon. Peaceful chaos engineer.",
  },
];

export default function About() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-emerald-400 mb-6 text-center">
          About Our Project
        </h1>
        <p className="text-gray-300 text-lg mb-12 text-center max-w-3xl mx-auto">
          The Virtual Police Station project aims to digitalize FIR filing and
          tracking. With features like Aadhaar-based login, digital evidence
          upload, anonymous reports, and real-time status updates, we’re here to
          make law enforcement accessible and efficient for everyone.
        </p>

        <h2 className="text-3xl font-semibold text-white mb-8 text-center">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-all"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-emerald-400"
              />
              <h3 className="text-xl font-semibold text-emerald-400">
                {member.name}
              </h3>
              <p className="text-sm text-gray-400 mb-2">{member.role}</p>
              <p className="text-gray-300 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
