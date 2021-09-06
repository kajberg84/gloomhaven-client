import './Footer.css'
import react from 'react';
import SwitchTheme from '../themeComponent/SwitchTheme';

const Footer = () => {
  return ( 
    <div className="container-footer">

      <div className="textinfo">
        <ul>
          <li>Kaj Berg</li>
          <li className="footer-updated-text">Updated 27/8-21</li>
        </ul>
      </div>

      <div>
        <ul>
          <li>© Copyright 2021</li>
        </ul>
      </div>
        {/* saving this empty if i want to add without breaking css */}
        <div className="thembutton">
        <SwitchTheme />
      </div>
    </div>
   );
}
 
export default Footer
