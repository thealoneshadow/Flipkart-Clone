/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import Layout from "../../components/Layout/Layout";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./OrderDetailsPage.css";

/**
 * @author theAloneshadow(Divyanshu Goyal)
 * @function OrderDetails
 **/

const OrderDetailsPage = (props) => {
	const dispatch = useDispatch();
	const orderDetails = useSelector((state) => state.user.orderDetails);
	console.log(orderDetails);
	const params = useParams();
	useEffect(() => {
		const payload = {
			orderId: params.orderId,
		};
		dispatch(getOrder(payload));
	}, []);

	const formatDate = (date) => {
		if (date) {
			const d = new Date(date);
			return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
		}
		return "";
	};

	const formatDate2 = (date) => {
		const month = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"June",
			"July",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		if (date) {
			const d = new Date(date);
			return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
		}
	};

	if (!(orderDetails && orderDetails.address)) {
		return null;
	}

	return (
		<Layout>
			{/* <div
				style={{
					width: "1160px",
					margin: "10px auto",
				}}
			>
				<Card
					style={{
						margin: "10px 0",
					}}
				>
					<div className="delAdrContainer">
						<div className="delAdrDetails">
							<div className="delTitle">Delivery Address</div>
							<div className="delName">{orderDetails.address.name}</div>
							<div className="delAddress">{orderDetails.address.address}</div>
							<div className="delPhoneNumber">
								Phone number {orderDetails.address.mobileNumber}
							</div>
						</div>
						<div className="delMoreActionContainer">
							<div className="delTitle">More Actions</div>
							<div className="delName">Download Invoice</div>
						</div>
					</div>
				</Card>

				{orderDetails.items.map((item, index) => (
					<Card
						style={{ display: "flex", padding: "20px 0", margin: "10px 0" }}
					>
						<div className="flexRow">
							<div className="delItemImgContainer">
								<img src={item.productId.productPictures[0].img} alt="" />
							</div>
							<div style={{ width: "250px" }}>
								<div className="delItemName">{item.productId.name}</div>
								<Price value={item.payablePrice} />
							</div>
						</div>
						<div style={{ padding: "25px 50px" }}>
							<div className="orderTrack">
								{orderDetails.orderStatus.map((status) => (
									<div
										className={`orderStatus ${
											status.isCompleted ? "active" : ""
										}`}
									>
										<div
											className={`point ${status.isCompleted ? "active" : ""}`}
										></div>
										<div className="orderInfo">
											<div className="status">{status.type}</div>
											<div className="date">{formatDate(status.date)}</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div style={{ fontWeight: "500", fontSize: 14 }}>
							{orderDetails.orderStatus[3].isCompleted &&
								`Delivered on ${formatDate2(orderDetails.orderStatus[3].date)}`}
						</div>
					</Card>
				))}
			</div> */}
			<Link
				to={`/order_details/${orderDetails._id}`}
				className="flex p-4 items-start bg-white border rounded gap-2 sm:gap-0 hover:shadow-lg"
			>
				<div className="w-full sm:w-32 h-20">
					<img
						draggable="false"
						className="h-full w-full object-contain"
						src={orderDetails.items[0].productId.productPictures[0].img}
						alt={orderDetails.items[0].productId.name}
					/>
				</div>
				<div className="flex flex-col sm:flex-row justify-between w-full">
					<div className="flex flex-col gap-1 overflow-hidden">
						<p className="text-sm">
							{orderDetails.items[0].productId.name.length > 40
								? `${orderDetails.items[0].productId.name.substring(0, 40)}...`
								: orderDetails.items[0].productId.name}
						</p>
						<p className="text-xs text-gray-500 mt-2">
							Quantity: {orderDetails.items[0].productId.purchasedQty}
						</p>
						<p className="text-xs text-gray-500">
							Total: ₹{orderDetails.items[0].productId.payablePrice}
						</p>
					</div>

					<div className="flex flex-col sm:flex-row mt-1 sm:mt-0 gap-2 sm:gap-20 sm:w-1/2">
						<p className="text-sm">
							₹{orderDetails.items[0].productId.payablePrice}
						</p>

						<div className="flex flex-col gap-1.5">
							<p className="text-sm font-medium flex items-center gap-1">
								{orderDetails.orderStatus[0].type === "Shipped" ? (
									<>
										<span className="text-primary-orange pb-0.5">
											<CircleIcon sx={{ fontSize: "14px" }} />
										</span>
										Shipped
									</>
								) : orderDetails.orderStatus[0].type === "Delivered" ? (
									<>
										<span className="text-primary-green pb-0.5">
											<CircleIcon sx={{ fontSize: "14px" }} />
										</span>
										Delivered on {formatDate(orderDetails.updatedAt)}
									</>
								) : (
									<>
										<span className="text-primary-green pb-0.5">
											<RadioButtonUncheckedIcon sx={{ fontSize: "14px" }} />
										</span>
										Ordered on {formatDate(orderDetails.createdAt)}
									</>
								)}
							</p>
							{/* {orderStatus === "Delivered" ? (
								<p className="text-xs ml-1">
									Your item has been {orderDetails.items.orderStatus[0].type}
								</p>
							) : orderStatus === "Shipped" ? (
								<p className="text-xs ml-1">Your item has been {orderStatus}</p>
							) : (
								<p className="text-xs ml-1">Seller has processed your order</p>
							)} */}
						</div>
					</div>
				</div>
			</Link>
		</Layout>
	);
};

export default OrderDetailsPage;
