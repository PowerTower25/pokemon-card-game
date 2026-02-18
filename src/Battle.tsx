
import { useRandomPokemonCards } from "./hooks/usePokemon";
import { useBattleStore } from "./stores/battleStore";
import {pokemonApi} from "./api/pokemon"
import Card from "./components/Card";

const Battle = () => {
  const {startBattle, gameStatus, playerDeck, playerHand, playerHP, opponentHP, opponentHand, playerActiveCard, opponentActiveCard, currentTurn, setActiveCard, attackWithCard, endTurn, winner, resetBattle} = useBattleStore();

  
  const handleStart = async () => {
    const playerDeck = await pokemonApi.getRandomCards(20);
    const opponentDeck = await pokemonApi.getRandomCards(20);
    startBattle(playerDeck, opponentDeck);
  }
  return (
    <>
    <button onClick={() => handleStart()} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start the battle</button>

    <div className="grid grid-cols-3 gap-4">
      
      {opponentHand && opponentHand.map((card) =>(
        <Card key={card.id} name={card.name} attacks={card.attacks} hp={card.hp} type={card.types}/>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-4">
      {playerHand && playerHand.map((card) =>(
        <Card key={card.id} name={card.name} attacks={card.attacks} hp={card.hp} type={card.types}/>
      ))}
    </div>
    </>
  )
}

export default Battle;