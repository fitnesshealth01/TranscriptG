import React, { useState } from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.message.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="space-y-12">
      <Seo
        title="Contact & Feedback — TranscriptG"
        description="Get in touch with the TranscriptG engineering team for feedback, feature requests, or technical support."
      />

      <PageHeader
        eyebrow="Support & Feedback"
        title="Contact TranscriptG"
        description="Have questions or suggestions for our linguistic engines? Send us a direct message."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-[#0d0f12]">Message Received</h3>
              <p className="text-sm text-neutral-600 max-w-sm mx-auto">
                Thank you for reaching out! Our team will review your feedback promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-[#0d0f12] text-white text-xs font-mono font-bold mt-4"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-mono font-bold text-neutral-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full p-3 bg-neutral-100 rounded-xl border border-neutral-200 text-sm text-[#0d0f12] focus:outline-none focus:border-[#ff4d00]"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-neutral-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@example.com"
                  className="w-full p-3 bg-neutral-100 rounded-xl border border-neutral-200 text-sm text-[#0d0f12] focus:outline-none focus:border-[#ff4d00]"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-neutral-700 block mb-1">Message / Feedback</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share your thoughts or feature requests..."
                  className="w-full p-3 bg-neutral-100 rounded-xl border border-neutral-200 text-sm text-[#0d0f12] focus:outline-none focus:border-[#ff4d00]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#ff4d00] hover:bg-[#e04400] text-white font-black text-sm font-mono tracking-tight thermal-glow flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" /> Send Feedback
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
