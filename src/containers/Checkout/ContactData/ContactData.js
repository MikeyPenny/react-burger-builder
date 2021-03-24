import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name",
				},
				value: "",
				validation: {
					required: true,
					errorMessage: "Name is Required",
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street",
				},
				value: "",
				validation: {
					required: true,
					errorMessage: "Field Street is Required",
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Zip Code",
				},
				value: "",
				validation: {
					required: true,
					minLength: 5,
					maxLength: 6,
					errorMessage: "ZIP Code is Required Min Length 5 Max Lentgh 6",
				},
				valid: false,
				touched: false,
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country",
				},
				value: "",
				validation: {
					required: true,
					errorMessage: "Field Country is Required",
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your E-Mail",
				},
				value: "",
				validation: {
					required: true,
					errorMessage: "Field E-mail Required",
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" },
					],
				},
				validation: {},
				value: "",
				valid: true,
			},
		},
		formIsValid: false,
	};

	orderHandler = (ev) => {
		ev.preventDefault();

		const formData = {};
		for (let elementId in this.state.orderForm) {
			formData[elementId] = this.state.orderForm[elementId].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
		};
		this.props.onOrderBurger(order);
	};

	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	inputChangeHandler = (ev, inputId) => {
		const updatedForm = { ...this.state.orderForm };
		const updatedElement = { ...updatedForm[inputId] };
		updatedElement.value = ev.target.value;
		updatedElement.valid = this.checkValidity(
			updatedElement.value,
			updatedElement.validation
		);
		updatedElement.touched = true;
		updatedForm[inputId] = updatedElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedForm) {
			formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
		}
		console.log(formIsValid);
		this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
	};

	render() {
		const formElemArray = [];
		for (let key in this.state.orderForm) {
			formElemArray.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		console.log(this.state.formIsValid);

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElemArray.map((element) => (
					<Input
						key={element.id}
						elementType={element.config.elementType}
						elementConfig={element.config.elementConfig}
						value={element.config.value}
						changed={(ev) => this.inputChangeHandler(ev, element.id)}
						shouldValidate={element.config.validation}
						touched={element.config.touched}
						invalid={!element.config.valid}
					/>
				))}

				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
