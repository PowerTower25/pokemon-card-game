import { useMutation } from '@tanstack/react-query';
import './App.css'
import Card from './components/Card'
import { useRandomPokemonCards } from "./hooks/usePokemon";
import { useBattleStore } from './stores/battleStore';
import Battle from './Battle';
function App() {

  return (
    <>
    <h1 className="text-4xl">Welcome! It's time to battle</h1>

    <Battle/>
    </>
  )
}

export default App
