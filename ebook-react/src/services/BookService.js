import {getRequest,postRequest,deleteRequest} from "./Ajax";

export const getBooks = (callback) => {
    const url = "http://localhost:8080/getbook";
    getRequest(url,callback);
};

export const getBookById = (id,callback) => {
    const url = `http://localhost:8080/getbookbyid/${id}`;
    getRequest(url,callback);
};

export const postBook = (object , callback) => {
    const url = "http://localhost:8080/postbook";
    postRequest(url,object,callback);
}

export const deleteBook = (id) =>{
    const url = `http://localhost:8080/deletebook/${id}`;
    deleteRequest(url);
}

export const addBook = (object, callback) => {
    const url = "http://localhost:8080/addbook";
    postRequest(url,object,callback);
}
