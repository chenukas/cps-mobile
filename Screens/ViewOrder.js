import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ActivityIndicator, FlatList} from 'react-native';
import {Card} from 'react-native-paper';

const ViewOrder = (props) => {


    //pass the userArray from Main Page to View Order page
    const {_id} = props.route.params.userArray;

    //Define the states
    const [data, setData ]  = useState([])
    const [loading, setLoading] = useState(true)
    const [siteManagerId, setSiteManagerId] = useState(_id)


    let  res = [];

    //call the order retrieve end point
    useEffect (() => {
        fetch("http://10.0.2.2:3000/orders")
        .then(res => res.json())
        .then(results => {
            
            for(let i = 0; i < results.data.length; i++){
                if(siteManagerId == results.data[i].requisitionID.siteManagerId._id){

                    res.push({
                        'orderID':results.data[i].orderID,
                        'requisitionID':results.data[i].requisitionID.requisitionID,
                        'status':results.data[i].status,
                        'id':i
                    })
                }
            }
            setData(res)
            setLoading(false)
        })
    },[])

    //create a card list
    const renderList = ((item) => {
        return(
            <Card style={styles.myCard}>
                <View style={styles.cardView}>
                    <View style={{marginLeft:20}}>
                        <View style={{flexDirection:"row"}}>
                            <View>
                                <Text style={styles.text}>{item.orderID}</Text>
                                <Text style={styles.text3}>{item.requisitionID}</Text>
                            </View>
                            <Text style={styles.text2}>{item.status}</Text>  
                        </View>          
                    </View>    
                </View>   
            </Card>           
        );
    });

    return(
        <View style={styles.darkOverlay}>
            <Text style={styles.text1}>Orders</Text>
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
                                    keyExtractor={item => item.id.toString()}
                                />
                            }
                    </View>

                </View>
                
        </View>
            
        
    )
}
export default ViewOrder;

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
    text3:{
        fontSize: 20,
        marginLeft: 10,
        padding: 5,
        color: '#000',
        fontWeight:"bold"
    },
    text2:{
        fontSize: 20,
        marginLeft: 150,
        marginTop:10,
        padding: 5,
        color: '#065803',
        fontWeight:"bold"
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