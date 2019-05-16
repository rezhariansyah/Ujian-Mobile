// import React, { Component } from "react";
// import { 
//     View,
//     Text,
//     StyleSheet
// } from "react-native";

// class Menu extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text>Menu</Text>
//             </View>
//         );
//     }
// }
// export default Menu;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });

import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native";

class MENU extends Component {
    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                <View style ={{flexDirection :'row', justifyContent:'space-between', marginTop:-100, marginHorizontal :20}}>
                    <TouchableHighlight onPress={()=>this.props.navigation.navigate('Add')} style={{height:100, width:100, borderWidth : 3, borderColor : 'orange'}}><Text>ADD</Text></TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.props.navigation.navigate('Edit')} style={{height:100, width:100, borderWidth : 3, borderColor : 'orange'}}><Text>EDIT</Text></TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.props.navigation.navigate('list')} style={{height:100, width:100, borderWidth : 3, borderColor : 'orange'}}><Text>LIST</Text></TouchableHighlight>
                </View>
            </View>
        );
    }
}
export default MENU;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});