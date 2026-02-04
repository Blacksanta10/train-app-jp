/**
 * This is page 3
 * 
 * Contains data on Tokyo subway system
 * 
 * 
 */

"use client";

import { useEffect, useState } from "react";
import DataTable from "../../components/DataTabel_2";
import type { DataRow } from "../../pages/api/dataset_2";

export default function ExplorerPage() {
  const [data, setData] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  // Fetch data from your API layer
  const updateData = async (search: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/dataset_2?q=${encodeURIComponent(search)}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch stations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    updateData('');
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Station Explorer</h1>
          <p className="mt-2 text-slate-600">
            Search and filter through the Tokyo transit network database.
          </p>
        </header>

        {/* Search Controls */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by name, code, or line..."
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                updateData(e.target.value); // In production, wrap this in a debounce
              }}
            />
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Showing {data.length} results
          </div>
        </div>

        {/* Component Integration */}
        <section className="bg-white rounded-xl shadow-sm">
          <DataTable data={data} isLoading={loading} />
        </section>

        {/* Technical Footer */}
        <footer className="mt-8 text-center border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-400">
            Source: Kaggle Dataset • Dataset Coverage: Shinkansen, Tokyo Metro, Toei, Keio, JR East (Partial)
          </p>
        </footer>

      </div>
    </div>
  );
}