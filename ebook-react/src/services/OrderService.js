import {getRequest,postRequest,postRequest2} from "./Ajax";

export const addOrder = (data,callback) => {
    const url = "http://localhost:8080/addorder";
    postRequest2(url,data,callback);
}

export const getAllOrders = (callback) => {
    const url = 'http://localhost:8080/getallorders';
    getRequest(url,callback);
}

export const getOrdersById = (id,callback) => {
    const url = `http://localhost:8080/getordersbyid/${id}`;
    getRequest(url,callback);
}

export const getBestSellers = (value,callback) => {
    const url = `http://localhost:8080/getbestsellers`;
    postRequest(url,value,callback);
}

export const getRichestUsers = (value,callback) => {
    const url = `http://localhost:8080/getrichestusers`;
    postRequest(url,value,callback);
}

export const getMyStats = (value,callback) => {
    console.log(value);
    const url = `http://localhost:8080/getmystats`;
    postRequest(url,value,callback);
}
