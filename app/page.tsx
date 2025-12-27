// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import type { DataRow } from "../pages/api/dataset";


export default function HomePage() {
  const [data, setData] = useState<DataRow[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`/api/dataset?q=${query}`)
      .then((res) => res.json())
      .then((json: DataRow[]) => setData(json));
  }, [query]);

  return (
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


