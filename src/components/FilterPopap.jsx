import React, {useRef, useState, useEffect} from 'react';
import { Link, Outlet, useLocation, Route, Routes } from 'react-router-dom';

import s from '../styles/index.module.css';
// import '../styles/index.module.css';
import { useSelector, useDispatch } from 'react-redux'
import {toggleElement, setPizzaFilters, setPizzaFiltersActiveBtn, clearPizzaFiltersActiveBtn, sortPizzaFiltersBtn} from '../store/AppSlice';

import cross from '../img/ico/Cross.svg';


export default function FilterPopap({popapFilterRef}) {
	const dispatch = useDispatch();
	const pizzaFilters = useSelector((state) => state.app.pizzaFilters);
	const pizzaFiltersActiveBtn = useSelector((state) => state.app.pizzaFiltersActiveBtn);

	const pizzaLocalFilters = useRef(pizzaFilters);

	const closeFilter = () => {
		dispatch(toggleElement('handlePopapFilter'));
		dispatch(sortPizzaFiltersBtn());
	}
	const setFilter =(e)=>{
		if(!pizzaLocalFilters.current.includes(e.target.textContent)){
			pizzaLocalFilters.current = [...pizzaLocalFilters.current, e.target.textContent];
		}else{
			pizzaLocalFilters.current = pizzaLocalFilters.current.filter((item, index, array) => item != e.target.textContent);
		}
		dispatch(setPizzaFiltersActiveBtn(e.target.textContent));
		console.log(pizzaLocalFilters.current);
	}
	return (
		<>
			<div className={s.filter}>
				<div ref={popapFilterRef} className={s.container_filter}>
					<div className={s.popap__filter_top}>
						<h1 className={s.popap__filter_title}>Фильтры</h1>
						<button onClick={()=>closeFilter()} className={s.popap__filter_close}>
							<img src={cross} alt="cross" />
						</button>
					</div>

					<div className={s.popap__filters_lists}>

						<div className={s.popap__filters_block}>
							<h2 className={s.popap__filter_category}>Основное</h2>
						
							<div className={s.popap__filters_list}>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Хит'] ? s.popap__filter_active : s.popap__filter_item }>Хит</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Новинка'] ? s.popap__filter_active : s.popap__filter_item }>Новинка</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Шампиньоны'] ? s.popap__filter_active : s.popap__filter_item }>Шампиньоны</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Ананасы'] ? s.popap__filter_active : s.popap__filter_item }>Ананасы</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Лук'] ? s.popap__filter_active : s.popap__filter_item }>Лук</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Томаты'] ? s.popap__filter_active : s.popap__filter_item }>Томаты</button>
								
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Без мяса'] ? s.popap__filter_active : s.popap__filter_item }>Без мяса</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Без лука'] ? s.popap__filter_active : s.popap__filter_item }>Без лука</button>
							</div>
						</div>

						<div className={s.popap__filters_block}>
							<h2 className={s.popap__filter_category}>Мясо</h2>
							
							<div className={s.popap__filters_list}>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Пепперони'] ? s.popap__filter_active : s.popap__filter_item }>Пепперони</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Говядина'] ? s.popap__filter_active : s.popap__filter_item }>Говядина</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Цыпленок'] ? s.popap__filter_active : s.popap__filter_item }>Цыпленок</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Бекон'] ? s.popap__filter_active : s.popap__filter_item }>Бекон</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Ветчина'] ? s.popap__filter_active : s.popap__filter_item }>Ветчина</button>
							</div>
						</div>
						<div className={s.popap__filters_block}>
							<h2 className={s.popap__filter_category}>Сыр</h2>

							<div className={s.popap__filters_list}>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Кубики брынзы'] ? s.popap__filter_active : s.popap__filter_item }>Кубики брынзы</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Моцарелла'] ? s.popap__filter_active : s.popap__filter_item }>Моцарелла</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Пармезан'] ? s.popap__filter_active : s.popap__filter_item }>Пармезан</button>
								<button onClick={(e)=>setFilter(e)} className={pizzaFiltersActiveBtn['Чеддер'] ? s.popap__filter_active : s.popap__filter_item }>Чеддер</button>
							</div>
						</div>
					</div>

					<div className={s.popap__filter__line}></div>
					<div className={s.popap__filter_footer}>
						<button 
						onClick={()=>{
							pizzaLocalFilters.current = [];
							dispatch(clearPizzaFiltersActiveBtn());
						}} className={s.popap__filter_clear}>Сбросить</button>
						<button onClick={()=>{dispatch(setPizzaFilters(pizzaLocalFilters.current))}} className={s.popap__filter_apply}>Применить</button>
					</div>
				</div>
			</div>
		</>
  	);
}