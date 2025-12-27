// API route that reads and parses my CSV dataset
// pages/api/dataset.ts
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataRow[]>
) {
  const filePath = path.join(process.cwd(), "public/data/shinkansen.csv");
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { q } = req.query;

  const parsed = Papa.parse<DataRow>(fileContent, {
    header: true,
    dynamicTyping: true, // converts numeric fields automatically
  }).data;

  // Optional: filter by query
  const filtered = q
    ? parsed.filter((row) =>
        Object.values(row).some((val) =>
          val.toString().toLowerCase().includes((q as string).toLowerCase())
        )
      )
    : parsed;

  res.status(200).json(filtered);
}
