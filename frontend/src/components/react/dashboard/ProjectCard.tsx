import React from "react";
import { MoreHorizontal, Play, Github, Trash2, Edit } from "lucide-react";
import { Button } from "../global/Button";

interface ProjectProps {
    id: string;
    name: string;
    thumbnail: string;
    lastEdited: string;
    status: "live" | "draft" | "building";
}

export const ProjectCard = ({ project }: { project: ProjectProps }) => {
    return (
        <div className="group relative bg-[#0d0d10] border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1">
            {/* Thumbnail */}
            <div className="aspect-video bg-[#18181b] relative overflow-hidden">
                <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] to-transparent" />

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button size="icon" variant="glass" className="h-8 w-8 rounded-lg">
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="glass" className="h-8 w-8 rounded-lg text-red-400 hover:bg-red-500/20">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-violet-600/90 backdrop-blur text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Play className="w-4 h-4 fill-current" /> Open Builder
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors">{project.name}</h3>
                    <button className="text-gray-500 hover:text-white transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{project.lastEdited}</span>
                    <div className="flex items-center gap-2">
                        {project.status === "live" && <span className="flex items-center gap-1 text-emerald-400"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Live</span>}
                        {project.status === "draft" && <span className="flex items-center gap-1 text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-gray-400" /> Draft</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};
