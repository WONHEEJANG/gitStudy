import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, Text, TouchableOpacity, Image, View, KeyboardAvoidingView } from 'react-native'
import { BlurView } from "@react-native-community/blur";


const LoginScreen = ({ callback }) => {

    const [id, onChangeId] = React.useState("");
    const [pw, onChangePw] = React.useState("");
  

    return (<>
        <View style={styles.bgView}>
            <Image style={styles.bg} source={require('../icons/login_bg.jpeg')} />
            <BlurView style={styles.loginBg} blurAmount={25} blurType={'light'}>
                <View style={styles.loginForm}>
                    <TextInput style={styles.textInput} placeholder="사번" selectionColor={'black'} placeholderTextColor={'gray'} onChangeText={onChangeId} keyboardType={"number-pad"}/>
                    <TextInput style={styles.textInput} placeholder="비밀번호" selectionColor={'black'} placeholderTextColor={'gray'} onChangeText={onChangePw} secureTextEntry={true} marginBottom={60} onSubmitEditing={()=> callback(id,pw)}/>
                    
                    <TouchableOpacity style={styles.loginBtn} onPress={() => {
                            callback(id, pw)
                        }}>
                        <Text style={styles.loginBtnTxt}>로그인</Text>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </View>
    </>
    )
}

// <SafeAreaView style={styles.safeAreaView}>
//             <View style={styles.loginForm}>
// <Text> 사번 </Text>
// <TextInput style={styles.textInput} selectionColor={'black'} />
// <Text> 비밀번호 </Text>
// <TextInput style={styles.textInput} selectionColor={'black'} />
// <Button
//     title="Press me"
//     onPress={() => {
//         // Alert.alert('Simple Button pressed')
//         callback()
//     }}
// />
//             </View>
//         </SafeAreaView>

const styles = StyleSheet.create({
    bgView: {
        alignItems: 'center',
        flex: 1.0,
        justifyContent: 'center',
        zIndex: 1,
        elevation: 1,
        // position:'absolute'
    },

    bg: {
        alignItems: 'center',
        flex: 1.0,
        justifyContent: 'center',
        zIndex: 2,
        elevation: 2,
    },

    textInput: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'white',
        opacity: 0.6,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        paddingLeft: 15,
    },

    loginBtn: {
        backgroundColor: 'purple',
        opacity: 0.6,
        width: '60%',
        height: 40,
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center',
    },

    loginForm: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        // position: 'absolute',
        justifyContent: 'center',
        borderColor: 'white',
        shadowColor: 'white',
        opacity: 0.9,
        borderRadius: 40,
        borderWidth:0.4,
        zIndex: 3,
        elevation: 3
    },
    loginBg: {
        alignItems: 'center',
        borderRadius: 40,
        width: '80%',
        height: '50%',
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 2,
        elevation: 2
    },
    loginBtnTxt:{
        color:'white',
        fontWeight:'900',
        fontSize:15
        
    }
});

export default LoginScreen;