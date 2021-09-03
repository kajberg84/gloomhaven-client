import "./QuizCard.css"

const QuizCard = (props) => {
  const { locationnumber, locationname, id, changecomp,deletecomp, buttonname } = props;

  return (
    <div className="minor-wrapper">
      <div className="location-info-wrapper">
        <p className="ml10">
          # {locationnumber} -  {locationname}
        </p>
        <div>
        <button onClick={() => deletecomp(id)} className="small-button mr10">
          Remove
        </button>
        <button onClick={() => changecomp(id)} className="small-button mr10">
          {buttonname}
        </button>

        </div>
      </div>
    </div>
  );
};
 
export default QuizCard;


