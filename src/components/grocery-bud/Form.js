import { useContext, useState } from "react";
import { useEffect } from "react";
import { GroceryContext } from "./context/grocery-context";
import classes from "./Form.module.css";

const Form = () => {
  const [item, setItem] = useState("");
  const grocCtx = useContext(GroceryContext);
  const isEditing = grocCtx.isEditing;
  const editingId = grocCtx.editingId;
  const [error, setError] = useState(null);
  const {setAlert,alert}=grocCtx;

  useEffect(() => {
    if (isEditing) {
      const specItem = grocCtx.items.find((i) => i.id === editingId);
      setItem(specItem.item);
    }
  }, [isEditing]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (item.length === 0) {
      const alertInfo = ["Please enter a valid value.", 'notOk'];
      setAlert(alertInfo);
      setError("Please enter a valid value.");
      return;
    }
    if (grocCtx.isEditing) {
      //const existingItem = grocCtx.items[editingId];
      const updatedItem = { id: editingId, item: item };
      grocCtx.addItem(updatedItem, true);
      console.log(updatedItem);
      const args = [null, false];
      grocCtx.toggleEditing(args);
    } else {
      const genId = Math.random();
      const addedItem = {
        id: genId,
        item,
      };
      grocCtx.addItem(addedItem, false);
    }
    setItem("");
    setError(null);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="E.g. eggs"
        />
        <button type="submit">{isEditing ? "Edit" : "Submit"}</button>
        {/*{error && <p>{error}</p>}*/}
    </form>
  );
};

export default Form;
