/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { talktoChatGPT } from "../../actions";
import "./ChatBoxModal.css";

export default function ChatBoxModal(props) {
	const [query, setQuery] = useState("");
	const dispatch = useDispatch();
	const data = useSelector((state) => state.ai);
	console.log(data);
	const handleQuery = () => {
		const result = dispatch(talktoChatGPT(query));
		setQuery("");
		console.log(result);
	};
	return (
		<div class="modal-main">
			<a href="#modal-opened" class="link-1" id="modal-closed">
				Product Queries?
			</a>

			<div class="modal-container" id="modal-opened">
				<div class="modal">
					{/* <img class="modal-image" src="./flipkart-logo.png" /> */}
					<div class="modal__details">
						<h1 class="modal__title">Hey I am Flipkart's AI!</h1>
						<p class="modal__description">
							Ask your product related query with me, I will be happy to answer
						</p>
					</div>

					<p class="modal__text">{data.response ? data.response : null}</p>

					<button class="modal__btn" onClick={handleQuery}>
						{" "}
						&rarr;
					</button>
					<input
						type="text"
						class="modal__input"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && handleQuery()}
						placeholder="Enter your query here"
					/>

					<a href="#modal-closed" class="link-2"></a>
				</div>
			</div>
		</div>
	);
}
