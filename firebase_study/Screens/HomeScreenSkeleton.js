import React from "react";
import { TextInput, StyleSheet, Text, SafeAreaView, FlatList, View, Dimensions } from 'react-native'

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

function HomeScreenSkeleton({}) {

    const data = [{},{},{},{},{},{},{},{}]

    const renderItem = ({ item }) => {
        return (
        <View style = {styles.card}>
            <View width={100} height={100} style={styles.profileImage} />
            <View style={styles.boldText}/>
            <View style={styles.plainText}/>
            <View style={styles.plainText}/>
        </View>
        );
    };

    return (
    <SafeAreaView style={styles.safeAreaView}>
        <TextInput style={styles.textInput} selectionColor={'black'} />
        <FlatList data={data}
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
    card :{
        // backgroundColor: 'pink',
        height : deviceHeight * 0.25,
        width : deviceWidth * 0.4,
        alignItems : 'center',
        margin : deviceWidth * 0.025
    },
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
        borderRadius: 100,
        backgroundColor: 'lightgray',
        marginBottom : 10
    },
    flatList: {
        marginBottom: 200
    },
    plainText: {
        marginTop: 7,
        width: 100,
        height: 10,
        backgroundColor: 'lightgray',
    },
    boldText: {
        width: 100,
        height: 10,
        backgroundColor: 'lightgray',
    },

});

export default HomeScreenSkeleton;