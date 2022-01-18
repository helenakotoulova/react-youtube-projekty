import "./App.css";
import { useState, useEffect, useCallback } from "react";
import menu from "./data/menu";
import Menu from "./components/food-menu/Menu";
import Categories from "./components/food-menu/Categories";

/*
Takhle, jak to mam, je to silene prebombene. Nejlepsi je jen pouzit v Categories:
filterItems(chosenCategory)
*/

let initial = true;

function Together() {
  const allCategories = ['all', ...new Set(menu.map(meal => meal.category))];
  // Set objects are collections of values. You can iterate through the elements of a set in insertion order. 
  //A value in the Set may only occur once; it is unique in the Set's collection.

  const [category, setCategory] = useState(allCategories); // tahle hodnota se mi nemeni, tzn nema moc smysl to takhle mit,
  //lepsi by bylo nadefinovat se AllCategories primo v Categories.js, nebo pokud bychom fetchovali hodne dat,
  // pak by se oplatilo pasovat jako categories primo allCategories misto category.
  const [menuItems, setMenuItems] = useState(menu);
 

  const categoryChangeHandler = useCallback((cat) => { 
    if (cat === "all") { // takhhle primo vyuziju tu hodnotu privolanou z Categories a nemusim pouzivat setCategory
      return setMenuItems(menu);
    } else {
      return setMenuItems(
        menu.filter((item) => {
          return item.category === cat;
        })
      );
    }
  },[]);

// Tohle pro tu prembombenou variantu
  useEffect(()=> {
    if (initial) { // kdyz to tady nedam, tak se pri prvnim renderu nic nezobrazi - VIZ NIZE POD EXPORT DEFAULT
      initial = false;
      return;
    }
    categoryChangeHandler();
  }, [categoryChangeHandler])

 //Jeste by slo takhle (const categoryChangeHandler mi v tomto pripade spousti jen setCategory),
 // takhle jsem to mela pri variante kdy byly buttons tady. kdyz to tady takhle udelam ted,
 // tak se mi do Categories budou posilat jen treba breakfast, a na to nejde hodit map methodu.
 /* useEffect(() => {
    if (initial) { // kdyz to tady nedam, tak se pri prvnim renderu nic nezobrazi
      initial = false;
      return;
    }
    if (category === "all") {
      return setMenuItems(menu);
    } else {
      return setMenuItems(
        menu.filter((item) => {
          return item.category === category;
        })
      );
    }
  }, [category]);
  */

  return (
    <div>
      <h1>Our Menu</h1>
      <div>
        <Categories filterItems={categoryChangeHandler} categories={category}/>
      </div>
      <div>
        <ul>
          {menuItems.map((meal) => (
            <Menu key={meal.id} meal={meal} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Together;

/*
Pri prvnim renderu, kdy jeste neklikam na zadny button (tzn nic se mi neposila z Categories.js skrze props),
tzn filterItems mi nebudou triggerovat categoryChangeHandler a pouzije se tedy menuItems=menu.
Pokud bych mela tu svou prebombenou variantu s useEffectem a nemela bych tam to initial, tak by se spustil ten
categoryChangeHandler, jenze by mel vstupni hodnotu undefined (protoze z Categories se mi posila vstup do categoryCangeHandler jen pri zmakcnuti button),
a tudiz by se mi nic nevyrenderovalo. 
*/
