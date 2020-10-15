import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { TextInput, Button, FAB } from 'react-native-paper';
import {Picker} from '@react-native-community/picker';

import Item from './Item'

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
}

const CreateRequisition = (props) => {

    const {_id, fullName, site} = props.route.params.userArray;
    //console.log(site.siteNo)

    const [requisitionID, setRequisitionID] = useState("")
    const [siteNo, setSiteNo] = useState(site.siteNo)
    const [siteId, setSiteId] = useState(site._id)
    const [siteManagerId, setSiteManagerId] = useState(_id)
    const [siteManagerName, setSiteManagerName] = useState(fullName)
    const [requireDate, setRequireDate] = useState("")
    const [requestDate, setRequestDate] = useState("")
    const [supplierName, setSupplierName] = useState("")
    const [prodName, setProdName] = useState("")
    const [qty, setQty] = useState("")
    const [items, setItems] = useState([])
    const [totalAmount, setTotalAmount] = useState("")
    const [status, setStatus] = useState("pending")
    const [suppliers, setSuppliers] = useState([])
    const [product, setProduct] = useState([])

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoading] = useState(true)

    const res = [];
    const res1 = [];


    useEffect (() => {
        fetch("http://10.0.2.2:3000/getRequisitionNumber")
        .then(res => res.json())
        .then(results => {
            setRequisitionID(results.data)
        })
    },[])

    useEffect (() => {
        fetch("http://10.0.2.2:3000/suppliers")
        .then(res => res.json())
        .then(results => {

            for(let i = 0; i < results.data.length; i++){
                res.push({
                    'supplier':results.data[i].supName,
                    'id':i     
                })
            }
            setSuppliers(res)
        })
    },[])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(100).then(() => setRefreshing(false));
    }, []);

    const products = items.map((val, key) => {
        return <Item key={key} keyval={key} val={val}
                    deleteMethod={()=> deleteItem(key)}
                    />
    })

    const addProducts = () => {
        console.log("Hii")
        
        if(prodName){

            console.log(prodName)
            items.push({
                'productId':prodName,
                'quantity':qty
            })
            setItems(items)
            setQty("")
        }

        console.log(items);
    }

    const generate = () => {
        setLoading(false)
        if(supplierName){
            const supName = supplierName
            console.log(supName)
            fetch("http://10.0.2.2:3000/supplierItem", {
                    method: 'POST',
                    headers:{
                        'Content-type' : 'application/json'
                    },
                    body:JSON.stringify({
                        supName: supName
                    })
                }).then(res => res.json())
                .then(data =>{
                    console.log(data.data.items.length)
                    for(let i = 0; i < data.data.items.length; i++){
                        res1.push({
                            'items':data.data.items[i].itemName,
                            'id':i     
                        })
                    }
                    setProduct(res1)

                }).catch(err =>{
                    console.log("error", err)
                })
        }
    }

    const deleteItem = (key) => {
        console.log(key);
        items.splice(key, 1);
        setItems(items)
        console.log(items);
    }

    const calculate = () =>{
        console.log(items.length)
        var i;
        var tot = 0;
        var quan = 0;
        console.log(items)
        for(i = 0; i < items.length; i++){
            console.log(items[i].quantity)
            quan = items[i].quantity * 1;
            tot = tot + quan;
        }
        setTotalAmount(tot.toString())
    }

    const _Submit = () => {
        fetch("http://10.0.2.2:3000/requisitions", {
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                requisitionID: requisitionID,
                siteManagerId: siteManagerId,
                requestDate: requestDate,
                requireDate: requireDate,
                siteId: siteId,
                supplierName: supplierName,
                items: items,
                totalAmount: totalAmount,
                status: status
            })
        }).then(res => res.json())
        .then(data =>{
            Alert.alert(`Successfully Added`)
        }).catch(err =>{
            console.log("error", err)
        })
    }

    return(
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
        <View style={styles.darkOverlay}>
            <Text style={styles.text1}>New Requisition</Text>
            
            <View style={styles.darkOverlay1}>
                
                    <View style={{flexDirection:"row", marginTop:30}}>
                        <TextInput
                                label="Requisition No"
                                value={requisitionID}
                                style={{marginLeft:10, width:"50%"}}
                                mode="outlined"
                                editable = {false}
                                theme={theme}
                                onChangeText={text => setRequisitionID(text)}
                        />
                        <TextInput
                                label="Request Date"
                                value={requestDate}
                                style={{marginLeft:10, width:"40%"}}
                                mode="outlined"
                                theme={theme}
                                onChangeText={text => setRequestDate(text)}
                        />

                    </View>

                    <View style={{flexDirection:"row", marginTop:10}}>
                        <TextInput
                            label="Site Manager Name"
                            value={siteManagerName}
                            style={{marginLeft:10, width:"50%"}}
                            editable = {false}
                            mode="outlined"
                            theme={theme}
                            onChangeText={text => setSiteManagerName(text)}
                        />
                        <TextInput
                            label="Require Date"
                            value={requireDate}
                            style={{marginLeft:10, width:"40%"}}
                            mode="outlined"
                            theme={theme}
                            onChangeText={text => setRequireDate(text)}
                        />
                    </View>

                    <TextInput
                            label="Site ID"
                            value={siteNo}
                            editable = {false}
                            style={{marginLeft:10, marginTop:10, width:"93%"}}
                            mode="outlined"
                            theme={theme}
                            onChangeText={text => setSiteNo(text)}
                    />

                        <View style={{borderWidth:2, width: 380, marginLeft: 10, marginTop: 10, borderRadius: 5, borderColor:"#948E8E"}}>
                            <Picker
                                selectedValue={supplierName}
                                style={{ marginLeft: 10, height: 50, width: 380}}
                                onValueChange={(itemValue, itemIndex) => setSupplierName(itemValue)}
                            >
                                {
                                suppliers.map((item, index) => {
                                    return(
                                    <Picker.Item label={item.supplier} value={item.supplier} key={item.id} />
                                    )
                                })}
                            </Picker>
                        </View>

                        <Button icon="login" style={styles.button} mode="contained" onPress={() => generate()}>
                                Success
                            </Button>

                    {
                        loading?
                        <ActivityIndicator size="large" color="#00ff00" />
                        :
                        <View>
                            <View style={{flexDirection:"row", marginTop:10}}>
                                <View style={{borderWidth:2, width: 200, marginLeft: 10, marginTop: 10, borderRadius: 5, borderColor:"#948E8E"}}>
                                    <Picker
                                        selectedValue={prodName}
                                        style={{ marginLeft: 10, height: 50, width: 200}}
                                        onValueChange={(itemValue, itemIndex) => setProdName(itemValue)}
                                    >
                                    {
                                    product.map((item, index) => {
                                        return(
                                        <Picker.Item label={item.items} value={item.items} key={item.id} />
                                        )
                                    })}
                                    </Picker>
                                </View>
                                <TextInput
                                    label="Quantity"
                                    value={qty}
                                    style={{marginLeft:10, width:"40%"}}
                                    mode="outlined"
                                    theme={theme}
                                    onChangeText={text => setQty(text)}
                                />
                            </View>

                            <FAB
                                style={styles.fab}
                                small={false}
                                icon="plus"
                                theme = {{colors:{accent:'blue'}}}
                                onPress={() => addProducts()}
                            />

                            <ScrollView style={styles.scrollContainer}>
                                {products}
                            </ScrollView>

                            <Button icon="login" style={styles.button} mode="contained" onPress={() => calculate()}>
                                CALCULATE
                            </Button>

                            <TextInput
                            label="Total Amount"
                            value={totalAmount}
                            editable = {false}
                            style={{marginLeft:20, width:"90%", marginBottom:10}}
                            mode="outlined"
                            theme={theme}
                            onChangeText={text => setTotalAmount(text)}
                            />

                            <Button icon="login" style={styles.button} mode="contained" onPress={() => _Submit()}>
                                Save
                            </Button>

                        </View>
                    }
            </View>
            
        </View>
        </ScrollView>
    )

}

const theme = {
    colors: {
      primary: 'red'
    },
};

export default CreateRequisition;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text1:{
        marginTop: 10,
        fontSize: 22,
        color: "#fff",
        fontWeight:"bold",
        textAlign:"center"
    },
    text:{
        fontSize: 22,
        color: "#000",
        marginLeft: 100,
        fontWeight: "bold"
    },
    darkOverlay: {
        backgroundColor: "#852d59",
        height: "100%"
    },
    darkOverlay1:{
        backgroundColor: "#fff",
        height:"95%",
        borderTopLeftRadius:40,
        borderTopRightRadius:40
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
    },
    fab: {
        position:'relative',
        marginTop: 5,
        width: 55,
        height: 55,
        borderRadius:50,
        marginLeft: "80%"
      }

})