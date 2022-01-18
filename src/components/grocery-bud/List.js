import { useContext } from "react";
import { GroceryContext } from "./context/grocery-context";
import GroceryItem from "./GroceryItem";
import classes from './List.module.css';

const List = () => {
    const grocCtx=useContext(GroceryContext);
    const removeHandler=grocCtx.removeItem;
    const editHandler=grocCtx.toggleEditing;
    const items = grocCtx.items;

  return (
    <ul className={classes.list}>
      {items.map((item) => {
        return (
          <GroceryItem
            key={item.id}
            it={item}
            removeHandler={removeHandler.bind(null, item.id)}
            editHandler={editHandler.bind(null, [item.id,true])}
          />
        );
      })}
    </ul>
  );
};

export default List;
