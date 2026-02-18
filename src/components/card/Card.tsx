import {motion} from "framer-motion";
import "./Card.css"
import { useState } from "react";
import { useBattleStore } from "../../stores/battleStore";
const Card = ({attacks, name, hp, type, onAttack, attacker}) => {
  const [isAttacking, setIsAttacking] = useState(false);

  const currentTurn = useBattleStore((state) => state.currentTurn);
  
  const isDisabled = currentTurn !== attacker
  const handleAttackClick = (attack, attacker) => {
    if (isDisabled) return;
    setIsAttacking(true)
    onAttack(attack, attacker)
  }
  return (
  <motion.div
  animate={isAttacking ? {
    x: attacker === "player" ? [0, 100, 0]: [0, -100, 0],
    
  }: {}}
  transition={{duration: 0.8}}
  onAnimationComplete={() => setIsAttacking(false)}
  >
        <div className={`card bg-white rounded-lg shadow p4 border ${type}`}>
          <div className="card-header">
            <h3 className="text-xl font-bold">{name}</h3>
            <p>HP: {hp}</p>
          </div>
          <div>
          {attacks && attacks.map((attack, index) => (
            <div key={index} className="attack">
              <button disabled={isDisabled} onClick={() => handleAttackClick(attack, attacker)} className="cursor-pointer  border rounded-sm"><strong>{attack.name}</strong> {attack.damage ? (attack.damage) : null}</button>
              <p>{attack.effect}</p>
              <p>Cost: {attack.cost.join(', ')}</p>  
            </div>
          ))}
          </div>
        </div>
  </motion.div>
  )
}

export default Card