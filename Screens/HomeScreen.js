import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, Image, View, Dimensions } from 'react-native'

import DetailModal from "../Components/DetailModal";

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height


// for Item Component
const Item = ({ item, onPress }) => (
    <View height={deviceHeight * 0.25} width={deviceWidth * 0.4} alignItems={'center'}
        // backgroundColor = {'pink'} 
        margin={deviceWidth * 0.025}>
        <TouchableOpacity onPress={onPress}>
            <Image width={100} height={100} source={{
                uri: item.avatarUrl.length > 0 ? item.avatarUrl : null
            }} style={styles.profileImage} />
            <Text style={styles.boldText}>{`${item.Name} ${item.Title}`}</Text>
            <Text style={styles.plainText}>{`${item.Departure}`}</Text>
            <Text style={styles.plainText}>{`${item.Team}`}</Text>
        </TouchableOpacity>
    </View>
);

function HomeScreen({ }) {

    // User DB , For FlatList
    const [data, setData] = useState([{
        Name: "장원희",
        Title: "과장보",
        Rank: "5급",
        Major: "컴퓨터공학",
        YearOfAdmission: "12",
        Departure: "개인디지털플랫폼부",
        Team: "금융상품몰Cell",
        avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }, {
        Name: "이다솔",
        Title: "계장",
        Rank: "5급",
        Major: "중국어학",
        YearOfAdmission: "13",
        Departure: "상호디지털채널부",
        Team: "디지털마케팅팀",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
    }, {
        Name: "이예솔",
        Title: "계장보",
        Rank: "5급",
        Major: "통계학",
        YearOfAdmission: "17",
        Departure: "상호디지털채널부",
        Team: "디지털마케팅팀",
        avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
    }, {
        Name: "장은희",
        Title: "과장",
        Rank: "4급",
        Major: "통계학",
        YearOfAdmission: "06",
        Departure: "개인디지털플랫폼부",
        Team: "금융상품몰Cell",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
    },
    {
        Name: "장원희",
        Title: "과장보",
        Rank: "5급",
        Major: "컴퓨터공학",
        YearOfAdmission: "12",
        Departure: "개인디지털플랫폼부",
        Team: "금융상품몰Cell",
        avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }, {
        Name: "이다솔",
        Title: "계장",
        Rank: "5급",
        Major: "중국어학",
        YearOfAdmission: "13",
        Departure: "상호디지털채널부",
        Team: "디지털마케팅팀",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
    }, {
        Name: "이예솔",
        Title: "계장보",
        Rank: "5급",
        Major: "통계학",
        YearOfAdmission: "17",
        Departure: "상호디지털채널부",
        Team: "디지털마케팅팀",
        avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
    }, {
        Name: "장은희",
        Title: "과장",
        Rank: "4급",
        Major: "통계학",
        YearOfAdmission: "06",
        Departure: "개인디지털플랫폼부",
        Team: "금융상품몰Cell",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
    },
    {
        Name: "장원희",
        Title: "과장보",
        Rank: "5급",
        Major: "컴퓨터공학",
        YearOfAdmission: "12",
        Departure: "개인디지털플랫폼부",
        Team: "금융상품몰Cell",
        avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }, {
        Name: "이다솔",
        Title: "계장",
        Rank: "5급",
        Major: "중국어학",
        YearOfAdmission: "13",
        Departure: "상호디지털채널부",
        Team: "디지털마케팅팀",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
    }, {
        Name: "이예솔",
        Title: "계장보",
        Rank: "5급",
        Major: "통계학",
        YearOfAdmission: "17",
        Departure: "상호디지털채널부",
        Team: "디지털마케팅팀",
        avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
    }, {
        Name: "장은희",
        Title: "과장",
        Rank: "4급",
        Major: "통계학",
        YearOfAdmission: "06",
        Departure: "개인디지털플랫폼부",
        Team: "금융상품몰Cell",
        avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
    }])
    var [fillteredData, setFillteredData] = useState([...data])

    const [modalVisible, setModalVisible] = useState(false)
    const [selectedData, setSelectedData] = useState({
        Name: "",
        Title: "",
        Rank: "",
        Major: "",
        YearOfAdmission: "",
        Departure: "",
        Team: "",
        avatarUrl: "null"
    });

    const modalCallBack = (requestClose) => {
        setModalVisible(false)
    }

    // For TextInput
    const onChangeText = text => {
        setFillteredData(data.filter((item) => item.Name.includes(text) ||
            item.Title.includes(text) ||
            item.YearOfAdmission.includes(text) ||
            item.Major.includes(text) ||
            item.Departure.includes(text) ||
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

    return <SafeAreaView style={styles.safeAreaView}
    // backgroundColor={'red'}
    >
        <DetailModal modalVisible={modalVisible} selectedData={selectedData} callback = {modalCallBack}/>
        <TextInput style={styles.textInput} onChangeText={onChangeText} selectionColor={'black'} />
        <FlatList data={fillteredData}
            showsVerticalScrollIndicator={false} renderItem={renderItem} keyExtractor={(item, index) => index} numColumns={2}
            columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 0
            }} styles={styles.flatList}
            // backgroundColor={'blue'}
            width={deviceWidth * 0.9} />
    </SafeAreaView>
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
        backgroundColor : 'white'
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
        color : 'gray'
    },
    boldText: {
        textAlign: 'center',
        paddingTop: 7,
        fontWeight: "bold",
        fontSize: 15

    },

});


export default HomeScreen;