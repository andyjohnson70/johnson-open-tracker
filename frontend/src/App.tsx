import { useState, useEffect, JSX, useTransition } from 'react';
import axios from 'axios';
import courseMap from './img/course-map.png';
import golf from './img/golf.png';
import TeeSheet from './components/TeeSheet';
import Leaderboards from './components/Leaderboards';
import Scores from './components/Scores';

function App(this: any) {
  const [tabs, setTabs] = useState<Map<string, string[]>>(new Map());
  const [year, setYear] = useState<string>('');
  const [tab, setTab] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('');
  const [data, setData] = useState<string[][]>([]);
  const [isPending, startTransition] = useTransition();

  function renderSwitch(tab: string): JSX.Element {
    switch(tab) {
      case "Tee Sheet": 
        return <TeeSheet data={data} isPending={isPending} />
      case "Scores": 
        return <Scores data={data} isPending={isPending} />
      case "LEADERBOARD": 
        return <Leaderboards data={data} isPending={isPending} />
      default: 
        return <div></div>
    }
  }

  function generateTabs(sheets: GoogleSheet[]) {
    let map = new Map();

    sheets?.forEach((sheet) => {
      let title = sheet.properties?.title;

      let splitTitle = title?.split(" ");
      let year = splitTitle?.shift();
      let tab = splitTitle?.join(" ");
      if(!map.has(year)) {
        map.set(year, []);
      }
      map.get(year).push(tab)
    });
    setTabs(map);
    let firstEntry = map.entries().next().value;
    setYear(firstEntry?.[0]);
    setTab(firstEntry?.[1]);
  }

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:4000/api/sheet/`);
      startTransition(async () => await generateTabs(res.data.sheets));
    }
    fetchData();
    
  }, []);

  useEffect(() => {
    async function fetchData() {
      if(year && tab) {
        if(!tabs.get(year)?.includes(tab)) {
          let newTabList = tabs.get(year)!;
          setTab(newTabList[0]);
        } else {
          const res = await axios.get(`http://localhost:4000/api/sheet/${year}/${tab}`);
          startTransition(async () => {
            await setData(res.data);
            setActiveTab(tab);
          });
        }
      }
    }
    fetchData();
  }, [year, tab, tabs]);

  return (
    <div className='flex-col flex h-screen'>
      <div className='bg-dark-blue min-h-fit w-full'>
        <div className='flex place-content-center space-x-3 text-2xl text-white font-bold m-3'>
          <img width={30} height={30} src={golf} alt='Golf Icon'/>
          <div className='text-white font-bold'>The Johnson Open</div>
          <img width={30} height={30} src={golf} alt='Golf Icon'/>
        </div>
      </div>

      <div className='md:flex md:flex-1 overflow-hidden'>
        <div className='md:inline-flex md:flex-col max-w-[300px] 2xl:max-w-fit hidden'>
          <div className="w-fit max-h-[calc(100vh-4rem-40px)] overflow-hidden">
            <img className='h-full object-cover' src={courseMap} alt="Swinomish Golf Links Course Map" />
          </div>
          <table className='max-w-[300px] 2xl:max-w-full'>
              <thead className='[&>*]:divide-x [&>*]:divide-solid'>
                <tr className='[&>*]:font-bold [&>*]:text-sm [&>*]:text-dark-blue [&>*]:2xl:text-2xl'>
                  <th>Par 71</th>
                  <th>Yards</th>
                  <th>Rating</th>
                  <th>Slope</th>
                </tr>
              </thead>
              <tbody className='[&>*]:divide-x [&>*]:divide-solid'>
                <tr className='[&>*]:font-100 [&>*]:text-xs [&>*]:text-center [&>td]:2xl:text-2xl'>
                  <td>Back</td>
                  <td>6,177</td>
                  <td>67.8</td>
                  <td>110</td>
                </tr>
                <tr className='[&>*]:font-100 [&>*]:text-xs [&>*]:text-center [&>td]:2xl:text-2xl'>
                  <td>Front</td>
                  <td>5,609</td>
                  <td>65.2</td>
                  <td>105</td>
                </tr>
              </tbody>
            </table>
        </div>

        <div className='flex-grow'>
          <div className='w-full flex [&>select]:m-2 [&>select]:p-1 [&>select]:2xl:p-3 [&>select]:2xl:text-xl [&>select]:border-dark-blue [&>select]:border-2 [&>select]:bg-white [&>select]:rounded-md [&>select]:text-black'>
            <select value={year} onChange={(event) => setYear(event.target.value)}>
              {[...tabs.keys()].map((year, i) => (
                <option key={i} value={year}>{year}</option>
              ))}
            </select>

            <select value={tab} onChange={(event) => setTab(event.target.value)}>
              {tabs.get(year)?.map((tab, i) => (
                <option key={i} value={tab}>{tab}</option>
              ))}
            </select>
          </div>
          <div className='flex max-w-screen mx-2 border-2 border-dark-blue h-[calc(100vh-4rem-50px)] 2xl:h-[calc(100vh-4rem-70px)] overflow-auto rounded-xl shadow-xl'>
            {
              renderSwitch(activeTab)
            }
          </div>
        </div>

      </div>
      
      
    </div>
  );
}

export default App;
