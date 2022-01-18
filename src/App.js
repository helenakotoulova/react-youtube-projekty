import { Fragment } from "react";
import Together from "./TogetherFoodMenu";
import Jobs from "./components/jobs/Jobs";
import LoremIpsum from "./components/lorem-ipsum/LoremIpsum";
import ColorGenerator from "./components/color-generator/ColorGenerator";
import GroceryProvider from "./components/grocery-bud/context/grocery-context";
import AppStripe from "./components/stripe-menu/AppStripe";
import { AppProvider } from "./components/stripe-menu/context";
import CardGrocery from "./components/grocery-bud/CardGrocery";

function App() {
  return (
    <Fragment>
      {/*<AppProvider>*/}
        <GroceryProvider>
        {/*<Together />*/}
        {/*<Jobs />*/}
        {/*<LoremIpsum />*/}
        {/*<ColorGenerator />*/}
        <CardGrocery />
        {/*<AppStripe />*/}
        </GroceryProvider>
      {/*</AppProvider>*/}
    </Fragment>
  );
}

export default App;
