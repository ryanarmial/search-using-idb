import { useQuery } from "@tanstack/react-query";
import { getAutocompleteJSON } from "../services/autocomplete";

export const useAutocompleteQuery = () => {
  return useQuery({
    queryKey: ['autocomplete-airport'],
    queryFn: () => getAutocompleteJSON(),
  });
};
