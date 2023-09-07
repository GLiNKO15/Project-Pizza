
import React, {useRef, useState, useEffect} from 'react';
import { Link, Outlet, useLocation, Route, Routes } from 'react-router-dom';
import s from '../styles/mobile.module.css';

import cheeseIco from '../img/ico/ingredients/cheese.svg';
import mushroomsIco from '../img/ico/ingredients/mushrooms.svg';
import onionIco from '../img/ico/ingredients/onion.svg';
import pepperIco from '../img/ico/ingredients/pepper.svg';
import sausageIco from '../img/ico/ingredients/sausage.svg';
import sauseIco from '../img/ico/ingredients/sause.svg';
import done from '../img/ico/Done.svg';
import fire from '../img/ico/Fire.svg';
// =============================================================
// =============================================================
// =============================================================

import { useSelector, useDispatch } from 'react-redux'
import { toggleElement, pushListShopping, showMessage, hideMessage , setPricePizzaFinal } from '../store/AppSlice';
import { CSSTransition } from 'react-transition-group';

export default function MobileEditPizza({popapPizzaMobileRef}){
	const dispatch = useDispatch();
	const popapPizza = useSelector((state) => state.app.handlePopapMobileEditPizza);
	const pizzaData = useSelector((state) => state.app.popapPizzaData);

	let [activeBtnWidth1, setBtnWidth1] = useState(true);
	let [activeBtnWidth2, setBtnWidth2] = useState(false);
	let [activeBtnWidth3, setBtnWidth3] = useState(false);

	let [activeBtnWeidth1, setBtnWeidth1] = useState(true);
	let [activeBtnWeidth2, setBtnWeidth2] = useState(false);

	const activeBtnBgWidth = useRef();
	const activeBtnBgWeidth = useRef();

	let finalPizzaSize = useRef(20);
	let finalPizzaWeidth = useRef('Традиционное');
	const handleBtnWidth = (btn)=> {
		setBtnWidth1(false);
		setBtnWidth2(false);
		setBtnWidth3(false);
		
		if(btn == 1){
			finalPizzaSize.current = 20;
			setBtnWidth1(true);
			activeBtnBgWidth.current.style.left = '0px';
			
		}
		if(btn == 2){
			finalPizzaSize.current = 28;
			setBtnWidth2(true);
			activeBtnBgWidth.current.style.left = '33%';
			
		} 
		if(btn == 3){
			finalPizzaSize.current = 33;
			setBtnWidth3(true);
			activeBtnBgWidth.current.style.left = '66.666666%';
			
		} 
	}
	const handleBtnWeidth = (btn)=> {
		setBtnWeidth1(false);
		setBtnWeidth2(false);
		
		if(btn == 1){
			setBtnWeidth1(true);
			activeBtnBgWeidth.current.style.left = '0px';
			finalPizzaWeidth.current = 'Традиционное';
		}
		if(btn == 2){
			setBtnWeidth2(true);
			activeBtnBgWeidth.current.style.left = '50%';
			finalPizzaWeidth.current = 'Тонкое';
		} 
	}

	const [ingredientsActive, setIngredientsActive] = useState([false, false, false, false, false, false]);

	const [ingredients, setIngredients] = 
	useState([{name:'Моцарелла', price:59},
			{name:'Пепперони', price:59},
			{name:'Томатный соус', price:59},
			{name:'Шампиньоны', price:59},
			{name:'Красный лук', price:59},
			{name:'Сладкий перец', price:59}]);	

	let [listIngredientsOut, setListIngredientsOut] = useState([]);	
	let listIngredients = '';
	
	const minPrice = useRef(pizzaData.price);
	let maxPrice = minPrice.current;
	let priceIngredients = 0;

	for (let i = 0; i < ingredients.length; i++) {
		maxPrice = maxPrice + ingredients[i].price;
	}

	let pricePizza = useSelector((state) => state.app.popapPizzaData.price);
	
	const selectIngredient = (id) =>{

		let newIngredients = ingredientsActive.slice();
		newIngredients.splice(id, 1, !ingredientsActive[id]);

		setIngredientsActive(newIngredients);

		
		for (let i = 0; i < newIngredients.length; i++) {
			if(newIngredients[i]){
				
				if(listIngredients == '') listIngredients = ingredients[i].name;
				else listIngredients = listIngredients + ', ' + ingredients[i].name;

				priceIngredients = priceIngredients + ingredients[i].price;
				setListIngredientsOut(listIngredients);
				dispatch(setPricePizzaFinal(minPrice.current + priceIngredients));
			}
			else{
				if(newIngredients[i] == false && ingredientsActive[i] == true){
					priceIngredients = priceIngredients - ingredients[i].price;
					priceIngredients = priceIngredients + ingredients[i].price;
				} 
				dispatch(setPricePizzaFinal(minPrice.current + priceIngredients));
				setListIngredientsOut(listIngredients);
			}
		}	
	}
	const addPizza = () =>{
		console.log(finalPizzaSize);
		console.log(finalPizzaWeidth);
		dispatch(pushListShopping({urlImg:pizzaData.urlImg, name:pizzaData.name, size:finalPizzaSize.current, weidth:finalPizzaWeidth.current, price:pizzaData.price, type:'pizza'}));
		dispatch(showMessage());
		setTimeout(()=>{
			dispatch(hideMessage())
		}, 2000);
		
		
		dispatch(toggleElement('handlePopapMobileEditPizza'));
		ingredientsActive.current = ([false, false, false, false, false, false]);
		setBtnWidth1(true);
		setBtnWidth2(false);
		setBtnWidth3(false);
		
		setBtnWeidth1(true);
		setBtnWeidth2(false);
		console.log(popapPizza);
	}	
	let [descriptionIndicator, setDescriptionIndicator] = useState(false);
	let descriptionRef = useRef(null);

	return (
			<div onClick={(e)=>{
				console.log(e.target.className);
				if(e.target.className == 'mobile_popap__edit__pXwPS'){
					console.log(e.target.className);
					dispatch(toggleElement('handlePopapMobileEditPizza'));
				}}} className={s.popap__edit}>
				<div onClick={(e)=>{
					if(descriptionIndicator){
						setDescriptionIndicator(false);
					}}} ref={popapPizzaMobileRef} className={s.container__popap_edit}>
					<div className={s.popap_edit_top}>
						<div className={s.popap__edit_img}>
							<img src={pizzaData.urlImg}/>
						</div>
						<CSSTransition
							in={descriptionIndicator}
							nodeRef={descriptionRef}
							timeout={200}
							classNames='popap__mobile_pizza_description'
							unmountOnExit
						>
							<p ref={descriptionRef} className={s.popap__edit_description}>
								{pizzaData.description}, {listIngredientsOut} 
							</p>
						</CSSTransition>
						<div className={s.popap__edit_info}>
							<button onClick={()=>setDescriptionIndicator(!descriptionIndicator)} className={s.popap__info_ico}>
								<svg fill="#FF7010" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 23l-1-0v-8.938c0-0.011-0.003-0.021-0.003-0.031s0.003-0.020 0.003-0.031c0-0.552-0.448-1-1-1h-2c-0.552 0-1 0.448-1 1s0.448 1 1 1h1v8h-1c-0.552 0-1 0.448-1 1s0.448 1 1 1h4c0.552 0 1-0.448 1-1s-0.448-1-1-1zM16 11c1.105 0 2-0.896 2-2s-0.895-2-2-2-2 0.896-2 2 0.896 2 2 2zM16-0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.031c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032z"></path> </g></svg>
							</button>
						</div>
					</div>
					<div className={s.popap__edit_rest}>
						<div className={s.popap__edit_name}>
							{pizzaData.isHit && (<img src={fire} />)}
							{pizzaData.isNew && (<img src={fire} />)}
							<h2 className={s.popap__edit_title}>{pizzaData.name}</h2>
						</div>
						<div className={s.popap__edit_sizes}>
							<div className={s.popap__edit_thickness}>
								<div ref={activeBtnBgWeidth} className={s.popap__thickness_bg}></div>
								<button onClick={()=>handleBtnWeidth(1)} className={activeBtnWeidth1 ? s.popap__thickness_btn_active : s.popap__thickness_btn}>Традиционное</button>
								<button onClick={()=>handleBtnWeidth(2)} className={activeBtnWeidth2 ? s.popap__thickness_btn_active : s.popap__thickness_btn}>Тонкое</button>
							</div>
							<div className={s.popap__edit_width}>
								<div ref={activeBtnBgWidth} className={s.popap__width_bg}></div>
								<button onClick={()=>{handleBtnWidth(1)}} className={activeBtnWidth1 ? s.popap__width_btn_active : s.popap__width_btn}>20 см</button>
								<button onClick={()=>{handleBtnWidth(2)}} className={activeBtnWidth2 ? s.popap__width_btn_active : s.popap__width_btn}>28 см</button>
								<button onClick={()=>{handleBtnWidth(3)}} className={activeBtnWidth3 ? s.popap__width_btn_active : s.popap__width_btn}>33 см</button>
							</div>
						</div>
						<div className={s.popap__edit_ingredients}>
							<div className={s.popap__ingredients_title}>Добавьте в пиццу</div>
							<div className={s.popap__ingredients}>
								<div className={s.popap__ingredient}>
									<div onClick={()=>{selectIngredient(0)}} className={ ingredientsActive[0] ? s.popap__ingredient_img_active : s.popap__ingredient_img}>
										<img src={cheeseIco} className={s.popap__ingredient_img_big}/>
										{ingredientsActive[0] && <img src={done} className={s.popap__ingredient_img_done}/>}
									</div>
									<span className={s.popap__ingredient_name}>Моцарелла</span>
									<span className={s.popap__ingredient_price}>59 ₽</span>	
								</div>
								<div className={s.popap__ingredient}>
									<div onClick={()=>{selectIngredient(1)}} className={ ingredientsActive[1] ? s.popap__ingredient_img_active : s.popap__ingredient_img}>
										<img src={sausageIco} className={s.popap__ingredient_img_big}/>
										{ingredientsActive[1] && <img src={done} className={s.popap__ingredient_img_done}/>}
									</div>
									<span className={s.popap__ingredient_name}>Пепперони</span>
									<span className={s.popap__ingredient_price}>59 ₽</span>	
								</div>
								<div className={s.popap__ingredient}>
									<div onClick={()=>{selectIngredient(2)}} className={ ingredientsActive[2] ? s.popap__ingredient_img_active : s.popap__ingredient_img}>
										<img src={sauseIco} className={s.popap__ingredient_img_big}/>
										{ingredientsActive[2] && <img src={done} className={s.popap__ingredient_img_done}/>}
									</div>
									<span className={s.popap__ingredient_name}>Томатный соус</span>
									<span className={s.popap__ingredient_price}>59 ₽</span>	
								</div>
								<div className={s.popap__ingredient}>
									<div onClick={()=>{selectIngredient(3)}} className={ ingredientsActive[3] ? s.popap__ingredient_img_active : s.popap__ingredient_img}>
										<img src={mushroomsIco} className={s.popap__ingredient_img_big}/>
										{ingredientsActive[3] && <img src={done} className={s.popap__ingredient_img_done}/>}
									</div>
									<span className={s.popap__ingredient_name}>Шампиньоны</span>
									<span className={s.popap__ingredient_price}>59 ₽</span>	
								</div>
								<div className={s.popap__ingredient}>
									<div onClick={()=>{selectIngredient(4)}} className={ ingredientsActive[4] ? s.popap__ingredient_img_active : s.popap__ingredient_img}>
										<img src={onionIco} className={s.popap__ingredient_img_big}/>
										{ingredientsActive[4] && <img src={done} className={s.popap__ingredient_img_done}/>}
									</div>
									<span className={s.popap__ingredient_name}>Красный лук</span>
									<span className={s.popap__ingredient_price}>59 ₽</span>
								</div>
								<div className={s.popap__ingredient}>
										<div onClick={()=>{selectIngredient(5)}}  className={ ingredientsActive[5] ? s.popap__ingredient_img_active : s.popap__ingredient_img}>
											<img src={pepperIco} className={s.popap__ingredient_img_big}/>
											{ingredientsActive[5] && <img src={done} className={s.popap__ingredient_img_done}/>}
										</div>
									<span className={s.popap__ingredient_name}>Сладкий перец</span>
									<span className={s.popap__ingredient_price}>59 ₽</span>
								</div>
							</div>
						</div>
					</div>
					<div className={s.popap__edit_total}>
						<div className={s.popap__edit_price}>
							<h2 className={s.popap__edit_price_text}>Итого: {pricePizza} ₽</h2>
							<span className={s.popap__edit_weight}>400г</span>
						</div>
						<button onClick={addPizza} className={s.popap__edit_add}>В корзину</button>
					</div>
				</div>
			</div>
  	);
}