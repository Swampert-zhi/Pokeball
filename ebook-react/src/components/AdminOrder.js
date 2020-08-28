import React from "react";
import {List,Select,Input,DatePicker} from "antd";
import {getAllOrders} from "../services/OrderService";

import AdminOrderitem from "./AdminOrderitem";

class AdminOrder extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            orders: [],
            preorders: [],
            search: "User"
        }
    }

    componentDidMount() {
        const callback=(data)=>{
            this.setState({
                orders:data,
                preorders:data
            })
        }
        getAllOrders(callback);
    }

    handleSearchChange=(value)=>{
        this.setState({search:value})
    }

    renderSearch=()=>{
        switch (this.state.search) {
            case "User":return(
                <Input.Search
                    style={{ width: '50%'}}
                    placeholder="请输入要搜索的用户"
                    enterButton="搜索"
                    size="large"
                    onSearch={this.searchUser}
                    onChange={(e)=>{
                        if(e.target.value=='')
                            this.setState({orders:this.state.preorders})
                    }}
                />);
            case "Date":return(
                <DatePicker.RangePicker
                    showTime
                    placeholder={["起始时间","结束时间"]}
                    format="YYYY-MM-DD  HH:mm:ss"
                    size="large"
                    style={{ width: '50%'}}
                    onChange={this.searchTime}
                />);
            case "Book":return(
                <Input.Search
                    style={{ width: '50%'}}
                    placeholder="请输入要搜索的书籍"
                    enterButton="搜索"
                    size="large"
                    onSearch={this.searchBook}
                    onChange={(e)=>{
                        if(e.target.value=='')
                            this.setState({orders:this.state.preorders})
                    }}
                />);
        }
    }

    searchUser=(value)=>{
        // let value = e.target.value;
        let newData = this.state.preorders;
        this.setState({orders:newData.filter((item)=>(
            item.username.toString().toLowerCase().includes(value.toLowerCase()) ) )
        });
    }

    searchTime=(dates, dateStrings)=>{
        if(dateStrings[0]==''||dateStrings[1]=='')
            this.setState({orders:this.state.preorders});
        else {
            var Start = new Date(dateStrings[0]);
            var End = new Date(dateStrings[1]);

            let newData = this.state.preorders;
            this.setState({orders:newData.filter((item)=>{
                    var Time = new Date(item.ordertime);
                    if(Start <= Time && Time <= End)
                        return item;
                })
            });
        }
    }

    searchBook=(value)=>{
        let newData = this.state.preorders;
        this.setState({orders:newData.filter((item)=>{
                let exist = false;
                let orderitem;
                for(orderitem in item.neworder)
                {
                    if(item.neworder[orderitem].book.title.toString().toLowerCase().includes(value.toLowerCase()))
                    {
                        exist = true;
                        break;
                    }
                }
                if(exist)
                    return item;
        })
        });
    }

    render() {
        return (
            <div>
                <Input.Group compact style={{margin:20,marginLeft:200}} size="large">
                    <Select
                        defaultValue="用户"
                        style={{ width: '7%'}}
                        onChange={this.handleSearchChange}>
                        <Select.Option value="User">用户</Select.Option>
                        <Select.Option value="Date">日期</Select.Option>
                        <Select.Option value="Book">书籍</Select.Option>>
                    </Select>
                    {this.renderSearch()}
                </Input.Group>
                <List
                    itemLayout="vertical"
                    grid={{gutter: 0, column: 1}}
                    dataSource={this.state.orders}
                    pagination={{
                        onChange: page => {
                        },
                        pageSize: 3,
                    }}
                    renderItem={item=>(
                        <List.Item>
                            <AdminOrderitem order={item}/>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default AdminOrder;
