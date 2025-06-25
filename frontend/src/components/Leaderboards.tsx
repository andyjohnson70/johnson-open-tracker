import { useEffect, useState } from "react";


function Leaderboards({ data, isPending } : TableProps) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [rollingIndex, setRollingIndex] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [playerList, setPlayerList] = useState<string[][]>([]);
  const [teamPairs, setTeamPairs] = useState<string[][]>([]);

  useEffect(() => {
    let values = data.slice(1).map(inner => {
      let copy = [...inner];
      if (copy.length > 2) {
        copy.splice(2, 1);
      }
      
      if (copy[0] === '' || copy[0] === undefined || copy[0] === '#NUM!') {
        copy = [];
      }
      return copy;
    }).filter((item => item.length > 0));
  
    setPlayerList(values);
    setTeamPairs([]);
  }, [data]);


  async function rollAndPickRow(exclude: number[] = []): Promise<number> {
    setIsRolling(true);
    const eligible = playerList.map((_, i) => i).filter(i => !exclude.includes(i));
  
    let index = 0;
    for (let speed = 50; speed <= 300; speed += 25) {
      index = eligible[Math.floor(Math.random() * eligible.length)];
      setRollingIndex(index);
      await new Promise(r => setTimeout(r, speed));
    }
    
    setIsRolling(false);
    return index;
  }
  
  async function generatePair() {
    const first = await rollAndPickRow();
    setSelectedIndices([first]);
    const second = await rollAndPickRow([first]);
    setSelectedIndices([first, second]);
    setRollingIndex(null);
    setTimeout(() => {
      const playerListCopy = [...playerList];
      const teamPairsCopy = [...teamPairs];
      const firstPlayer = playerListCopy[first];
      const secondPlayer = playerListCopy[second];
      const temp = playerListCopy.map((item, i) => {
        if(i === first || i === second) {
          item = [];
        };
        return item;
      }).filter((item => item.length > 0));

      teamPairsCopy.push(generateTeam(firstPlayer, secondPlayer));

      setPlayerList([...temp]);
      setTeamPairs([...teamPairsCopy]);
      setSelectedIndices([]);

      if(temp.length <= 1) {
        if(temp.length === 1) {
          let player = playerListCopy[0];
          let doubledPlayer = [player[0] + ' (' + player[1] + ') x2', ((parseInt(player[1]) * 2)).toString()];
          teamPairsCopy.push(doubledPlayer);
          setPlayerList([]);
          setTeamPairs([...teamPairsCopy]);
        }
        declareWinner();
      }
    }, 1000);
    
  }

  function generateTeam(firstPlayer: string[], secondPlayer: string[]): string[] {
    let firstPlayerString = firstPlayer[0] + ' (' + firstPlayer[1] + ') & ';
    let secondPlayerString = secondPlayer[0] + ' (' + secondPlayer[1] + ')';
    let totalScore = parseInt(firstPlayer[1]) + parseInt(secondPlayer[1]);
    return [firstPlayerString + secondPlayerString, totalScore.toString()];
  }

  function declareWinner() {
    let winningTeam = teamPairs[0];
    
  }

  return (
    <div className="flex items-start w-full">
      <table className="w-2/5">
        <thead className='[&>*]:divide-x [&>*]:divide-solid [&>*]:ring sticky top-0 [&>*]:bg-white z-10'>
          <tr className='[&>td]:font-bold [&>td]:text-xl [&>td]:text-dark-blue [&>td]:p-2'>
            <td>Name</td>
            <td>Points</td>
            <td>Gross</td>
          </tr>
        </thead>
        <tbody className='[&>*]:divide-x [&>*]:divide-solid [&>*]:ring '>
          {playerList?.map((row, i) => {
            const absoluteIndex = i;
            const isSelected = selectedIndices.includes(absoluteIndex);
            const isRollingNow = rollingIndex === absoluteIndex;
        
            let rowClass = "transition-all duration-300 ease-in-out";
            if (isSelected) {
              rowClass += " !bg-blue text-white font-bold";
            } else if (isRollingNow) {
              rowClass += " !bg-blue text-white";
            }

            return (
              <tr className={`${rowClass} [&>*]:text-100 [&>*]:text-md [&>*]:p-2 ${i % 2 === 1 ? 'bg-white ': 'bg-light-green'}`} key={`${row[0]}_${i}`}>
                {row?.map((cell, j) => <td key={`${cell[0]}_${j}`}>{cell}</td>)}
              </tr>
            )
            
          })}
        </tbody>
      </table>
      <div className="w-1/5">
        <button
          onClick={generatePair}
          disabled={isRolling}
          className="m-4 px-6 py-2 h-12 rounded bg-blue text-white font-semibold disabled:opacity-50"
        >
          Generate Pairs
        </button>
      </div>
      

      <table className="w-2/5">
        <thead className='[&>*]:divide-x [&>*]:divide-solid [&>*]:ring sticky top-0 [&>*]:bg-white z-10'>
            <tr className='[&>td]:font-bold [&>td]:text-xl [&>td]:text-dark-blue [&>td]:p-2'>
              <td className="min-w-[100px]">Team</td>
              <td>Points</td>
            </tr>
          </thead>
          <tbody className='[&>*]:divide-x [&>*]:divide-solid [&>*]:ring '>
          {teamPairs?.sort((a,b) => { return parseInt(b[1]) - parseInt(a[1]) }).map((row, i) => {
            return (
              <tr className={`[&>*]:text-100 [&>*]:text-md [&>*]:p-2 max-h-[36px] ${i % 2 === 1 ? 'bg-white ': 'bg-light-green'}`} key={`${row[0]}_${i}`}>
                {row?.map((cell, j) => <td key={j}>{cell}</td>)}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    
  )
}

export default Leaderboards;