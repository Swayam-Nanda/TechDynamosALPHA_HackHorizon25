import React from "react";

const teamMembers = [
  {
    name: "Swayam Nanda",
    role: "Project Lead & Backend + Frontend Manager",
    image: "/assets/swayam.jpg",
    bio: "Swayam oversees the entire development process, ensuring smooth coordination between backend and frontend workflows. With a strong focus on both functionality and user experience, he leads the team with technical expertise and strategic planning.",
  },
  {
    name: "Roshan",
    role: "UI Designer & Authentication Developer",
    image: "/assets/roshan.jpg",
    bio: "Roshan contributes to both the visual interface and the implementation of user authentication mechanisms. He ensures secure user onboarding while maintaining a consistent and user-friendly design throughout the application.",
  },
  {
    name: "Om",
    role: "Database Manager",
    image: "/assets/om.jpg",
    bio: "Om is responsible for managing and structuring the application’s database. He ensures data integrity, security, and efficient data flow, enabling seamless performance across the platform.",
  },
  {
    name: "Kunal",
    role: "UI Designer",
    image: "/assets/kunal.jpg",
    bio: "Kunal focuses on creating intuitive and accessible user interfaces. His attention to design aesthetics and usability helps deliver a smooth and engaging experience for end users.",
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
