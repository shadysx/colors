import { useEffect, useState } from 'react';
import md5 from 'md5';

//Color converter
import convert from 'color-convert';

//CSS
import './App.css';

//Fonts
import './fonts/stylesheet.css'
import './fonts/texgyreadventor-bold.ttf'

//Components
import Header from './components/Header/Header.js';

function App() {
  const [input, setInput] = useState('')
  const [hex, setHex] = useState('eec923')
  const [dynamicBackColor, setDynamicBackColor] = useState()
  const [dynamicFontColor, setDynamicFontColor] = useState()
  const [rgb, setRgb] = useState([238, 201, 35])
  const [cmyk, setCmyk] = useState([0, 16, 85, 7])

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function handleInputChange(e){
    setInput(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault()

    if (input.length === 0) {
      setHex('eec923')
    }

    else {
      setHex(
        md5(input.toUpperCase())
        .slice(0,6)
        .toUpperCase()
      );
    }
  }

  useEffect(() => {
    let toCmyk = convert.hex.cmyk(hex)
    let toRgb = convert.hex.rgb(hex)

    setRgb(toRgb)
    setCmyk(toCmyk)

    setDynamicBackColor({"backgroundColor": `#${hex}`})
    setDynamicFontColor({"color" : `#${hex}`})
  }, [hex])

  return (
    <div  className="App">
      <Header/>
      <div  className='section-container'>
       <div className='inputs'>
          <h1>Entrez un nom </h1>
          <form onSubmit={handleSubmit}>
            <input className='input' onChange={handleInputChange}/>
            <h2 style={dynamicFontColor} className='hexcode'>Hex code: {`#${hex}`}</h2>
            <div style={dynamicBackColor} className='color-square'></div>
          </form>
          <div className='color-values'>
            <ul className="rvb">
              <li>R {rgb[0]}</li>
              <li>V {rgb[1]}</li>
              <li>B {rgb[2]}</li>
            </ul>
            <ul className="rvb">
              <li>C {cmyk[0]}</li>
              <li>M {cmyk[1]}</li>
              <li>J {cmyk[2]}</li>
              <li>N {cmyk[3]}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
