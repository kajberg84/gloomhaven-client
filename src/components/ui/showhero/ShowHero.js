import "./ShowHero.css";
const ShowHero = (props) => {
  const { _id, name, heroClass, level, deletehero } = props;
  return (
    <div className="minor-wrapper ">
      <div className="hero-wrapper">
        {name} {heroClass},level {level}
        <button onClick={() => deletehero(_id)} className="small-button mr10">
          Remove
        </button>        
      </div>
    </div>
  );
};

export default ShowHero;

