import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label,Picker, Left,Right,Text,Button,Body,Title } from 'native-base';
import {View} from 'react-native'
import {Fire} from '../support/firebase'
import {connect} from 'react-redux'
class FloatingLabelExample extends Component {
    state={selected : '',data :{},idEdit:null }
    componentDidMount () {
        var db = Fire.database()
        var manager = db.ref('manager/'+this.props.user.id+'/employee')
        manager.on('value', (Item)=>{
            this.setState({data:(Item.val())})
        },(err)=>{
            console.log(err)
        })
    }

    obBtnSave = () => {
        var nama = ''
        var shift = ''
        var phone = ''
        if (this.InputNama){
            nama = this.InputNama
        }else {
            nama=this.state.data[this.state.idEdit].nama
        }
        if (this.InputPhone){
            phone = this.InputPhone
        }else {
            phone=this.state.data[this.state.idEdit].phone
        }
        if (this.state.selected!==''){
            shift = this.state.selected
        }else {
            shift=this.state.data[this.state.idEdit].shift
        }

        Fire.database().ref('manager/'+this.props.user.id+'/employee/'+this.state.idEdit).set({
            nama:nama,
            phone:phone,
            shift:shift
        })
        .then((res)=>{
            this.setState({selected:''})
            alert('Update Employee Success')
        })
        .catch((err)=>console.log(err))
    }


render() {
console.disableYellowBox = true
return (
    <Container>
    <Header>        
        <Body>
            <Title style={{marginLeft:20}}>EDIT</Title>
        </Body>
    </Header>
    <Content>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{paddingTop: 15, paddingLeft:15}}>
                <Label>Select Data</Label>
            </View>
            <View>
            <Picker style={{width:200}} note  mode="dropdown" selectedValue={this.state.idEdit} onValueChange={(val)=> this.setState({idEdit:val})}>
                <Picker.Item label='Select Name' value={null}/>
                    { this.state.data ?

                        Object.keys(this.state.data).map(val=>{
                            return(
                                <Picker.Item label={this.state.data[val].nama} value={val}/>
                            )
                        }) 
                        :
                        <Picker.Item label='data kosong' value={null}/>
                    }
                </Picker>
            </View>

        </View>
        <Form>
        <Item stackedLabel>
            <Label>Nama</Label>
            <Input onChangeText={(text)=>this.InputNama = text} defaultValue = {this.state.idEdit ? this.state.data[this.state.idEdit].nama :null}/>
        </Item>
        <Item stackedLabel>
            <Label>Phone</Label>
            <Input onChangeText={(text)=>this.InputPhone = text} defaultValue = {this.state.idEdit ? this.state.data[this.state.idEdit].phone :null}/>
        </Item>
        <Item last>
            <Left>
                <Text>Select Day</Text>
            </Left>
            <Right>
                <Picker selectedValue = {(this.state.selected&&this.state.idEdit) ?this.state.selected:(this.state.idEdit&&this.state.selected==='')? this.state.data[this.state.idEdit].shift :null} onValueChange={(value)=>this.setState({selected:value})} style={{width:120}} note  mode="dropdown">
                        <Picker.Item label='pilih' value={null}/>
                        <Picker.Item label='Monday' value='Mon'/>
                        <Picker.Item label='Tuesday' value='Tue'/>
                        <Picker.Item label='Wednesday' value='Wed'/>
                        <Picker.Item label='Thursday' value='Thu'/>
                        <Picker.Item label='Friday' value='Fri'/>
                        <Picker.Item label='Saturday' value='Sat'/>
                        <Picker.Item label='Sunday' value='Sun'/>
                </Picker>
            </Right>
            
        </Item>
        <Button style={{marginTop:20, marginHorizontal:15}} onPress={this.obBtnSave} block>
                    <Text>SAVE</Text>
                </Button>
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
export default connect (mapStateToProps)(FloatingLabelExample)