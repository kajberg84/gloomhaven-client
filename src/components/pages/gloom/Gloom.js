import './Gloom.css'
import Location from '../../ui/location/Location'

const Gloom = () => {  
  return (
    <div className="all-locations-wrapper">
      <div className="reputation disp-flex">rep bar here</div>
      <div className="partymembers disp-flex">members here</div>
      <div className="location">
     <Location />

      </div>
    </div>
  );
};
 
export default Gloom;