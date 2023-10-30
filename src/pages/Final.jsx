import React, { useRef, useState, useEffect } from 'react';
import { Link, Outlet, useLocation} from 'react-router-dom';

import imgDelivery from '../img/delivery.png';
import s from '../styles/index.module.css';

export default function FinalPage() {

	return (
		<>
			<div className={s.final}>
				<div className={s.final__img}>
					<img src={imgDelivery} alt=""/>
				</div>

				<div className={s.final__text}>
					<h1 className={s.final__title}>Заказ № 100134 принят</h1>
					<h2 className={s.final__subtitle}>Спасибо за заказ!</h2>
				</div>
			</div>
		</>
	);
}







