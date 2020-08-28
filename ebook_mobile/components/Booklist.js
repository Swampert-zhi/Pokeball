import React from 'react';
import {getBooks} from '../services/BookService';
import {Text, FlatList, View, TextInput, Image, StyleSheet, TouchableHighlight, AsyncStorage} from 'react-native';
import {getCart} from '../services/OrderService';

export class Booklist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        books:[],
        prebooks:[]
    };
  }
  componentDidMount(){
      const callback=(data)=>{
        this.setState({books:data,prebooks:data});
      };

      this.viewDidAppear = this.props.navigation.addListener('focus',()=>{
          getBooks(callback);
      })

      getBooks(callback);
  }

  componentWillUnmount(){
      this.viewDidAppear();
  }

    render() {
    return (
        <View style={style.allContainer}>
        <TextInput
            placeholder="  搜索"
            style={style.search}
            onChangeText={text=>{this.search(text)}}
        />
        <FlatList
            data={this.state.books}
            renderItem={this.renderBook}
            style={style.list}
            keyExtractor={item => item.bookId}
        />
        </View>

    );
  }

  renderBook=({item})=>{
     return(
         <TouchableHighlight
             onPress={()=>{this.todetail(item)}}
             style={{borderRadius: 10}}
             underlayColor='#9BC4FF'
         >
         <View style={style.container}>
             <Image
                 source={{uri: item.image}}
                 style={style.image}
             />
             <View style={style.midContainer}>
                 <Text style={style.title}>{item.title}</Text>
                 <Text style={style.author}>作者：{item.author}</Text>
                 <Text style={style.author}>语言：{item.language}</Text>
             </View>
             <View style={style.rightContainer}>
                 <Text style={style.price}>¥{item.price}</Text>
             </View>
         </View>
         </TouchableHighlight>
     )
  }

  todetail=(item)=>{
      this.props.navigation.push("Detail",{detail:item});
  }

  search=(text)=>{
      let data = this.state.prebooks;
      this.setState({books:data.filter(item=>(
              item.title.toString().toLowerCase().includes(text.toLowerCase())||
              item.author.toString().toLowerCase().includes(text.toLowerCase())||
              item.language.toString().toLowerCase().includes(text.toLowerCase())||
              item.price.toString().toLowerCase().includes(text.toLowerCase()))),
      });
  }

}

const style = StyleSheet.create({
    allContainer:{
        padding:10,
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
        borderWidth:2,
        borderRadius:10,
        borderColor:"#d1d1d1"
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
    image:{
        width:70,
        height:100,
        marginTop: 10,
    },
    price:{
        fontSize:20,
        fontStyle: "italic",
        color:"#ff5030",
        marginRight:10,
        marginTop:85
    },
    list: {
        paddingLeft:10,
        paddingRight:5,
        marginBottom: 100
    }
});
