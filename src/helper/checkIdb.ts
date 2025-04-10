import { get } from "idb-keyval"
import idb from "./idb"

export const checkStaticIdb = async (key:IDBValidKey):Promise<'EXPIRED'|'EMPTY'|'EXIST'> => {
  const getData = await get(key, idb)
  console.log(getData)
  return 'EXIST'
}
