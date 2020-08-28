import React from 'react';
import {Button, Text, View, Image, StyleSheet, ScrollView, AsyncStorage, ToastAndroid} from 'react-native';
import {Overlay,Divider} from 'react-native-elements';
import {Stepper} from '../components/Stepper';
import {addCart} from '../services/OrderService';

export class DetailScreen extends React.Component{
    constructor() {
        super();
        this.state={
            visible:false,
            num:0
        }
    }


    reverseVisible=()=>{
        this.setState({
            visible:!this.state.visible
        })
    }

    addCart=()=>{
        if(this.state.num!=0)
        {
            AsyncStorage.getItem("userId").then((value)=>{
                const data = {
                    id:value,
                    bookId:this.props.route.params.detail.bookId,
                    num:this.state.num
                }
                const callback=(data)=>{
                    let message="您成功购买了"+this.state.num+"本《"
                        +this.props.route.params.detail.title+"》,目前购物车中共计"+data+"本"
                    // Toast.show(message,{
                    //     duration:Toast.durations.SHORT
                    // })
                    ToastAndroid.show(message,ToastAndroid.SHORT)
                }
                addCart(data,callback);
            })

        }
    }

    render(){
        let details =  this.props.route.params.detail;
        return(
            <ScrollView style={style.allContainer}>
            <View style={style.topContainer}>
                <View style={style.imageContainer}>
                <Image
                    source={{uri: details.image}}
                    style={style.image}/>
                </View>
                <View style={style.infoContainer}>
                    <Text style={style.title}>{details.title}</Text>
                    <Text style={style.author}>ISBN：{details.isbn}</Text>
                    <Text style={style.author}>作者：{details.author}</Text>
                    <Text style={style.author}>语言：{details.language}</Text>
                    <Text style={style.author}>价格：¥{details.price}</Text>
                    <Text style={style.author}>库存：{details.stock}</Text>
                    <View style={style.button}>
                        <Button title="加入购物车" onPress={this.reverseVisible}/>
                    </View>
                </View>
                <Overlay
                    isVisible={this.state.visible}
                    overlayStyle={{width:300,height:500}}
                    onBackdropPress={this.reverseVisible}>
                    <View style={style.topContainer}>
                        <View style={{flex:1}}>
                            <Image
                                source={{uri: details.image}}
                                style={style.image}/>
                        </View>
                        <View style={{flex:1.5,marginLeft:50}}>
                            <Text style={style.title}>{details.title}</Text>
                            <Text style={{fontSize:20,marginTop:14}}>价格：¥{details.price}</Text>
                            <Text style={{fontSize:20,marginTop:14}}>库存：{details.stock}</Text>
                        </View>
                    </View>
                    <Divider/>
                    <View style={{flexDirection:"row",marginTop:10,marginBottom:10}}>
                        <Text style={{fontSize:20,marginTop:10,marginRight:60}}>购买数量</Text>
                        <Stepper
                            max={details.stock}
                            value={this.state.num}
                            onChange={(value)=>{this.setState({num:value})}}/>
                    </View>
                    <Divider/>
                    <View style={{marginTop:10}}>
                        <Button title="确定" onPress={this.addCart} />
                    </View>
                </Overlay>
            </View>
                <View style={style.descContainer}>
                    <Text style={{fontSize: 23}}>简介：</Text>
                    <Text style={{fontSize: 18}}>
                     {details.description}
                    </Text>
                </View>
            </ScrollView>
        )
    }
}
const style=StyleSheet.create({
    allContainer: {
      backgroundColor:"#e0f3ff"
    },
    topContainer:{
        flexDirection:"row",
        marginTop:20,
        marginBottom:20
    },
    imageContainer:{
        flex:1,
        marginLeft:40
    },
    image:{
        width:120,
        height:150
    },
    infoContainer:{
        flex:2,
        marginLeft: 20
    },
    title:{
        fontSize:30,
        fontWeight:"bold"
    },
    author:{
        fontSize: 15,
        marginTop:5
    },
    descContainer:{
        margin:20
    },
    button:{
        width:200,
        height:10,
        marginTop:10
    }
});
