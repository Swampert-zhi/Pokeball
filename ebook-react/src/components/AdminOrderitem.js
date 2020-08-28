import React from "react";
import {getUserById} from "../services/UserService";
import {imageTransform} from "../services/Image";
import {Avatar, Card, List} from "antd";
import "../css/Order.css"

const { Meta } = Card;

class AdminOrderitem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            user:{}
        }
    }

    componentDidMount() {
        const callback=(data)=>{
            this.setState({
                user:data
            })
        };
        getUserById(this.props.order.userId,callback);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const callback=(data)=>{
            this.setState({
                user:data
            })
        };
        getUserById(this.props.order.userId,callback);
    }

    totalprice=()=>{
        const {order} = this.props;
        let total = 0;
        order.neworder.map((item)=>{
            total += item.oldprice * item.num;
        })
        return total.toFixed(2);
    }

    render() {
        const {order} = this.props;
        return(
            <div className="Order">
            <Card
                hoverable
                className="Orderitem"
            >
                <Meta
                    avatar={<Avatar src={this.state.user.avatar} size="large"/>}
                    title={this.state.user.username}
                    description={`下单时间： ${order.ordertime}`
                    +'\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'
                    +`总价：￥${this.totalprice()}`}
                    className="Ordertitle"
                />
                <div className="Orderinfo">
                    <List
                        itemLayout="vertical"
                        size="large"
                        grid={{gutter: 0,column: 3}}
                        dataSource={order.neworder}
                        // pagination={{onChange: page => {},
                        //                 pageSize: 8,}}
                        renderItem={item=>(
                            <List.Item>
                                <div>
                                    <div style={{float:"left",marginRight:10}}>
                                        <img src={imageTransform(item.book.image)} style={{width:65, height:90}}/>
                                    </div>
                                    <div className="Bookinfo">
                                        <p>商品：《{item.book.title}》</p>
                                        <p>数量：{item.num}</p>
                                        <p>单价：￥{item.oldprice}</p>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </Card>
            </div>

        )
    }
}

export default AdminOrderitem;
