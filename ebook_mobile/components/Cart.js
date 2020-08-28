import React from 'react';
import {View, Text, AsyncStorage, FlatList, StyleSheet, TouchableHighlight, Image, ToastAndroid} from 'react-native';
import {getCart,postCart,deleteCart,addOrder} from '../services/OrderService';
import {Stepper} from './Stepper';
import {Button} from 'react-native-elements';

export class Cart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cartitems:[],
        };
    }

    componentDidMount(){
        const callback=(data)=>{
            this.setState({cartitems:data.map((item)=>{
                    item.select=false;
                    return item;
                })});
        };

        this.viewDidAppear = this.props.navigation.addListener('focus',()=>{
            AsyncStorage.getItem("userId").then((id)=>{
                getCart(id,callback);
            });
        })

        AsyncStorage.getItem("userId").then((id)=>{
            getCart(id,callback);
        });
    }

    componentWillUnmount(){
        this.viewDidAppear();
    }

    renderItem=({item})=>{
        return (
            <TouchableHighlight
                onPress={()=>{this.changeSelect(item)}}
                style={{borderRadius: 10}}
                underlayColor='#9BC4FF'
            >
                <View style={item.select?style.containerSelected:style.container}>
                    <Image
                        source={{uri: item.book.image}}
                        style={style.image}
                    />
                    <View style={style.midContainer}>
                        <Text style={style.title}>{item.book.title}</Text>
                        <Text style={style.price}>￥{item.num*item.book.price.toFixed(2)}</Text>
                        <Stepper
                            value={item.num}
                            onChange={(value)=>{this.changeValue(item,value)}}/>
                    </View>
                    <View style={style.rightContainer}>
                        <Button title="删除" onPress={()=>{this.deleteItem(item.cartId)}}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    changeValue=(target,value)=>{
        this.setState({cartitems:this.state.cartitems.map((item)=>{
                if(item.cartId == target.cartId)
                    item.num = value;
                return item;
            })})
        const data = {
            cartId:target.cartId,
            num:value
        }
        postCart(data);
    }

    changeSelect=(target)=>{
        this.setState({cartitems:this.state.cartitems.map((item)=>{
            if(item.cartId == target.cartId)
                item.select = !item.select;
            return item;
            })})
    }

    deleteItem=(cartId)=>{
        deleteCart(cartId);
        this.setState({cartitems:this.state.cartitems.filter(item=>item.cartId!=cartId)});
    }

    totalprice=()=>{
        let total = 0;
        this.state.cartitems.map((item)=>{
            if(item.select==true)
            total+=item.book.price*item.num;
        })
        return total;
    }

    addOrder=()=>{
        const predata =this.state.cartitems.filter(item=>item.select==true);
        if(predata.length==0)
        {
            ToastAndroid.show("未选择商品，无法购买",ToastAndroid.SHORT);
        }
        else
        {
            const data = predata.map((item)=>{
                return {cartId:item.cartId};
            })
            AsyncStorage.getItem("userId").then((value)=>{
                const callback = (datas)=>{
                    if(datas.length==0)
                    {
                        ToastAndroid.show("购买成功",ToastAndroid.SHORT);
                    }
                    else{
                        var message = "";
                        for(let data of datas)
                        {
                            message = message + data;
                        }
                        message+="库存不足，购买失败";
                        ToastAndroid.show(message,ToastAndroid.SHORT);
                    }

                    const callback2=(data)=>{
                        this.setState({cartitems:data.map((item)=>{
                                item.select=false;
                                return item;
                            })});
                    };
                    getCart(value,callback2);

                };

                const alldata={
                    userId:value,
                    order:data
                };
                addOrder(alldata,callback)
            })
        }
    }

    render(){
        return(
            <View>
            <View style={style.TopBar}>
                <Text style={{marginLeft:160,marginTop:5,fontSize:20}}>总价:</Text>
                <Text style={style.totalprice}>￥{this.totalprice()}</Text>
                <View style={{width:90,marginLeft:20,marginRight:10}}>
                    <Button
                        title="下单"
                        buttonStyle={{height:34}}
                        onPress={()=>{this.addOrder()}}/>
                </View>
            </View>
            <View style={style.allContainer}>
                <FlatList
                    data={this.state.cartitems}
                    renderItem={this.renderItem}
                    style={style.list}
                    key={item=>item.bookId}
                    keyExtractor={item => item.bookId}
                />
            </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    allContainer:{
        padding:10,
        minHeight:600,
        backgroundColor: '#e0f3ff',
    },
    search:{
        margin:20,
        borderColor: "#979797",
        borderWidth: 3,
        borderRadius: 10,
        fontSize:20,
        backgroundColor: '#f9f9ff',
    },
    container:{
        flexDirection:"row",
        backgroundColor: "#ffffff",
        margin:5,
        paddingLeft:20,
        paddingBottom: 10,
        borderWidth:8,
        borderRadius:10,
        borderColor:"#cacaca",
    },
    containerSelected:{
        flexDirection:"row",
        backgroundColor: "#dde2ff",
        margin:5,
        paddingLeft:20,
        paddingBottom: 10,
        borderWidth:8,
        borderRadius:10,
        borderColor:"#6babff",
    },
    image:{
        width:70,
        height:100,
        marginTop: 10,
    },
    midContainer: {
        flex: 1,
        paddingLeft:20,
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight:"bold",
        marginBottom: 8,
        textAlign: 'left',
    },
    author: {
        fontSize:14,
        textAlign: 'left',
    },
    price:{
        fontSize:20,
        fontStyle: "italic",
        color:"#ff5030",
        marginRight:10,
    },
    rightContainer:{
        width:80,
        marginLeft:20,
        marginRight:10,
        marginTop:80
    },
    list: {
        paddingLeft:10,
        paddingRight:5,
        marginBottom: 100
    },
    TopBar:{
        paddingTop:8,
        height:50,
        flexDirection:"row",
        backgroundColor:'#FFFFFF'
    },
    totalprice:{
        fontSize:25,
        fontStyle: "italic",
        color: "#ff5030",
        minWidth:90
        // paddingRight: 20
    }
});
