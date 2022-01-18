import classes from "./GroceryItem.module.css";
import { FaEdit, FaTrash } from 'react-icons/fa';
const GroceryItem = ({ it, removeHandler, editHandler }) => {
  return (
    <li className={classes.item}>
      <h4 className={classes.itemText}>{it.item}</h4>
      <div className={classes.actions}>
        <button className={classes.removeButton} onClick={removeHandler}><FaTrash /></button>
        <button className={classes.editButton} onClick={editHandler}><FaEdit /></button>
      </div>
    </li>
  );
};

export default GroceryItem;
