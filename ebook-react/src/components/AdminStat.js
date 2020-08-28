import React from "react";
import{getBestSellers,getRichestUsers} from "../services/OrderService";
import {Button, DatePicker, Input, List, Select} from "antd";
import BestSellerItem from "./BestSellerItem";
import RichestUserItem from "./RichestUserItem";

class AdminStat extends React.Component{
    constructor() {
        super();
        this.state={
            item:"Book",
            start:"",
            end:"",
            list:[]
        }
    }

    renderSearch=()=>{
        return(
            <Input.Group compact style={{margin:20,marginLeft:200}} size="large">
                <Select
                    defaultValue="热销榜"
                    style={{ width: '8%'}}
                    onChange={this.handleSearchChange}>
                    <Select.Option value="Book">热销榜</Select.Option>
                    <Select.Option value="User">小肥羊</Select.Option>
                </Select>
                <DatePicker.RangePicker
                    showTime
                    placeholder={["起始时间","结束时间"]}
                    format="YYYY-MM-DD HH:mm:ss"
                    size="large"
                    style={{ width: '50%'}}
                    onChange={this.pickTime}
                />
                <Button
                    disabled={this.state.start===""||this.state.end===""}
                    type="primary"
                    size="large"
                    onClick={this.state.item==="Book"?this.searchBestSellers:this.searchRichestUsers}
                >
                    搜索
                </Button>
            </Input.Group>
        );
    }

    handleSearchChange=(value)=>{
        this.setState({item:value,list:[]})
    }

    pickTime=(dates, dateStrings)=>{
        this.setState({
            start:dateStrings[0],
            end:dateStrings[1]
        });
    }

    searchBestSellers=(e)=>{
        const TimeRange={
            start:this.state.start,
            end:this.state.end
        }
        const callback=(data)=>{
            this.setState({list:data});
        }
        getBestSellers(TimeRange,callback);

    }

    searchRichestUsers=(e)=>{
        const TimeRange={
            start:this.state.start,
            end:this.state.end
        }
        const callback=(data)=>{
            this.setState({list:data});
        }
        getRichestUsers(TimeRange,callback);
    }

    renderBestSellers=()=>{
        return (
            <List
                itemLayout="vertical"
                grid={{gutter: 0,column:1}}
                dataSource={this.state.list}
                pagination={{
                onChange: page => {
                },
                pageSize: 4,
            }}
                renderItem={item=>(
                    <List.Item>
                        <BestSellerItem book={item}/>
                    </List.Item>
                )}
            />);
    }

    renderFattestSheep=()=>{
        return(
            <List
                itemLayout="vertical"
                grid={{gutter: 0,column:1}}
                dataSource={this.state.list}
                pagination={{
                    onChange: page => {
                    },
                    pageSize: 4,
                }}
                renderItem={item=>(
                    <List.Item>
                        <RichestUserItem user={item}/>
                    </List.Item>
                )}
            />);
    }

    render() {
        return (
            <div>
                {this.renderSearch()}
                {this.state.item==="Book"?this.renderBestSellers():this.renderFattestSheep()}
            </div>
        )
    }
}

export default AdminStat;
