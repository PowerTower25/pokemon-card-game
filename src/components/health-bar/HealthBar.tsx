import "./HealthBar.css";

const HealthBar = ({width, text, fillColor}) => {

  return (
    <>
      <div className="bar-chart">
        <span className="bar-chart__fill" style={{
        width: `${width}%`, // Use template literal to add '%' unit
        backgroundColor: fillColor, // Apply dynamic color
        height: '20px',
        transition: 'width 0.5s ease-in-out', // Optional: adds smooth transition
      }}></span>
          <span className="bar-chart__text">{text}</span>
      </div>
    </>
  )
}

export default HealthBar;