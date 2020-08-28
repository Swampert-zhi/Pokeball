import React from "react";
import {Card} from "antd";
import {imageTransform} from "../services/Image";
import "../css/MyStat.css"

class MyStatItem extends React.Component{
    render() {
        const {book} = this.props;
        return(
            <div
                className="MyStat"
            >
                <Card
                    hoverable
                    className="MyStatItem"
                >
                    <Card.Meta
                        className="CardTitle"
                        description={book.book.title}
                    />
                    <div
                        className="Item">
                        <div className="ItemImage">
                            <img src={imageTransform(book.book.image)} style={{width:100, height:130}}/>
                        </div>
                        <div className="ItemInfo">
                            <p>作者：{book.book.author}</p>
                            <p>购买数：{book.totalnum}</p>
                            <p>总金额：￥{book.totalprice}</p>
                        </div>
                        <div  className="ItemDesc">
                            <p className="SimpleDesc">简介：
                                {book.book.description===null?"简介暂无":
                                    book.book.description.length>100?
                                        book.book.description.substr(0,100)+"……":
                                        book.book.description}</p>
                        </div>
                    </div>
                </Card>
            </div>

        )
    }
}

export default MyStatItem;
