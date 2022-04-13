import { Dispatch } from 'redux'
import axios from 'axios';

const getImages = () => async (dispatch:Dispatch) => {
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/ima`)         
        dispatch({
            type:"GET_IMAGES",
            payload:{
                images: data.images,
        }
    })   
    } catch (error) {
        console.log(error);
        
        dispatch({
            type:"SEND_ERROR",
            payload:{
                message: error,
        }
    }) 
          
}}

export default getImages