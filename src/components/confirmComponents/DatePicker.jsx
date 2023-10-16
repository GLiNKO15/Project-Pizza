import React, {useState, useRef} from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { setDeliveryDay } from "../../store/AppSlice.js";

export default function DatePick() {
	const dispatch = useDispatch();
	let data = new Date();
	const year = data.getFullYear();
    const month = data.getMonth();
    const date = data.getDate(); 

    const [startDate, setStartDate] = useState(new Date(year, month, date));
    const minDate = new Date(year, month, 1);
    const maxDate = new Date(year, month + 1, 31);
	
	const deliveryDay = useSelector((state) => state.app.deliveryDay);
	const delivery = useSelector((state) => state.app.delivery);
	const { register } = useForm({ defaultValues: { deliveryDay } });

    const renderDayContents = (day, date) => {
    if(date < minDate || date > maxDate){
      return <span></span>;
    }
   	  return <span>{date.getDate()}</span>;
	};
	

	return (
		<>
			<DatePicker
				selected = {startDate}
				minDate = {minDate}
				maxDate = {maxDate}
				onChange = {(date) =>{
					setStartDate(date)
					dispatch(setDeliveryDay(`${date.getDate()}/${date.getMonth()+1}`));
				}}
				renderDayContents = {renderDayContents}
				dateFormat="dd/MM"
				placeholderText='Дата'
				name="deliveryDay"
			/>
		</>
	);
}