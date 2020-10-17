import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet,ActivityIndicator, FlatList, ScrollView, Alert, RefreshControl, SafeAreaView } from 'react-native';
import {Card, FAB, Button} from 'react-native-paper';

const ViewRequisition = (props) => {

    const {_id, fullName, site} = props.route.params.userArray;
    console.log(fullName)

    const [data, setData ]  = useState([])
    const [loading, setLoading] = useState(true)
    const [siteManagerId, setSiteManagerId] = useState(_id)

    const [orderID, setOrderID] = useState("")
    const [status, setStatus] = useState("pending")

    useEffect (() => {
        fetch("http://10.0.2.2:3000/getOrderNumber")
        .then(res => res.json())
        .then(results => {
            setOrderID(results.data)
        })
    },[])

    useEffect (() => {
        fetch("http://10.0.2.2:3000/viewRequisitions", {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                siteManagerId: siteManagerId
            })
        }).then(res => res.json())
        .then(results => {
            console.log(results.data)
            setData(results.data)
            setLoading(false)
        })
    },[]);

    const renderList = ((item) => {
        return(
            <Card style={styles.myCard}>
                <View style={styles.cardView}>
                    <View style={{marginLeft:20}}>
                        <View style={{flexDirection:"row"}}>
                            <View>
                                <Text style={styles.text}>{item.requisitionID}</Text>
                                <Text style={styles.text2}>{item.status}</Text>
                            </View>
                            <Button icon="arrow-up-bold" color="#ffc221" 
                            style={{position:"absolute", marginBottom: 6, paddingBottom:20, marginLeft:170, width:200, height: 30, marginTop:20, alignSelf:"center" }} 
                            mode="contained" 
                            disabled={item.status === 'Approved'?'':'true'}
                            onPress={() => _placeOrder(item._id)}>
                                Place Order
                            </Button>
                            </View>
                                  
                        </View>    
                    </View>   
            </Card>           
        );
    });

    const _placeOrder = (requisitionID) => {
        setLoading(true)

        fetch("http://10.0.2.2:3000/orders", {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                orderID:orderID,
                requisitionID: requisitionID,
                status: status
            })
        }).then(res => res.json())
        .then(data =>{

            if(data.success == false){
                //console.log(data)
                Alert.alert("Order validation failed")
            }
            else{

            fetch("http://10.0.2.2:3000/getOrderNumber")
            .then(res => res.json())
            .then(results => {
                setOrderID(results.data)
            })
    
            fetch("http://10.0.2.2:3000/viewRequisitions", {
                    method: 'POST',
                    headers:{
                        'Content-type' : 'application/json'
                    },
                    body:JSON.stringify({
                        siteManagerId: siteManagerId
                    })
                }).then(res => res.json())
                .then(results => {
                    console.log(results.data)
                    setData(results.data)
                    setLoading(false)
                })


                Alert.alert(`Successfully Placed Order`)
            }
            
        }).catch(err =>{
            console.log("error", err)
        })
        

        

    }

    return(
        <View style={styles.darkOverlay}>
            <Text style={styles.text1}>Requisitions</Text>
                <View style={styles.darkOverlay1}>
                    <View style={{marginTop: 25, marginBottom:30}}>
                            {
                                loading?
                                <ActivityIndicator size="large" color="Colors.red800" />
                                :
                                <FlatList 
                                    data = {data}
                                    renderItem = {({item}) => {
                                        return renderList(item)
                                    }}
                                    keyExtractor={item => item._id}
                                />
                            }
                    </View>

                </View>
                
        </View>
            
        
    )
}
export default ViewRequisition;

const styles = StyleSheet.create({

    myCard: {
        margin: 7
    },
    cardView: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        borderRadius:10,
        borderWidth:2,
        borderColor:"#000"
    },
    text:{
        fontSize: 20,
        marginLeft: 10,
        padding: 5,
        color: '#000',
        fontWeight:"bold"
    },
    text2:{
        fontSize: 20,
        marginLeft: 10,
        padding: 5,
        color: '#000',
    },
    text1:{
        fontSize:30,
        fontWeight:"bold",
        fontFamily: "courier",
        alignSelf: "center",
        color:"#fff"
    },
    darkOverlay: {
        backgroundColor: "#852d59",
        height: "100%",
        flex:1
    },
    darkOverlay1:{
        backgroundColor: "#fff",
        height:"98%",
        borderTopLeftRadius:40,
        borderTopRightRadius:40
    },
    input:{
        position:"absolute",
        marginBottom: 6,
        paddingLeft:15,
        marginLeft:300,
        width:0,
        height: 30
    }
})