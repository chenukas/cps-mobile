import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, ScrollView, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const Login = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const _submitData = () => {
        fetch("http://10.0.2.2:3000/authenticate", {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                email: email,
                password: password
            })
        }).then(
            res => res.json()
        )
        .then(data =>{
            console.log("Hi")
            console.log(data.token)
            if(!data.token){
                Alert.alert(`Login is invalid`)
                navigation.navigate("Login")
                setEmail("")
                setPassword("")
            }
            else{
                fetch("http://10.0.2.2:3000/sign", {
                    method: 'POST',
                    headers:{
                        'Content-type' : 'application/json'
                    },
                    body:JSON.stringify({
                        email: email
                    })
                }).then(res => res.json())
                .then(data =>{
                    console.log(data.data.userType)
                    if(data.data.userType == 2){
                        Alert.alert(`Successfully Login`)
                        navigation.navigate("Main", {data})
                    }
                    else{
                        Alert.alert(`Login is valied for site manager`)
                    }
                     
                }).catch(err =>{
                    console.log("error", err)
                })
            }
        }).catch(err =>{
            console.log("error", err)
        })
    }

    return(
            <View style={styles.container}>
                <View style={styles.darkOverlay}>
                    <View>
                        <Text style={{marginTop:60, fontSize: 30, marginLeft:10,color:"#000", fontWeight: "bold"}}>Welcome To</Text>
                        <Text style={{marginBottom:20, fontSize: 30, textAlign:"center", color:"#000", fontWeight: "bold"}}>Procurement Controller</Text>
                    </View>
                    <TextInput
                        label="Email"
                        value={email}
                        left={<TextInput.Icon name="account"/>}
                        style={styles.input}
                        placeholder="Enter your Email"
                        mode="flat"
                        theme={theme}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        left={<TextInput.Icon name="onepassword"/>}
                        style={styles.input}
                        placeholder="Enter your Password"
                        mode="flat"
                        theme={theme}
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                    />               

                    <Button icon="login" style={styles.button} mode="contained" onPress={() => _submitData()}>
                        Login
                    </Button>
                </View>
                

            </View>
        
    );
}

const theme = {
    colors: {
      primary: 'red'
    },
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#852d59"
    },
    input:{
        margin: 6,
        paddingLeft: 5
    },
    button:{
        padding: 10,
        margin: 6,
        marginTop: 20,
        width: 400,
        borderRadius:50,
        backgroundColor:"#B60B2D"
    },
    darkOverlay: {
        marginTop:"20%",
        backgroundColor: "#fff",
        height:"80%",
        borderTopLeftRadius:60,
        borderTopRightRadius:200,
        borderBottomLeftRadius:200,
        borderBottomRightRadius:60
    }

})