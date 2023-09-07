import { createSlice } from '@reduxjs/toolkit'
import { useRef } from 'react';

export const AppSlice = createSlice({
  name: 'pizzeria',

  initialState: {
    handlePopapPizza:false,
    handlePopapShopping:false,
    handlePopapFilter:false,
    handlePopapMobileFilter:false,
    handlePopapMobileEditPizza:false,
    handlePopapMobileShopping:false,
    popapPizzaData:{
      name:'',
      urlImg:'',
      price:'',
      description:'',
    },
    listShopping:[],
    shoppingMessage: null,
    finalPrice:0,
    pizzaFilters:[],
    pizzaFiltersActiveBtn:{
     'Хит':false, 
     'Новинка':false, 
     'Шампиньоны':false, 
     'Без лука':false, 
     'Без мяса':false, 
     'Пепперони':false, 
     'Говядина':false, 
     'Цыаленок':false, 
     'Бекон':false, 
     'Ветчина':false, 
     'Кубики брынзы':false, 
     'Моцарелла':false, 
     'Пармезан':false, 
     'Чеддер':false, 
     'Томаты':false, 
     'Лук':false, 
     'Ананасы':false, 
    } 
  },
  reducers: {
    toggleElement:(state, actions)=>{
      state[actions.payload] = !state[actions.payload]; 
    },

    fullPopapPizzaData:(state, actions) => {
      state.popapPizzaData = {
        name:actions.payload.name,
        urlImg:actions.payload.urlImg,
        price:actions.payload.price,
        description:actions.payload.description,
        isHit:actions.payload.isHit,
        isNew:actions.payload.isNew
      }
    },
    pushListShopping:(state, actions) => {
      state.listShopping.push(
        {
          id:state.listShopping.length+1,
          urlImg:actions.payload.urlImg,
          name:actions.payload.name,
          size:actions.payload.size,
          weidth:actions.payload.weidth,
          price:actions.payload.price,
          type:actions.payload.type,
          quantity:1,
        });
    },
    setMassage:(state)=>{

    },
    showMessage:(state)=>{
      state.shoppingMessage = true;
    },
    hideMessage:(state)=>{
      state.shoppingMessage = false;
    },
    shopCounterPlus:(state, actions)=>{
      if(state.listShopping[actions.payload].quantity < 9) state.listShopping[actions.payload].quantity = state.listShopping[actions.payload].quantity +1;
    },
    shopCounterMinus:(state, actions)=>{
      if(state.listShopping[actions.payload].quantity > 1){
        state.listShopping[actions.payload].quantity = state.listShopping[actions.payload].quantity - 1;
      } else{
        state.listShopping.splice(actions.payload, 1);
      }
    },
    setFinalPrice:(state, actions)=>{
      state.finalPrice = actions.payload;
    },
    setPricePizzaFinal:(state, actions)=>{
      state.popapPizzaData.price = actions.payload;
    },
    setPizzaFilters:(state, actions)=>{
      state.pizzaFilters = actions.payload;
    },
    setpizzaFiltersActiveBtn:(state, actions)=>{
      console.log(actions.payload);
      console.log(state.pizzaFiltersActiveBtn[`${actions.payload}`]);

      state.pizzaFiltersActiveBtn[`${actions.payload}`] = !state.pizzaFiltersActiveBtn[`${actions.payload}`];
    },
    clearPizzaFiltersActiveBtn:(state)=>{
      for (const key in state.pizzaFiltersActiveBtn) {
        state.pizzaFiltersActiveBtn[key] = false;
      }
    }
    },
})

// Action creators are generated for each case reducer function
export const {
              fullPopapPizzaData, pushListShopping,
              hideMessage, shopCounterMinus,
              shopCounterPlus, setFinalPrice, setPricePizzaFinal,
              setPizzaFilters, showMessage,
              setpizzaFiltersActiveBtn, clearPizzaFiltersActiveBtn,
              toggleElement} = AppSlice.actions;

export default AppSlice.reducer