import React from 'react';
import {
    View,
    // Button,
    Text,
    TextInput,
    StatusBar,
    StyleSheet,
    AsyncStorage, ToastAndroid,
} from 'react-native';
import { Button,Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {login} from '../services/UserService';

export class SigninScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            username:null,
            password:null
        }
    }

    componentDidMount(){
        AsyncStorage.removeItem("userId");
    }

    render=()=>{
        return (
        <View style={style.container}>
            <Input placeholder="请输入用户名"
                   onChangeText={text=>{this.setState({username:text})}}
                   leftIcon={
                       <Icon
                           name='user'
                           size={24}
                           color='black'
                       />}
                   label="Username"
            />
            <Input placeholder="请输入密码"
                   secureTextEntry={true}
                   onChangeText={text=>{this.setState({password:text})}}
                   leftIcon={
                       <Icon
                           name='lock'
                           size={24}
                           color='black'
                       />}
                   containerStyle={{marginTop:5}}
                   input
                   label="Password"
            />
            <View>
            <Button onPress={this.Signin}
                    containerStyle={{marginTop:10}}
                    buttonStyle={style.button}
                    titleStyle={{fontSize:20}}
                    title="登     录"/>
            </View>
        </View>
        );
    }

    Signin=()=>{
        const callback = async (data) => {
            if (data > 0) {
                await AsyncStorage.setItem("userId", data.toString())
                    .then((value)=>{
                        this.props.navigation.push("Home");
                    });
            } else {
                if(data==0)
                    ToastAndroid.show("该用户已禁用",ToastAndroid.SHORT);
                else
                    ToastAndroid.show("用户名或密码错误",ToastAndroid.SHORT);
            }
        }
        login(this.state,callback);
    }
}

const style=StyleSheet.create({
    container:{
        paddingTop:100,
        paddingBottom:270,
        backgroundColor:"#FFFFFF"
    },
    input:{
        margin:15,
        fontSize:24,
        // borderWidth:3,
        // borderRadius:30,
        // borderColor:"#69ace0"
    },
    button:{
        width:150,
        height:50,
        marginLeft:130
    }
});
