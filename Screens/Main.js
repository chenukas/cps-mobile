import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, Image } from 'react-native';
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
                <View style={{flexDirection:"row"}}>
                    <Image
                    source={require(".././assets/logo.png")}
                    style={styles.profile}
                    />
                    <View>
                        <Text style={styles.text1}>Welcome</Text>
                        <Text style={styles.text}>{fullName}</Text>
                    </View>
                </View>
                
            </View>

            <Button icon="eye" style={styles.button1} mode="contained" onPress={() => {props.navigation.navigate("ViewStocks")}}>
                View Products
            </Button>

            <Button icon="lead-pencil" style={styles.button} mode="contained" onPress={() => {props.navigation.navigate("CreateRequisition", {userArray})}}>
                Create Requisition
            </Button>

            <Button icon="lead-pencil" style={styles.button} mode="contained" onPress={() => {props.navigation.navigate("ViewRequisition", {userArray})}}>
                Place Order
            </Button>

            <Button icon="eye" style={styles.button} mode="contained" onPress={() => {props.navigation.navigate("ViewOrder", {userArray})}}>
                View Orders
            </Button>

            <Button icon="logout" style={styles.button2} mode="contained" onPress={() => {props.navigation.navigate("Login")}}>
                Logout
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
        color: "#fff",
        marginLeft: 70,
        alignSelf:"center"
    },
    text:{
        fontSize: 22,
        color: "#fff",
        marginLeft: 50,
        fontWeight: "bold",
        alignSelf:"center"
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
    profile: {
        width: 100,
        height: 100,
        alignSelf:"center"
    },
    button1: {
        padding: 10,
        margin: 6,
        marginTop:20,
        width: 400,
        borderRadius:50,
        backgroundColor:"#B98307"
    },
    button2: {
        padding: 10,
        margin: 6,
        marginTop:130,
        width: 400,
        borderRadius:50,
        backgroundColor:"#B90707"
    },
    button: {
        padding: 10,
        margin: 6,
        marginTop: 20,
        width: 400,
        borderRadius:50,
        backgroundColor:"#B98307"
    }

})