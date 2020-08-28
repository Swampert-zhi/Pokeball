export const getRequest = (url, callback) => {
  wx.request({
    url: url,
    method:"GET",
    headers: {
        'content-type': 'application/json'
    },
    success:(data)=>{
        callback(data.data);
    }
  });
};

export const postRequest2 = (url, data,callback) => {
    wx.request({
      url: url,
      method: "POST",
      data:JSON.stringify(data),
      header: {'content-type': 'application/json'},
      success:(data) => {
        callback(data.data);
      }
    })
};

export const postRequest = (url, object, callback) => {
  wx.request({
    url: url,
    method: "POST",
    data:object,
    header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    success:(data) => {
        callback(data.data);
    }
  })
};

export const deleteRequest = (url) => {
  wx.request({
    url: url,
    method:"DELETE",
    headers: {
        'content-type': 'application/json'
    },
    success:(data)=>{
    }
  });
};