// import React, { Component } from "react";
// import { 
//     View,
//     Text,
//     StyleSheet,
//     Button
// } from "react-native";

// class Login extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text>Login</Text>
//                 <Button title = 'REGISTER' onPress={()=>this.props.navigation.navigate('register')}/>
//                 <Button title = 'LOGIN' onPress={()=>this.props.navigation.navigate('home')}/>
//             </View>
//         );
//     }
// }
// export default Login;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });


import React from 'react';
import {ActivityIndicator}from 'react-native'
import { Container, Header, Content, Form, Item, Input,Button, Text, Left,Title,Body,View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Fire} from './../support/firebase'
import {connect} from 'react-redux'
import {onLoginSuccess} from '../2.action/'
import {StackActions,NavigationActions} from 'react-navigation'

class LoginScreen extends React.Component {
    // state = {loading:false, error:''}
    state = {loading:true, error:''}

    componentDidMount (){
        Fire.auth().onAuthStateChanged((user)=> {
            if (user){
                this.props.onLoginSuccess(user.email,user.uid)

            }else{
                this.setState({loading:false})
            }
        })
    }
    componentDidUpdate(){
        if (this.props.user.email) {
    //         // this.props.navigation.navigate('home')
    //         const resetSction = StackActions.reset ({
    //             index :0 ,
    //             actions : [NavigationActions.navigate({routeName :'home'})]
                
    //         })
    //         this.props.navigation.dispatch(resetSction)
                const resetSction = StackActions.reset ({
                    index :0 ,
                    actions : [NavigationActions.navigate({routeName :'home'})]
                })
                this.props.navigation.dispatch(resetSction)
                this.setState({loading:false})
        }
    }

    onBtnLoginClick = () => {
        this.setState({loading:true})
        const auth = Fire.auth()
        auth.signInWithEmailAndPassword(this.InputEmail,this.InputPassword)
        .then((val)=>{
            var {uid,email} = val.user
            console.log(uid)
            this.props.onLoginSuccess(email,uid)
        })
        .catch((err)=>{
            this.setState({error : err.message, loading:false})
        })
    }
    render() {
        if (this.state.loading){
            return(
                <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                    <ActivityIndicator size='large' color='black'/>
                </View>
            )
        }
        console.disableYellowBox = true
        return (
        <Container>
            <Header>
                
                <Body>
                    <Title style={{marginLeft:20}}>LOGIN{this.props.user.email}</Title>
                    
                </Body>
            </Header>
            <Content>
            <Form>
                <Item>
                <Input onChangeText={(text)=>this.InputEmail = text} placeholder="Username" />
                </Item>
                <Item last>
                <Input onChangeText={(text)=>this.InputPassword = text} placeholder="Password" />
                </Item>
                <Button onPress={this.onBtnLoginClick} style={{marginTop:20, marginHorizontal:15}} block>
                    {
                        this.state.loading
                        ?
                        <ActivityIndicator size="small" color="#00ff00" />
                        :
                        <Text>LOGIN</Text>
                    }
                </Button>
                
                <View style={{flexDirection : 'row', justifyContent:'center', marginTop:15}}>
                    <View style={{height : 60,width : 60}}>
                        <Icon name ='facebook' size={40}/>
                    </View>
                    <View style={{height : 60,width : 60}}>
                        <Icon name ='google' size={40}/>
                    </View>
                    <View style={{height : 60,width : 60}}>
                        <Icon name ='twitter' size={40}/>
                    </View>
                </View>
                <View style={{flexDirection:'row' ,justifyContent:'center', marginTop:30}}>
                    <Text onPress={()=> this.props.navigation.navigate('register')}>Bekum Punya Akun ? Register</Text>
                </View>
                {this.state.error 
                ?
                    <View style={{paddingVertical:15, backgroundColor: 'red', marginHorizontal :15}}>
                        <View style={{position:'absolute', top:3, right:3}}>
                            <Icon  name='close-circle' fontSize={7} color = 'white' onPress={()=>this.setState({error:''})}/>
                        </View>    
                            <Text style={{color:'white',alignSelf:'center'}}>{this.state.error}</Text>
                    </View>
                :
                    null
                }
            </Form>
            </Content>
        </Container>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user : state.auth
    }
}
export default connect(mapStateToProps,{onLoginSuccess})(LoginScreen)