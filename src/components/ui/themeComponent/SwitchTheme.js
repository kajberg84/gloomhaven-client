
// SwitchTheme.js
import React, { useContext, useEffect} from "react";
import { ThemeContext } from "../../statemanagement/ThemeContext";

const SwitchTheme = () => {

const { gloomUserTheme} = useContext(ThemeContext);
const [themeColor, setThemeColor] = gloomUserTheme;

  //switch theme
const handleTheme = () => {
  setThemeColor(themeColor === 'light' ? 'dark' : 'light')
  console.log(themeColor)
  localStorage.setItem("gloomieThemeColor", themeColor)
}
 
// useffect on switch theme
useEffect(()=> {
  console.log('new theme ', themeColor)
 if(themeColor === 'light'){   
  document.querySelector("html").classList.remove('dark')
  document.querySelector("html").classList.add('light')
 } else {
  document.querySelector("html").classList.add('dark')
  document.querySelector("html").classList.remove('light')
 }
}, [themeColor])

  return ( 
    <div>
      <button onClick={handleTheme}> change 
      </button>
    </div>
   );
}
 
export default SwitchTheme;