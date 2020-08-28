import React from "react";
import {imageTransform} from "../services/Image";
import {Card, List} from "antd";
import "../css/Order.css"

const { Meta } = Card;

class UserOrderitem extends React.Component{
    constructor(props) {
        super(props);
        this.state={}
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
                        description={'\u00a0\u00a0\u00a0\u00a0\u00a0'
                        +`下单时间： ${order.ordertime}`
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
                            //                 pageSize: 8}}
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

export default UserOrderitem;
