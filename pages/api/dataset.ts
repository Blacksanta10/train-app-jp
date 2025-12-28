/**
 *  pages/api/dataset.ts
 * 
 * Purpose : will serve as a data layer with information about shinkansen 
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
  Station_Name: string;
  Shinkansen_Line: string;
  Year: number;
  Prefecture: string;
  "Distance from Tokyo st": number;
  Company: string;
};

/**
 * Next.js API handler
 * 
 * Handles GET requests to this endpoint and returns 
 * an array of parsed 'DataRow' objects
 * 
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataRow[]>
) {
  const filePath = path.join(process.cwd(), "public/data/shinkansen.csv");

  // Read the csv file data into memory
  const fileContent = fs.readFileSync(filePath, "utf8");

  // query parameter used for filtering results
  const { q } = req.query;


  /**
   * Parse the csv into JS objects
   * 
   * - 'header:true' tells Papaparse to use the 1st row as keys
   * - 'dynamicTyping:true' converts numeric field automatically
   * 
   * result is array of 'DataRow' objects
   */
  const parsed = Papa.parse<DataRow>(fileContent, {
    header: true,
    dynamicTyping: true, // converts numeric fields automatically
  }).data;

  /**
   * Filters rows based on the query parameter
   * 
   * The filter checks all values in each row and performs
   * a case-sensitive substring match
   * 
   */
  const filtered = q
    ? parsed.filter((row) =>
        Object.values(row).some((val) =>
          val.toString().toLowerCase().includes((q as string).toLowerCase())
        )
      )
    : parsed;


  // return the final dataset as JSON
  res.status(200).json(filtered);
}
