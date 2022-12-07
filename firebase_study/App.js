import React, { useState, useEffect } from "react";
import { 
  TextInput, 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  View, 
  Dimensions, 
  Button 
} from 'react-native'

import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import DetailModal from "./Components/DetailModal";


const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height
const firebaseConfig = {
  apiKey: "AIzaSyBLeUe16wlLroQmzmj31BtdOo21ZLcNStM",
  authDomain: "fir-test-5ce77.firebaseapp.com",
  databaseURL: "https://fir-test-5ce77-default-rtdb.firebaseio.com",
  projectId: "fir-test-5ce77",
  storageBucket: "fir-test-5ce77.appspot.com",
  messagingSenderId: "1055117685802",
  appId: "1:1055117685802:web:b710ca8a0d815218f63f53",
  measurementId: "G-75VDC31XVB"
};



const Item = ({ item, onPress }) => (
  <View height={deviceHeight * 0.25} width={deviceWidth * 0.4} alignItems={'center'}
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




const App = () => {

  const [data, setData] = useState([])
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const employeeDBRef = ref(db, 'employees/');

  const [fillteredData, setFillteredData] = useState([])
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

  const renderItem = ({ item }) => {
    return (<Item item={item} onPress={() => {
      setSelectedData(item)
      setModalVisible(!modalVisible)
    }} />);
  };


  useEffect(() => {
    onValue(employeeDBRef, (snapshot) => {
      const data_snapshot = snapshot.val();
      setData(data_snapshot)
      setFillteredData(data_snapshot)
      console.log("FETCHING COMPLETE")
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
        <DetailModal modalVisible={modalVisible} selectedData={selectedData} callback = {modalCallBack}/>
        <TextInput style={styles.textInput} onChangeText={onChangeText} selectionColor={'black'} />
        <FlatList data={fillteredData}
            showsVerticalScrollIndicator={false} renderItem={renderItem} keyExtractor={(item, index) => index} numColumns={2}
            columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 0
            }} styles={styles.flatList}
            width={deviceWidth * 0.9} />
    </SafeAreaView>
  );
};



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


export default App;
