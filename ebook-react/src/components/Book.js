import React from 'react';
import {Link} from 'react-router-dom';
import {Card} from 'antd';
import {imageTransform} from "../services/Image";

const{Meta}=Card;

class Book extends React.Component{
    render() {
        const {info} = this.props;
        return (
            <Link to={{
                pathname: `/Details/${info.bookId}`
            }}>
            <Card
                hoverable
                className="book"
                cover={<img alt="image" src={imageTransform(info.image)} className="bookImg" />}
                style={{width:'90%'}}>
                <Meta title={info.title}/>
                <p className="cardtext">作者：{info.author}</p>
                <p className="cardtext">语言：{info.language}</p>
                <p className="cardtext">价格：￥{info.price}</p>
            </Card>
            </Link>
        );
    }
}

export default Book;
