/** @format */

import React from "react";
import "./Card.css";

/**
 * @author theAloneshadow(Divyanshu Goyal)
 * @function Card
 **/

const Card = (props) => {
	return (
		<div className="card" {...props}>
			{(props.headerLeft || props.headerRight) && (
				<div className="cardHeader">
					{props.headerLeft && <div>{props.headerLeft}</div>}
					{props.headerRight && props.headerRight}
				</div>
			)}

			{props.children}
		</div>
	);
};

export default Card;
