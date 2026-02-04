"use client";

import { useMemo, useState } from "react";
import DataTable from "./DataTable";
import { DataRow } from "../pages/api/dataset"


/**
 * Props for the FilteredTable component.
 *
 * This component acts as a controller/wrapper around the DataTable.
 * It handles filtering + searching, then passes the filtered results
 * down into the display-only table.
 */

interface FilteredTableProps {
  data: DataRow[];
}

export default function FilteredTable({ data }: FilteredTableProps) {

/**
   * Local UI state:
   *
   * search            → text input for searching all rows
   * companyFilter     → selected company dropdown value
   * prefectureFilter  → selected prefecture dropdown value
*/
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [prefectureFilter, setPrefectureFilter] = useState("All");


  /**
   * Dropdown menu items: Companies, Prefectures
   * 
   * useMemo() makes sure the computation only runs when 'data' changes
   */

  const companyOptions = useMemo(() => {
    return ["All", ...new Set(data.map((row) => row.Company))];
  }, [data]);

  const prefectureOptions = useMemo(() => {
    return ["All", ...new Set(data.map((row) => row.Prefecture))];
  }, [data]);


  
  /**
   * Apply all active filters + search to the dataset.
   *
   * Filtering rules:
   * - If dropdown is "All", we do not restrict results
   * - Otherwise, rows must match the selected value
   * - Search checks every value in the row (Station name, line, etc.)
   *
   * This returns a new array that is passed into the DataTable.
   */
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Company filter (unless "All")
      const matchesCompany =
        companyFilter === "All" || row.Company === companyFilter;

      // Prefecture filter (unless "All")
      const matchesPrefecture =
        prefectureFilter === "All" || row.Prefecture === prefectureFilter;

      /**
       * Global search:
       * Convert the row into one searchable string and check if it
       * contains the search term (case-insensitive).
       *
       * Example:
       * "Tokyo Station JR East 2020 Tokyo 0.0"
       */
      const matchesSearch =
        search === "" ||
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCompany && matchesPrefecture && matchesSearch;
    });
  }, [data, search, companyFilter, prefectureFilter]);


  /**
   * Below is what actually appears on the screen
   * 
   */
  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search stations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 border rounded-lg text-sm"
        />

        {/* Company Dropdown */}
        <select
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          className="w-full sm:w-52 px-3 py-2 border rounded-lg text-sm"
        >
          {companyOptions.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        {/* Prefecture Dropdown */}
        <select
          value={prefectureFilter}
          onChange={(e) => setPrefectureFilter(e.target.value)}
          className="w-full sm:w-52 px-3 py-2 border rounded-lg text-sm"
        >
          {prefectureOptions.map((pref) => (
            <option key={pref} value={pref}>
              {pref}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-600">
        Showing {filteredData.length} of {data.length} stations
      </p>

      {/* Table */}
      <DataTable data={filteredData} />
    </div>
  );
}
