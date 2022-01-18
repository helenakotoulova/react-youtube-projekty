import data from './lorem-ipsum-data';
import {useState, useRef, useEffect} from 'react';

const LoremIpsum = () => {
    console.log('render')
    const enteredNumberRef=useRef();
    const [count,setCount]=useState(0);
    const [text, setText]=useState([]);
    
    const submitHandler =(e) => {
        e.preventDefault();
        const enteredNumber=enteredNumberRef.current.value;
        // pokud bych tady dala setCount(enteredNumber), tak se mi ten text vypise az v dalsim kroku,
        // protoze se mi to z aktualizuje az po dalsim re-renderu. do toho setText si to vezme tu starou hodnotu.
        // zatimco kdyz tady dam ten amount, tak ta hodnota se hned pouzije v setText, nastavi se mi novy text,
        // 
        let amount = enteredNumber;
        // POKUD NEBUDU MIT TY IF V TOMHLE SUBMITHANDLERU, ALE BUDU JE MIT MIMO (NAD NIM),
        // TAK MI TO NAPISE: TOO MANY RE-RENDERS
        if (amount < 1) {
            amount =1;
        }
        if (amount > 8) {
            amount=8;
        }
        console.log(amount)
        console.log(text)
        setText(data.slice(0,amount))
        console.log(text) //=> i zde je to prazdne.
        console.log('ahoj')

    }
    // TOHLE NENI TREBA. MAP JDE POUZIT I NA PRAZDNY ARRAY. JEN SE TO NESMI POUZIT NA STRING, OBJEKT, APOD.
    /*let content;
    if (text.length > 0) {
        content = text.map((item,index) => {
            return <p key={index}>{item}</p>
        })
    }*/
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="number">Choose number of paragraphs</label>
        <input
          id="number"
          type="number"
          placeholder="1-8"
          ref={enteredNumberRef}
        />
        <button type='submit'>Generate</button>
      </form>
      {
        text.map((item,index) => {
            return <p key={index}>{item}</p>
        })
    }
    </div>
  );
};

export default LoremIpsum;


/*
DULEZITE POZNAMKY K USESTATE A RENDEROVANI:
Renderovani probiha, kdyz: 
1. Update in State
2. Update in prop
3. Re-rendering of the parent component

A) PRIKLAD 1

const LoremIpsum = () => {
    console.log('render')

    const submitHandler =(e) => {
        e.preventDefault();
        console.log('ahoj')
    }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="number">Choose number of paragraphs</label>
        <input
          id="number"
          type="number"
        />
        <button type='submit'>Generate</button>
      </form>
    </div>
  );
};

=> NA ZACATKU UVIDIM RENDER A PO SUBMITOVANI FORMY AHOJ A TO JE VSE.

B) PRIKLAD 2
const LoremIpsum = () => {
    console.log('render')

    const [count,setCount]=useState(0);
    const [doubleCount,setDoubleCount]=useState(0);

    const clickHandler =() => {
        console.log('pocitam')
        setCount(prevCount => prevCount +1);
        setDoubleCount(count *2);
    }

    return (
        <div>
          <button onClick={clickHandler}>Click</button>
        <div>Count: {count}, double count: {doubleCount}</div>
        </div>
      );
    };

=> takhle to bude po prvnim renderu (tom initial): C: 0, DC: 0 => pak kliknu a spocita se nasledujici
=> C:1, DC: 0, protoze count je 0 a s tim se pri tomhle clicku pocita. proto DC = 0*2=0 
=> tyhle setStates se batchnou a protoze se zmenil state, probehne rerender
=> ja pak uvidim C:1, DC: 0
=> po 2. kliknuti: C:2, DC: 2, 
=> po 3. kliknuti: C:3, DC: 4,

Co vidim v konzoli: render, pak zmacknu cudlik => porbehne pocitani a ja v konzoli vidim 'pocitam',
a pak protoze se zmenil stav uvidim render. 

C) PRIKLAD 3
const LoremIpsum = () => {
    console.log('render')
    const [count,setCount]=useState(0);
    const [doubleCount,setDoubleCount]=useState(0);
    
    const clickHandler =() => {
        console.log('pocitam')
        setCount(prevCount => prevCount +1);
    }

    useEffect(()=> {
        console.log('effect')
        setDoubleCount(count *2);
    },[count])

    return (
        <div>
          <button onClick={clickHandler}>Click</button>
        <div>Count: {count}, double count: {doubleCount}</div>
        </div>
      );
    };
    export default LoremIpsum;

=> V KONZOLI UVIDIM PO PRVNIM RENDERU: render a po chvilce effect
Po kliknuti uvidim 'pocitam', pak 'render' (zmenil se stav a uz se mi batchly vsechny stavy po tom kliknutu),
pak 'effect' (zmenil se count) a jeste jeden render (zmenil se doubleCount stav).

D) PRIKLAD 4
import {useState, useRef, useEffect} from 'react';
const LoremIpsum = () => {
    console.log('render')
    const [count,setCount]=useState(0);
    const [doubleCount,setDoubleCount]=useState(0);
    
    const clickHandler =() => {
        console.log('pocitam')
        setCount(prevCount => prevCount +1);
        console.log('count:' + count)
    }

    useEffect(()=> {
        console.log('effect')
        setDoubleCount(count *2);
        console.log('doublecount v effectu:' + doubleCount)
        console.log('count v effectu:' + count)
    },[count])

    return (
        <div>
          <button onClick={clickHandler}>Click</button>
        <div>Count: {count}, double count: {doubleCount}</div>
        </div>
      );
    };
    export default LoremIpsum;

=> V konzoli uvidim: 
render
LoremIpsum.js:15 effect (useEffect probehne pri prvnim naloadovani a pak pri zmenach contu)
LoremIpsum.js:17 doublecount v effectu:0
LoremIpsum.js:18 count v effectu:0

=> pak kliknu =>
pocitam
LoremIpsum.js:11 count:0 (bere ten stav se kterym se to narenderovalo prvne, ale uz vi, ze se count meni, proto v dalsim kroku probehne render)
LoremIpsum.js:4 render (protoze se zmenil count)
LoremIpsum.js:15 effect (protoze se zmenil count, na ktery je ten useEffect navazany)
LoremIpsum.js:17 doublecount v effectu:0 (bere tu puv hodnotu)
LoremIpsum.js:18 count v effectu:1 (tady uz je zmeneny count, protoze po pocitam probehl ten render)
LoremIpsum.js:4 render (protoze se zmenil doubleCOunt)
*/