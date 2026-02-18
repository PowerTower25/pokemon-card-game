import Card from "../card/Card";

const Hand = ({cards, player, onPlay}) => {
  const handlePlayCard = (card, player) => {

    onPlay(card, player)
  }
       return ( 
        <>
            <div style={{paddingTop: "15px"}}>
              <Card name={cards.name} attacks={cards.attacks} hp={cards.hp} type={cards.types} />
              <button onClick={ () => handlePlayCard(cards, player)}>Play Card</button>
            </div>
            
        </>
      )
}

export default Hand;