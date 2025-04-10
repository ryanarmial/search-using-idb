import { get, set } from 'idb-keyval'
import idb from '../helper/idb'

export const VERSION_AUTOCOMPLETE = 1

export const getAutocompleteJSON = async () =>{
  const response = await fetch('http://d1lpvo9f29agwh.cloudfront.net/airport.json')
  const data = await response.json()
  return data
}

export const getAutocompleteFromDB = async () =>{
  return await get('autocomplete-airport', idb)
}

export const saveAutocompleteToDB = async (data: any) =>{
  const result = await set('autocomplete-airport', data, idb)
  return result
}
