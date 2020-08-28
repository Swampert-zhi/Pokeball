import React from "react";
import {Card} from "antd";
import {imageTransform} from "../services/Image";
import "../css/BestSeller.css"

class BestSellerItem extends React.Component{
    render() {
        const {book} = this.props;
        return(
            <div
                className="BestSeller"
            >
                <Card
                    hoverable
                    className="BestSellerItem"
                >
                    <Card.Meta
                        className="ItemTitle"
                        description={book.rank === 1?
                            "\u00a0\u00a0冠军"
                            :book.rank===2?
                                "\u00a0\u00a0亚军"
                                :book.rank===3?
                                    "\u00a0\u00a0季军"
                                    :"\u00a0\u00a0第"+book.rank+"名"}
                        style={book.rank === 1?
                            {background:"#fff88d"}
                            :book.rank===2?
                                {background:"#f3f3f3"}
                                :book.rank===3?
                                    {background:"rgba(190,156,68,0.52)"}
                                    :{background:"rgba(53, 170, 255, 0.32)"}
                        }/>
                    <div className="Item">
                        <div className="ItemImage">
                            <img src={imageTransform(book.book.image)} style={{width:100, height:130}}/>
                        </div>
                        <div className="ItemInfo">
                            <p>书名：{book.book.title}</p>
                            <p>作者：{book.book.author}</p>
                            <p>销量：{book.num}</p>
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

export default BestSellerItem;
