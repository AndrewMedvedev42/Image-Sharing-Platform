const State = {
    imageList:[],
    errorMessage:{}
}

export const rootReducer = (state=State, action:any) => {
    switch (action.type){
        case "GET_IMAGES":            
            return {...state, imageList:action.payload.images}
        case "SEND_ERROR":            
            return {...state, errorMessage:action.payload.message}
        default:
            return {...state}
    }
}