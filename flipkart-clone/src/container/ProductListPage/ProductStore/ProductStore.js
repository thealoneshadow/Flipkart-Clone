/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { useLocation } from "react-router-dom";
import "./ProductStore.css";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card/Card";

export default function ProductStore() {
	const product = useSelector((state) => state.product);
	const dispatch = useDispatch();
	const location = useLocation();
	const [priceRange, setPriceRange] = useState({
		under5k: 5000,
		under10k: 10000,
		under15k: 15000,
		under20k: 20000,
		under30k: 30000,
	});
	const slug = location.pathname.split("/")[1];
	useEffect(() => {
		dispatch(getProductsBySlug(slug));
	}, []);
	return (
		<>
			{Object.keys(product.productsByPrice).map((key, index) => {
				return (
					<Card
						headerLeft={`${slug} mobiles ${priceRange[key]}`}
						headerRight={<button>view all</button>}
						style={{ width: "calc(100% - 40px)", margin: "20px" }}
					>
						<div style={{ display: "flex" }}>
							{product.productsByPrice[key].map((product) => (
								<Link
									to={`/${product.slug}/${product._id}/p`}
									style={{
										display: "block",
									}}
									className="productContainer"
								>
									<div className="productImgContainer">
										<img
											src={generatePublicUrl(product.productPictures[0].img)}
											alt=""
										/>
									</div>
									<div className="productInfo">
										<div style={{ margin: "5px 0" }}>{product.name}</div>
										<div>
											<span>4.34</span>&nbsp;
											<span>3354</span>
										</div>
										<div className="productPrice">{product.price}</div>
									</div>
								</Link>
							))}
						</div>
					</Card>
				);
			})}
		</>
	);
}
