import React, { useState, useEffect } from "react";
import HomeScreen from "./Screens/HomeScreen";
import HomeScreenSkeleton from "./Screens/HomeScreenSkeleton";

/* Firebase Realtime Database */ 
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

/* Navigator */
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

  const Tab = createBottomTabNavigator();

  const [data, setData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const employeeDBRef = ref(db, 'employees/');

  useEffect(() => {
    onValue(employeeDBRef, (snapshot) => {
      const data_snapshot = snapshot.val();
      setData(data_snapshot)
      setIsLoaded(true)
      console.log("FETCHING COMPLETE")
      console.log(data_snapshot)
    });
  }, []);

  return (
<NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => { //tabBar Icon Custom

            if (route.name === '홈') {
              // if(focused) return <Home width = {size} height = {size} fill={focusedColor}/>
              // else return <HomeOutline width = {size} height = {size} color={unfocusedColor}/>
            } 
            
            else if (route.name === '찾기') {
              // if(focused) return <Search width = {size} height = {size} fill={focusedColor}/>
              // else return <SearchOutline width = {size} height = {size} color={unfocusedColor}/>
            }

            else if (route.name === '설정') {
              // if(focused) return <Settings width = {size} height = {size} fill={focusedColor}/>
              // else return <SettingsOutline width = {size} height = {size} color={unfocusedColor}/>            
            }
          },
          
          tabBarLabelStyle: { //tabBar Font Custom
            fontSize: 12,
            fontWeight: "600",
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'black', //tabBar TextColor Custom
          tabBarInactiveTintColor: 'darkgray',
          headerShown: false //tabBar Header Hide
        })}
      >
        <Tab.Screen name="홈" component={() => isLoaded ? <HomeScreen userDB = {data}/> : <HomeScreenSkeleton/>} />
        <Tab.Screen name="찾기" component={() => {}}/>
        {/* <Tab.Screen name='설정' component={<></>} /> */}
      </Tab.Navigator>
    </NavigationContainer>

    
  );
};

export default App;
