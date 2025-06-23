import { useState, useEffect } from 'react';
import axios from 'axios';

interface GoogleSheet {
  properties?: {
    title?: string;
  };
}

function App() {
  const [tabs, setTabs] = useState<Map<string, string[]>>(new Map());
  const [year, setYear] = useState<string>('');
  const [tab, setTab] = useState<string>('');
  const [data, setData] = useState<string[][]>([]);

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
      generateTabs(res.data.sheets);
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
          setData(res.data);
        }
      }
    }
    fetchData();
  }, [year, tab, tabs]);

  return (
    <div className='flex-col'>
      <div className='bg-black bg-cover min-h-fit w-full'>
        <div className='text-white text-xl font-bold p-5'>The Johnson Open</div>
      </div>
      
      <div className='w-full flex text-center'>
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
      <div>
        {/* {
          switch(tab) {
            case "": 

              break;
            case "": 

              break;
            case "": 

              break;
            default: 

              break;
          }
        } */}
      </div>
      <div>

      </div>
    </div>
  );
}

export default App;
