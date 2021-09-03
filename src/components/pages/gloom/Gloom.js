import './Gloom.css'
import Location from '../../ui/location/Location'
import PartyMembers from '../../ui/partymembers/PartyMembers';
const Gloom = () => {  
  return (
    <div className="all-locations-wrapper">
      <div className="reputation disp-flex">rep bar here</div>
      
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