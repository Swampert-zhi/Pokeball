import {getRequest,postRequest,deleteRequest} from "./Ajax";
import {AsyncStorage} from "react-native"
import {apiUrl} from '../urlconfig';

export const login=(value,callback)=>{
    const url = apiUrl+"/login";
    postRequest(url,value,callback);
}

export const getuser=(callback)=>{

    const url = apiUrl+"/getuser/"+sessionStorage.getItem("userId");
    getRequest(url, callback);
}
