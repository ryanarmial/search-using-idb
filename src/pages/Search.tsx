import { useEffect, useMemo, useState } from "react"
import { getAutocompleteController } from "../controllers/autocomplete"
import Fuse from "fuse.js"
import { debounce } from "../helper/debounce";

type AirportAutoComplete = {
  no:number;
  ac: string;
  an: string;
  cc: string;
  cn: string;
  con: string;
  score: number|string;
}

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [resutSearch, setResultSearch] = useState<AirportAutoComplete[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [searchTime, setSearchTime] = useState(0);

  useEffect(() => {
    const getAutocomplete = async () => {
      const autoComplete = await getAutocompleteController()
      setData(autoComplete)
    }

    getAutocomplete()
  }, [])

  const fuse = useMemo(() => {
    if (!data.length) return null;
    return new Fuse(data, {
      keys: [
        { name: 'ac', weight: 3 },  // highest priority
        { name: 'an', weight: 3 },
        { name: 'cc', weight: 2 },
        { name: 'cn', weight: 2 },
        { name: 'con', weight: 1 }  // lowest priority
      ],
      includeScore: true,
      minMatchCharLength: 2,
      threshold: 0.3,
      distance: 10,
      shouldSort: true,
      ignoreFieldNorm: true,
    });
  }, [data]);

  const onChangeSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    const startTime = performance.now();
    const input = event.target?.value
    if (fuse) {
      const result = fuse.search(input,{limit: 10})
      const resultMap:AirportAutoComplete[] = result.map((item) => item.item)

      const searchResult = isSorting? resultMap.sort((a, b) => {
        const aScore = typeof a.score === 'number' ? a.score : 0
        const bScore = typeof b.score === 'number' ? b.score : 0
        if (aScore === bScore) {
          return 0
        }
        return aScore < bScore ? 1 : -1
      }) : resultMap

      setResultSearch(searchResult)

      const endTime = performance.now();
      const time = endTime - startTime
      setSearchTime(time)
    }
  }

  return (
    <div>
      <div>Search Time: {searchTime}ms</div>
      <h1>Mau liburan kemana bapak Ricko?</h1>
      <input onChange={debounce(onChangeSearch, 500)} name='searching' placeholder='Masukan nama kota / bandara' style={{width: 500, padding: 10}}/>
      <label>
        <input type='checkbox' checked={isSorting} onChange={() => {setIsSorting(!isSorting)}}/>
        is sorting by score
      </label>
      {resutSearch.length > 0 && (<table style={{margin: '20px auto'}}>
        <thead>
          <tr>
            <th>No</th>
            <th>Order</th>
            <th>Airport Code</th>
            <th>Airport Name</th>
            <th>City Code</th>
            <th>City Name</th>
            <th>Country</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {resutSearch?.map((item, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <th>{item?.no}</th>
              <th>{item?.ac}</th>
              <th>{item?.an}</th>
              <th>{item?.cc}</th>
              <th>{item?.cn}</th>
              <th>{item?.con}</th>
              <th>{item?.score || 0}</th>
            </tr>
          ))}
        </tbody>
      </table>)}
    </div>
  )
}

export default SearchPage
