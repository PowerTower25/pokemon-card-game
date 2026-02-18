import {create} from "zustand"
import type { PokemonCard, Attack } from "../types/card";

interface BattleState {
  // Player
  playerHP: number
  playerHand: PokemonCard[]
  playerDeck: PokemonCard[]
  playerBench: PokemonCard[]
  playerActiveCard: PokemonCard | null
  playerDiscardPile: PokemonCard[]


  // CPU
  opponentHP: number
  opponentHand: PokemonCard[]
  opponentDeck: PokemonCard[]
  opponentBench: PokemonCard[]
  opponentActiveCard: PokemonCard | null
  opponentDiscardPile: PokemonCard[]

  //Game State
  currentTurn: 'player' | 'opponent'
  turnNumber: number
  gameStatus: 'waiting' | 'active' | 'finished'
  winner: 'player' | 'opponent' | null

  // Actions
  startBattle: (playerDeck: PokemonCard[], opponentDeck: PokemonCard[] ) => void
  playCard: (card: PokemonCard, player: 'player' | 'opponent') => void
  attackWithCard: (attack: Attack, attacker: "player" | "opponent") => void
  endTurn: ()  => void
  resetBattle: () => void
  setActiveCard: (card: PokemonCard, player: 'player' | 'opponent') => void
}

export const useBattleStore = create<BattleState>((set, get) => ({
  playerHP: 100,
  playerHand: [],
  playerDeck: [],
  playerBench: [],
  playerActiveCard: null,
  playerDiscardPile: [],


  opponentHP: 100,
  opponentHand: [],
  opponentDeck: [],
  opponentBench: [],
  opponentActiveCard: null,
  opponentDiscardPile: [],

  currentTurn: 'player',
  turnNumber: 1,
  gameStatus: 'waiting',
  winner: null,

  startBattle: (playerDeck: PokemonCard[], opponentDeck: PokemonCard[]) => set({
    playerDeck: [...playerDeck],
    opponentDeck: [...opponentDeck],
    playerHP: 100,
    opponentHP: 100,
    opponentBench: [],
    playerBench: [],
    playerHand: playerDeck.slice(0,5),
    opponentHand: opponentDeck.slice(0,5),
    gameStatus: "active",
    currentTurn: "player",
    turnNumber: 1
  }),

  playCard: (card, player) => set((state) => {
    const hand = player === "player" ? state.playerHand : state.opponentHand;
    const bench = player === 'player' ? state.playerBench : state.opponentBench

    const newHand = hand.filter(c => c.id !== card.id);

    const newBench = [...bench, card];
    return player === "player" ? {playerActiveCard: card, playerHand: newHand, playerBench: newBench} : {opponentActiveCard: card, opponentHand: newHand, opponentBench: newBench}
  }),

  setActiveCard: (card, player) => set((state) => {
    const bench = player === 'player' ? state.playerBench : state.opponentBench
    const newBench = bench.filter(b => b.id !== card.id)

    return player === "player" ? {playerActiveCard: card, playerBench: newBench} : {opponentActiveCard: card, opponentBench: newBench}
  }),

  attackWithCard: (attack, attacker) => set((state) => {
    const damage = typeof attack.damage === "string" ? parseInt(attack.damage) || 0 : attack.damage || 0;

    const defender = attacker === "player" ? "opponent" : "player";

    const defenderActiveCard = defender === "player" ? state.playerActiveCard : state.opponentActiveCard;

    const currentHP = defender == "player" ? state.playerHP : state.opponentHP;

    let remainingDamage = damage;
    let newActiveCard = defenderActiveCard;
    let newHP = currentHP


    let newDiscardPile = defender === "player" ? [...state.playerDiscardPile] : [...state.opponentDiscardPile]

    if (defenderActiveCard && defenderActiveCard.hp) {
      const cardHP = defenderActiveCard.hp
      if (damage > cardHP) {
        remainingDamage = damage - cardHP

        newDiscardPile.push(defenderActiveCard)
        newActiveCard = null;
        console.log(`${defenderActiveCard.name} was knocked out!`)
      } else {
        newActiveCard = {
          ...defenderActiveCard,
          hp: cardHP - damage
        }
        remainingDamage = 0;
      }
    }
    if (remainingDamage > 0) {
      newHP = Math.max(0, currentHP - remainingDamage)
    }

    let winner: "player" | "opponent" | null = null;

    let gameStatus: "waiting" | "active" | "finished" = state.gameStatus;

    if (newHP === 0) {
      winner = attacker
      gameStatus = "finished"
    }

    if (defender === "player") {
      return {
        playerHP: newHP,
        playerActiveCard: newActiveCard,
        playerDiscardPile: newDiscardPile,
        winner,
        gameStatus
      }
    } else {
      return {
        opponentHP: newHP,
        opponentActiveCard: newActiveCard,
        opponentDiscardPile: newDiscardPile,
        winner,
        gameStatus
      }
    }
  }),

  endTurn: () => set((state) => ({
      currentTurn: state.currentTurn === "player" ? "opponent" : "player",
      turnNumber: state.currentTurn === "opponent" ? state.turnNumber + 1 : state.turnNumber
  })),

  resetBattle: () => set({
    playerHP: 100,
    playerHand: [],
    playerDeck: [],
    playerBench: [],
    playerActiveCard: null,


    opponentHP: 100,
    opponentHand: [],
    opponentDeck: [],
    opponentBench: [],
    opponentActiveCard: null,

    currentTurn: 'player',
    turnNumber: 1,
    gameStatus: 'waiting',
    winner: null,
  })
}))