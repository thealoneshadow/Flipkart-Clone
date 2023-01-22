/** @format */

import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetailsById } from "../../actions";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI/MaterialUI";
import "./ProductDetailsPage.css";
import { addToCart } from "../../actions";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";
import {
	Box,
	Typography,
	Table,
	TableBody,
	TableRow,
	TableCell,
	styled,
} from "@mui/material";
import { LocalOffer as Badge } from "@mui/icons-material";

export default function ProductDetailsPage(props) {
	const dispatch = useDispatch();
	const product = useSelector((state) => state.product);
	const location = useLocation();
	const productId = location.pathname.split("/")[2];
	const navigate = useNavigate();
	useEffect(() => {
		const payload = {
			params: {
				productId,
			},
		};
		dispatch(getProductDetailsById(payload));
	}, []);
	if (Object.keys(product.productDetails).length === 0) {
		return null;
	}

	const SmallText = styled(Box)`
		font-size: 14px;
		vertical-align: baseline;
		& > p {
			font-size: 14px;
			margin-top: 10px;
		}
	`;

	const ColumnText = styled(TableRow)`
		font-size: 14px;
		vertical-align: baseline;
		& > td {
			font-size: 14px;
			margin-top: 10px;
		}
	`;

	const StyledBadge = styled(Badge)`
		margin-right: 10px;
		color: #00cc00;
		font-size: 15px;
	`;
	const adURL =
		"https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50";
	const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);

	return (
		<Layout>
			{/* <div>{product.productDetails.name}</div> */}
			<div className="productDescriptionContainer">
				<div className="flexRow">
					<div className="verticalImageStack">
						{product.productDetails.productPictures.map((thumb, index) => (
							<div className="thumbnail">
								<img src={thumb.img} alt={thumb.img} />
							</div>
						))}
						{/* <div className="thumbnail active">
                {
                  product.productDetails.productPictures.map((thumb, index) => 
                  <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
                }
              </div> */}
					</div>
					<div className="productDescContainer">
						<div className="productDescImgContainer">
							<img
								className="productDescImgContainer"
								src={product.productDetails.productPictures[0].img}
								alt={`${product.productDetails.productPictures[0].img}`}
							/>
						</div>

						{/* action buttons */}
						<div className="flexRow">
							<MaterialButton
								title="ADD TO CART"
								bgColor="#ff9f00"
								textColor="#ffffff"
								style={{
									marginRight: "5px",
								}}
								icon={<IoMdCart />}
								onClick={() => {
									const { _id, name, price } = product.productDetails;
									const img = product.productDetails.productPictures[0].img;
									dispatch(addToCart({ _id, name, price, img }));
								}}
							/>
							<MaterialButton
								title="BUY NOW"
								bgColor="#fb641b"
								textColor="#ffffff"
								style={{
									marginLeft: "5px",
								}}
								icon={<AiFillThunderbolt />}
								onClick={() => {
									const { _id, name, price } = product.productDetails;
									const img = product.productDetails.productPictures[0].img;
									dispatch(addToCart({ _id, name, price, img }));
									navigate(`/cart`);
								}}
							/>
						</div>
					</div>
				</div>
				<div>
					{/* home > category > subCategory > productName */}
					<div className="breed">
						<ul>
							<li>
								<a href="#">Home</a>
								<IoIosArrowForward />
							</li>
							<li>
								<a href="#">Mobiles</a>
								<IoIosArrowForward />
							</li>
							<li>
								<a href="#">Samsung</a>
								<IoIosArrowForward />
							</li>
							<li>
								<a href="#">{product.productDetails.name}</a>
							</li>
						</ul>
					</div>
					{/* product description */}
					<div className="productDetails">
						<p className="productTitle">{product.productDetails.name}</p>
						<div>
							<span className="ratingCount">
								4.3 <IoIosStar />
							</span>
							<span className="ratingNumbersReviews">
								72,234 Ratings & 8,140 Reviews
							</span>
						</div>
						<div className="extraOffer">
							Extra <BiRupee />
							4500 off{" "}
						</div>
						<div className="flexRow priceContainer">
							<span className="price">
								<BiRupee />
								{product.productDetails.price}
							</span>
							<span className="discount" style={{ margin: "0 10px" }}>
								22% off
							</span>
							{/* <span>i</span> */}
						</div>
						<Typography>Available offers</Typography>
						<SmallText>
							<Typography>
								<StyledBadge />
								Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit
								Card
							</Typography>
							<Typography>
								<StyledBadge />
								Bank Offer 10% Off on Bank of Baroda Mastercard debit card first
								time transaction, Terms and Condition apply
							</Typography>
							<Typography>
								<StyledBadge />
								Purchase this Furniture or Appliance and Get Extra ₹500 Off on
								Select ACs
							</Typography>
							<Typography>
								<StyledBadge />
								Partner OfferExtra 10% off upto ₹500 on next furniture purchase
							</Typography>
						</SmallText>
						<Table>
							<TableBody>
								<ColumnText>
									<TableCell style={{ color: "#878787" }}>Delivery</TableCell>
									<TableCell style={{ fontWeight: 600 }}>
										Delivery by {date.toDateString()} | ₹40
									</TableCell>
								</ColumnText>
								<ColumnText>
									<TableCell style={{ color: "#878787" }}>Warranty</TableCell>
									<TableCell>No Warranty</TableCell>
								</ColumnText>
								<ColumnText>
									<TableCell style={{ color: "#878787" }}>Seller</TableCell>
									<TableCell>
										<span style={{ color: "#2874f0" }}>SuperComNet</span>
										<Typography>GST invoice available</Typography>
										<Typography>
											View more sellers starting from ₹329
										</Typography>
									</TableCell>
								</ColumnText>
								<TableRow>
									<TableCell colSpan={2}>
										<img src={adURL} style={{ width: 390 }} />
									</TableCell>
								</TableRow>
								<ColumnText>
									<TableCell style={{ color: "#878787" }}>
										Description
									</TableCell>
									<TableCell>{product.productDetails.description}</TableCell>
								</ColumnText>
							</TableBody>
						</Table>
						{/* <div>
							<p
								style={{
									color: "#212121",
									fontSize: "14px",
									fontWeight: "600",
								}}
							>
								Available Offers
							</p>
							<p style={{ display: "flex" }}>
								<span
									style={{
										width: "100px",
										fontSize: "12px",
										color: "#878787",
										fontWeight: "600",
										marginRight: "20px",
									}}
								>
									Description
								</span>
								<span
									style={{
										fontSize: "12px",
										color: "#212121",
									}}
								>
									{product.productDetails.description}
								</span>
							</p>
						</div> */}
					</div>
				</div>
			</div>
		</Layout>
	);
}
