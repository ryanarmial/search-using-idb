import { useEffect } from "react"
import { getAutocompleteController } from "../controllers/autocomplete"

const SearchPage = () => {


  useEffect(() => {
    const getAutocomplete = async () => {
      const autoComplete = await getAutocompleteController()
      console.log(autoComplete)
    }

    getAutocomplete()
  }, [])

  return (
    <div>
      <h1>Mau liburan kemana bapak Ricko?</h1>
      <input name='searching' placeholder='Masukan nama kota / bandara' style={{width: 500, padding: 10}}/>
    </div>
  )
}

export default SearchPage
