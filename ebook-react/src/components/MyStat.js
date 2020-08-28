import React from "react";
import{getMyStats} from "../services/OrderService";
import {Button, Col, DatePicker, Input, List, Row} from "antd";
import MyStatItem from "./MyStatItem";
import "../css/MyStat.css"
class MyStat extends React.Component{
    constructor() {
        super();
        this.state={
            id:null,
            start:"",
            end:"",
            list:[]
        }
    }

    componentDidMount() {
        let id = sessionStorage.getItem("userId");
        this.setState({id:id});
    }

    renderSearch=()=>{
        return(
            <Input.Group compact style={{margin:20,marginLeft:200}} size="large">
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
                    onClick={this.searchMyStat}
                >
                    搜索
                </Button>
            </Input.Group>
        );
    }

    pickTime=(dates, dateStrings)=>{
        this.setState({
            start:dateStrings[0],
            end:dateStrings[1]
        });
    }

    searchMyStat=(e)=>{
        const TimeRangeAndId={
            id:this.state.id,
            start:this.state.start,
            end:this.state.end
        }
        const callback=(data)=>{
            this.setState({list:data},()=>{console.log(this.state.list)});
        }
        getMyStats(TimeRangeAndId,callback);
    }

    renderTotal=()=>{
        return(
          <Row>
              <Col span={6}/>
              <Col span={7}>
                  <p className="Total">总金额：￥{this.totalPrice()}</p>
                  </Col>
              <Col span={5}>
                  <p className="Total">总本数：{this.totalNum()}</p>
              </Col>
              <Col span={6}/>
          </Row>
        );
    }

    totalPrice=()=>{
        let total = 0;
        this.state.list.map((item)=>{
            total+=item.totalprice;
        })
        return total;
    }

    totalNum=()=>{
        let total = 0;
        this.state.list.map((item)=>{
            total+=item.totalnum;
        })
        return total;
    }

    renderMyStats=()=>{
        return (
            <List
                itemLayout="vertical"
                grid={{gutter: 0,column:1}}
                dataSource={this.state.list}
                pagination={{
                    onChange: page => {
                    },
                    pageSize: 3,
                }}
                renderItem={item=>(
                    <List.Item>
                        <MyStatItem book={item}/>
                    </List.Item>
                )}
            />);
    }

    render() {
        return (
            <div>
                {this.renderSearch()}
                {this.renderTotal()}
                {this.renderMyStats()}
            </div>
        )
    }
}

export default MyStat;
