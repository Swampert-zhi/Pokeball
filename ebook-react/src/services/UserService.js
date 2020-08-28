import {getRequest,postRequest} from "./Ajax";

export const login=(value,callback)=>{
    const url = "http://localhost:8080/login";
    postRequest(url,value,callback);
}

export const changeStatus=(id,callback)=>{
    const url = `http://localhost:8080/changestatus/${id}`;
    getRequest(url,callback);
}

export const getUsers=(callback)=>{
    const url = `http://localhost:8080/getusers`;
    getRequest(url,callback);
}

export const getUserById=(id,callback)=>{

    const url = `http://localhost:8080/getuserbyid/${id}`;
    getRequest(url, callback);
}

export const checkUsername=(username,callback)=>{
    const url = `http://localhost:8080/checkusername/${username}`;
    getRequest(url,callback);
}

export const addUser=(object,callback)=>{
    const url = `http://localhost:8080/adduser`;
    postRequest(url,object,callback);
}

export const updateUser=(object,callback)=>{
    const url = `http://localhost:8080/updateuser`;
    postRequest(url,object,callback);
}
