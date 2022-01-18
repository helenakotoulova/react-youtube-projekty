import { useState, createContext } from "react";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react/cjs/react.development";

export const GroceryContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearAll: () => {},
  alert: "",
  toggleEditing: (id, value) => {},
  isEditing: false,
  editingId: "",
  setAlert: ()=>{},
});

const GroceryProvider = (props) => {
  const [items, setItems] = useState([]);
  const [alert, setAlert] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const addItemHandler = (item, value) => {
    if (value) {
      // is editing
      const existingItemIndex = items.findIndex((i) => i.id === item.id);
      //const existingItem = items[existingItemIndex];
      const updatedItem = item;
      let updatedItems = [...items];
      updatedItems[existingItemIndex] = updatedItem;
      setItems(updatedItems);
      setAlert("Item was sucessfully edited");
    } else {
      // is adding
      setItems((prevItems) => {
        return prevItems.concat(item); // kdyz dam return prevItems.push(item), tak to RETURNUJE NEW LENGTH! PROTO DAM CONCAT.
      });
      setAlert("Item added to the list");
    }
  };

  const removeItemHandler = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => {
        return item.id !== id;
      });
    });
    setAlert("Item removed from the list");
  };

  const toggleEditingHandler = (args) => {
    setIsEditing(args[1]);
    setEditingId(args[0]);
  };

  const clearAllHandler = () => {
    setItems([]);
    setAlert("All items were removed");
  };

  const grocCtx = {
    items: items,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearAll: clearAllHandler,
    alert: alert,
    isEditing: isEditing,
    toggleEditing: toggleEditingHandler,
    editingId: editingId,
    setAlert:setAlert,
  };
  return (
    <GroceryContext.Provider value={grocCtx}>
      {props.children}
    </GroceryContext.Provider>
  );
};
export default GroceryProvider;
