/**
 * DataTable component for Tokyo subway data
 * 
 * Purpose:
 * Renders a HTML table based on an array of 'DataRow' objects
 * 
 * This component is data-driven:
 * - Table headers are from object keys
 * - Table rows are from the dataset
 * 
 * The component does not fetch or transform data itself. 
 * Presentation only
 */

import { DataRow } from "@/pages/api/dataset_2";
import React from "react";


interface DataTableProps {
    data: DataRow[];
    isLoading?: boolean;
}

export default function StationDataTable({ data, isLoading }: DataTableProps) {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <p className="text-slate-500 animate-pulse font-medium">Loading station data...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full p-12 text-center bg-white rounded-xl border border-slate-200">
        <p className="text-slate-400">No station records found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse bg-white">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Station</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Line</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Operator</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Code</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row) => (
            <tr 
              key={`${row.station_code}-${row.line_name}`} 
              className="hover:bg-blue-50/50 transition-colors group"
            >
              {/* Station Name Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {row.station_name}
                </div>
                <div className="text-sm text-slate-400">{row.station_kanji}</div>
              </td>

              {/* Line Name Column with Color Badge */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: row.line_color || '#94a3b8' }}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {row.line_name}
                  </span>
                </div>
              </td>

              {/* Operator Column */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-slate-600 italic">
                  {row.system_owner}
                </span>
              </td>

              {/* Station Code Column */}
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className="inline-block font-mono text-sm px-2 py-1 bg-slate-100 text-slate-500 rounded border border-slate-200">
                  {row.station_code || 'N/A'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}