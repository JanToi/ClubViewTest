import React from "react";
import type { Club } from "../src/types";
import TeamCard from "./TeamCard";

interface ClubViewProps {
    club: Club;
}

const ClubView: React.FC<ClubViewProps> = ({ club }) => {
    return (
        <div className="max-w-5xl mx-auto p-6 sm:p-8 border border-gray-200 rounded-2xl shadow-xl bg-white text-center">

            {/* Club logo — displayed above club name */}
            {club.logoUrl && (
                <img 
                    src={club.logoUrl} 
                    alt={`${club.name} logo`} 
                    className="w-32 h-32 object-contain mb-4 mx-auto rounded-full shadow-md" // mx-auto ensures it's centered
                />
            )}
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-indigo-700">{club.name}</h2>
            <p className="text-gray-600 mb-6 text-lg sm:text-xl">Location: {club.location}</p>
            
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">Our Teams:</h3>
            
            {/* Flex container for team cards: horizontal, centered, wrapped, with gap */}
            <div className="flex flex-row flex-wrap justify-center gap-6 lg:gap-8 mt-4">
                {club.teams.map(team => (
                    <TeamCard key={team.id} team={team} />
                ))}
            </div>
        </div>
    );
};

export default ClubView;