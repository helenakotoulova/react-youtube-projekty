import { useEffect, useState,useContext } from "react";
import { GroceryContext } from "./context/grocery-context";
import classes from './Alert.module.css';

const Alert = () => {
    const grocCtx = useContext(GroceryContext);
    const [showAlert, setShowAlert] = useState(false);
    const alertMessage = grocCtx.alert[0];
    const alertStatus=grocCtx.alert[1];

  useEffect(() => {
    setShowAlert(true);
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [grocCtx.alert, grocCtx.items]);
/*
  let additionalClass='ok';
  let essage;
  if (alertStatus === 'ok') {
      //console.log('here')
      //additionalClass='ok';
      classMessage=""
  } */




    return (
        <div className={`${classes.alert} ${(alertStatus === 'ok')? classes.ok: classes.notOk}`}>
            {showAlert && <p>{alertMessage}</p>}
        </div>)
}

export default Alert;