// import React, { Component } from "react";
// import { 
//     View,
//     Text,
//     StyleSheet,
//     Image
// } from "react-native";
// import HomeScreen from './src/srcScreen/HomeScreen'
// import LoginScreen from './src/srcScreen/LodinScreen'
// import {createDrawerNavigator, createAppContainer, DrawerItems} from 'react-navigation'

// const CustorDrawer = (props) => {
//     return (
//         <View style={{flex:1}}>
//             <View>
//                 <Image style={{width:40,height:40 }}  source={{uri:'data:image/png;base64,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'}}/>
//                 <DrawerItems {...props}/>
//             </View>
//         </View>
//     )
// }

// const Drawer = createDrawerNavigator ({
//     home :HomeScreen ,
//     login : LoginScreen
// },{
//     contentComponent : CustorDrawer
// })

// const DrawerContainer = createAppContainer (Drawer)

// class HOME extends Component {
//     render() {
//         return (
//             <DrawerContainer/>
//         );
//     }
// }
// export default HOME;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });