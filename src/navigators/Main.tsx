import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDrawer from '../components/CustomDrawer/CustomDrawer';
import { useTheme } from '../hooks';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
``

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Homescreen} />
      {/* <Stack.Screen name="notifications" component={Notifications}  /> */}
      <Stack.Screen name="activeJobList" component={ActiveJobList} />
      <Stack.Screen name="JobdetailsClient" component={JobdetailsClient} />
      <Stack.Screen name="containerList" component={ContainerList} />
      <Stack.Screen name="clientMap" component={ClientMap} />
      <Stack.Screen name="driverMap" component={DriverMap} />
      <Stack.Screen name='ProofOfDelivery' component={ProofOfDelivery}/>
      <Stack.Screen name='clientPod' component={ClientPod}/>
      <Stack.Screen name='JobHistory' component={JobHistory}/>
      <Stack.Screen name='ClientHistory' component={ClientHistory}/>

    </Stack.Navigator>
  );
};
const DriversManagement = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DriversList" component={DriversList} />
      <Stack.Screen name="AddDriver" component={AddDriver} />
      <Stack.Screen name='ProofOfDelivery' component={ProofOfDelivery}/>
      <Stack.Screen name='clientPod' component={ClientPod}/>
      <Stack.Screen name='ClientHistory' component={ClientHistory}/>
      {/* <Stack.Screen name="containerList" component={ContainerList} />
      <Stack.Screen name="clientMap" component={ClientMap} />
      <Stack.Screen name="driverMap" component={DriverMap} /> */}
    </Stack.Navigator>
  );
};

// @refresh reset
const MainNavigator = () => {
  const { Colors, NavigationColors } = useTheme();
  const [userRole, setUserRole] = useState<string>('requester');

  useEffect(() => {
    if (Platform.OS === 'android') {
      NotificationListener();
    }
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.gradientRed,
        drawerActiveTintColor: Colors.white,
        drawerInactiveTintColor: NavigationColors.text,
        drawerLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 15,
          marginLeft: -15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          // unmountOnBlur: true
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      {/* <Drawer.Screen name="userFlow" component={UserFlow}
        options={{
          drawerItemStyle: { display: 'none' },
          unmountOnBlur: true
        }}
      /> */}

      <Drawer.Screen
        name="DriversManagement"
        component={DriversManagement}
        options={{
          drawerItemStyle: { display: 'none' },
          unmountOnBlur: true,
        }}
      />

      <Drawer.Screen
        name="myEvents"
        component={MyEvents}
        options={{
          drawerLabel: 'My Events',
          drawerIcon: ({ color }) => (
            <Ionicons name="calendar" size={22} color={color} />
          ),
        }}
      />

      {/* Donators Specific Tabs */}

      {userRole == 'donator' && (
        <Drawer.Screen
          name="totalRequest"
          component={TotalRequests}
          options={{
            // drawerItemStyle: { display: 'none' },
            unmountOnBlur: true,
          }}
        />
      )}

      {/* Requester Specific Tabs */}

      {userRole == 'requester' && (
        <>
          <Drawer.Screen
            name="requestForm"
            component={RequestForm}
            options={{
              drawerLabel: 'Make a Request',
              drawerIcon: ({ color }) => (
                <AntDesign name="form" size={22} color={color} />
              ),
              unmountOnBlur: true,
            }}
          />
          <Drawer.Screen
            name="myRequests"
            component={MyRequests}
            options={{
              drawerLabel: 'My Requests',
              drawerIcon: ({ color }) => (
                <FontAwesome5 name="list" size={22} color={color} />
              ),
            }}
          />
        </>
      )}

      {/* Requester Specific Tabs */}

      {userRole == 'Volunteer' && (
        <>
          <Drawer.Screen
            name="totalRequest"
            component={TotalRequests}
            options={{
              // drawerItemStyle: { display: 'none' },
              unmountOnBlur: true,
            }}
          />
          <Drawer.Screen
            name="requestApprovals"
            component={RequestApprovals}
            options={{
              // drawerItemStyle: { display: 'none' },
              unmountOnBlur: true,
            }}
          />
        </>
      )}

      <Drawer.Screen
        name="statistics"
        component={MyEvents}
        options={{
          drawerLabel: 'Statistics',
          drawerIcon: ({ color }) => (
            <Ionicons name="document-text" size={24} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="rating"
        component={MyEvents}
        options={{
          drawerLabel: 'Rating',
          drawerIcon: ({ color }) => (
            <AntDesign name="dotchart" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ongoingEvents"
        component={OngoingEvents}
        options={{
          drawerItemStyle: { display: 'none' },
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="userProfile"
        component={Userprofie}
        options={{
          drawerItemStyle: { display: 'none' },
          unmountOnBlur: true,
        }}
      />

      <Drawer.Screen
        name="thanks"
        component={Thanks}
        options={{
          drawerItemStyle: { display: 'none' },
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
