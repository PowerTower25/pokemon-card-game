import { apiClient } from "./client";
import { PokemonCardSchema, PokemonCardListResponseSchema, type PokemonCard } from "../types/card";

export const pokemonApi = {
  getAllCards: async () =>  {
    const {data} = await apiClient.get('/cards');
    return PokemonCardListResponseSchema.parse(data)
  },

  getRandomCard: async () => {
    const {data} = await apiClient.get('/cards');
    const cards = PokemonCardListResponseSchema.parse(data)
    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomCardId = cards[randomIndex].id;

    const {data: cardData} = await apiClient.get(`/cards/${randomCardId}`)
    return PokemonCardSchema.parse(cardData)
  },

  getRandomCards: async (count: number = 5) => {
      const {data: cardsList} = await apiClient.get('/cards');
      const shuffled = [...cardsList].sort(() => Math.random() - 0.5);
      const selectedCards = shuffled.slice(0, count);

      // Fetch full details for each card
      const fullCards = await Promise.all( 
        selectedCards.map( async (card) => {
          const {data} = await apiClient.get(`/cards/${card.id}`)
          return data
        })
      )
      return fullCards
  }
}