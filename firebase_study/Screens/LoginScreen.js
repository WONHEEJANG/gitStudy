import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Text, SafeAreaView, Alert, TouchableOpacity, Image, View, Dimensions, Button } from 'react-native'


const LoginScreen = ({ callback }) => {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.loginForm}>
                <Text> 사번 </Text>
                <TextInput style={styles.textInput} selectionColor={'black'} />
                <Text> 비밀번호 </Text>
                <TextInput style={styles.textInput} selectionColor={'black'} />
                <Button
                    title="Press me"
                    onPress={() => {
                        // Alert.alert('Simple Button pressed')
                        callback()
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        alignItems: 'center',
        flex: 1.0,
        backgroundColor: 'white',
        justifyContent: 'center'
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

    loginForm: {
        alignItems: 'center',
        width: '100%',
        height: '50%',
        backgroundColor: 'pink',
        justifyContent: 'center'
    },
});

export default LoginScreen;