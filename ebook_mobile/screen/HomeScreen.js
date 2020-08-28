import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Booklist} from '../components/Booklist';
import {Cart} from '../components/Cart';
import {DetailScreen} from './DetailScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements'

const Stack = createStackNavigator();
function BookRouter() {
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                <Stack.Screen name="BookList" component={Booklist} options={{headerShown:false}}/>
                <Stack.Screen name="Detail" component={DetailScreen}/>
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}

const Tab = createBottomTabNavigator();
export class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state={};
    }

    componentDidMount(){

    }

    componentWillUnmount(){
    }

    render=()=>{
        return (
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={BookRouter}
                                options={{tabBarLabel: 'Home',
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="ios-home" color={color} size={size} type="ionicon"/>
                                    ),}}/>
                    <Tab.Screen name="Cart" component={Cart}
                                options={{tabBarLabel: 'Cart',
                                    tabBarIcon: ({ color, size }) => (
                                        <Icon name="ios-cart" color={color} size={size} type="ionicon"/>
                                    ),}}/>
                </Tab.Navigator>
        );

    }
}
