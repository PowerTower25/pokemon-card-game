import { useBattleStore } from "./stores/battleStore";
import {pokemonApi} from "./api/pokemon"
import Card from "./components/card/Card";
import { useEffect, useState } from "react";
import HealthBar from "./components/health-bar/HealthBar";

const Battle = () => {
  const { gameStatus, turnNumber, playerActiveCard, opponentActiveCard, attackWithCard, endTurn, winner, resetBattle} = useBattleStore();

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
  const currentTurn = useBattleStore((state) => state.currentTurn);
  const [playerColor, setPlayerColor] = useState("#4C9C00");
    const [opponentColor, setOpponentColor] = useState("#4C9C00")


  useEffect(() => {
    if (playerHP <= 70) {
      console.log('woo')
      setPlayerColor("#69210A")
    } else if ( playerHP > 71 && playerHP <= 89 ) {
      setPlayerColor("#FFC12E");
    }
  }, [playerHP])
  
  
  useEffect(() => {
    if (opponentHP <= 70) {
      setOpponentColor("#69210A")
    } else if ( opponentHP > 71 && opponentHP <= 89 ) {
      setOpponentColor("#FFC12E");
    }
  }, [opponentHP])
  

  const handleStart = async () => {
    const playerDeck = await pokemonApi.getRandomCards(20);
    const opponentDeck = await pokemonApi.getRandomCards(20);
    startBattle(playerDeck, opponentDeck);
  }


  return (
    <>
    <button onClick={() => handleStart()} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start the battle</button>
    <button onClick={() => endTurn()} className="cursor-pointer bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">End Turn!</button>
    <div className="grid grid-cols-[250px_1fr_250px] gap-4 hr-screen p-4">
      <div>
        <HealthBar text={`Player 1 ${playerHP} HP` } width={playerHP} fillColor={playerColor}/>
        {playerHand && playerHand.map((card) =>(
          <div key={card.id} style={{paddingTop: "15px"}}>
            <Card name={card.name} attacks={card.attacks} hp={card.hp} type={card.types} />
            <button disabled={currentTurn !== "player"} onClick={ () => playCard(card, "player")}>Play Card</button>
          </div>
          
        ))}
      </div>

      <div>
      {playerBench && playerBench.map((card) =>(
        <div key={card.id}>
            <Card name={card.name} attacker={"player"} attacks={card.attacks} hp={card.hp} type={card.types}/>
            <button onClick={() => setActiveCard(card, "player")}>Play Card</button>
          </div>
        ))}
      {opponentBench && opponentBench.map((card) =>(
        <div key={card.id}>
            <Card name={card.name} attacks={card.attacks} attacker={"opponent"} hp={card.hp} type={card.types}/>
            <button onClick={() => setActiveCard(card, "opponent")}>Play Card</button>
          </div>
        ))}
      </div>
      <div>
        <HealthBar text={`Player 2 ${opponentHP} HP` } width={opponentHP} fillColor={opponentColor}/>
        {opponentHand && opponentHand.map((card) =>(
        <div key={card.id} style={{paddingTop: "15px"}}>
            <Card name={card.name} attacks={card.attacks} hp={card.hp} type={card.types}/>
            <button disabled={currentTurn !== "opponent"} onClick={() => playCard(card, "opponent")}>Play Card</button>
          </div>
        ))}
      </div>

    </div>
    </>
  )
}

export default Battle;