

function Scores({ data } : TableProps) {
  let header = data.slice(1,6);
  let skins = data.slice(6);
  let values = data.slice(7);
  return (
    <table>
        <thead className='[&>*]:divide-x [&>*]:divide-solid [&>*]:border-b-1 [&>*]:border-b-solid [&>*]:border-black'>
          {header?.map((row, i) => (
            <tr className='[&>td]:font-bold [&>td]:text-md [&>td]:text-dark-blue [&>td]:px-2' key={i}>
              {row?.map((value, j) => <td className="" key={j}>{value}</td>)}
            </tr>
          ))}
          
        </thead>
        <tbody className='[&>*]:divide-x [&>*]:divide-solid'>
          {values?.map((row, i) => (
            <tr className={`[&>*]:font-100 [&>*]:text-sm [&>*]:p-2 ${i%3 === 0 ? '[&>*]:bg-light-green ': '[&>*]:bg-white'} ${i%3 === 2 ? '[&>*]:border-b-2 [&>*]:border-b-solid [&>*]:border-black' : ''}`} key={i}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default Scores;