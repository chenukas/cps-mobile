import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const Main = (props) => {

    const {fullName, email} = props.route.params.data.data;
    const [userArray, setUserArray] = useState([])

    useEffect (() => {
        fetch("http://10.0.2.2:3000/sign", {
        method: 'POST',
        headers:{
            'Content-type' : 'application/json'
        },
        body:JSON.stringify({
            email: email
        })
        }).then(res => res.json())
        .then(results => {
            //console.log(results)
            setUserArray(results.data)
        }).catch(err =>{
            console.log("error", err)
        })
    },[])

    return(
        <View style={styles.container}>
            <View style={styles.darkOverlay}>
                <Text style={styles.text1}>Welcome</Text>
                <Text style={styles.text}>{fullName}</Text>
            </View>

            <Button icon="login" style={styles.button1} mode="contained" onPress={() => console.log("press")}>
                View Products
            </Button>

            <Button icon="login" style={styles.button} mode="contained" onPress={() => {props.navigation.navigate("CreateRequisition", {userArray})}}>
                Create Requisition
            </Button>

            <Button icon="login" style={styles.button} mode="contained" onPress={() => console.log("press")}>
                Place Order
            </Button>
        </View>
    )
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text1:{
        marginTop: 10,
        fontSize: 30,
        color: "#000",
        marginLeft: 70
    },
    text:{
        fontSize: 22,
        color: "#000",
        marginLeft: 100,
        fontWeight: "bold"
    },
    input:{
        margin: 6,
        paddingLeft: 5
    },
    darkOverlay: {
        backgroundColor: "#852d59",
        borderBottomEndRadius: 65,
        height: 100
    },
    button1: {
        padding: 10,
        margin: 6,
        marginTop:100,
        width: 400,
        borderRadius:50,
        backgroundColor:"#B60B2D"
    },
    button: {
        padding: 10,
        margin: 6,
        marginTop: 20,
        width: 400,
        borderRadius:50,
        backgroundColor:"#B60B2D"
    }

})