
// This is the HomePage
import React from "react";

export default function HomePage() {

// This is what is shown to the User
  return (

    <main className="min-h-screen bg-white text-slate-900 font-sans">
      {/* 1. Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
          Japan's Rail explorer
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mb-8">
          Comprehensive tools for exploring Japan's Shinkansen network and the Tokyo metropolitan rail systems
        </p>
        
        <div className="flex gap-3">
          <button className="bg-black text-white px-6 py-3 rounded font-medium hover:bg-slate-800 transition">
            Get Started
          </button>
          <button className="border border-slate-200 px-6 py-3 rounded font-medium hover:bg-slate-50 transition">
            Learn More
          </button>
        </div>
      </section>


      {/* 2. Simple Data Source Explanation */}
      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-4">
            The Data Source
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-xl leading-relaxed text-slate-700">
                This platform utilizes specialized datasets sourced from <strong>Kaggle</strong>. 
                By processing verified CSV records, we provide structured insights into Japan's 
                complex rail infrastructure with high precision.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold font-mono text-lg">01</span>
                <p className="text-slate-600">
                    <strong className="text-slate-900 block">Verified Records</strong> 
                    Data is parsed from curated CSV files to ensure consistency across all station profiles.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-blue-600 font-bold font-mono text-lg">02</span>
                <p className="text-slate-600"><strong className="text-slate-900 block">Coverage</strong>Currently supporting: All Shinkansen lines, Tokyo Metro, Toei Subway, Keio Corp, and partial JR East transit data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}