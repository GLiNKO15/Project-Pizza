import { configureStore } from '@reduxjs/toolkit'
import AppReducer from './AppSlice.js';

export default configureStore({
  reducer: {
	  app:AppReducer,
  },
})