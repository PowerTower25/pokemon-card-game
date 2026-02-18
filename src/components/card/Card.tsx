
import "./Card.css"
const Card = ({attacks, name, hp, type, onAttack, attacker}) => {
  return (
  <div>
        <div className={`card bg-white rounded-lg shadow p4 border ${type}`}>
          <div className="card-header">
            <h3 className="text-xl font-bold">{name}</h3>
            <p>HP: {hp}</p>
          </div>
          <div>
          {attacks && attacks.map((attack, index) => (
            <div key={index} className="attack">
              <button key={index} onClick={() => onAttack(attack, attacker)} className="cursor-pointer  border rounded-sm"><strong>{attack.name}</strong> {attack.damage ? (attack.damage) : null}</button>
              <p>{attack.effect}</p>
              <p>Cost: {attack.cost.join(', ')}</p>  
            </div>
          ))}
          </div>
        </div>
  </div>
  )
}

export default Card