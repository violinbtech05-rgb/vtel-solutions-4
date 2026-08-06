import React, { useState } from 'react';
import { PhoneCall, Mail, Globe, MapPin, Send, CheckCircle2, Sparkles, Radio, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceNeeded: 'Digital Terrain Models (DTM)',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          product: formData.serviceNeeded,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        alert('Failed to send inquiry: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-slate-950 text-slate-100 border-b border-slate-800" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Get in Touch with VTel Solutions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Contact Us & <span className="text-cyan-400">Request Data</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Need high-resolution digital mapping products or turnkey RF planning services? Our engineering team responds within 4 business hours.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Info */}
          <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xl">
                <Radio className="w-5 h-5" />
                <span>VTel Solutions</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Global provider of Telecom RF Planning, Digital Mapping, and GIS Solutions for mobile network operators, telecom vendors, and consulting firms.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">General Inquiries & Sales</div>
                  <a href="mailto:info@vtelsolution.com" className="font-bold text-slate-200 hover:text-cyan-400 transition-colors">
                    info@vtelsolution.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <Globe className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Official Website</div>
                  <a href="https://www.vtelsolution.com" target="_blank" rel="noreferrer" className="font-bold text-slate-200 hover:text-cyan-400 transition-colors">
                    www.vtelsolution.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Support Availability</div>
                  <span className="font-bold text-slate-200">24/7 Global Engineering Operations</span>
                </div>
              </div>
            </div>

            {/* Core Services Offered Summary */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Services We Provide</div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /><span>RF Planning</span></div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /><span>DTM Terrain Maps</span></div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /><span>DSM Surface Models</span></div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /><span>Clutter Land Cover Maps</span></div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /><span>3D Building Vector</span></div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /><span>Coverage Prediction</span></div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /><span>Network Optimization</span></div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /><span>Microwave Link Budget</span></div>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">Inquiry Received!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you for contacting VTel Solutions. An RF engineering specialist will review your request and reach out shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@company.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Company / Organization</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Telecom Operator / Vendor"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Product / Service Needed *</label>
                    <select
                      value={formData.serviceNeeded}
                      onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    >
                      <option>Digital Terrain Models (DTM)</option>
                      <option>Digital Surface Models (DSM)</option>
                      <option>Clutter Land-Use Maps (1m - 30m)</option>
                      <option>3D Building Vectors (LOD1 / LOD2 / LOD3)</option>
                      <option>Turnkey RF Planning & Optimization</option>
                      <option>Microwave Link & LOS Analysis</option>
                      <option>5G NR Coverage Prediction & Simulation</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Project Area / Coordinate Details *</label>
                  <textarea
                    rows={4}
                    placeholder="Provide details such as target country, project square area (sq km), required resolution, or specific RF tool format."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending Inquiry...' : 'Submit Inquiry to VTel Engineering'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
