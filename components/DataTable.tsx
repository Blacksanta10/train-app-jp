// components/DataTable.tsx
type DataRow = { [key: string]: string | number };

interface DataTableProps {
  data: DataRow[];
}

export default function DataTable({ data }: DataTableProps) {
  if (!data || data.length === 0) return <p>No results found.</p>;

  const headers = Object.keys(data[0]);

  return (
    <table border={1} cellPadding={5}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {headers.map((header) => (
              <td key={header}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
