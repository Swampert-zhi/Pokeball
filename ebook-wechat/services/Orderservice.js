import {getRequest,postRequest,postRequest2,deleteRequest} from "./Ajax";

export const getCart = (id,callback) => {
    const url = "http://localhost:8080/getcart/"+id;
    getRequest(url,callback);
}

export const postCart = (data) => {
    const url="http://localhost:8080/postcart";
    const callback=(data)=>{};
    postRequest(url,data,callback);
}

export const deleteCart = (cartId) => {
    const url=`http://localhost:8080/deletecart/${cartId}`;
    deleteRequest(url);
}

export const addCart = (data,callback) => {
    const url="http://localhost:8080/addcart"
    postRequest(url,data,callback);
}

export const addOrder = (data,callback) => {
    const url = "http://localhost:8080/addorder";
    postRequest2(url,data,callback);
}