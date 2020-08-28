export const getRequest = (url, callback) => {

    let opts = {
        method: "GET",
        // body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const postRequest2 = (url, data,callback) => {

    let opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const postRequest = (url, object, callback) => {

    let formData = new FormData();

    for (let p in object){
        if(object.hasOwnProperty(p))
        {
            formData.append(p, object[p]);
        }
    }

    let opts = {
        method: "POST",
        body: formData,
    };

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const deleteRequest = (url) => {

    let opts = {
        method: "DELETE"
    };

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {})
        .catch((error) => {
            console.log(error);
        });
};
