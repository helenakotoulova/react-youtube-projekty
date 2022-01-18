import {useState, useEffect} from 'react';


const Categories = ({filterItems,categories}) => {
    const [chosenCategory,setChosenCategory]=useState('all');
    const clickHandler = (e) => {
        setChosenCategory(e.target.value);
        filterItems(chosenCategory) // takhle to ma zpozdeni, proto to hodim do useEffectu, viz nize
        //filterItems(e.target.value); // tohle je nejlepsi varianta!!!!! Nepotrebuju pak zadne useEffecty a useCallbacky
        // pripadne slo by i primo inline: onClick={(e)=> filterItems(e.target.value)}, nebo onClick={()=> filterItems(c)}
    }

    useEffect(()=> {
        filterItems(chosenCategory)
    }, [chosenCategory,filterItems])

    /*
    Tady to categories se mi nikdy nebude menit. Vzydcky to budou vsechny kategorie.
    Davalo by tedy smysl, abych si tady nadefinovala AllCategories a netahala si to z App, 
    kde pro to mam useState, ktery ale vlastne vubec nevyuzivam.
    */
   

    return (
        <div>
            {categories.map(c=> 
                <button key={c} onClick={clickHandler} value={c}>{c}</button>)}
        </div>
    )
}

export default Categories;