/** @format */

import React from "react";
import { Button, Box, Typography, styled } from "@mui/material";
/**
 * @author theAloneshadow(Divyanshu Goyal)
 * @function Cart
 **/

const Deal = styled(Box)`
	display: flex;
	padding: 15px 20px;
`;

const DealText = styled(Typography)`
	font-size: 22px;
	font-weight: 600;
	line-height: 32px;
	margin-right: 25px;
`;

const Timer = styled(Box)`
	color: #7f7f7f;
	margin-left: 10px;
	display: flex;
	align-items: center;
`;

const ViewAllButton = styled(Button)`
	margin-left: auto;
	background-color: #2874f0;
	border-radius: 2px;
	font-size: 13px;
`;

const CarouselHeading = (props) => {
	return (
		<Deal>
			<DealText>{props.title}</DealText>

			<ViewAllButton variant="contained" color="primary">
				View All
			</ViewAllButton>
		</Deal>
	);
};

export { CarouselHeading };
