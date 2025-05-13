import React, { act } from "react";

interface TeamNavProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const tabs = ["Summary", "Results", "Squad", "News"];

const TeamNav: React.FC<TeamNavProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="w-full border-b border-gray-200 mt-6">
            <nav className="flex justify-center space-x-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-4 text-sm font-medium transition-colors duration-200 border-b-2 ${
                            activeTab === tab ? "border-indigo-600 text-indigo-700"
                            : "border-transparen text-gray-500 hover:text-indigo-600"
                        }`}
                    > {tab}</button>
                ))}
            </nav>
        </div>
    );
};

export default TeamNav;