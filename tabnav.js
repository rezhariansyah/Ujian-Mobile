import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome'
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import Home from './src/srcScreen/HomeScreen'
import Login from './src/srcScreen/LodinScreen'

const Tab = createMaterialTopTabNavigator({
    home : {
        screen : Home,
        navigationOptions : {
            title : 'HOME',
            tabBarIcon :({tintColor})=> <Icon name = 'home' color={tintColor} size={24}/>
        }
    },
    login : {
        screen : Login,
            navigationOptions : {
                title : 'LOGIN',
                tabBarIcon : ({tintColor})=>  <Icon name = 'sign-in' color={tintColor} size={24}/>
            }
    }
},{
    tabBarPosition : 'bottom',
    tabBarOptions : {
    showIcon : true,
    activeTintColor : 'orange',
    style : {
        backgroundColor : "gray"
    },
    indicatorStyle : {
        position : "absolute",
        top : 0,
        height : 5
    }

    

    }
})
const TabContainer = createAppContainer(Tab)

class LatihanIcon extends Component {
    render() {
        return (
           <TabContainer/>
        );
    }
}
export default LatihanIcon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});