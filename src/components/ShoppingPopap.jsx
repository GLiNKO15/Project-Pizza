import React, {useRef, useState, useEffect} from 'react';
import { Link, Outlet, useLocation, Route, Routes } from 'react-router-dom';
// import {  } from './counterSlice'
import s from '../styles/index.module.css';
// import '../styles/index.module.css';
import { useSelector, useDispatch } from 'react-redux'
import {toggleElement, showMessage, shopCounterMinus, shopCounterPlus} from '../store/AppSlice';

import cross from '../img/ico/Cross.svg';
import icoPlus from '../img/ico/Plus.svg';
import icoMinus from '../img/ico/Minus.svg';


export default function ShoppingBagPopap({popapShopRef}) {
	const listShopping = useSelector((state) => state.app.listShopping);
	
	let finalPrice = useSelector((state) => state.app.finalPrice);

	console.log(listShopping);
	const dispatch = useDispatch();
	return (
		<>
			<div className={s.popap__shopping}>
				<div ref={popapShopRef} className={s.container__popap_shopping}>
					<div className={s.popap__shopping_top}>
						<h1 className={s.popap__shopping_title}>Ваш заказ</h1>
						<button onClick={()=>{dispatch(toggleElement('handlePopapShopping'))}} className={s.popap__shopping_close}>
							<img src={cross} alt="cross" />
						</button>
					</div>
					{listShopping.length ? 
						<ul className={s.popap__shopping_list}>
							{listShopping.map((item, index)=>(
								<li className={s.popap__shopping_product}>
									<div className={s.popap__shopping_img}>
										<img src={item.urlImg} alt="" srcset="" />
									</div>
									<div className={s.popap__shopping_info}>
										<div className={s.popap__shopping_info_top}>
											<h2 className={s.popap__shopping_name}>{item.name}</h2>
											{
												item.type == 'pizza'&&
												<span className={s.popap__shopping_subtitle}>{item.weidth}, {item.size} см</span>
											}
											
										</div>
										<div className={s.popap__shopping_info_bottom}>
											<div className={s.popap__shopping_counter}>
												<button onClick={()=>{
													dispatch(shopCounterMinus(index))
													dispatch(showMessage())
												}} className={s.popap__shopping_minus}>
													<img src={icoMinus} alt="" srcset="" />
												</button>
												<span className={s.popap__shopping_counter_out}>{item.quantity}</span>
												<button onClick={()=>dispatch(shopCounterPlus(index))} className={s.popap__shopping_plus}>
													<img src={icoPlus} alt="" srcset="" />
												</button>
											</div>
											<div className={s.popap__shopping_price}>
												{item.price} ₽
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					:

						<div className={s.popap__shopping_erorr}>Пусто</div>
					}
					<div className={s.popap__shopping__line}></div>
					<div className={s.popap__shopping_footer}>
						<h3 className={s.popap__shopping_summ}>Итого: {finalPrice} ₽</h3>
						<button className={s.popap__shopping_checkout}>Оформить заказ</button>
					</div>
				</div>
			</div>
		</>
  	);
}