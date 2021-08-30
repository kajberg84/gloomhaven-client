import "./QuizCard.css"

const QuizCard = (props) => {
  const { locationnumber, locationname, id, changecomp } = props;

  return (
    <div className="location-wrapper">
      <div className="location-info-wrapper">
        <p className="ml10">
          #{locationnumber} {locationname}
        </p>
        <button onClick={() => changecomp(id)} className="small-button mr10">
          Done
        </button>
      </div>
    </div>
  );
};
 
export default QuizCard;


