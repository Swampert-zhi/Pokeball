import {getRequest,postRequest,postRequest2,deleteRequest} from "./Ajax";
import {apiUrl} from '../urlconfig';

export const getCart = (id,callback) => {
    const url = apiUrl+`/getcart/${id}`;
    getRequest(url,callback);
}

export const postCart = (data) => {
    const url=apiUrl+"/postcart";
    const callback=(data)=>{};
    postRequest(url,data,callback);
}

export const deleteCart = (cartId) => {
    const url=apiUrl+`/deletecart/${cartId}`;
    deleteRequest(url);
}

export const addCart = (data,callback) => {
    const url=apiUrl+"/addcart";
    postRequest(url,data,callback);
}

export const addOrder = (data,callback) => {
    const url = apiUrl+"/addorder";
    postRequest2(url,data,callback);
}
