import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    TouchableHighlight
} from "react-native";
import {Fire} from '../support/firebase'
import {connect} from 'react-redux'
import Communications from 'react-native-communications';



class Detail extends Component {
    // state ={id:null}
    // componentDidMount (){
    //     this.setState({id:this.props.navigation.param('key')})
    // }

    hapus = (key) => {
        // alert(this.props.)
        Fire.database().ref('manager/'+this.props.user.id+'/employee').child(key).remove()
        .then((res)=>{
            alert('Employee data has been deleted')
            this.props.navigation.navigate('list')
        })
        .catch((err)=>{
            alert(err.massage)
        })
    }
    deleteEmployee=(id,name)=>{
        alert(id)
        Alert.alert('delete data', 'are you sure to delete '+name+'?',  [{text : 'Yes', onPress :()=> this.hapus(id)}, {text : 'Cancel'}]);
    }


    render() {
        const {getParam} = this.props.navigation
        return (
            <View style={styles.container}>
                <Text>{getParam('nama')}</Text>
                <Text>{getParam('shift')}</Text>
                <Text>{getParam('phone')}</Text>
                <Button title='Hapus Employee' onPress={()=>this.deleteEmployee(getParam('key'), getParam('nama'))}>
                </Button>
                <View style={{marginTop:10}}>
                <TouchableHighlight onPress={() => Communications.textWithoutEncoding(getParam('phone'), `Hello ${getParam('nama')}, Your upcoming shift is on ${getParam('shift')}`)}
                    style={{height : 50, width : 150 , borderWidth : 3, borderColor : "orange" ,backgroundColor : 'orange', justifyContent : "center"}}>
                    <Text style={{alignSelf : "center", color : 'white'}}>Send a text/iMessage</Text> 
                </TouchableHighlight>
                </View>                
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
        user : state.auth
    }
}



export default connect(mapStateToProps)(Detail)