export const imageTransform=(image)=>{
    var newimage;
    if(image!=null)
        newimage = image;
    else
        newimage = require("../assets/p0.jpg");
    return newimage;
}
