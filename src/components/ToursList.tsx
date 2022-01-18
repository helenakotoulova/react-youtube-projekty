import { Fragment } from 'react';
import {TourType} from '../App';
import ToursItem from './ToursItem';

interface Props {
    tours: TourType[],
    removeItem: (id:string) => void; 
}

const ToursList:React.FC<Props> = ({tours, removeItem}) => {

    return (
        <Fragment>
            <h1>The Very Best Tours Prepared For You!</h1>
            <div className="underline"></div>
        <ul>
            {tours.map(tour => <ToursItem key={tour.id} tour={tour} removeItem={removeItem.bind(null,tour.id)}/>)}
        </ul>
        </Fragment>
        
    )
}

export default ToursList;