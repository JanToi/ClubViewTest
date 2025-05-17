import { useParams } from "react-router-dom";
import teamsData from "../Data/TeamInfo.json";
import React, { useState, useEffect, useMemo } from "react";
import TeamNav from "../../components/TeamNav";
import Squad from "../../components/Squad";
import type { Team } from "../types";

const getRandomScore = () => {
    return Math.floor(Math.random() * 4);
};

const getRandomTeam = (currentTeam: Team): Team => {
    const soccerTeams = teamsData.filter(t => t.sport === "Soccer" && t.id !== currentTeam.id);
    return soccerTeams[Math.floor(Math.random() * soccerTeams.length)];
};

const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const TeamPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [team, setTeam] = useState<Team | null>(null);
    const [activeTab, setActiveTab] = useState("Summary");

    useEffect(() => {
        const found = teamsData.find((t: Team) => t.slug === slug);
        setTeam(found || null)
    }, [slug]);

    const upcomingMatches = useMemo(() => {
        if (!team) return [];
        return [1, 2].map((_, index) => ({
            opponent: getRandomTeam(team),
            date: new Date(2024, 2, 14 + index),
            time: index === 0 ? "19:30" : "20:00"
        }));
    }, [team]);

    const recentResults = useMemo(() => {
        if (!team) return [];
        return [
            {
                opponent: getRandomTeam(team),
                homeScore: 2,
                awayScore: 0,
                isHome: true,
                status: "FT",
                date: new Date(2024, 2, 13)
            },
            {
                opponent: getRandomTeam(team),
                homeScore: 1,
                awayScore: 1,
                isHome: false,
                status: "FT",
                date: new Date(2024, 2, 10)
            },
            {
                opponent: getRandomTeam(team),
                homeScore: getRandomScore(),
                awayScore: getRandomScore(),
                isHome: true,
                status: "Live",
                matchMinute: 67
            }
        ];
    }, [team]);

    const LiveMatchComponent = () => {
        const liveMatch = recentResults.find(result => result.status === "Live");
        if (!liveMatch) return null;

        return (
            <div className="bg-white rounded-xl shadow-sm border-2 border-green-500 overflow-hidden">
                <div className="bg-green-50 px-6 py-4 border-b border-green-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <h2 className="text-lg font-semibold text-green-800">Live Match</h2>
                            </div>
                            <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full font-medium animate-pulse">
                                {liveMatch.matchMinute}'
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 min-w-[200px]">
                            <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-sm">
                                <img 
                                    src={liveMatch.isHome ? team?.logoUrl : liveMatch.opponent.logoUrl} 
                                    alt={liveMatch.isHome ? team?.name : liveMatch.opponent.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="font-medium text-gray-900">
                                {liveMatch.isHome ? team?.name : liveMatch.opponent.name}
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 bg-white px-6 py-2 rounded-full shadow-sm mx-4">
                            {liveMatch.homeScore} - {liveMatch.awayScore}
                        </div>
                        <div className="flex items-center space-x-4 min-w-[200px] justify-end">
                            <span className="font-medium text-gray-900">
                                {!liveMatch.isHome ? team?.name : liveMatch.opponent.name}
                            </span>
                            <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-sm">
                                <img 
                                    src={!liveMatch.isHome ? team?.logoUrl : liveMatch.opponent.logoUrl}
                                    alt={!liveMatch.isHome ? team?.name : liveMatch.opponent.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (!team) {
        return <div className="text-center mt-10">Team not found</div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with sport and country */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center text-sm">
                        <svg className="h-4 w-4 mr-2 opacity-75" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{team.sport}</span>
                        <span className="mx-2 opacity-50">•</span>
                        <div className="flex items-center">
                            <svg className="h-4 w-4 mr-1 opacity-75" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                            </svg>
                            <span>USA</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team header */}
            <div className="bg-white shadow-lg relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-inner"></div>
                <img
                    src={team.logoUrl}
                    alt={team.name}
                                className="w-24 h-24 object-contain rounded-xl relative z-10"
                            />
                        </div>
                        <div className="ml-8">
                            <div className="flex items-center">
                                <h1 className="text-4xl font-bold text-gray-900">{team.name}</h1>
                                <svg className="h-7 w-7 ml-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="mt-2 flex items-center space-x-4">
                                <div className="flex items-center text-gray-500">
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    Founded 2020
                                </div>
                                <span className="text-gray-300">•</span>
                                <div className="flex items-center text-gray-500">
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                    </svg>
                                    {team.membersCount} members
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="sticky top-0 bg-white shadow-sm z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TeamNav activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === "Summary" && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <div className="text-sm font-medium text-gray-500">Total Members</div>
                                <div className="mt-2 text-3xl font-bold text-gray-900">{team.membersCount}</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <div className="text-sm font-medium text-gray-500">Sport</div>
                                <div className="mt-2 text-3xl font-bold text-gray-900">{team.sport}</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <div className="text-sm font-medium text-gray-500">Status</div>
                                <div className="mt-2 text-3xl font-bold text-gray-900">Active</div>
                            </div>
                        </div>

                        <LiveMatchComponent />

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <svg className="h-6 w-6 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    Upcoming Matches
                                </h2>
                                <div className="space-y-4">
                                    {upcomingMatches.map((match, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-sm">
                                                        <img src={team.logoUrl} alt={team.name} className="w-full h-full object-contain" />
                                                    </div>
                                                    <span className="font-medium text-gray-900">{team.name}</span>
                                                </div>
                                                <div className="text-3xl font-bold text-gray-500 bg-white px-6 py-2 rounded-full shadow-sm">VS</div>
                                                <div className="flex items-center space-x-4">
                                                    <span className="font-medium text-gray-900">{match.opponent.name}</span>
                                                    <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-sm">
                                                        <img src={match.opponent.logoUrl} alt={match.opponent.name} className="w-full h-full object-contain" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-between items-center text-sm">
                                                <span className="text-gray-500">{match.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                                                <span className="font-medium text-gray-900 bg-white px-3 py-1 rounded-full shadow-sm">{match.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "Results" && (
                    <div className="space-y-6">
                        <LiveMatchComponent />
                        
                        {recentResults.filter(result => result.status === "FT").map((result, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                {result.status === "Live" ? "Live Match" : "Full Time"}
                                            </h2>
                                            {result.status === "Live" && (
                                                <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full font-medium animate-pulse">
                                                    {result.matchMinute}'
                                                </span>
                                            )}
                                        </div>
                                        {result.status === "FT" && (
                                            <span className="text-sm text-gray-500">
                                                {formatDate(result.date)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 min-w-[200px]">
                                            <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-sm">
                                                <img 
                                                    src={result.isHome ? team.logoUrl : result.opponent.logoUrl} 
                                                    alt={result.isHome ? team.name : result.opponent.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <span className="font-medium text-gray-900">
                                                {result.isHome ? team.name : result.opponent.name}
                                            </span>
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 bg-white px-6 py-2 rounded-full shadow-sm mx-4">
                                            {result.homeScore} - {result.awayScore}
                                        </div>
                                        <div className="flex items-center space-x-4 min-w-[200px] justify-end">
                                            <span className="font-medium text-gray-900">
                                                {!result.isHome ? team.name : result.opponent.name}
                                            </span>
                                            <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-sm">
                                                <img 
                                                    src={!result.isHome ? team.logoUrl : result.opponent.logoUrl}
                                                    alt={!result.isHome ? team.name : result.opponent.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {result.status === "Live" && (
                                        <div className="mt-4 flex justify-center">
                                            <span className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full font-medium animate-pulse">
                                                {result.matchMinute}'
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "Squad" && (
                    <Squad teamSlug={slug || ""} />
                )}
                {activeTab === "News" && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                <svg className="h-6 w-6 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                                </svg>
                                Latest News
                            </h2>
                            <div className="space-y-6">
                                {[1, 2, 3].map((news) => (
                                    <div key={news} className="group cursor-pointer">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 group-hover:opacity-75 transition-opacity duration-200"></div>
                                            <div>
                                                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">Team Announcement {news}</h3>
                                                <p className="text-gray-500 text-sm mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                <div className="flex items-center mt-2 text-sm text-gray-400">
                                                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                    </svg>
                                                    2 hours ago
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamPage;