import React from "react";
import {Avatar, Card} from "antd";
import "../css/RichestUser.css"

class RichestUserItem extends React.Component{
    render () {
        const {user} = this.props;
        return(
            <div
                className="RichestUser"
            >
                <Card
                    hoverable
                    className="RichestUserItem"
                >
                    <Card.Meta
                        className="ItemTitle"
                        description={user.rank === 1?
                            "\u00a0\u00a0肥羊神"
                            :user.rank===2?
                                "\u00a0\u00a0肥羊帝"
                                :user.rank===3?
                                    "\u00a0\u00a0肥羊王"
                                    :"\u00a0\u00a0"+user.rank+"号肥羊"}
                        style={user.rank === 1?
                            {background:"#fff88d"}
                            :user.rank===2?
                                {background:"#f3f3f3"}
                                :user.rank===3?
                                    {background:"rgba(190,156,68,0.52)"}
                                    :{background:"rgba(53, 170, 255, 0.32)"}
                        }/>
                    <div className="User">
                        <div className="UserAvatar">
                            <Avatar src={user.user.avatar} size={100} shape="square"/>
                        </div>
                        <div className="UserInfo">
                            <p>用户名：{user.user.username}</p>
                            <p>真实姓名：{user.user.name}</p>
                            <p>电子邮箱：{user.user.email}</p>
                        </div>
                        <div className="PurchaseRecord">
                            <p>总消费：￥{user.totalprice}</p>
                            <p>购买数：{user.totalnum}本</p>
                        </div>
                    </div>
                </Card>
            </div>

        )
    }
}

export default RichestUserItem;
