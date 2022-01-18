import { Fragment, useState, useEffect } from "react";
import data from "../data/data"; // i kdyz to exporuju defaultne jako reviews,
// tady si to muzu pojmenovat people
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Reviews: React.FC = () => {
  const [index, setIndex] = useState(0);
  //const { name, job, id, image, text } = people[index];
  const [people, setPeople] = useState(data);

  const checkNumber = (number: number) => {
    if (number > people.length - 1) {
      return 0;
    }
    if (number < 0) {
      return people.length - 1;
    }
    return number;
  };

  const nextPersonHandler = () => {
    const newIndex = index + 1;
    const checkedIndex = checkNumber(newIndex);
    setIndex(checkedIndex);
  };

  const prevPersonHandler = () => {
    setIndex((originalIndex) => {
      const newIndex = originalIndex - 1;
      return checkNumber(newIndex);
    });
  };

  const randomPersonHandler = () => {
    let newIndex = Math.floor(Math.random() * people.length);
    if (newIndex === index) {
      newIndex = index + 1;
    }
    setIndex(checkNumber(newIndex));
  };

  // chceme aby se pri vyrenderovani stranky spustil timer (tady slider) na 5000 ms, po kterych
  // se to automaticky prepne na dalsiho cloveka
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        let newIndex = oldIndex + 1;
        if (newIndex > people.length - 1) {
          newIndex = 0;
        }
        return newIndex;
      });
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <Fragment>
      <div className="info">
        {people.map((person, personIndex) => {
          const { id, image, name, job, text } = person;

          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article key={id} className={position}>
              <div className="image-container">
                <img src={image} alt={name} />
                <span className="quote-icon">
                  <FaQuoteRight />
                </span>
              </div>
              <h4 className="author">{name}</h4>
              <p className="job">{job}</p>
              <p className="info">{text}</p>
            </article>
          );
        })}

        {/*<div className="buttons">*/}
          <button className='prev' onClick={prevPersonHandler}>
            <FaChevronLeft />
          </button>
          <button className='next' onClick={nextPersonHandler}>
            <FaChevronRight />
          </button>
       {/* </div>*/}
       {/* <div className="rndPerBtn">
          <button onClick={randomPersonHandler}>Select Random Person</button>
        </div>*/}
      </div>
    </Fragment>
  );
};

export default Reviews;
