import React from 'react';
import { WORKFLOW_STEPS } from '../data/telecomData';
import { 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Headphones, 
  Sparkles 
} from 'lucide-react';

interface ProjectWorkflowProps {
  openQuoteModal: () => void;
}

export const ProjectWorkflow: React.FC<ProjectWorkflowProps> = ({ openQuoteModal }) => {
  return (
    <section className="py-14 bg-slate-50 text-slate-900 border-b border-slate-200/90" id="workflow-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-xs">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>End-to-End QA & Delivery Pipeline</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Our Project <span className="text-blue-700">Workflow</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            From initial spatial resolution scoping to final RF software import and 24/7 technical support, we ensure strict quality control at every stage.
          </p>
        </div>

        {/* Workflow Timeline Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {WORKFLOW_STEPS.map((wf) => (
            <div 
              key={wf.step}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-500 transition-all duration-300 space-y-3 relative group shadow-xs hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-blue-700 group-hover:text-blue-600 transition-colors">
                  {wf.step}
                </span>
                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                {wf.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {wf.description}
              </p>
            </div>
          ))}
        </div>

        {/* Direct Callout Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white border border-blue-700 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-white">Ready to initiate your custom RF or GIS mapping project?</h3>
            <p className="text-xs text-blue-100 font-medium">Fast turn-around time with 24/7 engineering support and sample data evaluation.</p>
          </div>
          <button
            onClick={openQuoteModal}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-blue-50 text-blue-900 font-bold text-xs shadow-lg whitespace-nowrap cursor-pointer flex items-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Start Requirement Scoping</span>
          </button>
        </div>

      </div>
    </section>
  );
};
