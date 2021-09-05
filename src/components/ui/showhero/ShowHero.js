import "./ShowHero.css";
const ShowHero = (props) => {
  const { _id, name, heroClass, level, editHero } = props;
  return (
    <div className="minor-wrapper ">
      <div className="hero-wrapper" >
        <p className="ml10">
        {name} -- {heroClass},level: {level}
        </p>
        <div>
        <button onClick={() => editHero(props)} className="small-button mr10">
         Edit
        </button>        
        </div>
      </div>
    </div>
  );
};

export default ShowHero;

