import Values from "values.js";
import { useState } from "react";
import SingleColor from "./SingleColor";
const ColorGenerator = () => {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  // all method bude generovat shades and tints (odstiny)
  const [list, setList] = useState(new Values("#f15025").all(10));

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setList(colors);
      console.log(colors)
    } catch (error) {
      setError(true);
      console.log(error);
    }
    
  };

  return (
    <>
      <section className="container">
        <h3>Color Generator</h3>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="#f15025"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={`${error ? "error" : null}`}
          />
          <button className='btn' type="submit">Submit</button>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
};
export default ColorGenerator;

// colors: #ccc (console.log -> 
/*
(21) [N, N, N, N, N, N, N, N, N, N, N, N, N, N, N, N, N, N, N, N, N]
0: N {rgb: Array(3), alpha: 1, type: 'tint', weight: 100}
1: N
alpha: 1
rgb: Array(3)
0: 250
1: 250
2: 250
length: 3
[[Prototype]]: Array(0)
type: "tint"
weight: 90
hex: "fafafa"

=> TZN: Color ma tyhle properties: alpha,rgb, type,weight => to pak ziskam v single color.
*/