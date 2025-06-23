

function TeeSheet(data: string[][]) {
    return (
      <table border={1}>
      <tbody>
        {data ? data.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => <td key={j}>{cell}</td>)}
          </tr>
        )) : null}
      </tbody>
    </table>
    )
}

export default TeeSheet;