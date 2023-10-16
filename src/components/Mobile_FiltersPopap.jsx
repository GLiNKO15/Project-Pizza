import React, {useRef, useState, useEffect} from 'react';
import { Link, Outlet, useLocation, Route, Routes } from 'react-router-dom';

import s from '../styles/mobile.module.css';


import { useSelector, useDispatch } from 'react-redux'
import {toggleElement, setPizzaFilters, setPizzaFiltersActiveBtn, clearPizzaFiltersActiveBtn, sortPizzaFiltersBtn} from '../store/AppSlice';


export default function MobileFiltersPopap({popapMobileFilterRef}) {
	const dispatch = useDispatch();
	const pizzaFilters = useSelector((state) => state.app.pizzaFilters);
	const pizzaFiltersActiveBtn = useSelector((state) => state.app.pizzaFiltersActiveBtn);

	const pizzaLocalFilters = useRef(pizzaFilters);

	const setFilter =(e)=>{
		if(!pizzaLocalFilters.current.includes(e.target.textContent)){
			pizzaLocalFilters.current = [...pizzaLocalFilters.current, e.target.textContent];
		}else{
			pizzaLocalFilters.current = pizzaLocalFilters.current.filter((item, index, array) => item != e.target.textContent);
		}
		dispatch(setPizzaFiltersActiveBtn(e.target.textContent));
		console.log(pizzaLocalFilters.current);
	}
	const hidePopap =(e)=>{
		if(e.target.className == 'mobile_filter__HXZTw'){
			dispatch(sortPizzaFiltersBtn());
			
			dispatch(toggleElement('handlePopapMobileFilter'));;
		}
	}
	return (
		<>
			<div className={s.filter} onClick={(e)=>hidePopap(e)}>
				<div ref={popapMobileFilterRef} className={s.container__mobile_filter}>
					<div className={s.popap__mobile_filters_lists}>
						<div className={s.popap__mobile_filters_block}>
							<h2 className={s.popap__mobile_filter_category}>Основное</h2>
							<div className={s.popap__mobile_filters_list}>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Хит'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Хит</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Новинка'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Новинка</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Шампиньоны'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Шампиньоны</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Ананасы'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Ананасы</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Лук'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Лук</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Томаты'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Томаты</button>
								
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Без мяса'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Без мяса</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Без лука'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Без лука</button>
							</div>
						</div>
						<div className={s.popap__mobile_filters_block}>
							<h2 className={s.popap__mobile_filter_category}>Мясо</h2>
							
							<div className={s.popap__mobile_filters_list}>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Пепперони'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Пепперони</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Говядина'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Говядина</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Цыпленок'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Цыпленок</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Бекон'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Бекон</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Ветчина'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Ветчина</button>
							</div>
						</div>
						<div className={s.popap__mobile_filters_block}>
							<h2 className={s.popap__mobile_filter_category}>Сыр</h2>

							<div className={s.popap__mobile_filters_list}>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Кубики брынзы'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Кубики брынзы</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Моцарелла'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Моцарелла</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Пармезан'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Пармезан</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Чеддер'] ? s.popap__mobile_filter_active : s.popap__mobile_filter_item }>Чеддер</button>
							</div>
						</div>
					</div>

					<div className={s.popap__moobile_filter_footer}>
						<button 
						onClick={()=>{
							pizzaLocalFilters.current = [];
							dispatch(clearPizzaFiltersActiveBtn());
						}} className={s.popap__mobile_filter_clear}>Сбросить</button>
						<button onClick={()=>{
							dispatch(setPizzaFilters(pizzaLocalFilters.current));
							dispatch(dispatch(toggleElement('handlePopapMobileFilter')));
							}} className={s.popap__mobile_filter_apply}>Применить</button>
					</div>
				</div>
			</div>
		</>
  	);
}