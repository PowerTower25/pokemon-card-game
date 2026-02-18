import { useBattleStore } from "./stores/battleStore";
import {pokemonApi} from "./api/pokemon"
import Card from "./components/Card";

const Battle = () => {
  const { gameStatus, turnNumber, playerActiveCard, opponentActiveCard, currentTurn, attackWithCard, endTurn, winner, resetBattle} = useBattleStore();

  const startBattle = useBattleStore((state) => state.startBattle);
  const playerDeck = useBattleStore((state) => state.playerDeck);
  const playerHP = useBattleStore((state) => state.playerHP);
  const playerHand = useBattleStore((state) => state.playerHand);
  const playerBench = useBattleStore((state) => state.playerBench);
  const opponentHP = useBattleStore((state) => state.opponentHP);
  const opponentHand = useBattleStore((state) => state.opponentHand);
  const opponentBench = useBattleStore((state) => state.opponentBench);
  const opponentDeck = useBattleStore((state) => state.opponentDeck);
  const playCard = useBattleStore((state) => state.playCard);
  const setActiveCard = useBattleStore((state) => state.setActiveCard);

  

  const handleStart = async () => {
    const playerDeck = await pokemonApi.getRandomCards(20);
    const opponentDeck = await pokemonApi.getRandomCards(20);
    startBattle(playerDeck, opponentDeck);
  }

  const handleEndTurn = (card, person) => {

  }



  return (
    <>
    <button onClick={() => handleStart()} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start the battle</button>

    <div className="grid grid-cols-[250px_1fr_250px] gap-4 hr-screen p-4">
      <div>
        <p>Player 1 HP {playerHP}</p>
        {playerHand && playerHand.map((card) =>(
          <div key={card.id}>
            <Card name={card.name} attacks={card.attacks} hp={card.hp} type={card.types} />
            <button onClick={ () => playCard(card, "player")}>Play Card</button>
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
      {opponentBench && opponentBench.map((card) =>(
        <div key={card.id}>
            <Card name={card.name} attacks={card.attacks} hp={card.hp} type={card.types}/>
            <button onClick={() => setActiveCard(card, "opponent")}>Play Card</button>
          </div>
        ))}
      </div>
      <div>
        <p>Player 2 HP {opponentHP}</p>
        {opponentHand && opponentHand.map((card) =>(
        <div key={card.id}>
            <Card name={card.name} attacks={card.attacks} hp={card.hp} type={card.types}/>
            <button onClick={() => playCard(card, "opponent")}>Play Card</button>
          </div>
        ))}
      </div>

    </div>
    </>
  )
}

export default Battle;