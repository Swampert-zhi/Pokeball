import React from "react";
import {Route, Switch,Link} from 'react-router-dom';
import {getUserById} from "../services/UserService";
import '../css/HomeView.css'
import {Layout, Menu, Button, Avatar, Divider} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ReadOutlined,
    ShoppingCartOutlined,
    EditOutlined,
    ContactsOutlined,
    SnippetsOutlined,
    UnorderedListOutlined,
    BarChartOutlined,
    AreaChartOutlined
} from '@ant-design/icons';
import Booklist from "../components/Booklist";
import Bookdetails from "../components/Bookdetails";
import Cart from "../components/Cart";
import MyStat from "../components/MyStat";
import UserOrder from "../components/UserOrder";
import Booktable from "../components/Booktable";
import Usertable from "../components/Usertable";
import AdminOrder from "../components/AdminOrder";
import AdminStat from "../components/AdminStat";

const { Header, Sider, Content } = Layout;

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            user:{},
            namedisplay:"out",
        };
    }

    componentDidMount() {
        const callback=(data)=>{
            this.setState({
                user:data,
                ready:true
            })
        }
        let id = sessionStorage.getItem("userId");
        getUserById(id,callback);
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        },()=>{
            if(this.state.collapsed)
                this.setState({namedisplay:"out"});
            else {
                setTimeout(() => {
                    this.setState({namedisplay: "fadein1"});
                    setTimeout(()=>{
                    this.setState({namedisplay: "fadein2"})
                    },10)
                }, 30);

            }
        });

    };

    logout = () =>{
        sessionStorage.removeItem("userId");
        this.props.history.push("/login");
    };

    render() {
        return (
            <Layout className="home-view">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <Avatar className="user-avatar" src={this.state.user.avatar} style={{float:"left"}}/>
                    <p className={this.state.namedisplay}>{this.state.user.username}</p>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to={{pathname:'/'}}>
                            <ReadOutlined />
                            <span>书籍浏览</span>
                            </Link>
                        </Menu.Item>
                        <Divider
                            orientation="left"
                            // style={this.state.user.role?{color:"rgb(24, 144, 255)"}:{display:"none"}}
                            style={{color:"rgb(24, 144, 255)"}}
                        >
                            个人
                        </Divider>
                        <Menu.Item key="2">
                            <Link to={{pathname:'/Cart'}}>
                            <ShoppingCartOutlined />
                            <span>购物车</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={{pathname:'/UserOrder'}}>
                                <UnorderedListOutlined />
                                <span>个人订单</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to={{pathname:'/UserStat'}}>
                                <BarChartOutlined />
                                <span>个人统计</span>
                            </Link>
                        </Menu.Item>
                        <Divider
                            orientation="left"
                            style={this.state.user.role?{color:"rgb(24, 144, 255)"}:{display:"none"}}>
                            管理
                        </Divider>
                        <Menu.Item key="5" className={this.state.user.role?"admin":"user"}>
                            <Link to={{pathname:'/Table'}}>
                            <EditOutlined />
                            <span>书籍管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6" className={this.state.user.role?"admin":"user"}>
                            <Link to={{pathname:'/Manage'}}>
                                <ContactsOutlined/>
                                <span>用户管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7" className={this.state.user.role?"admin":"user"}>
                            <Link to={{pathname:'/AdminOrder'}}>
                                <SnippetsOutlined />
                                <span>订单管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8" className={this.state.user.role?"admin":"user"}>
                            <Link to={{pathname:'/AdminStat'}}>
                                <AreaChartOutlined />
                                <span>站点统计</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-header" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <span className="title">E-Book</span>
                        <span className="slogan"> 读万卷书，行万里路</span>
                        <Button className="header-button" onClick={this.logout}>退出登录</Button>
                    </Header>
                    <Content
                        className="site-layout-content"
                        style={{
                            margin: '30px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route exact path="/" component={Booklist}/>
                            <Route exact path="/Cart" component={Cart}/>
                            <Route exact path="/UserOrder" component={UserOrder}/>
                            <Route exact path="/UserStat" component={MyStat}/>
                            <Route exact path="/Table" component={Booktable}/>
                            <Route exact path="/Manage" component={Usertable}/>
                            <Route exact path="/AdminOrder" component={AdminOrder}/>
                            <Route exact path='/Details/:bookId' component={Bookdetails}/>
                            <Route exact path='/AdminStat' component={AdminStat}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default HomeView;
