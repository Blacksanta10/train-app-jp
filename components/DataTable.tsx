/**
 * DataTable component
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



import { DataRow } from "../pages/api/dataset";

interface DataTableProps {
  data: DataRow[];
}


// React component for displaying tabular data
export default function DataTable({ data }: DataTableProps) {
  if (!data || data.length === 0) return <p>No results found.</p>;

  // extracts table headers from first data object (dynamic)
  const headers = Object.keys(data[0]);


  // what the datatable actually looks like
  return (

    /**
     * Styling using tailwind.css
     * 
     */


    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray"
                >
                  {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          {/**
           * Render one table row per data entry
           * 
           * 'idx' is used as a key here because the dataset 
           * is static. 
           * For mutable or interactive datasets, a stable 
           * unique indentifier would be better
           */}

          {data.map((row, idx) => (
            <tr 
              key={idx}
              className="even:bg-gray-50 hover:bg-gray-100"  
            >
              {headers.map((header) => (
                /**
                 * Access each cell value dynamically using
                 * the header name as a key
                 * 
                 * Type assertion is required because 'Object.keys' 
                 * returns a str[], while Typescript expects keys of 'DataRow'
                 */
              
                <td
                  key={header}
                  className="px-4 py-2 border-b text-gray-700"
                >
                  {row[header as keyof DataRow]}
                </td>

              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
