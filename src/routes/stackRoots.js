import React,{Component} from 'react'

import {createStackNavigator, createAppContainer,createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation'
import Register from '../srcScreen/registerScreen';
import Pemesanan from '../srcScreen/DeleteEmployeeScreen';
import Login from '../srcScreen/LoginScreen';
import EditEmployeeScreen from '../srcScreen/EditEmployeeScreen';
import Menu from '../srcScreen/MenuScreen';
import AddEmployeeScreen from '../srcScreen/AddEmployeeScreen';
import MenuAccountSetting from '../srcScreen/MenuAccountSetting'
import ListEmployeeScren from '../srcScreen/ListEmployeeScreen'
import EmployeeDetailScreen from '../srcScreen/EmployeeDetailScreen'

const AccountSetting = createMaterialTopTabNavigator ({
    menu : MenuAccountSetting,
})

const StackBeranda = createStackNavigator ({
    Menu : Menu,
    Add : AddEmployeeScreen,
    Edit : EditEmployeeScreen,
    list : ListEmployeeScren,
    detail :EmployeeDetailScreen

},{
    headerMode :'none'
})

const HomeTab = createMaterialTopTabNavigator ({
    home : StackBeranda,
    account :AccountSetting
},
{
    tabBarPosition : 'bottom',
    swipeEnabled:false,
    headerMode :'none'
})
StackBeranda.navigationOptions = ({navigation}) => {
    let tabBarVisible = false

    let routeName = navigation.state.routes[navigation.state.index].routeName
    if (routeName == 'Menu' ){
        tabBarVisible = true

    }return {
        tabBarVisible
    }
} 

const StackRoot = createStackNavigator ({
    login : Login,
    register : Register,
    home : HomeTab
},{
    // initialRouteName : 'home',
    headerMode : 'none'
})

export const StackContainer = createAppContainer(StackRoot)