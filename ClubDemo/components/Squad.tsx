import React from 'react';
import squadData from '../src/Data/SquadData.json';

interface SquadProps {
    teamSlug: string;
}

interface Player {
    id: number;
    number: string;
    name: string;
    position: string;
    nationality: string;
    age: number;
    height: string;
    appearances: number;
    goals?: number;
    assists?: number;
    cleanSheets?: number;
}

const positionGroups = [
    { name: 'Goalkeepers', positions: ['GK'] },
    { name: 'Defenders', positions: ['RB', 'CB', 'LB'] },
    { name: 'Midfielders', positions: ['CDM', 'CM', 'CAM'] },
    { name: 'Forwards', positions: ['LW', 'RW', 'ST'] }
];

const Squad: React.FC<SquadProps> = ({ teamSlug }) => {
    const teamSquad = squadData[teamSlug as keyof typeof squadData]?.squad || [];

    const getStatBadge = (label: string, value: number, color: string) => (
        <div className={`px-2 py-1 rounded-md bg-${color}-50 text-${color}-700 text-xs font-medium inline-flex items-center gap-1`}>
            <span className="font-semibold">{value}</span>
            <span className="text-${color}-600">{label}</span>
        </div>
    );

    return (
        <div className="space-y-8">
            {positionGroups.map((group) => {
                const players = teamSquad.filter(player => group.positions.includes(player.position));
                if (players.length === 0) return null;

                return (
                    <div key={group.name} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">{group.name}</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {players.map((player: Player) => (
                                <div key={player.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-xl font-bold text-gray-700">
                                                {player.number}
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
                                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {player.position}
                                                    </span>
                                                </div>
                                                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>{player.nationality}</span>
                                                    <span>•</span>
                                                    <span>{player.age} years</span>
                                                    <span>•</span>
                                                    <span>{player.height}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            {getStatBadge('Apps', player.appearances, 'blue')}
                                            {player.position === 'GK' 
                                                ? getStatBadge('Clean Sheets', player.cleanSheets || 0, 'green')
                                                : (
                                                    <>
                                                        {getStatBadge('Goals', player.goals || 0, 'red')}
                                                        {getStatBadge('Assists', player.assists || 0, 'yellow')}
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Squad; 