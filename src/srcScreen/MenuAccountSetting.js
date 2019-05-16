import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import {Fire} from '../support/firebase'
import {onLoginSuccess} from '../2.action'
import {connect} from 'react-redux'
import {StackActions,NavigationActions} from 'react-navigation'


class AccountSetting extends Component {
    onLogOutPress = () => {
        Fire.auth().signOut()
        .then((val)=>{
            console.log(val)
            this.props.onLoginSuccess('','')
            const resetSction = StackActions.reset ({
                index :0 ,
                actions : [NavigationActions.navigate({routeName :'login'})]
            })
            this.props.navigation.dispatch(resetSction)
            // this.props.navigation.navigate('login')
        })
        .catch((err)=>console.log(err))
    }
    render() {
        return (
            <View style={styles.container}>
                <Button title='LOGOUT' onPress={this.onLogOutPress}>
                </Button>
            </View>
        );
    }
}
export default connect(null,{onLoginSuccess}) (AccountSetting)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});