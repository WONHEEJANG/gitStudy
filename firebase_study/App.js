import React, { useState, useEffect } from "react";
import HomeScreen from "./Screens/HomeScreen";
import HomeScreenSkeleton from "./Screens/HomeScreenSkeleton";

/* Firebase Realtime Database */
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

/* Navigator */
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* SVG */
import { WithLocalSvg } from 'react-native-svg'
import Search from './icons/search.svg';
import SearchOutline from './icons/search-outline.svg';
import Settings from './icons/settings.svg';
import SettingsOutline from './icons/settings-outline.svg';
import Home from "./icons/home.svg";
import HomeOutline from "./icons/home-outline.svg";

// Hiding Yellow Log Box

import { Alert, LogBox, Image, StyleSheet } from 'react-native';
import LoginScreen from "./Screens/LoginScreen";
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications 

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
  const focusedColor = 'black'
  const unfocusedColor = 'lightgray'

  const [data, setData] = useState([])
  const [loginUser, setLoginUser] = useState([])

  const [isLoaded, setIsLoaded] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const employeeDBRef = ref(db, 'employees/');


  const LoginCallBack = (id, pw) => {

    if (!data.find(e => e.ID === `${id}`)) {
      Alert.alert(`사번을 확인해주세요.${id}`)
      return null
    }

    if (!data.find(e => e.PW === `${pw}`)) {
      Alert.alert(`비밀번호를 확인해주세요.${pw}`)
      return null
    }

    setIsLogin(true)
    console.log("[ 로그인성공 ]")
    setLoginUser(data.filter(e => e.ID === id)[0])
  }

  useEffect(() => {
    console.log(`loginUser 변화!!!${loginUser.Name}`);
  }, [loginUser]);

  useEffect(() => {
    onValue(employeeDBRef, (snapshot) => {
      const data_snapshot = snapshot.val();
      setData(data_snapshot)
      setIsLoaded(true)
      console.log("[ FETCHING COMPLETE ]")
      console.log(data_snapshot)
    });
  }, []);


  if (!isLogin) {
    return (
      <LoginScreen callback={LoginCallBack} />
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => { //tabBar Icon Custom

          if (route.name === '홈') {
            if (focused) return <WithLocalSvg width={size} height={size} fill={focusedColor} asset={Home} />
            else return <WithLocalSvg width={size} height={size} color={unfocusedColor} asset={HomeOutline} />
          }

          else if (route.name === '찾기') {
            if (focused) return <WithLocalSvg width={size} height={size} fill={focusedColor} asset={Search} />
            else return <WithLocalSvg width={size} height={size} color={unfocusedColor} asset={SearchOutline} />
          }

          else if (route.name === '설정') {
            // if (focused) return <WithLocalSvg width={size} height={size} fill={focusedColor} asset={Settings} />
            // else return <WithLocalSvg width={size} height={size} color={unfocusedColor} asset={SettingsOutline} />
            if (focused) return <WithLocalSvg width={size} height={size} fill={focusedColor} asset={Settings} />
            else return <Image style={styles.profile} width={size * 1.5} height={size  * 1.5}
              source={{ uri: loginUser.ImageURL.length > 0 ? loginUser.ImageURL : null }} />

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
        <Tab.Screen name="홈" component={() => isLoaded ? <HomeScreen userDB={data} loginUser={loginUser} /> : <HomeScreenSkeleton />} />
        <Tab.Screen name="찾기" component={() => isLoaded ? <></> : <></>} />
        <Tab.Screen name="설정" component={() => isLoaded ? <></> : <></>} />
      </Tab.Navigator>
    </NavigationContainer>


  );
};


const styles = StyleSheet.create({
  profile: {
    width: 30,
    height: 30,
    borderRadius: 30
  },
});

export default App;
