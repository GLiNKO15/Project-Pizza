import React, {useRef, useState, useEffect} from 'react';
import { Link, Outlet, useLocation, Route, Routes } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import useSWR from 'swr';
import RouteItem from '../routes/Routes';
// import {  } from './counterSlice'
import '../styles/mobile.module.css';

// import '../index.module.css';
import '../style.css';
import Main from './MainPage';
import PopapEditFood from './EditFood';
import PopapMobileEditFood from './Mobile_EditPizza';
import PopapShopping from './ShoppingPopap';
import PopapFilter from './FilterPopap';
import PopapMobileFilter from './Mobile_FiltersPopap';
import PopapMobileShopping from './Mobile_Shopping';

import { useSelector, useDispatch } from 'react-redux'
import { togglePopapPizza, togglePopapShopping  } from '../store/AppSlice';

export default function App() {
	const dispatch = useDispatch();
	let navigation = useRef();

	let [allFood, setAllFood ]= useState([]);
	let [pizzes, setPizzes ]= useState([]);
	let [sushi, setSushi ]= useState([]);
	let [snacks, setSnacks]= useState([]);
	let [drinks, setDrinks]= useState([]);
	let [combo, setCombo]= useState([]);
	let [desserts, setDesserts]= useState([]);
	let [sauce, setSauce]= useState([]);
	
	const handleScroll = () =>{
		const position = window.pageYOffset;

		if(position < 500){
			navigation.current.style.marginTop = '-110px';	
		}else{
			navigation.current.style.marginTop = '0px';
		}
	}
	useEffect(()=>{
		fetch('https://64d2e00967b2662bf3db7cc3.mockapi.io/items')
		.then((res)=>res.json())
		.then((res)=>{
			setAllFood(res);
			setPizzes(res[0]);
			setSushi(res[1]);
			setSnacks(res[2]);
			setDrinks(res[3]);
			setCombo(res[4]);
			setDesserts(res[5]);
			setSauce(res[6]);
			
		});
		window.addEventListener('scroll', handleScroll);
		return () =>{
			window.removeEventListener('scroll', handleScroll);
		}
	}, []);

	const popapPizza = useSelector((state) => state.app.handlePopapPizza);
	
	console.log(popapPizza);
	
	if(popapPizza){
		document.body.style.overflowY = 'hidden';
		document.body.style.padding = '0 20px 0 0';
		
	}else{
		document.body.style.overflowY = 'scroll';
		document.body.style.padding = '0 10px 0 0';
	}

	const popapShopping = useSelector((state) => state.app.handlePopapShopping);
	const popapMobileShopping = useSelector((state) => state.app.handlePopapMobileShopping);
	const popapFilter = useSelector((state) => state.app.handlePopapFilter);
	const popapMobileFilter = useSelector((state) => state.app.handlePopapMobileFilter);
	const popapPizzaMobile = useSelector((state) => state.app.handlePopapMobileEditPizza);

	
	console.log(popapShopping);
	console.log(popapFilter);
	
	if(popapShopping || popapFilter || popapMobileFilter || popapPizzaMobile || popapMobileShopping){
		document.body.style.overflowY = 'hidden';
		document.body.style.padding = '0 20px 0 0';
	}

	const popapPizzaRef = useRef(null);
	const popapPizzaMobileRef = useRef(null);
	const popapShopRef = useRef(null);
	const popapFilterRef = useRef(null);
	const popapMobileFilterRef = useRef(null);
	const popapMobileShoppingRef = useRef(null);

	return (
		<div className="wrapper">
			<Main
				food={allFood}
				sushi={sushi}
				pizzes={pizzes}
				snacks={snacks}
				drinks={drinks}
				combo={combo}
				desserts={desserts}
				sauce={sauce}
				navigation={navigation}
			/>
			    	<CSSTransition
						in={popapPizza}
						nodeRef={popapPizzaRef}
						timeout={60}
						classNames='edit'
						unmountOnExit
					>
						<PopapEditFood popapPizzaRef={popapPizzaRef}/>
					</CSSTransition>

			    	<CSSTransition
						in={popapPizzaMobile}
						nodeRef={popapPizzaMobileRef}
						timeout={200}
						classNames='edit-mobile'
						unmountOnExit
					>
						<PopapMobileEditFood popapPizzaMobileRef={popapPizzaMobileRef}/>
					</CSSTransition>

					<CSSTransition
						in={popapShopping}
						nodeRef={popapShopRef}
						timeout={200}
						classNames='shop'
						unmountOnExit
					> 
						<PopapShopping popapShopRef={popapShopRef} /> 
					</CSSTransition>

					<CSSTransition
						in={popapMobileShopping}
						nodeRef={popapMobileShoppingRef}
						timeout={200}
						classNames='shop_mobile'
						unmountOnExit
					>  
						<PopapMobileShopping popapMobileShopRef={popapMobileShoppingRef}/>
					</CSSTransition>

					<CSSTransition
						in={popapFilter}
						nodeRef={popapFilterRef}
						timeout={200}
						classNames='filter'
						unmountOnExit
					> 
						<PopapFilter popapFilterRef={popapFilterRef} /> 
					</CSSTransition>

					<CSSTransition
						in={popapMobileFilter}
						nodeRef={popapMobileFilterRef}
						timeout={200}
						classNames='mobile_filter'
						unmountOnExit
					> 
						<PopapMobileFilter popapMobileFilterRef={popapMobileFilterRef}/>	
					</CSSTransition>
					
		</div>
  	);
}