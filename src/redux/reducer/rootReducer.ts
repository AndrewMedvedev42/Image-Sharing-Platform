const State = {
    imageList:[],
    image:{},
    errorMessage:null
}

export const rootReducer = (state=State, action:any) => {
    switch (action.type){
        case "GET_IMAGES":            
            return {...state, imageList:action.payload.images}
        case "GET_ONE_IMAGE":            
            return {...state, image:action.payload.image}
        case "SEND_ERROR":            
            return {...state, errorMessage:action.payload.message}
        default:
            return {...state}
    }
}