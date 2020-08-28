import React from 'react';
import Book from "./Book";
import {List, Input} from 'antd';
import {getBooks} from "../services/BookService";
import '../css/List.css'
const{Search}=Input;

class Booklist extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            dataSource:[],
            presearchdata:[],
            search:null,
        };
    }
    componentDidMount() {
        const callback =  (data) => {
            this.setState({dataSource:data, presearchdata:data});
        };

        getBooks(callback);
    }

    search=(e)=>{
            var value = e.target.value;
            let data=[...this.state.presearchdata];

            this.setState({dataSource:data.filter(item=>(
                    item.title.toString().toLowerCase().includes(value.toLowerCase())||
                    item.author.toString().toLowerCase().includes(value.toLowerCase())||
                    item.language.toString().toLowerCase().includes(value.toLowerCase())||
                    item.price.toString().toLowerCase().includes(value.toLowerCase()))),
            });
    }

    rendersearch(){
        return(
            <div className="Searchbar">
                <Search
                    placeholder="请输入搜索的关键词"
                    size="large"
                    style={{width:'50%'}}
                    onChange={this.search}
                />
            </div>
        )
    }

    renderlist(){
        return (
            <List
                grid={{gutter: 0, column: 4,}}
                dataSource={this.state.dataSource}
                pagination={{
                    pageSize: 8,
                }}
                renderItem={item => (
                    <List.Item>
                        <Book info={item} />
                    </List.Item>
                )}
            />
        );
    }
    render() {
        return(
            <div className="Booklist">
                {this.rendersearch()}
                {this.renderlist()}
            </div>
        )
    }
}

export default Booklist;
