import React, { useState } from 'react';
import { ShoppingBag, Building2, Dumbbell, UtensilsCrossed, Briefcase, Palette, GraduationCap, Heart, Plane, ArrowRight } from 'lucide-react';

const industries = [
    { name: 'E-Commerce', icon: ShoppingBag, gradient: 'from-pink-500 to-rose-600', description: 'Online stores, product pages, and shopping experiences with cart and checkout flows.', sites: '2,400+', template: 'ecommerce' },
    { name: 'Agencies', icon: Building2, gradient: 'from-violet-500 to-indigo-600', description: 'Creative studios, consulting firms, and digital agencies with portfolio showcases.', sites: '1,800+', template: 'agency' },
    { name: 'Fitness', icon: Dumbbell, gradient: 'from-amber-500 to-orange-600', description: 'Gyms, personal trainers, and wellness brands with class schedules and booking.', sites: '1,200+', template: 'fitness' },
    { name: 'Restaurants', icon: UtensilsCrossed, gradient: 'from-orange-500 to-red-600', description: 'Menu displays, table reservations, and delivery ordering for food businesses.', sites: '1,600+', template: 'restaurant' },
    { name: 'SaaS', icon: Briefcase, gradient: 'from-brand-500 to-lavender-500', description: 'Startup landing pages, feature showcases, and pricing pages that convert.', sites: '3,100+', template: 'saas' },
    { name: 'Portfolios', icon: Palette, gradient: 'from-emerald-500 to-teal-600', description: 'Developer portfolios, designer showcases, and personal brand websites.', sites: '2,800+', template: 'portfolio' },
    { name: 'Education', icon: GraduationCap, gradient: 'from-blue-500 to-cyan-600', description: 'Online courses, school websites, and e-learning platforms with enrollment.', sites: '900+', template: 'saas' },
    { name: 'Healthcare', icon: Heart, gradient: 'from-red-500 to-pink-600', description: 'Medical practices, telehealth platforms, and wellness clinics.', sites: '700+', template: 'saas' },
    { name: 'Travel', icon: Plane, gradient: 'from-sky-500 to-blue-600', description: 'Travel agencies, booking platforms, and destination guides.', sites: '500+', template: 'saas' },
];

export default function IndustryShowcase() {
    const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);

    return (
        <section className="section-padding relative overflow-hidden section-bg-soft" id="industries">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="cloud-shape cloud-shape-1 top-[10%] right-[10%] animate-cloud-drift opacity-30" />
                <div className="cloud-shape cloud-shape-2 bottom-[5%] left-[5%] animate-cloud-drift-reverse opacity-20" />
            </div>

            <div className="section-container relative z-10">
                <div className="text-center mb-12">
                    <span className="section-badge">Industries</span>
                    <h2 className="section-title">
                        Built for <span className="gradient-text">Every Industry</span>
                    </h2>
                    <p className="section-subtitle">
                        From e-commerce to healthcare, Genapps adapts to your industry with specialized templates and features.
                    </p>
                </div>

                <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
                    {/* Left: Industry Cards Grid */}
                    <div className="grid grid-cols-3 gap-2.5">
                        {industries.map((ind) => (
                            <button
                                key={ind.name}
                                onClick={() => setSelectedIndustry(ind)}
                                className={`relative p-3 rounded-xl text-center transition-all duration-300 group ${selectedIndustry.name === ind.name
                                    ? 'bg-white/80 backdrop-blur-lg border-2 border-brand-300/50 shadow-lg'
                                    : 'bg-white/30 border border-white/30 hover:bg-white/50 hover:border-white/50'
                                    }`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${ind.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-500`} />
                                <ind.icon className={`h-5 w-5 mx-auto mb-1.5 transition-colors duration-300 ${selectedIndustry.name === ind.name ? 'text-brand-500' : 'text-slate-400 group-hover:text-slate-600'
                                    }`} />
                                <span className={`text-xs font-medium block ${selectedIndustry.name === ind.name ? 'text-slate-900' : 'text-slate-500'
                                    }`}>{ind.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right: Selected Industry Detail */}
                    <div className="glass-card p-8 transition-all duration-500">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${selectedIndustry.gradient} shadow-lg`}>
                                <selectedIndustry.icon className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 font-display">{selectedIndustry.name}</h3>
                                <p className="text-sm text-slate-500">{selectedIndustry.sites} sites built</p>
                            </div>
                        </div>

                        <p className="text-slate-500 leading-relaxed mb-6">{selectedIndustry.description}</p>

                        {/* Mini preview mockup */}
                        <div className={`relative h-48 rounded-xl overflow-hidden bg-gradient-to-br ${selectedIndustry.gradient} opacity-15 mb-6`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-white opacity-60">
                                    <selectedIndustry.icon className="h-16 w-16 mx-auto mb-3" />
                                    <p className="text-sm font-medium">{selectedIndustry.name} Template Preview</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href="#generator"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-500 to-lavender-500 text-white text-sm font-bold rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                        >
                            Build {selectedIndustry.name} Site
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
