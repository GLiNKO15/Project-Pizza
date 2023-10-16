import React, {useRef, useState, useEffect} from 'react';
import { Link} from 'react-router-dom';

import s from '../styles/mobile.module.css';

import { useSelector, useDispatch } from 'react-redux'
import {toggleElement, setRouteState, shopCounterMinus, shopCounterPlus} from '../store/AppSlice';


import icoPlus from '../img/ico/Plus.svg';
import icoMinus from '../img/ico/Minus.svg';


export default function MobileShoppingBagPopap({popapMobileShopRef}) {
	const listShopping = useSelector((state) => state.app.listShopping);
	let finalPrice = useSelector((state) => state.app.finalPrice);

	const dispatch = useDispatch();
	return (
		<>
			<div onClick={
				(e)=>{if(e.target.className == 'mobile_popap__shopping__SEpAp') dispatch(toggleElement('handlePopapMobileShopping'))}
				} className={s.popap__shopping}>
				<div ref={popapMobileShopRef} className={s.container__popap_shopping}>
					<div className={s.popap__shopping_top}>
						<h1 className={s.popap__shopping_title}>Ваш заказ</h1>
					</div>
					{listShopping.length ? 
						<ul className={s.popap__shopping_list}>
							{listShopping.map((item, index)=>(
								<li key={item.name} className={s.popap__shopping_product}>
									<div className={s.popap__shopping_img}>
										<img src={item.urlImg} alt="" />
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
												}} className={s.popap__shopping_minus}>
													<img src={icoMinus} alt="" />
												</button>
												<span className={s.popap__shopping_counter_out}>{item.quantity}</span>
												<button onClick={()=>dispatch(shopCounterPlus(index))} className={s.popap__shopping_plus}>
													<img src={icoPlus} alt="" />
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
					<div className={s.popap__shopping_footer}>
						<h3 className={s.popap__shopping_summ}>Итого: {finalPrice} ₽</h3>

						{listShopping.length ?
							<Link 
							to={'/confirm'} 
							onClick={()=>{
								dispatch(toggleElement('handlePopapMobileShopping'));
								dispatch(setRouteState('confirm'));
								window.scrollTo(0, 0);
							}}
							className={s.popap__shopping_checkout}

							>
							Оформить заказ
							</Link>
						:
							<a href='#' className={s.popap__shopping_checkout}>Оформить заказ</a>
						}
					</div>
				</div>
			</div>
		</>
  	);
}