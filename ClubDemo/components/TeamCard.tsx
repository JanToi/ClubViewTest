import React from "react";
import type { Team } from "../src/types";

interface TeamCardProps {
    team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
    return (
        <div 
            className="w-72 sm:w-80 bg-slate-50 rounded-xl shadow-lg p-5 border border-gray-200 text-left 
                       transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
        >
            {/* Team Logo */}
            {team.logoUrl && ( // Only render if logoUrl exists
                <img 
                    src={team.logoUrl} 
                    alt={`${team.name} logo`} 
                    className="w-24 h-24 object-contain mb-4 rounded-full shadow-md" // Example styling: adjust as needed
                />
            )}
            <h3 className="text-xl sm:text-2xl font-semibold text-indigo-600 mb-3">{team.name}</h3>
            <p className="text-base text-gray-700 mb-1">Sport: {team.sport}</p>
            <p className="text-base text-gray-700">Members: {team.membersCount}</p>
        </div>
    );
};

export default TeamCard;