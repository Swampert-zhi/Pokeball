import {getRequest,postRequest,deleteRequest} from "./Ajax";

export const login=(value)=>{
    const url = "http://localhost:8080/login";
    const callback = (data) => {
        if(data>0){
            wx.setStorage({
              data: data,
              key: 'userId',
            });
            wx.redirectTo({
                url: '../homeview/homeview?active=0',
            });
        }
        else{
            if(data==0)
                wx.showToast({
                    title: '用户已禁用',
                    icon: 'none'
                })
            else
                wx.showToast({
                    title: '用户名或密码有误',
                    icon: 'none'
                })
        }
    }
    postRequest(url,value,callback);
}

export const getuser=(callback)=>{
    const url = "http://localhost:8080/getuser/"+sessionStorage.getItem("userId");
    getRequest(url, callback);
}