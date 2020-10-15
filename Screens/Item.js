import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Item extends React.Component {
    render(){
        return (
            <View key={this.props.keyval} style={styles.note}>

                <Text style={styles.noteText}>{this.props.val.productName}</Text>
                <Text style={styles.noteText}>{this.props.val.quantity}</Text>

                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
                    <Icon
                        name="delete"
                        color={"#000"}
                        size={30}
                    />
                </TouchableOpacity>

            </View>
          );
    }
  
}

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        flex: 1,
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        marginTop: 10,
        borderColor: "#7B0373",
        width: "100%",
        alignSelf: "center",
        marginBottom: 10,
    },
    noteText: {
        marginLeft: 10,
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#7B030A',
        color:"#000"
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    noteDeleteText: {
        color: 'white',
    }
  });