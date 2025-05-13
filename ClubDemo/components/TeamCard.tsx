import React from 'react';
import { Link } from 'react-router-dom';
import type { Team } from '../src/types';

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <Link to={`/teams/${team.slug}`}>
      <div className="cursor-pointer bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-center w-64">
        <img
          src={team.logoUrl}
          alt={`${team.name} logo`}
          className="w-20 h-20 mx-auto mb-3 object-contain"
        />
        <h3 className="text-xl font-semibold text-indigo-700">{team.name}</h3>
        <p className="text-gray-600">{team.sport}</p>
        <p className="text-gray-500 text-sm">{team.membersCount} members</p>
      </div>
    </Link>
  );
};

export default TeamCard;
