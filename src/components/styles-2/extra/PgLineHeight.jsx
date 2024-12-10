import React, { useEffect, useState } from "react";
import {
	Button,
	Dropdown,
	ToggleControl,
	__experimentalInputControl as InputControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const PgCSSLineHeight = ({ val, onChange, breakPoint, sudoSrc }) => {
	var args = {
		px: { label: "PX", value: "px" },
		em: { label: "EM", value: "em" },
		rem: { label: "REM", value: "rem" },
		normal: { label: "Normal", value: "normal" },
		"%": { label: "%", value: "%" },
		cm: { label: "CM", value: "cm" },
		mm: { label: "MM", value: "mm" },
		in: { label: "IN", value: "in" },
		pt: { label: "PT", value: "pt" },
		pc: { label: "PC", value: "pc" },
		ex: { label: "EX", value: "ex" },
		ch: { label: "CH", value: "ch" },
		vw: { label: "VW", value: "vw" },
		vh: { label: "VH", value: "vh" },
		vmin: { label: "VMIN", value: "vmin" },
		vmax: { label: "VMAX", value: "vmax" },
	};

	var valZ = typeof val === "object" ? val.target.value : val;
	var valX =
		valZ == undefined || valZ.match(/[+-]?([0-9]*[.])?[0-9]+/g) == null
			? 0
			: valZ.match(/[+-]?([0-9]*[.])?[0-9]+/g)[0];

	var unitX =
		valZ == undefined || valZ.match(/[a-zA-Z%]+/g) == null
			? "px"
			: valZ.match(/[a-zA-Z%]+/g)[0];
	const [valueX, setValueX] = useState(valX);
	const [unit, setUnit] = useState(unitX);
	useEffect(() => {
		setValueX(valX);
		setUnit(unitX);
	}, [val, breakPoint, sudoSrc]);
	const [isImportant, setImportant] = useState(
		valZ.includes(" !important") ? true : false
	);
	return (
		<div className="flex flex-col justify-between gap-1 items-start">
			<label htmlFor="line-height">Line Height</label>
			<div className="flex gap-1 w-full items-start justify-between">
				<div className="flex items-center gap-1">
					{unit != "normal" && (
						<InputControl
							className="w-16 !leading-3"
							id="font-size"
							value={valueX}
							type="number"
							step={0.01}
							disabled={unit === "normal" ? true : false}
							onChange={(newVal) => {
								var v = newVal;
								setValueX(v);
								if (unit == "normal") {
									if (isImportant) {
										onChange(unit + " !important", "lineHeight");
									} else {
										onChange(unit, "lineHeight");
									}
								} else {
									if (isImportant) {
										onChange(v + unit + " !important", "lineHeight");
									} else {
										onChange(v + unit, "lineHeight");
									}
								}
							}}
						/>
					)}
					<div>
						<select
							value={unit}
							onChange={(ev) => {
								const selectedValue = ev.target.value;
								setUnit(selectedValue);
								if (selectedValue == "normal") {
									if (isImportant) {
										onChange(selectedValue + " !important", "lineHeight");
									} else {
										onChange(selectedValue, "lineHeight");
									}
								} else {
									if (isImportant) {
										onChange(
											valueX + selectedValue + " !important",
											"lineHeight"
										);
									} else {
										onChange(valueX + selectedValue, "lineHeight");
									}
								}
							}}>
							{Object.entries(args).map((y) => {
								var index = y[0];
								var x = y[1];
								return (
									<option key={index} value={x.value}>
										{x.label}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<ToggleControl
					help={
						isImportant
							? __("Important Enabled", "post-grid")
							: __("Important?", "post-grid")
					}
					checked={isImportant}
					onChange={(arg) => {
						setImportant((isImportant) => !isImportant);
						if (isImportant) {
							if (unit == "normal") {
								onChange(unit, "lineHeight");
							} else {
								onChange(valueX + unit, "lineHeight");
							}
						} else {
							if (unit == "normal") {
								onChange(unit + " !important", "lineHeight");
							} else {
								onChange(valueX + unit + " !important", "lineHeight");
							}
						}
					}}
				/>
			</div>
		</div>
	);
};

export default PgCSSLineHeight;