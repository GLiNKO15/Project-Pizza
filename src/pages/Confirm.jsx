import React, { useRef, useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Route, Routes } from 'react-router-dom';

import ExtraFood from '../components/confirmComponents/ExtraFood';
import DatePick from '../components/confirmComponents/DatePicker';
import s from '../styles/confirm.module.css';
import '../style.css';
import { useSelector, useDispatch } from 'react-redux';

import {shopCounterMinus, shopCounterPlus, setDelivery, defaultDeliveryDay} from '../store/AppSlice';

import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import "react-phone-number-input/style.css";

import icoPlus from '../img/ico/Plus.svg';
import icoMinus from '../img/ico/Minus.svg';
import icoPlane from '../img/ico/Plane.svg';

import Select from 'react-select'

export default function Confirm() {
	const listShopping = useSelector((state) => state.app.listShopping);
	const finalPrice = useSelector((state) => state.app.finalPrice);
	const food = useSelector((state) => state.app.responseFood);
	const dispatch = useDispatch();
	
	let [deliveryHadle, setDeliveryHadle] = useState(false);
	
	const delivery = useSelector((state) => state.app.delivery);
	const deliveryDay = useSelector((state) => state.app.deliveryDay);
	let [deliveryTime, setDeliveryTime] = useState('Скорее');


	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		setValue
	} = useForm({ 
	defaultValues: {
		comment:'',
		delivery,
		deliveryDay,
		deliveryTime,
		restaurant:'',
		deliveryExactTime:'10:00',
		overMoney:'Сдача',
		deliveryAdress:{
			street:'',
		},
		personal:{
			name:'',
			email:'',
			phoneNumber:'',
		}
	},
	mode:'onBlur'});

	const onSubmit = (data) =>{
		console.log(data);
	} 

	const handleValidate = (value) => {
		const isValid = isValidPhoneNumber(value);
		return isValid
	}

	useEffect(()=>{
		dispatch(defaultDeliveryDay());
	},[])

	const restaurantsOptions = [
		{
			label:'Москва, ул. Юных Ленинцев, д.99',
			value:'Москва, ул. Юных Ленинцев, д.99'
		},
		{
			label:'Воронеж, ул. Кирова, д.20',
			value:'Воронеж, ул. Кирова, д.20'
		},
		{
			label:'Львов, ул. Шевченко, д.44',
			value:'Львов, ул. Шевченко, д.44'
		},
	];
	console.log(listShopping);

	return (
		<div className={s.confirm}>
			<div className={s.confirm__order}>
				<h1 className={s.order__title}>Ваш заказ</h1>
				<ul className={s.order__list}>
					{listShopping.length ?
						listShopping.map((item, index)=>(
							<li key={item.key} className={s.order__product} >
								<div className={s.order__product_img}>
									<img src={item.urlImg} alt=""/>
								</div>
								<div className={s.order__more}>
									<div className={s.order__product_text}>
										<h2 className={s.order__product_name}>{item.name}</h2>
										{
											item.type == 'pizza'&&
											<h4 className={s.order__product_subtitle}>{item.weidth}, {item.size} см</h4>
										}
									</div>
									<div className={s.order__product_right}>
										<div className={s.order__counter}>
											<button onClick={()=>{
												dispatch(shopCounterMinus(index))
											}} className={s.order__counter_minus}><img src={icoMinus} alt=""/></button>
											<span className={s.order__counter_n}>{item.quantity}</span>
											<button onClick={()=>{
													dispatch(shopCounterPlus(index))
											}} className={s.order__counter_plus}><img src={icoPlus} alt=""/></button>
										</div>
										<div className={s.order__price}>{item.price} ₽</div>
									</div>
								</div>
							</li>
						))
					:
						<div className={s.order__error}>
							Корзина пуста
							<div className={s.order__subtitle}>Выберите продукты по <Link to={'/main'}>ссылке</Link></div>
						</div>
					}
				</ul>
				<div className={s.order__promocode_price}>
					<div className={s.order__promocode_btn}>
						<input placeholder='Промокод' className={s.order__input}></input>
						<button className={s.order__btn_promo}>
							<img src={icoPlane} />
						</button>
					</div>
					<div className={s.order__final_price}>
						Итого: {finalPrice} ₽
					</div>
				</div>
			</div>
			{food &&
				<>
					<ExtraFood food={food[2]} name={'Добавить к заказу?'}/>
					<ExtraFood food={food[6]} name={'Соусы'}/>
				</>
			}
			<form  onSubmit={handleSubmit(onSubmit)} className={s.form}>
				<div className={s.form_block}>
					<h3 className={s.form_block_title}>О вас</h3>
					<div className={s.form_about_user}>
						<div className={errors?.personal?.name?.type == "required" ? s.form_user_block_erorr : s.form_user_block }>
							<input placeholder='Имя' 
							{...register("personal.name",
							{ required: 'Заполните поле',
							minLength :{
								value:3,
								message:"Не менее 3 символов"
							},
							maxLength :{
								value:15,
								message:"Не более 15 символов"
							}, })}
							/>
							<div >
								{errors?.personal?.name && 
									<p className={s.error__message}>
										{errors?.personal?.name?.type != "required" && errors.personal.name.message}
									</p>
								}
							</div>
						</div>
						<div className={errors?.personal?.phoneNumber?.type == "required" ? s.form_user_block_erorr : s.form_user_block }>
							<Controller
								name="personal.phoneNumber"
								control={control}
								rules={{
									required: 'Заполните поле',
									maxLength: {
										value:12,
										message:'Номер не действителен'
									},
									validate: (value) => handleValidate(value)
								}}
								render={({ field: { onBlur, onChange, value } }) => (
									<PhoneInput
										placeholder='Телефон'
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										id="phoneNumber"
									/>
								)}
							/>
							{errors?.personal?.phoneNumber && 
								<p className={s.error__message}>
									{errors?.personal?.phoneNumber?.type != "required" && errors.personal.phoneNumber.message}
								</p>
							}
							
						</div>
						<div className={errors?.personal?.email?.type == "required" ?
						 				s.form_user_block_erorr 
										: s.form_user_block } >
							<input placeholder='Почта' type="email"
								{...register("personal.email",
								{ 	
									required: 'Заполните поле',

									validate: {
										maxLength: (v) => v.length <= 50 || "Не более 50 символов",
										pattern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Почта не действительна",
									}
								})} 
							/>
							{errors?.personal?.email && 
								<p className={s.error__message}>
									{errors?.personal?.email?.type != "required" && errors.personal.email.message}
								</p>
							}
						</div>
					</div>
				</div>
				<div className={s.form_block}>
					<div className={s.form_delivery_top}>
						<h3 className={s.form_block_title}>Доставка</h3>
						<div className={s.form_delivery_block}>
							<div className={deliveryHadle ? s.form_delivery_bg_right : s.form_delivery_bg}></div>

								<label className={deliveryHadle ? s.form_delivery_btn : s.form_delivery_btn_active}>
									<input type='radio' {...register("delivery")}
										value = 'Доставка'
										onClick={()=>{
											setDeliveryHadle(false);
											dispatch(setDelivery('Доставка'))
										}}
										style={{display:'none'}}
									/>
									Доставка
								</label>	

								<label className={deliveryHadle ? s.form_delivery_btn_active : s.form_delivery_btn}>
									<input type='radio' {...register("delivery")}
										value = 'Самовывоз'
										onClick={()=>{
											setDeliveryHadle(true)
											setValue("deliveryTime", null)
											dispatch(setDelivery('Самовывоз'))
										}}
										style={{display:'none'}}
									/>
									Самовывоз
								</label>	
						</div>
					</div>
					{	delivery =='Доставка' ?
						<div className={s.form__delivery_address}>
							<div className={s.form__delivery_street}>
								<h4>Улица</h4>
								<input className={errors?.deliveryAdress?.street?.type == "required" ?
						 				s.form__delivery_street_error 
										: s.form__delivery_street_input }
									placeholder='Пушкина'
								{
									...register("deliveryAdress.street",
									{
										required:`${!deliveryHadle && 'Заполните поле'}`,
										
										minLength:{
											value:3,
											message:'Не короче 3 символов'
										}
									})
								}
								type="text" />
								<div>
									{errors?.deliveryAdress?.street && 
										<p className={s.error__message}>
											{errors?.deliveryAdress?.street?.type != "required" && errors.deliveryAdress.street.message}
										</p>
									}
								</div>
							</div>

							<div className={errors?.deliveryAdress?.house?.type == "required" ?
						 				s.form__delivery_house_error 
										: s.form__delivery_house }>
									<h4>Дом</h4>
									<input type="text" placeholder={'11А'}
										{...register('deliveryAdress.house',{
											required:'Заполните поле',
									})}/>
							</div>
							<div className={s.delivery_house_input}>
									<h4>Подъезд</h4>

									<input type="number" placeholder={'1'}
										{...register('deliveryAdress.entrance')} />
							</div>
							<div className={s.delivery_house_input}>
									<h4>Этаж</h4>

									<input type="number" placeholder={'2'}
										{...register('deliveryAdress.floor')} />
							</div>
							<div className={s.delivery_house_input}>
									<h4>Квартира</h4>

									<input type="number" placeholder={'3'}
										{...register('deliveryAdress.apartment')} />
							</div>
							<div className={s.delivery_house_input}>
									<h4>Домофон</h4>

									<input type="number" placeholder={'0000'} 
									
									{...register('deliveryAdress.intercom',{
										onChange:(e)=>{
											let string = e.target.value.split(0, 4)
											string = string.join('');
											string = string.slice(0, 4);
											if (e.target.value.length > 4) {
												e.target.value = string;
											}
										}
									})} />
							</div>
						</div>
						:
						<div>
							<Controller
								name="restaurant"
								control={control}
								render={({ field }) => (
									<Select
									isSearchable={false}
									placeholder='Выберите ресторан'
									classNamePrefix={'custom_select'}
										required='Заполните поле'
										{...field}
										options={restaurantsOptions}
									/>
								)}
							/>

							{errors?.restaurant && <p className={s.error__message}>{errors.restaurant.message}</p>}
						</div>
					}
					<div className={s.form_delivery_more}>
						<h4>Когда выполнить заказ?</h4>
						<div className={s.form_delivery_list}>
							<div className={s.form_delivery_radio}>
								<div onClick={()=>setDeliveryTime('Скорее')} className={s.form_delivery_radio_block}>
									<input id='faster' {...register("deliveryTime")} value={deliveryHadle ? '' : 'Скорее'} type="radio"/>
									<label htmlFor='faster' className={s.form_delivery_radio_block}>Как можно скорее</label>
								</div>
								<div onClick={()=>setDeliveryTime('По времени')} className={s.form_delivery_radio_block}>
									<input id='longer' {...register("deliveryTime")} value={deliveryHadle ? '' : 'По времени'} type="radio" />
									<label htmlFor='longer' className={s.form_delivery_radio_block}>По времени</label>
								</div>
							</div>
							
							{deliveryTime == "По времени" &&
								<div className={s.form_delivery_info}>
									<div className={s.form_delivery_date}>
										<DatePick/>

									</div>
									<div className={s.form_delivery_time}>
										<input 
										
										{...register("deliveryExactTime",
										{min: {
											value:"9:00",
											message:"Не раньше 9:00"
										},
										max: {
											value:"18:00",
											message:"Не позднее 18:00"
										},
										required:'Выберите время',
											}
										)} type="time"  name="deliveryExactTime" id=""
										disabled={deliveryTime == 'По времени' ? false : true} />
									</div>
									<div >
										{errors?.deliveryExactTime && <p className={s.error__message}>{errors?.deliveryExactTime?.message}</p>}
									</div>
								</div>
							}
						</div>
					</div>
				</div>
				<div className={s.form_block}>
					<h3 className={s.form_block_title}>Оплата</h3>
					<div className={s.form_pay_radio}>
						<label className={s.form_pay_block}>
							<input {...register('pay' , {required: 'Заполните поле',})} value='Наличными' type="radio" name='pay' />
							Наличными
						</label>
						<label className={s.form_pay_block}>
							<input {...register('pay')} value='Картой' type="radio" name='pay' />
							Картой
						</label>
						<label className={s.form_pay_block}>
							<input {...register('pay')} value='ApplePay' type="radio" name='pay' />
							ApplePay
						</label>
						<div >
							{errors?.pay && <p className={s.error__message}>{errors?.pay?.message}</p>}
						</div>					
					</div>
				</div>
				<div className={s.form_block}>
					<h3 className={s.form_block_title}>Сдача</h3>
					<div className={s.form_pay_radio}>
						<label  className={s.form_pay_block}>
							<input {...register('overMoney')} value='Сдача' type="radio" name='overMoney' />
							Сдача
						</label>
						<label className={s.form_pay_block}>
							<input {...register('overMoney')} value='Без cдачи' type="radio" name='overMoney' />
							Без cдачи
						</label>
					</div>
				</div>
				<div className={s.form_block}>
					<h3 className={s.form_block_title}>Комментарий</h3>
					<textarea
					{...register('comment')}
					placeholder='Есть уточнения?' className={s.form_comment}>
					</textarea>
				</div>
				<div className={s.final_result}>
					<div className={s.final_price}>Итого: {finalPrice} ₽</div>
					<input onClick={()=>{
						if(delivery == 'Доставка'){
							setValue("deliveryDay", deliveryDay)
						}else{
							setValue("deliveryDay", null);
							setValue("deliveryExactTime", null);

						}}}
					type="submit" value='Оформить заказ' className={s.final_checkout}/>
				</div>
			</form>
		</div>
	);
}