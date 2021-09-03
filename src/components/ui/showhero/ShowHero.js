import "./ShowHero.css";
const ShowHero = (props) => {
  const { _id, name, heroClass, level, deletehero } = props;
  return (
    <div className="minor-wrapper ">
      <div className="hero-wrapper" >
        <p className="ml10">
        {name} {heroClass},level {level}
        </p>
        <div>
        <button className="small-button mr10">
          Retire
        </button>        
        <button onClick={() => deletehero(_id)} className="small-button mr10">
          Remove
        </button>        
        </div>
      </div>
    </div>
  );
};

export default ShowHero;

