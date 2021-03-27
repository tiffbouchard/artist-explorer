import React from 'react';

import "./Card.scss";

const Card = (props) => {
  const { image, name, id, handleClick} = props;
  return ( 
      <div>
        <div class="card" key={id} onClick={handleClick}>
            <div class="img-container">
              <img id={id} src={image} />
            </div>
            <div className="name" id={id}>{name}</div>
        </div>
      </div>
     
    );
}
 
export default Card;