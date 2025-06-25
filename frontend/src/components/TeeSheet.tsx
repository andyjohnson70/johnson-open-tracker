

function TeeSheet({ data, isPending } : TableProps) {
    let header = data[0];
    let values = data.slice(1).filter(item => item.length > 0);
    return (
      <table className="border-separate border-spacing-0 w-full md:w-auto">
        <thead className='[&>*]:divide-x [&>*]:divide-solid [&>*]:ring sticky top-0 [&>*]:bg-white z-10'>
          <tr className='[&>td]:font-bold [&>td]:text-lg [&>td]:text-dark-blue [&>td]:p-2'>
            {header?.map((value, i) => <td className="" key={i}>{value}</td>)}
          </tr>
        </thead>
        <tbody className='[&>*]:divide-x [&>*]:divide-solid [&>*]:ring'>
          {values?.map((row, i) => (
            <tr className={`[&>*]:font-100 [&>*]:text-sm [&>*]:p-2 ${i % 2 === 1 ? '[&>*]:bg-white ': '[&>*]:bg-light-green'}`} key={i}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default TeeSheet;