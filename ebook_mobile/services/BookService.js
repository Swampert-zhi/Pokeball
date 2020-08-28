import {getRequest,postRequest,deleteRequest} from "./Ajax";
import {apiUrl} from '../urlconfig';

export const getBooks = (callback) => {
    const url = apiUrl+'/getbook';
    getRequest(url,callback);
};

export const getBookById = (id,callback) => {
    const url = apiUrl+`/getbookbyid/${id}`;
    getRequest(url,callback);
};

export const postBook = (object , callback) => {
    const url = apiUrl+"/postbook";
    postRequest(url,object,callback);
}

export const deleteBook = (id) =>{
    const url = apiUrl+`/deletebook/${id}`;
    deleteRequest(url);
}

export const addBook = (object, callback) => {
    const url = apiUrl+"/addbook";
    postRequest(url,object,callback);
}
