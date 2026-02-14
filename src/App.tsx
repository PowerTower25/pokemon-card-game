import './App.css'
import Card from './components/Card'
import { useRandomPokemonCards } from "./hooks/usePokemon";
import { useBattleStore } from './stores/battleStore';
function App() {
  const {data: cards, isLoading, refetch} = useRandomPokemonCards(5);
  
  return (
    <>
    <h1 className="text-4xl">Welcome! It's time to battle</h1>
    <button onClick={() => refetch()} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start the battle</button>
    {isLoading && <div>Loading...</div>}
      <div className="grid grid-cols-3 gap-4">
        {cards && cards.map((card) =>  <Card key={card.id} name={card.name} attacks={card.attacks} hp={card.hp} type={card.types}/>)}
       
      </div>
    </>
  )
}

export default App
