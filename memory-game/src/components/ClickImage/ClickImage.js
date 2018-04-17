import React from "react";
import "./ClickImage.css";


const ClickImage = props => (
    <div className="click-image">
      <a onClick={() => {props.shuffle(); props.counter(props.id); console.log(props.clicked)}}>
        <img alt={props.name} src={props.image}  width={141.75} height={210} clicked={props.clicked.toString()}/>
      </a>
    </div>
  );

export default ClickImage;