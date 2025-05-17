import React from "react";

interface TeamNavProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const tabs = ["Summary", "Results", "Squad", "News"];

const TeamNav: React.FC<TeamNavProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="w-full border-b border-gray-200 pb-1">
            <nav className="flex gap-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                            px-8 py-3 text-base font-black uppercase tracking-wide transition-all duration-200
                            rounded-md border border-gray-200 font-display
                            ${activeTab === tab 
                                ? "text-red-600 bg-white border-red-600 shadow-sm" 
                                : "text-gray-600 bg-gray-50 hover:bg-white hover:text-gray-900 hover:border-gray-300"}
                            focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-opacity-50
                            whitespace-nowrap min-w-[120px] text-[15px]
                        `}
                        style={{
                            fontWeight: 900,
                            letterSpacing: '0.03em'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default TeamNav;