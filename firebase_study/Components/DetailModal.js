import React from "react";
import { StyleSheet, Modal, View, Image, Text, Dimensions, Pressable } from 'react-native'

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

function DetailModal({ modalVisible, selectedData, callback }) {
    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}>
            <Pressable style={styles.modalBackground} height={deviceHeight} width={deviceWidth}
            onPress={() => callback()}>
                <Pressable style={styles.modal}
                onPress={() => {}}> 
                    <Image width={1} height={1} source={{
                        uri: selectedData.ImageURL.length > 0 ? selectedData.ImageURL : null
                    }} style={styles.profileImage} />
                    <Text style={styles.boldText}>{`${selectedData.Name} ${selectedData.Title}`}</Text>
                    <View style={styles.textRow}>
                        <Text style={styles.plainText}>{`학번 / 학과`}</Text>
                        <Text style={styles.plainText}>{`${selectedData.YearOfAdmission} ${selectedData.Major}`}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.plainText}>{`사무소명`}</Text>
                        <Text style={styles.plainText}>{`${selectedData.Departure}`}</Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={styles.plainText}>{`팀명`}</Text>
                        <Text style={styles.plainText}>{`${selectedData.Team}`}</Text>
                    </View>

                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => callback()}>
                        <Text style={styles.buttonText}> 돌아가기 </Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>

    )
}


const styles = StyleSheet.create({
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        margin: 30
    },
    plainText: {
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 15,
    },
    boldText: {
        textAlign: 'center',
        paddingBottom: 10,
        fontWeight: "bold",
        fontSize: 18

    },
    button: {
        height: 45,
        width: deviceWidth * 0.4,
        borderRadius: 15,
        margin: 40,
        backgroundColor: 'rgba(98,49,245,1)',
        alignItems: 'center', // horizontal
        justifyContent: 'center' // vertical
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
    }
    ,
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: deviceHeight * 0.6,
        width: deviceWidth * 0.8,
        borderRadius: 30,
        // justifyContent: 'center', // vertical
    },
    textRow: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: deviceWidth * 0.8,
        paddingLeft: 20,
        paddingRight: 20
    }
});

export default DetailModal;