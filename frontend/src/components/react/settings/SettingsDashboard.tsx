import React, { useState } from "react";
import { User, CreditCard, BarChart } from "lucide-react";
import { Button } from "../global/Button";

const TABS = [
    { id: "profile", label: "Profile", icon: User },
    { id: "subscription", label: "Subscription", icon: CreditCard },
    { id: "usage", label: "Usage", icon: BarChart },
] as const;

export const SettingsDashboard = () => {
    const [activeTab, setActiveTab] = useState<typeof TABS[number]["id"]>("profile");

    return (
        <div className="container mx-auto px-6 py-24 min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 shrink-0">
                    <nav className="space-y-1">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${activeTab === tab.id
                                        ? "bg-violet-600/10 text-violet-400 border border-violet-500/20"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-1 bg-[#0c0c0e] border border-white/5 rounded-3xl p-8">
                    {activeTab === "profile" && (
                        <div className="max-w-xl space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-violet-500/20 flex items-center justify-center text-2xl font-bold text-violet-400">
                                    MR
                                </div>
                                <Button variant="secondary" size="sm">Change Avatar</Button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Muneeb Ur Rehman"
                                        className="w-full bg-[#18181b] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        defaultValue="muneeb@genapps.online"
                                        className="w-full bg-[#18181b] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button variant="glow">Save Changes</Button>
                            </div>
                        </div>
                    )}

                    {activeTab === "subscription" && (
                        <div className="space-y-6">
                            <div className="p-6 bg-[#18181b] rounded-2xl border border-white/5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-white">Current Plan: <span className="text-violet-400">Pro</span></h3>
                                    <p className="text-sm text-gray-400">Renews on Nov 24, 2026</p>
                                </div>
                                <Button variant="secondary">Manage Subscription</Button>
                            </div>
                        </div>
                    )}

                    {activeTab === "usage" && (
                        <div>
                            <h3 className="text-lg font-medium text-white mb-6">Token Usage</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">AI Messages</span>
                                        <span className="text-white">342 / 500</span>
                                    </div>
                                    <div className="h-2 bg-[#18181b] rounded-full overflow-hidden">
                                        <div className="h-full bg-violet-500 w-[68%]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Storage</span>
                                        <span className="text-white">1.2GB / 5GB</span>
                                    </div>
                                    <div className="h-2 bg-[#18181b] rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[24%]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
