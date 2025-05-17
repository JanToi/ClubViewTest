import React from "react";
import type { Club } from "../src/types";
import TeamCard from "./TeamCard";

interface ClubViewProps {
    club: Club;
}

const ClubView: React.FC<ClubViewProps> = ({ club }) => {
    return (
        <div className="w-full max-w-6xl mx-auto p-6 sm:p-8 border border-gray-200 rounded-2xl shadow-xl bg-white">
            {/* Club info layout */}
            <div className="flex flex-col items-center text-center max-w-md mx-auto mb-10">
                {club.logoUrl && (
                    <img
                        src={club.logoUrl}
                        alt={`${club.name} logo`}
                        className="w-44 h-44 object-contain mb-5 rounded-full shadow-md"
                    />
                )}
                <h2 className="text-4xl font-bold mb-3 text-indigo-700">{club.name}</h2>
                <p className="text-gray-600 text-lg sm:text-xl">Location: {club.location}</p>
            </div>

            {/* Teams section */}
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 text-center">Our Teams:</h3>
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8 mt-4">
                {club.teams.map((team) => (
                    <TeamCard key={team.id} team={team} />
                ))}
            </div>
        </div>
    );
};

export default ClubView;
