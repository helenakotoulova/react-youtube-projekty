import { useState, createContext } from "react";

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
  const [alert, setAlert] = useState([]);
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
      const alertInfo = ["Item was sucessfully edited", 'ok'];
      setAlert(alertInfo);
    } else {
      // is adding
      setItems((prevItems) => {
        return prevItems.concat(item); // kdyz dam return prevItems.push(item), tak to RETURNUJE NEW LENGTH! PROTO DAM CONCAT.
      });
      const alertInfo = ["Item added to the list",'ok'];
      //setAlert("Item added to the list", 'ok');
      setAlert(alertInfo);
    }
  };

  const removeItemHandler = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => {
        return item.id !== id;
      });
    });
    const alertInfo = ["Item removed from the list",'notOk'];
    setAlert(alertInfo);
  };

  const toggleEditingHandler = (args) => {
    setIsEditing(args[1]);
    setEditingId(args[0]);
  };

  const clearAllHandler = () => {
    setItems([]);
    const alertInfo = ['All items were removed','notOk'];
    setAlert(alertInfo);
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
