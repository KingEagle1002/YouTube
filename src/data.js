 export const API_KEY = 'AIzaSyCaS1Tp7r24DXzjJZ4fIsYugJbtR8fhL9c'

export const value_converter = (value) =>{
    if(value >= 1000000){
        return Math.floor(value/1000000) + 'M'
    }
    else if(value >= 1000){
        return Math.floor(value/1000) + 'K'
    }
    else{
        return value;
    }
}