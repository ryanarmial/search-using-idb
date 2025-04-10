import { getAutocompleteFromDB, getAutocompleteJSON, saveAutocompleteToDB, VERSION_AUTOCOMPLETE } from "../services/autocomplete"

export const getAutocompleteController = async () => {
  const autoCompleteDB = await getAutocompleteFromDB()

  if(!autoCompleteDB || autoCompleteDB.version !== VERSION_AUTOCOMPLETE) {
    const autoCompleteJSON = await getAutocompleteJSON()
    saveAutocompleteToDB({
      version: VERSION_AUTOCOMPLETE,
      data: autoCompleteJSON
    })
    return autoCompleteJSON
  }
  return autoCompleteDB.data
}
