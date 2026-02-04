/**
 * 2nd Page (client component)
 * 
 * Purpose: 
 * Serves as Page number 2
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
import DataTable from "../../components/DataTable";
import type { DataRow } from "../../pages/api/dataset";
import FilteredTable from "@/components/FilteredTable";

// pop-up button's component is imported
import MapPopupButton from "@/components/MapPopupButton";


/**
 * HomePage component
 * 
 * - Uses React Hooks ('useState', 'useEffect')
 * - Responds real time
 */
export default function Page() {

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
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="text-3xl font-bold mb-2">
          Shinkansen Station Explorer
        </h1>

        <MapPopupButton />

        <p className="text-gray-600 mb-6">
          Search and explore Shinkansen stations across Japan.
        </p>


        <div className="overflow-x-auto">
          <FilteredTable data={data} />
        </div>
      </div>

    </main>

    

  );
}


