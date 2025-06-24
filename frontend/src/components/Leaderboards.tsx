

function Leaderboards({ data } : TableProps) {
  let values = data.slice(1).map(inner => {
    const copy = [...inner];
    if (copy.length > 2) {
      copy.splice(2, 1);
    }
    return copy;
  });
  return (
    <table>
        <thead className='[&>*]:divide-x [&>*]:divide-solid [&>*]:border-b-1 [&>*]:border-b-solid [&>*]:border-black'>
          <tr className='[&>td]:font-bold [&>td]:text-lg [&>td]:text-dark-blue [&>td]:p-2'>
            <td>Name</td>
            <td>Points</td>
            <td>Gross</td>
          </tr>
        </thead>
        <tbody className='[&>*]:divide-x [&>*]:divide-solid'>
          {values?.map((row, i) => (
            <tr className={`[&>*]:text-100 [&>*]:text-sm [&>*]:p-2 ${i%2 === 1 ? '[&>*]:bg-white ': '[&>*]:bg-light-green'}`} key={i}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default Leaderboards;