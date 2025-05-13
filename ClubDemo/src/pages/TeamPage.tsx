import { useParams } from "react-router-dom";
import teamsData from "../Data/TeamInfo.json";
import React, { useState, useEffect } from "react";
import TeamNav from "../../components/TeamNav";
import type { Team } from "../types";

const TeamPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [team, setTeam] = useState<Team | null>(null);
    const [activeTab, setActiveTab] = useState("Summary");

    useEffect(() => {
        const found = teamsData.find((t: Team) => t.slug === slug);
        setTeam(found || null)
    }, [slug]);

    if (!team) {
        return <div className="text-center mt-10">Team not found</div>
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="text-center mb-8">
                <img
                    src={team.logoUrl}
                    alt={team.name}
                    className="mx-auto w-28 h-28 object-contain mb-4"
                />
                <h1 className="text-4xl font-bold text-gray-800">{team.name}</h1>
                <p className="text-gray-600 text-lg">{team.sport}</p>
            </div>
            <TeamNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="mt-6">
                {activeTab === "Summary" && <div>Summary content here</div>}
                {activeTab === "Results" && <div>Results here</div>}
                {activeTab === "Squad" && <div>Squad here</div>}
                {activeTab === "News" && <div>News here</div>}
            </div>
        </div>
    );
};

export default TeamPage;