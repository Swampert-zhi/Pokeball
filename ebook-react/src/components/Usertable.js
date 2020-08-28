import React from "react";
import {Table,Button,Avatar} from "antd";
import {changeStatus,getUsers} from "../services/UserService";


class Usertable extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            users:[]
        }
    }

    componentDidMount() {
        const callback=(data)=>{
            this.setState({
                users:data
            })
        }
        getUsers(callback);
    }

    change=(id)=>{
        const callback=(data)=>{
            console.log(data);
            let newData = this.state.users.filter(item=> {
                if(item.id === data)
                    item.usable = !item.usable;
                return item;
            });
            this.setState({users:newData});
        };
        changeStatus(id,callback);
    }

    render() {
        const colunm=[
            {
                title:'头像',
                width:'10%',
                render:record => (
                    <Avatar className="user-avatar" src={record.avatar}/>
                )
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                width: '15%',
            },
            {
                title: '真实姓名',
                dataIndex: 'name',
                key: 'name',
                width: '15%',
            },
            {
                title: '电子邮箱',
                dataIndex: 'email',
                key: 'email',
                width: '22%',
            },
            {
                title: '账户类型',
                width: '10%',
                render:record => (
                    <span>
                        {record.role?"管理员":"顾客"}
                    </span>
                )
            },
            {
                title: '是否可用',
                width: '15%',
                render: record => (
                    <span>
                        {record.usable?"正常":"已禁用"}
                    </span>
                )
            },
            {
                title:'禁用/解禁',
                render:record=>(
                    <span>
                    {record.usable ?
                    (<Button
                        disabled={record.role}
                        onClick={()=>this.change(record.id)}
                    >
                        禁用
                    </Button>):
                    (<Button
                        disabled={record.role}
                        onClick={()=>this.change(record.id)}
                    >
                        解禁
                    </Button>)}
                    </span>
                )
            }
        ];
        return (
            <Table
            columns={colunm}
            dataSource={this.state.users}
            rowKey={record=>record.id}
            />
        )
    }


}

export default Usertable;
