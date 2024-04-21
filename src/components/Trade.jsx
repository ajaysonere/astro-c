
/*
    This is the simple component in which , when admin will create the signal , this component will give all the style to that signal . if singal is for sell , then it will have the red header for identification and if it is for buy , it will be green.
    
*/




// eslint-disable-next-line react/prop-types
const Trade = ({type ,companyName, basePrice, stopLoss, targetPrice }) => {
  
  return (
    <div className="post">
      <div className="content">
        <p className={`card__header  ${type} == "buy" ? "buy" : "sell"`}>
          {type}
        </p>
        <div className="card__content">
          <span>{`${companyName} at  base price of `}</span>
          <span>{`${basePrice} with stop loss of `}</span>
          <span>{`${stopLoss} and target price is `}</span>
          <span>{`${targetPrice}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Trade;
