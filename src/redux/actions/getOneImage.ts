import { Dispatch } from 'redux'
import axios from 'axios';

export const getOneImage = (user_name:string, image_id:string) => async (dispatch:Dispatch) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/user-names/${user_name}`) 
        if(response.statusText === "OK"){
            dispatch({
                type:"GET_ONE_IMAGE",
                payload:{
                    image: response.data.user.imageList.find((item:any)=>item._id === image_id),
                }
            })   
        }
    } catch (error) {
        console.log(error);
          
}}

export default getOneImage