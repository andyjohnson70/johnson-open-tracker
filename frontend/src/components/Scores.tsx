

function Scores({ data, isPending } : TableProps) {
  let header = data.slice(1,6).map(inner => inner.filter(str => str.trim() !== ""));
  let values = data.slice(7).map((inner, i) => {
    let copy = [...inner];
    if (i % 3 === 0) {
      copy.splice(1, 3);
    } else {
      copy.splice(0,2);
      if(copy.length < 20) {
        copy = copy.concat(Array(20 - copy.length).fill("0"));
      }
    }
    return copy;
  });

  return (
    <table className="border-separate border-spacing-0 w-full">
        <thead className='[&>*]:divide-x [&>*]:divide-solid [&>*]:ring sticky top-0 [&>*]:bg-white z-10 w-full'>
          {header?.map((row, i) => (
            <tr className='[&>td]:font-bold [&>td]:text-md [&>td]:2xl:text-2xl [&>td]:text-dark-blue [&>td]:px-2 [&>td]:whitespace-nowrap' key={i}>
              {row?.map((value, j) => <td colSpan={j === 0 ? 4 : j === 18 ? 2 : 1} key={j}>{value}</td>)}
            </tr>
          ))}
          
        </thead>
        <tbody className='[&>*]:divide-x [&>*]:divide-solid [&>*]:ring'>
          {values?.map((row, i) => (
            <tr className={`[&>*]:text-sm [&>*]:2xl:text-xl [&>*]:p-2 ${i % 3 === 0 ? '[&>*]:bg-light-green ': '[&>*]:bg-white'} ${i%3 === 2 ? '[&>*]:border-b-2 [&>*]:border-b-solid [&>*]:border-black' : ''}`} key={i}>
              {row.map((cell, j) => <td className={`${(i % 3 === 0 && j === 0) || ((i % 3 === 0 && j === 19)) ? 'font-bold' : 'font-300'} ${i % 3 === 2 && j === 1 ? 'font-bold !bg-light-green' : ''}`} colSpan={i%3 === 0 && j === 0 ? 4 : j === 0 ? 3 : j === 19 ? 2 : 1} key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table> 
  )
}

export default Scores;