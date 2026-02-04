import React from "react";
import { Plus } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { Button } from "../global/Button";

const SAMPLE_PROJECTS = [
    { id: "1", name: "E-commerce Store", thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80", lastEdited: "2h ago", status: "live" },
    { id: "2", name: "SaaS Landing Page", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", lastEdited: "1d ago", status: "draft" },
    { id: "3", name: "Portfolio Site", thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80", lastEdited: "3d ago", status: "live" },
] as const;

export const ProjectGrid = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
                    <p className="text-gray-400">Manage and deploy your AI-generated applications.</p>
                </div>
                <a href="/builder">
                    <Button variant="glow" className="gap-2">
                        <Plus className="w-4 h-4" /> New Project
                    </Button>
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SAMPLE_PROJECTS.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}

                {/* New Project Placeholder Card */}
                <a href="/builder" className="group border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all cursor-pointer min-h-[280px]">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-violet-500/20">
                        <Plus className="w-8 h-8 text-gray-500 group-hover:text-violet-400" />
                    </div>
                    <span className="font-semibold text-gray-400 group-hover:text-white">Create New Project</span>
                </a>
            </div>
        </div>
    );
};
