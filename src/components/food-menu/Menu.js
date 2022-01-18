const Menu = ({meal}) => { // kdyz tady nedam ty {} tak to nic nevypise!!!
    // pokud ({meal}) => console.log(meal) => {id: 1, title: 'buttermilk pancakes', category: 'breakfast', price: 15.99, img: './images/item-1.jpeg', …}
    // pokud (meal) => console.log(meal) =>{meal: {…}} => meal: {id: 1, title: 'buttermilk pancakes', category: 'breakfast', ...
    /*
    pokud bych chtela verzi (meal), pak musi byt:
    console.log(meal.meal.title)
    const {title, price, img,desc} = meal.meal;

    Pokud totiz dam const Meal = (meal) => {},
    tak je to jako const Meal = (props) = > {return <h1>{props.title}</h1>} a ja
    si pak musim vsechny ty title, price apod nadefinovat v te parent komponente.
    Mohla bych mit i v te Parent Komponente meals.map(meal => <Menu meal={meal} title={meal.title} />
    A pokud bych mela v teto komponentu const Menu = (meal),
    tak bych pak console.log(meal) davalo objekt, kde by byl jednak meal a jednak title. Protoze to const Menu = (meal) je ted vlastne props.
    Props jsou jeden velky objekt. A ja pak mela vlastne props={meal={title: 'bla'}}, resp. meal={meal={title: 'bla'}}, takze pak opravdu title ziskam jako meal.meal.title
    */

    const {title, price, img,desc,category} = meal;
    return (
        <li>
            <h4>{title}</h4>
            <img src={img} alt={title}/>
            <p>{category}</p>
            <p>{price}</p>
            <p>{desc}</p>
        </li>
    )
}

export default Menu;