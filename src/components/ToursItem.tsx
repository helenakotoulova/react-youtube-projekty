import { TourType } from "../App";
import { useState } from "react";
import Card from "./ui/Card";

interface Props {
  tour: TourType;
  removeItem: () => void;
}

const ToursItem: React.FC<Props> = ({ tour, removeItem }) => {
  const { name, image, price, info } = tour;

  const [readMore, setReadMore] = useState(false);

  return (
    <Card>
      <li>
        <img src={image} />
        <h2>{name}</h2>
        <p className="price">${price}</p>
        <p className="info">
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button
            className="readMore-button"
            onClick={(e) => setReadMore((prevState) => !prevState)}
          >
            {readMore ? "Show less" : "Read more"}
          </button>
        </p>
        <div className="actions">
          <button className="not-interested-button" onClick={removeItem}>
            Not Interested
          </button>
        </div>
      </li>
    </Card>
  );
};

export default ToursItem;
