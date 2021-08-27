import './Footer.css'

const Footer = () => {
  return ( 
    <div className="container-footer">

      <div className="textinfo">
        <ul>
          <li>Kaj Berg</li>
          <li className="footer-updated-text">Updated 17/8-21</li>
        </ul>
      </div>

      <div>
        <ul>
          <li>© Copyright 2021</li>
        </ul>
      </div>
        {/* saving this empty if i want to add without breaking css */}
        <div className="textinfo">
          {""}
      </div>
    </div>
   );
}
 
export default Footer
