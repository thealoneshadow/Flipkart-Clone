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
import Price from "../../../components/UI/Price";
import Rating from "../../../components/UI/Rating";

export default function ProductStore() {
	const product = useSelector((state) => state.product);
	const dispatch = useDispatch();
	const location = useLocation();
	const priceRange = product.priceRange;
	const slug = location.pathname.split("/")[1];
	useEffect(() => {
		dispatch(getProductsBySlug(slug));
	}, []);
	return (
		<>
			{!product.priceRange
				? null
				: Object.keys(product.priceRange).map((key, index) => {
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
													src={generatePublicUrl(
														product.productPictures[0].img
													)}
													alt=""
												/>
											</div>
											<div className="productInfo">
												<div style={{ margin: "5px 0" }}>{product.name}</div>
												<div>
													<Rating value="4.3" />
													&nbsp;&nbsp;
													<span
														style={{
															color: "#777",
															fontWeight: "500",
															fontSize: "12px",
														}}
													>
														(3353)
													</span>
												</div>
												<Price value={product.price} />
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
