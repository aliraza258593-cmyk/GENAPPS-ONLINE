import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Clock, Send, Check, Sparkles, ArrowRight, Copy, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../context/ToastContext';

const contactMethods = [
    { icon: Mail, title: 'Email', value: 'hello@genapps.online', desc: 'We reply within 24 hours', gradient: 'from-blue-500 to-cyan-500' },
    { icon: MessageSquare, title: 'Live Chat', value: 'Available 9am–6pm EST', desc: 'Instant support for Pro users', gradient: 'from-brand-500 to-lavender-500' },
    { icon: MapPin, title: 'Office', value: 'San Francisco, CA', desc: 'By appointment only', gradient: 'from-emerald-500 to-teal-500' },
    { icon: Clock, title: 'Hours', value: 'Mon–Fri, 9am–6pm EST', desc: 'Weekend email support', gradient: 'from-orange-500 to-pink-500' },
];

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [errors, setErrors] = useState({});
    const { success: showSuccess, error: showError } = useToast();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            showError('Please fill in all required fields correctly.');
            return;
        }
        setSending(true);

        // Build mailto link that sends to the real email (hidden from UI)
        const realEmail = 'ma7273704@gmail.com';
        const mailtoSubject = encodeURIComponent(formData.subject || 'Contact from Genapps');
        const mailtoBody = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
        );

        // Open mail client with the real email
        window.open(`mailto:${realEmail}?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');

        setTimeout(() => {
            setSending(false);
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setErrors({});
            showSuccess('Message sent! We\'ll get back to you within 24 hours.');
            setTimeout(() => setSubmitted(false), 5000);
        }, 800);
    };

    return (
        <div>
            {/* Premium Hero Section */}
            <section className="page-hero">
                <div className="page-hero-bg" />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="cloud-shape cloud-shape-1 top-[10%] left-[20%] animate-cloud-drift opacity-40" />
                    <div className="cloud-shape cloud-shape-2 top-[25%] right-[15%] animate-cloud-drift-reverse opacity-25" />
                </div>
                <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
                <div className="section-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-badge">
                            <Mail className="h-3.5 w-3.5 mr-2" />
                            Contact
                        </span>
                    </motion.div>
                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 font-display text-slate-900"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        Get in <span className="gradient-text">Touch</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        Have a question, feedback, or want to say hi? We'd love to hear from you. Our team is here to help.
                    </motion.p>
                </div>
            </section>

            <section className="section-padding pt-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Contact Methods */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {contactMethods.map((method, i) => (
                            <motion.div
                                key={method.title}
                                className="premium-card p-6 text-center group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                            >
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${method.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    <method.icon className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-sm mb-1 font-display">{method.title}</h3>
                                <p className="text-sm text-brand-500 font-semibold mb-1">{method.value}</p>
                                <p className="text-xs text-slate-400">{method.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Form */}
                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            className="premium-card p-8 sm:p-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            {submitted ? (
                                <div className="text-center py-12">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                    >
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-5 shadow-lg">
                                            <Check className="h-8 w-8 text-white" />
                                        </div>
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3 font-display">Message Sent!</h3>
                                    <p className="text-sm text-slate-500">We'll get back to you within 24 hours. Thank you for reaching out.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold text-slate-900 font-display mb-1">Send us a message</h3>
                                        <p className="text-sm text-slate-400">Fill out the form below and we'll get back to you shortly.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                                                className={`premium-input ${errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-200/40' : ''}`}
                                                placeholder="John Doe"
                                            />
                                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                                                className={`premium-input ${errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-200/40' : ''}`}
                                                placeholder="you@example.com"
                                            />
                                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="premium-input"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="premium-input resize-none"
                                            placeholder="Tell us more about your question or feedback..."
                                        />
                                    </div>
                                    {/* Info note */}
                                    <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50/60 border border-blue-200/40 mb-3">
                                        <Info className="h-3.5 w-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                                        <p className="text-[11px] text-blue-600 leading-relaxed">
                                            Clicking "Send" will open your default email app with the message pre-filled. Alternatively, use "Copy Message" to copy and paste into any email client.
                                        </p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={sending}
                                            className="flex-1 btn-glow py-4 rounded-xl sparkle-btn"
                                        >
                                            {sending ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <span className="flex items-center justify-center gap-2">
                                                    <Send className="h-4 w-4" />
                                                    Send via Email
                                                </span>
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (!validateForm()) return;
                                                const text = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\n${formData.message}`;
                                                navigator.clipboard.writeText(text).then(() => {
                                                    showSuccess('Message copied to clipboard! Paste it into your preferred email client.');
                                                }).catch(() => {
                                                    showError('Failed to copy. Please try again.');
                                                });
                                            }}
                                            className="px-4 py-4 rounded-xl border border-slate-200/60 bg-white/60 text-slate-600 hover:bg-white hover:shadow-md transition-all text-sm font-semibold flex items-center gap-2"
                                        >
                                            <Copy className="h-4 w-4" />
                                            Copy
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>

                        {/* Email note */}
                        <p className="text-center mt-6 text-sm text-slate-400">
                            Or email us directly at <a href="mailto:hello@genapps.online" className="text-brand-500 hover:text-brand-600 font-semibold transition-colors">hello@genapps.online</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
