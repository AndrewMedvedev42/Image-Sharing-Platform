export interface ImageProps {
    author: {
        userId:string,
        firstName:String,
        lastName:String,
        userName:String
    },
    image:string,
    description:String,
    dateOfCreation:String,
    title:String,
    _id:String
  }

export interface RootState {
    imageList:ImageProps[],
    image:ImageProps
    errorMessage:{
        status:number
    }
}