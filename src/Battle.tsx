
import { useRandomPokemonCards } from "./hooks/usePokemon";
import { useBattleStore } from "./stores/battleStore";
import {pokemonApi} from "./api/pokemon"
import Card from "./components/Card";

const Battle = () => {
  const {startBattle, gameStatus, playerDeck, playerHand, playerHP, opponentHP, playCard, opponentHand, opponentBench, playerBench, playerActiveCard, opponentActiveCard, currentTurn, setActiveCard, attackWithCard, endTurn, winner, resetBattle} = useBattleStore();

  
  const handleStart = async () => {
    const playerDeck = await pokemonApi.getRandomCards(20);
    const opponentDeck = await pokemonApi.getRandomCards(20);
    startBattle(playerDeck, opponentDeck);
  }

  return (
    <>
    <button onClick={() => handleStart()} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start the battle</button>

    <div className="grid grid-cols-5 gap-4">
      
      {opponentHand && opponentHand.map((card) =>(
       <div key={card.id}>
          <Card name={card.name} attacks={card.attacks} hp={card.hp} type={card.types}/>
          <button onClick={() => playCard(card, "opponent")}>Play Card</button>
        </div>
      ))}
    </div>
    <div>
    {opponentBench && opponentBench.map((card) =>(
       <div key={card.id}>
          <Card name={card.name} attacks={card.attacks} hp={card.hp} type={card.types}/>
          <button onClick={() => setActiveCard(card, "opponent")}>Play Card</button>
        </div>
      ))}
    </div>

    <div>
    {playerBench && playerBench.map((card) =>(
       <div key={card.id}>
          <Card name={card.name} attacks={card.attacks} hp={card.hp} type={card.types}/>
          <button onClick={() => setActiveCard(card, "player")}>Play Card</button>
        </div>
      ))}
    </div>
    
    <div className="grid grid-cols-5 gap-5">
      {playerHand && playerHand.map((card) =>(
        <div key={card.id}>
          <Card  name={card.name} attacks={card.attacks} hp={card.hp} type={card.types} />
          <button onClick={ () =>selectCard(card, "player")}>Play Card</button>
        </div>
        
      ))}
    </div>
    </>
  )
}

export default Battle;