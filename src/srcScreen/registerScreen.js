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


import React, { Component } from 'react';
import {ActivityIndicator}from 'react-native'
import { Container, Header, Content, Form, Item, Input,Button, Text, Left,Title,Body,View, Label, Icon } from 'native-base';
import {Fire} from './../support/firebase'
import {onLoginSuccess} from '../2.action'
import {connect} from 'react-redux'
import {StackActions,NavigationActions} from 'react-navigation'
import { tsIndexSignature } from '@babel/types';

class Register extends Component {

    state = {Password :'', confrimPassword :"", loading :false, error:''}

    componentDidUpdate(){
        if (this.props.user.email) {
            // this.props.navigation.navigate('home')
            const resetSction = StackActions.reset ({
                index :0 ,
                actions : [NavigationActions.navigate({routeName :'home'})]
                
            })
            this.props.navigation.dispatch(resetSction)
        }
    }

    onBtnRegisterClick = () => {
        if (this.inputEmail && this.state.Password&& this.state.confrimPassword){
            if(this.state.Password == this.state.confrimPassword){
                this.setState({loading:true})
                const auth = Fire.auth()
                auth.createUserWithEmailAndPassword(this.inputEmail, this.state.Password)
                .then((val)=>{
                    var {uid,email} = val.user
                    console.log(uid)
                    this.props.onLoginSuccess(email,uid)
                })
                .catch((err)=>{
                    this.setState({error : err.message, loading:false})
                })
            }else{
                this.setState({erro:'password dan confirm tidak sama', loading :false})
            }
            
        }else {
            this.setState({error:'ISI SEMUA !!!'})
        }
        
    }
    render() {
    
        const confrim = this.state.confrimPassword =="" ?
        <Item floatingLabel last>
                <Label>Confrim Password</Label>
                <Input onChangeText={(val)=>this.setState({confrimPassword:val})}  />
        </Item>:  
        this.state.confrimPassword !== this.state.Password ?      
        <Item floatingLabel last error>
                <Label>Confrim Password</Label>
                <Input onChangeText={(val)=>this.setState({confrimPassword:val})}  />
                <Icon name='close-circle'/>
        </Item>:
        <Item floatingLabel last success>
                <Label>Confrim Password</Label>
                <Input onChangeText={(val)=>this.setState({confrimPassword:val})} />
                <Icon name='checkmark-circle'/>
        </Item>
        return (
        <Container>
            <Header>
                
                <Body>
                    <Title style={{marginLeft:20}}>REGISTER</Title>
                </Body>
            </Header>
            <Content>
            <Form>
                <Item>
                <Input onChangeText={(text)=>this.inputEmail=text} placeholder="email" />
                </Item>
                <Item last>
                <Input onChangeText={(val)=>this.setState({Password:val})} placeholder="Password" />
                </Item>
                {confrim}
                <Button style={{marginTop:20, marginHorizontal:15}} onPress={this.onBtnRegisterClick} block >
                    {
                        this.state.loading
                        ?
                        <ActivityIndicator size="small" color="#00ff00" />
                        :
                        <Text>REGISTER</Text>
                    }
                </Button>
                <View style={{flexDirection:'row' ,justifyContent:'center', marginTop:30}}>
                    <Text onPress={()=> this.props.navigation.navigate('login')}>Sudah Punya Akun ? Login</Text>
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

export default connect(mapStateToProps, {onLoginSuccess})(Register)