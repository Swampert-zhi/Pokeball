import React from 'react';
import {Button,Icon} from 'react-native-elements';
import {View, StyleSheet, TextInput} from 'react-native';

export class Stepper extends React.Component{
    constructor() {
        super();
        this.state={
            value:0,
            min:0,
            max:Number.POSITIVE_INFINITY
        }
    }

    componentDidMount(){
        if(this.props.max!=undefined)
            this.setState({max:this.props.max});
        if(this.props.value!=undefined)
            this.setState({value:this.props.value});
    }

    UNSAFE_componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any){
        if(nextProps.value!=undefined&&nextProps.value!=this.props.value)
            this.setState({value:nextProps.value});

    }

    render(){
        return (
            <View style={style.container}>
                <Button
                    icon={<Icon
                        name="ios-remove"
                        size={22}
                        color={this.state.value==this.state.min?'#b7b7b7':'#111111'}
                        type="ionicon"
                    />}
                    type="outline"
                    disabled={this.state.value==this.state.min}
                    onPress={()=>{this.setState({value:this.state.value-1},
                        ()=>{
                        this.props.onChange(this.state.value);
                    })}}
                    containerStyle={this.state.value==this.state.min?style.disable:style.icon}
                />
                <TextInput
                    style={style.input}
                    keyboardType='numeric'
                    value={this.state.value.toString()}
                    textAlign="center"
                    textAlignVertical="bottom"
                    onChangeText={(text)=>{
                        this.setState({value:text==""?0:
                                parseInt(text)>this.state.max?
                                    this.state.max:parseInt(text)
                            },
                        ()=>{
                            if(this.props.onChange!=undefined)
                        this.props.onChange(this.state.value);
                    })}}
                />
                <Button
                    icon={<Icon
                        name="ios-add"
                        size={22}
                        color={this.state.value==this.state.max?'#b7b7b7':'#111111'}
                        type="ionicon"
                    />}
                    type="outline"
                    disabled={this.state.value==this.state.max}
                    onPress={()=>{this.setState({value:this.state.value+1},
                        ()=>{
                        this.props.onChange(this.state.value);
                    })}}
                    containerStyle={this.state.value==this.state.max?style.disable:style.icon}
                />
            </View>
        );
    }
}

const style=StyleSheet.create({
    container:{
        flexDirection:"row"
    },
    input:{
        borderColor:'#111111',
        borderWidth:2,
        borderRadius:10,
        height:40,
        width:50,
        fontSize:17
    },
    icon:{
        width:40,
        borderColor: '#111111',
        borderWidth: 2,
        borderRadius: 10,
        height:37,
        marginTop:2
    },
    disable:{
        width:40,
        borderColor: '#b7b7b7',
        borderWidth: 2,
        borderRadius: 10,
        height:37,
        marginTop:2
    }
})
