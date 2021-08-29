import "./QuizCard.css"

const QuizCard = (props) => {
  const { locationnumber, locationname, id, changecomp } = props;
  console.log(props)
  return ( 
  <div  className="location-wrapper">
    <div className="location-info-wrapper">
      <p>
        #{locationnumber} {locationname}
      </p>
      <button className="location-compl-button" onClick={()=> changecomp(id)}>Done</button>
    </div>
  </div>
   );
}
 
export default QuizCard;


