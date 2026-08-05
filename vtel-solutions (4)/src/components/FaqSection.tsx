import React, { useState } from 'react';
import { FAQS } from '../data/telecomData';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Sparkles 
} from 'lucide-react';

interface FaqSectionProps {
  openQuoteModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ openQuoteModal }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  const filteredFaqs = FAQS.filter(f => 
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-14 bg-slate-50 text-slate-900 border-b border-slate-200/90" id="faqs-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Frequently Asked <span className="text-blue-700">Questions</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            Everything you need to know about DTM/DSM datasets, clutter land cover maps, software integration, and licensing terms.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search FAQs (e.g., DTM vs DSM, Atoll, Clutter, Delivery)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-xs transition"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-200 hover:border-blue-300"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase font-bold text-blue-700 px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200 shrink-0">
                      {faq.category}
                    </span>
                    <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Ask Question Box */}
        <div className="text-center pt-4">
          <p className="text-xs text-slate-600 font-medium">
            Have a custom requirement or specific GIS format question?{' '}
            <button onClick={openQuoteModal} className="text-blue-700 font-bold hover:underline cursor-pointer inline-flex items-center gap-1">
              <span>Ask our RF Engineering Team directly</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-600 inline" />
            </button>
          </p>
        </div>

      </div>
    </section>
  );
};
