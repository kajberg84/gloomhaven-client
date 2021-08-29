import "./QuizCard.css"

const QuizCard = (props) => {
  const { locationnumber, locationname, id, changecomp} = props;

  return ( 
  <div  className="location-wrapper">
    <div className="location-info-wrapper">
      <p > 
        #{locationnumber} {locationname}
      </p>
      <button onClick={()=> changecomp(id) }>Done</button>
    </div>
  </div>
   );
}
 
export default QuizCard;


