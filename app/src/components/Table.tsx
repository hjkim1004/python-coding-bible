interface TableProps {
  head: string[];
  rows: (string | number)[][];
}

/** 표는 스스로 가로로 스크롤한다 — 페이지가 옆으로 밀리는 일은 없어야 한다. */
export default function Table({ head, rows }: TableProps) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
