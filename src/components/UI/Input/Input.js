import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
	let inputElement = null;
	const inputClasses = [classes.InputElement];
	let validationError = null;
	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
		validationError = (
			<p className={classes.ValidationError}>
				{props.shouldValidate.errorMessage}
			</p>
		);
	}

	switch (props.elementType) {
		case "input":
			inputElement = (
				<input
					className={inputClasses.join(" ")}
					onChange={props.changed}
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;

		case "textArea":
			inputElement = (
				<textarea
					className={inputClasses.join(" ")}
					onChange={props.changed}
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;

		case "select":
			inputElement = (
				<select
					value={props.value}
					onChange={props.changed}
					className={inputClasses.join(" ")}
				>
					<option value="Method">Delivery Method</option>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;

		default:
			inputElement = (
				<input
					className={inputClasses.join(" ")}
					onChange={props.changed}
					{...props.elementConfig}
					value={props.value}
				/>
			);
			break;
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
			{validationError}
		</div>
	);
};

export default Input;
