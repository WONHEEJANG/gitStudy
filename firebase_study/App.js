import React, { useState, useEffect } from "react";
import HomeScreen from "./Screens/HomeScreen";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";



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



const App = () => {

  const [data, setData] = useState([])
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const employeeDBRef = ref(db, 'employees/');

  useEffect(() => {
    onValue(employeeDBRef, (snapshot) => {
      const data_snapshot = snapshot.val();
      setData(data_snapshot)
      console.log("FETCHING COMPLETE")
      console.log(data_snapshot)
    });
  }, []);

  return (
    <HomeScreen userDB = {data}/>
  );
};


export default App;
