import React from "react";
import {Button, InputNumber, Modal, notification} from "antd";
import {LeftOutlined} from "@ant-design/icons"
import {getBookById} from "../services/BookService";
import {addCart} from "../services/CartService";
import {imageTransform} from "../services/Image";
import "../css/Details.css"
class Bookdetails extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            book:{},
            visible:false,
            userId:parseInt(sessionStorage.getItem("userId"))
        }
    }

    componentDidMount() {
        const id = this.props.match.params.bookId;
        const callback =  (data) => {
            this.setState({book:data});
        };
        getBookById(id,callback);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    lastpage=()=>{
        this.props.history.go(-1);
    }

    handleOk = () => {
            this.setState({ visible: false });
            var x=document.getElementById("inputbuy").value;
            if(x != 0){
            const data = {
                id:this.state.userId,
                bookId:this.state.book.bookId,
                num:x
            }
            const callback=(data)=>{
                notification["success"]({
                    message: "您成功购买了"+x+"本《"+this.state.book.title+"》,目前购物车中共计"+data+"本",
                    duration: 10, placement: "bottomRight"})
            }
            addCart(data,callback);
            }
    }

    ;

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render=()=>{
        return(
            <div>
            <Button shape="circle" icon={<LeftOutlined/>} onClick={this.lastpage} style={{float:"left"}}/>
            <div className="detail">
                <img src={imageTransform(this.state.book.image)} className="detailImg"/>
                <div className="info">
                    <p className="infoTitle">{this.state.book.title}</p>
                    <p>ISBN：{this.state.book.isbn}</p>
                    <p>作者：{this.state.book.author}</p>
                    <p>语言：{this.state.book.language}</p>
                    <p>价格：￥{this.state.book.price}</p>
                    <p>库存：{this.state.book.stock}</p>
                    <Button className="BuyButton" onClick={this.showModal}>加入购物车</Button>
                    <Modal visible={this.state.visible} title="加入购物车"
                           onOk={this.handleOk}
                           onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                取消
                            </Button>,
                            <Button key="submit" type="primary" onClick={this.handleOk}>
                                确定
                            </Button>]}>
                        <p style={{float:"left"}}>你要购买的数量：</p>
                        <InputNumber size="middle" id="inputbuy"
                                     min={0} max={this.state.book.stock}
                                     defaultValue={0}/>
                    </Modal>
                </div>
                <br/>
                <br/>
                <div className="desc">
                <p className="descTitle">简介</p>
                <p>{this.state.book.description}</p>
                </div>
            </div>
            </div>
        );
    }
}

export default Bookdetails;
