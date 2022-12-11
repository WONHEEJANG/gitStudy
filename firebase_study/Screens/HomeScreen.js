import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, Image, View, Dimensions } from 'react-native'

import DetailModal from "../Components/DetailModal";

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height


const Item = ({ item, onPress }) => (
    <View height={deviceHeight * 0.25}
        width={deviceWidth * 0.4}
        alignItems={'center'}
        margin={deviceWidth * 0.025}>
        <TouchableOpacity onPress={onPress}>
            <Image width={100} height={100} source={{
                uri: item.ImageURL.length > 0 ? item.ImageURL : null
            }} style={styles.profileImage} />
            <Text style={styles.boldText}>{`${item.Name} ${item.Title}`}</Text>
            <Text style={styles.plainText}>{`${item.Department}`}</Text>
            <Text style={styles.plainText}>{`${item.Team}`}</Text>
        </TouchableOpacity>
    </View>
);

function HomeScreen({ navigation, userDB }) {

    const [data, setData] = useState(userDB)
    const [fillteredData, setFillteredData] = useState(userDB)

    const [modalVisible, setModalVisible] = useState(false)
    const [selectedData, setSelectedData] = useState({
        Name: "",
        Title: "",
        Rank: "",
        Major: "",
        YearOfAdmission: "",
        Department: "",
        Team: "",
        ImageURL: "null"
    });

    const modalCallBack = (requestClose) => {
        setModalVisible(false)
    }

    // For TextInput
    const onChangeText = text => {
        console.log("onchange!")
        setFillteredData(data.filter((item) => item.Name.includes(text) ||
            item.Title.includes(text) ||
            `${item.YearOfAdmission}`.includes(text) ||
            item.Major.includes(text) ||
            item.Department.includes(text) ||
            item.Team.includes(text) ||
            item.Rank.includes(text)
        ))
    }

    // For FlatList
    const renderItem = ({ item }) => {
        return (<Item item={item} onPress={() => {
            setSelectedData(item)
            setModalVisible(!modalVisible)
        }} />);
    };

    useEffect(() => {
        setData(userDB);
        setFillteredData(userDB);
    }, [userDB]);

    return (
    <SafeAreaView style={styles.safeAreaView}>
        <DetailModal modalVisible={modalVisible} selectedData={selectedData} callback={modalCallBack} />
        <TextInput style={styles.textInput} onChangeText={onChangeText} selectionColor={'black'} />
        <FlatList data={fillteredData}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            numColumns={2}
            width={deviceWidth * 0.9}
            columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 0
            }} styles={styles.flatList}
        />
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInput: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'lightgray',
        backgroundColor: 'lightgray',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        paddingLeft: 15
    },
    safeAreaView: {
        alignItems: 'center',
        flex: 1.0,
        backgroundColor: 'white'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    flatList: {
        marginBottom: 200
    },
    plainText: {
        textAlign: 'center',
        paddingTop: 7,
        fontSize: 13,
        color: 'gray'
    },
    boldText: {
        textAlign: 'center',
        paddingTop: 7,
        fontWeight: "bold",
        fontSize: 15

    },

});


export default HomeScreen;