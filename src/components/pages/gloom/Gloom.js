import './Gloom.css'
import Location from '../../ui/location/Location'
import PartyMembers from '../../ui/partymembers/PartyMembers';
// import ReputationBar from "../../ui/reputationbar/ReputationBar";
const Gloom = () => {
  return (
    <div className="all-locations-wrapper">
      {/* <div className="reputation">
        <ReputationBar />
      </div> */}

      <div className="partymembers">
        <PartyMembers />
      </div>

      <div className="location">
        <Location />
      </div>
    </div>
  );
};
 
export default Gloom;