import React, { useState, useEffect } from 'react'
import rgbToHex from './utils';

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  const [alert, setAlert] = useState(false)
  const bcg = rgb.join(',') // z array rgb: Array(3): 0: 250,  1: 250,   2: 250 pomoci join metody udelame string: return value: A string with all array elements joined.
  //console.log(bcg) // 255,255,255
  const hex = rgbToHex(...rgb) // tohle nakonec nepouzijeme, viz nasledujici
  const hexValue = `#${hexColor}` // ta library Values primo providuje hex color. ale bez toho hashtagu.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [alert])
  return (
    <article
      className={`color ${index > 10 && 'color-light'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => {
        setAlert(true)
        navigator.clipboard.writeText(hexValue)
      }}
    >
      <p className='percent-value'>{weight}%</p>
      <p className='color-value'>{hexValue}</p>
      {alert && <p className='alert'>copied to clipboard</p>}
    </article>
  )
}

export default SingleColor;
/*
Inline-styling, proto double curly braces. backgroungColor definujeme pomoci defaultni vlastnosti rgb a priradime ji nasi hodnotu bcg.
style={{ backgroundColor: `rgb(${bcg})` }}

Pomoci tohoto u indexu 10 (coz je nase base color) switchneme na svetle pismo misto tmaveho, aby to bylo citelne.
className={`color ${index > 10 && 'color-light'}`}
(implicitni color je: color: var(--clr-grey-1) nadefin. v body)

*/

