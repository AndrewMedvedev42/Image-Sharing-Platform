const State = {
    currentWeather:[],
    weatherForecast:[],
    countryDetails:[],
    isLoading:true,
    isFailedToFetchData:false
}

export const rootReducer = (state=State, action:any) => {
    switch (action.type){
        //SETS THE WEATHER DATA TO STATE
        case "FETCH_WEATHER":
            return {...state, currentWeather:action.payload.current,
                                weatherForecast:action.payload.forecast,
                                    isFailedToFetchData:false,
                                    isLoading:false}
        //SETS LOADING SIDEEFFECT
        case "IS_LOADING":
            return {...state, isLoading:true}

        //SETS STATE FOR ERROR STATUS IF FAILED TO GET WEATHER DATA
        case "FAILED_TO_FETCH_DATA":
            return {...state, 
                isFailedToFetchData:true,
                    isLoading:false}
        default:
            return {...state}
    }
}