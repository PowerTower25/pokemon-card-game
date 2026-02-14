import { useQuery} from "@tanstack/react-query";
import { pokemonApi } from "../api/pokemon";
export const useRandomPokemonCards =  (count: number = 5) => {
  return useQuery({
    queryKey: ['pokemon', 'random', count],
    queryFn: () => pokemonApi.getRandomCards(count),
    enabled: false,
    staleTime: 0,
  })
}