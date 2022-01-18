import { Fragment, useContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { GroceryContext } from "./context/grocery-context";
import Form from "./Form";
import List from "./List";
import classes from "./Card.module.css";

const CardGrocery = () => {
  const grocCtx = useContext(GroceryContext);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(true);
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [grocCtx.alert]);
  
  const hasNoItems = grocCtx.items.length ===0;

  console.log(grocCtx.alert)

  return (
    <Fragment>
      <h1>Grocery Bud</h1>
      <div className={classes.card}>
        <div>{showAlert && <p>{grocCtx.alert}</p>}</div>
        <Form />
        <List />
        <button className={classes.button} disabled={hasNoItems} onClick={grocCtx.clearAll}>Clear All</button>
      </div>
    </Fragment>
  );
};

export default CardGrocery;
