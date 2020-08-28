import React from "react";
import {InputNumber, Button, notification} from "antd";
import "../css/Cart.css"
import {postCart,deleteCart} from "../services/CartService";
import {imageTransform} from "../services/Image";

class Cartitem extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            num:this.props.info.num,

        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            num:nextProps.info.num,
        });
    }

    changeinput = (value)=>{
        if(value==0) this.delete();
        else{
            if(value>this.props.info.book.stock)
            {
                notification["error"]({
                    message:'《'+this.props.info.book.title+"》库存不足，请注意购买数量",
                    duration:2,
                    placement:"bottomRight"
                })
            }
            this.props.info.num = value;
            const data = {
                cartId:this.props.info.cartId,
                num:value
            }
            postCart(data);
            this.setState({num:value});
            console.log("buy "+this.props.info.book.title+" number:"+this.props.info.num);
        }
    }

    addorder = ()=>{
        this.props.parent.reverseType(this.props.info.cartId);
    }
    removeorder = ()=>{
        this.props.parent.setState({alladd:false});
        this.props.parent.reverseType(this.props.info.cartId);
    }
    delete = ()=>{
        deleteCart(this.props.info.cartId);
        this.props.parent.delete(this.props.info.cartId);
    }
    render(){
        const {info}=this.props;
            return (
            <div className="cartItem" style={{background:info.inorder?"rgba(145,206,255,0.74)":"none"}}>
            <img alt="image" src={imageTransform(info.book.image)} className="cartImg" />
            <div className="cartContent">
                <p className="castTitle">{info.book.title}</p>
                <p>总价：{(info.num * info.book.price).toFixed(2)}元</p>
                <InputNumber size="middle" min={0}
                             value={this.state.num} onChange={this.changeinput}/>
                <br/>
                <Button shape="round" className="orderButton" onClick={this.addorder}
                        style={{display:info.inorder?"none":"block",float:"left"}}>加入订单</Button>
                <Button shape="round" className="removeButton" onClick={this.removeorder}
                        style={{display:info.inorder?"block":"none",float:"left"}}>移出订单</Button>
                <Button shape="round" className="deleteButton" onClick={this.delete}>删除</Button>
            </div>
            </div>
        );
    }
}
export default Cartitem;
