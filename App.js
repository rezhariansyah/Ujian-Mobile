// import React, { Component } from "react";
// import { 
//   View,
//   Text,
//   StyleSheet,
//   Button
// } from "react-native";

// import {createStackNavigator,createAppContainer} from 'react-navigation'



// class HomePage extends Component {
//   hendleButton = () => {
//     this.props.navigation.navigate('loginRoute')
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>HomePage</Text>
//         <Button title='ke halaman login' onPress ={this.hendleButton}/>
//       </View>
//     );
//   }
// }



// class Login extends Component {
//   hendleButton = () => {
//     this.props.navigation.navigate('home')
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Login</Text>
//         <Button title='ke halaman HomePage' onPress ={this.hendleButton}/>
//       </View>
//     );
//   }
// }


// const stack = createStackNavigator({
//   home : HomePage,
//   loginRoute : Login
// },{
//   initialRouteName : 'home',
//   headerMode : 'node'
// })
// const createAppContainer1 = createAppContainer(stack)

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
// export default createAppContainer1

import React, {Component} from 'react'
import {StackContainer} from './src/routes/stackRoots'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import Reducer from './src/1.reducers'

const store = createStore(Reducer)

class App extends Component {
  render () {
    return (
      <Provider store={store}>
          <StackContainer/>
      </Provider>
    )
  }
}

export default App