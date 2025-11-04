import axios from "axios"


export const fetchCharacters=async(url)=>{
    const response=await axios.get(url);
    return response.data
}

export const fetchHomeworld=async(url)=>{
    const response=await axios.get(url);
    return response.data
}