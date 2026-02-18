import { useBattleStore } from "./stores/battleStore";
import {pokemonApi} from "./api/pokemon"
import Card from "./components/card/Card";
import { useEffect, useState } from "react";
import HealthBar from "./components/health-bar/HealthBar";
import type { Attack, PokemonCard } from "./types/card";

const Battle = () => {
  const { gameStatus, turnNumber, playerActiveCard, opponentActiveCard, winner, resetBattle} = useBattleStore();

  const startBattle = useBattleStore((state) => state.startBattle);
  const attackWithCard = useBattleStore((state) => state.attackWithCard);
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
  const endTurn = useBattleStore((state) => state.endTurn);

  // Local States
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

  const handlePlayCard = (card: PokemonCard, player: 'player' | 'opponent') => {
    if (currentTurn !== player) return;
    playCard(card, player)
    endTurn();
  }

  const handleAttack = (attack: Attack, attacker: 'player' | 'opponent') => {
    if (currentTurn !== attacker) return;

    attackWithCard(attack, attacker)

    endTurn();
  }

  return (
    <>
    <button onClick={() => handleStart()} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start the battle</button>
    <div className="grid grid-cols-[250px_1fr_250px] gap-4 hr-screen p-4">
      <div>
        <HealthBar text={`Player 1 ${playerHP} HP` } width={playerHP} fillColor={playerColor}/>
        {playerHand && playerHand.map((card) =>(
          <div key={card.id} style={{paddingTop: "15px"}}>
            <Card name={card.name} attacks={card.attacks} hp={card.hp} type={card.types} />
            <button onClick={ () => handlePlayCard(card, "player")}>Play Card</button>
          </div>
          
        ))}
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-2">
      {playerBench && playerBench.map((card) =>(
        <div key={card.id}>
            <Card name={card.name} attacker="player" onAttack={handleAttack} attacks={card.attacks} hp={card.hp} type={card.types}/>
          </div>
        ))}
      {opponentBench && opponentBench.map((card) =>(
        <div key={card.id}>
            <Card name={card.name} attacker="opponent" attacks={card.attacks} onAttack={handleAttack} hp={card.hp} type={card.types}/>
          </div>
        ))}
      </div>
      <div>
        <HealthBar text={`Player 2 ${opponentHP} HP` } width={opponentHP} fillColor={opponentColor}/>
        {opponentHand && opponentHand.map((card) =>(
        <div key={card.id} style={{paddingTop: "15px"}}>
            <Card name={card.name} attacks={card.attacks} hp={card.hp} type={card.types}/>
            <button onClick={() => handlePlayCard(card, "opponent")}>Play Card</button>
          </div>
        ))}
      </div>

    </div>
    </>
  )
}

export default Battle;