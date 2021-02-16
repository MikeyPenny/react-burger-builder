import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
	state = {
		orders: [],
		isLoading: true,
	};

	async componentDidMount() {
		try {
			const response = await axios.get("/orders.json");
			const fetchedOrders = [];
			for (let key in response.data) {
				fetchedOrders.push({
					...response.data[key],
					id: key,
				});
			}
			console.log(...fetchedOrders);
			this.setState({ isLoading: false, orders: fetchedOrders });
		} catch (err) {
			this.setState({ isLoading: false });
			console.log(err);
		}
	}

	render() {
		return (
			<div>
				{this.state.orders.map((order) => (
					<Order
						key={order.id}
						price={order.price}
						ingredients={order.ingredients}
					/>
				))}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
