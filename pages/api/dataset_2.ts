/**
 *  pages/api/dataset_2.ts
 * 
 * Purpose : will serve as a data layer with information about tokyo subway data
 * 
 * Responsibilities: 
 * - Loading raw .csv data
 * - Converting data in Javascript objects
 * 
 * Keeping this logic here prevents UI components from needing
 * to know where the data comes from or how it is parsed
 * 
 * If data source changes in the future (CSV -> database or API)
 * only this file should need to be updated
 *
 **/ 

import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

export type DataRow = {
  station_name: string;
  station_kanji: string;
  line_name: string;
  system_owner: string;
  station_code: string;
  line_color: string;
  is_interchange: number;
};

/**
 * Next.js API handler
 * 
 * Handles GET requests to this endpoint and returns 
 * an array of parsed 'DataRow' objects
 * 
 */

// CACHE: it stays in memory as long as the serverless function is "warm"
let cachedData: DataRow[] | null = null;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataRow[]>
) {

  // 1. Only parse if we haven't already
  if (!cachedData) {
    const filePath = path.join(process.cwd(), "data/tokyo_subway_dataset.csv");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const result = Papa.parse<DataRow>(fileContent, {
      header: true,
      skipEmptyLines: true, // Prevents errors on trailing empty rows
      dynamicTyping: true,
    });
    cachedData = result.data;
  }

  const { q } = req.query;


  // 2. Filter the cached data
  const filtered = q
    ? cachedData.filter((row) =>
        Object.values(row).some((val) =>
          val?.toString().toLowerCase().includes((q as string).toLowerCase())
        )
      )
    : cachedData;

    
  // 3. Limit the results! (Essential for big datasets)
  // Don't send 5,000 rows to the browser if they only need to see 20.
  const limitedResults = filtered.slice(0, 50);

  res.status(200).json(limitedResults);
}