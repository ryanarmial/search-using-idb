import { getAutocompleteFromDB, getAutocompleteJSON } from "../services/autocomplete"

export const getAutocompleteController = async () => {
  const autoCompleteDB = await getAutocompleteFromDB()

  if(!autoCompleteDB){
    const autoCompleteJSON = getAutocompleteJSON()
    return autoCompleteJSON
  }

}
