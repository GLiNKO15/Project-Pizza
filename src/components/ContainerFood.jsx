

import React, {useRef, useState, useEffect} from 'react';
import { Link, Outlet, useLocation, Route, Routes } from 'react-router-dom';

import s from '../styles/index.module.css';
import icoFilter from '../img/ico/Filter.svg';


import {useSelector, useDispatch } from 'react-redux'
import {fullPopapPizzaData,
		showMessage, hideMessage,  pushListShopping,
		setFinalPrice, toggleElement} from '../store/AppSlice';

export default function Food({food, name}){
	const dispatch = useDispatch();
	let listShopping = useSelector((state) => state.app.listShopping);
	let filters = useSelector((state) => state.app.listShopping);


	let mobileVersion = false;
	if(window.innerWidth < 644){
		mobileVersion = true;
	}

	let finalPrice = 0;
	dispatch(setFinalPrice(finalPrice));
	
	const editPizza = (id)=>{
		let item = food[id];
		if(name=='Пицца'){
			
			dispatch(fullPopapPizzaData({name:item.title, urlImg:item.imgUrl, description:item.ingredients, price:item.price, isHit:item.isHit, isNew:item.isNew}));
			if(mobileVersion) dispatch(toggleElement('handlePopapMobileEditPizza'));
			else dispatch(toggleElement('handlePopapPizza'));
		}else{
			dispatch(pushListShopping({urlImg:item.imgUrl, key:item.key , name:item.title, size:null, weidth:null, price:item.price, type:null}));
			dispatch(showMessage());
			setTimeout(()=>{
				dispatch(hideMessage())
			}, 1000);
		}
	}

	const pizzaFilters = useSelector((state) => state.app.pizzaFilters);

	let pizzaList = food;
	if(name == 'Пицца'){
		pizzaFilters.forEach((value) => {
			pizzaList = pizzaList.filter((item)=>{
				if(item.filterInfo.includes(value)) return true;
			})
		})
	}
	let filter = false;
	if(name == 'Пицца') filter = true;

	return (
		<>
			<div className={s.top__food}>
				<h2 className={s.name__food}>{name}</h2>
				{filter &&
					<button className={s.filters__food}
					 onClick={()=>{
						if(!mobileVersion){
							dispatch(toggleElement('handlePopapFilter'));
						}else{
							dispatch(toggleElement('handlePopapMobileFilter'));
						}
					 }}>
						<img src={icoFilter} className={s.food__filters_img}/>
						<div className={s.food__filters_text}>Фильтры</div>
					</button>
				}
			</div>
			<div className={s.list__products}>
				{pizzaList.length ?
					<ul className={s.list__food}> 
						
						{pizzaList.map((value, index) => (
							<li key={value.key} className={s.list__food_item}>
								<div onClick={()=>editPizza(value.id-1)} className={s.list__food_imgblock}>
									<img className={s.item__food_img} alt={value.title} src={value.imgUrl} />
								</div>
								<div className={s.item__food_text}>
									<h3 className={s.item__food_title}>{value.title}</h3>
									<p className={s.item__food_info}>{value.ingredients}</p>
									<button onClick={(event)=>editPizza(value.id-1, event)} className={s.item__food_btn_mobile}>
										{name == 'Пицца' ?
										<>от {value.price} ₽</>
										:
										<>{value.price} ₽</>}
									</button>
								</div>
								<div className={s.item__food_bottom}>
									<button onClick={(event)=>editPizza(value.id-1, event)} className={s.item__food_btn}>
										{name == 'Пицца' ?
										<>Выбрать</>
										:
										<>В корзину</>}
									</button>
									<span className={s.item__food_price}>от {value.price} ₽</span>
								</div>
							</li>	
						))}
						
					</ul>
					:
					<div className={s.food__erorr}>Ничего не найдено(</div>
				}
			</div>
		</>
  	);
}