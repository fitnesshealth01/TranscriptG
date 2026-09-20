import React, { useState } from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { Mail, Clock, Send, CheckCircle2, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Support",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.message.trim() || !form.email.trim() || !form.name.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to deliver message. Please try again.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to dispatch your inquiry. Please reach us directly at support@transcriptg.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <Seo
        title="Contact & Technical Support — TranscriptG"
        description="Get in touch with the TranscriptG engineering team for technical support, subtitle conversion feedback, partnership inquiries, and API assistance."
        keywords={[
          "contact transcriptg",
          "audio transcription support",
          "technical support",
          "subtitle conversion help",
          "transcriptg team",
        ]}
        canonicalPath="/contact"
      />

      <PageHeader
        eyebrow="Help & Inquiries"
        title="Contact & Technical Support"
        description="Have questions about our speech processing engines, subtitle formatting, or API capabilities? Reach out directly."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Direct Info Cards */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-3xl border border-black/10 bg-white shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ff4d00]/10 text-[#ff4d00] flex items-center justify-center font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0d0f12]">Direct Email</h3>
                  <p className="text-xs text-neutral-500">Fastest response channel</p>
                </div>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-black/5">
                  <span className="text-neutral-500 block text-[10px]">Publisher & Lead Architect:</span>
                  <span className="text-neutral-700 font-bold block">Akash Singh Solanki</span>
                  <a href="mailto:akashsinghsolanki66@gmail.com" className="font-bold text-[#ff4d00] hover:underline">
                    akashsinghsolanki66@gmail.com
                  </a>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-black/5">
                  <span className="text-neutral-500 block text-[10px]">Editorial & Peer Review:</span>
                  <a href="mailto:editorial@transcriptg.com" className="font-bold text-[#0d0f12] hover:underline">
                    editorial@transcriptg.com
                  </a>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-black/5">
                  <span className="text-neutral-500 block text-[10px]">General Support:</span>
                  <a href="mailto:support@transcriptg.com" className="font-bold text-[#ff4d00] hover:underline">
                    support@transcriptg.com
                  </a>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-black/5">
                  <span className="text-neutral-500 block text-[10px]">Privacy & Data Protection:</span>
                  <a href="mailto:privacy@transcriptg.com" className="font-bold text-[#0d0f12] hover:underline">
                    privacy@transcriptg.com
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-black/10 bg-white shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0d0f12]">Support SLAs</h3>
                  <p className="text-xs text-neutral-500">Guaranteed response times</p>
                </div>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Our support engineering team monitors tickets <strong>Monday through Friday, 9:00 AM – 6:00 PM EST</strong>. General inquiries receive responses within 24 hours.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-black/10 bg-white shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0d0f12]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Confidential
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Communications submitted through this form are never shared, sold, or added to commercial marketing lists.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-black/10 bg-white shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-[#0d0f12]">Message Successfully Dispatched</h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to TranscriptG. Our engineering support desk has logged your inquiry and will reply to <span className="font-mono font-bold text-[#0d0f12]">{form.email}</span> within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", subject: "General Support", message: "" });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#0d0f12] text-white text-xs font-mono font-bold hover:bg-[#ff4d00] transition-colors mt-4"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono font-bold text-neutral-700 block mb-1.5">
                        Your Name <span className="text-[#ff4d00]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Alex Morgan"
                        disabled={loading}
                        className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-sm text-[#0d0f12] focus:outline-none focus:border-[#ff4d00] disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono font-bold text-neutral-700 block mb-1.5">
                        Your Email <span className="text-[#ff4d00]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="alex@company.com"
                        disabled={loading}
                        className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-sm text-[#0d0f12] focus:outline-none focus:border-[#ff4d00] disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold text-neutral-700 block mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      disabled={loading}
                      className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-sm text-[#0d0f12] focus:outline-none focus:border-[#ff4d00] disabled:opacity-50"
                    >
                      <option value="General Support">General Support &amp; Technical Help</option>
                      <option value="Audio Transcriber">Engine 01: Audio &amp; Video Transcriber</option>
                      <option value="YouTube Transcripts">Engine 02: YouTube Transcript Assistance</option>
                      <option value="Format Converter">Engine 03: Subtitle Converter (SRT, VTT, JSON)</option>
                      <option value="Text Intelligence">Engine 04: AI Summarization &amp; Translation</option>
                      <option value="Editorial & Content">Editorial, Blog &amp; Linguistic Research</option>
                      <option value="Privacy & Legal">Privacy, GDPR &amp; Ad Compliance</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono font-bold text-neutral-700 block mb-1.5">
                      Your Message <span className="text-[#ff4d00]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please describe your question or feedback in detail..."
                      disabled={loading}
                      className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-sm text-[#0d0f12] focus:outline-none focus:border-[#ff4d00] leading-relaxed resize-y disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0d0f12] text-white text-xs font-mono font-bold hover:bg-[#ff4d00] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/10 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Dispatching Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message Directly
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
