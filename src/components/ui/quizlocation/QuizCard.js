import "./QuizCard.css"
// import ButtonSmall from "../buttonSmall/ButtonSmall";

const QuizCard = (props) => {
  const { locationnumber, locationname, id, changecomp } = props;

  return (
    <div className="location-wrapper">
      <div className="location-info-wrapper">
        <p>
          #{locationnumber} {locationname}
        </p>
        <button onClick={() => changecomp(id)} className="small-button">
          {/* <ButtonSmall /> */}
          Done
        </button>
      </div>
    </div>
  );
};
 
export default QuizCard;


