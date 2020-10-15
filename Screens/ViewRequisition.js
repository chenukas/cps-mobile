import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet,ActivityIndicator, FlatList, ScrollView } from 'react-native';
import {Card, FAB, Button} from 'react-native-paper';

const ViewRequisition = () => {

    const [data, setData ]  = useState([])
    const [loading, setLoading] = useState(true)

    useEffect (() => {
        fetch("http://10.0.2.2:3000/requisitions")
        .then(res => res.json())
        .then(results => {
            console.log(results.data)
            setData(results.data)
            setLoading(false)
        })
    },[])

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
                                    disabled={item.status === 'approved'?'':'true'} 
                                    onPress={() => console.log("press")}>
                                        Place Order
                                    </Button>
                                </View>
                                  
                            </View>    
                        </View>   
            </Card>           
        );
    })

    return(
        <View style={styles.darkOverlay}>
            <Text style={styles.text1}>Requisitions</Text>
            <View style={styles.darkOverlay1}>
                <View style={{marginTop: 25}}>
                        {
                            loading?
                            <ActivityIndicator size="large" color="#00ff00" />
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
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