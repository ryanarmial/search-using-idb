import { get, set } from 'idb-keyval'
import idb from '../helper/idb'

export const VERSION_AUTOCOMPLETE = 2
const DB_KEY = 'autocomplete-airport'

export const getAutocompleteJSON = async () =>{
  const response = await fetch('https://d1lpvo9f29agwh.cloudfront.net/airport_full.json')
  const data = await response.json()
  return data
}

export const getAutocompleteFromDB = async () =>{
  return await get(DB_KEY, idb)
}

export const saveAutocompleteToDB = async (data: any) =>{
  return await set(DB_KEY, data, idb)
}
