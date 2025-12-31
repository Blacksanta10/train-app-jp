/**
 * HomePage (client component)
 * 
 * Purpose: 
 * Serves as the main UI entry point for the app
 * 
 * Responsibilities:
 * - Manages client-side state (search query + dataset)
 * - Fetches filtered data from backend API
 * - Passes data down to presentation components
 * 
 * All parsing and filtering happens on the server
 */
"use client";

import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import type { DataRow } from "../pages/api/dataset";


/**
 * HomePage component
 * 
 * - Uses React Hooks ('useState', 'useEffect')
 * - Responds real time
 */
export default function HomePage() {

  // Holds dataset returned from the API
  const [data, setData] = useState<DataRow[]>([]);

  /* Stores the current search query entered by user
  * This value is used to dynamically request filtered
  * results from the backend API
  */
  const [query, setQuery] = useState("");

  /**
   * Fetch data from the API whenever the query changes
   * 
   * Dependency array:
   * -triggers this effect on initial render
   * - re-runs whenever 'query' is updated
   * 
   * The backend handles filtering so the client remains
   * simple and focused on UI
   */
  useEffect(() => {
    fetch(`/api/dataset?q=${query}`)
      .then((res) => res.json())
      .then((json: DataRow[]) => setData(json));
  }, [query]);

  return (
    /**
     * Main page layout
     * 
     * Only simple inline styling, can change to Tailwind
     */
    <div style={{ padding: "20px" }}>
      <h1>Shinkansen Station Explorer</h1>
      <input
        type="text"
        placeholder="Search stations..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "5px", marginBottom: "10px" }}
      />
      <DataTable data={data} />
    </div>
  );
}


