import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import MapView, {
  AnimatedRegion,
  Marker,
  MarkerAnimated,
  Region,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
// Import your GOOGLE_API_KEY
import { GOOGLE_API_KEY } from '../Form/GooglePlacesInput';

import { useTheme } from '../../hooks';
import 'react-native-url-polyfill';
import {
  getCurrentLocation,
  locationPermission,
} from '../../utils/HelperFuctions';
import Geolocation from 'react-native-geolocation-service';
import CustomBottomSheet from '../BottomSheet/BottomSheet';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Button from '../Button/Button';
import * as geolib from 'geolib';
import { useNavigation } from '@react-navigation/native';
import { useChangeDeliveryStatusMutation } from '../../services/modules/app';
import { err } from 'react-native-svg';
import LoadingModal from '../Loader/LoadingModal';
import { AuthState } from '../../store/auth';
import { useSelector } from 'react-redux';
import 'react-native-url-polyfill/auto';
import * as signalR from '@microsoft/signalr';

interface MapProps {}

const DriverMap: React.FC<MapProps> = (props: any) => {
  const { Gutters, darkMode, Images, Colors } = useTheme();
  const { height, width } = useWindowDimensions();
  const navigation: any = useNavigation();
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [changeDeliveryStatus, { isLoading: load }] =
    useChangeDeliveryStatusMutation();
  const intervalRef = useRef<any>(null);
  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<any>(null);
  const [getdistance, setDistance] = useState(0);
  const [isClosed, setIsClosed] = useState(false);
  const [connection, setConnection] = useState<any>('');
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [curentCoors, setCurrentCord] = useState<any>({
    latitude: '',
    longitude: '',
  });
  const [ws, setWs] = useState(null);
  const { user, userType }: any = useSelector<any>(
    (state: { auth: AuthState }) => state.auth,
  );
  const [state, setState] = useState({
    curLoc: {
      latitude: Number(props.item.pickup_Latitude),
      longitude: Number(props.item.pickup_Longitude),
    },
    destinationCords: {
      latitude: Number(props.item.dropoff_Latitude),
      longitude: Number(props.item.dropoff_Longitude),
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
    lastUpdateTime: null,
    // reach,
  });

  const {
    curLoc, //pickupLocation
    time,
    distance,
    destinationCords, //deliveryLocation
    isLoading,
    coordinate, //Current  Location
    heading,
    lastUpdateTime,
    // reach,
  } = state;

  const updateState = (data: any) => setState(state => ({ ...state, ...data }));


  useEffect(() => {
    const conn: any = new HubConnectionBuilder()
      .withUrl('http://api.loadnload.com/driverHub', {
        keepAliveInterval: 120000,
        serverTimeoutInMilliseconds: 600000,
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    const startConnection = async () => {
      try {
        await conn.start();
        console.log('Connected to SignalR hub');

          conn.on('CurrentLocationUpdate',((data:any)=>{
            console.log('client side location>>>>>>>>',{data})
            setCurrentCord({
              latitude: data.currentLatitude,
              longitude: data.currentLongitude
            })
          }))
        // }

        conn.onclose(async () => {
          if (!isClosed) {
            console.info('Connection lost, attempting to reconnect...');
            await startConnection();
          }
        });
      } catch (err) {
        console.log('Error while starting connection: ', err);
        setTimeout(startConnection, 5000);
      }
    };
    startConnection();

    setConnection(conn);
    return () => {
      setIsClosed(true);
      if (conn) {
        conn
          .stop()
          .then(() => {
            console.log('Connection closed.');
          })
          .catch((err: any) => {
            console.error('Error closing connection:', err);
          });
      }
    };
  }, [isClosed]);

  const animate = async (latitude: number, longitude: number) => {
    const newCoordinate: any = { latitude, longitude };
    console.log('>>>>>>');
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 3000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = async () => {
    const { latitude, longitude }: any = await getCurrentLocation();

    console.log(latitude, longitude, 'Press onCenter');
    const region: Region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    mapRef.current?.animateToRegion(region);
  };

  const fetchTime = (d: number, t: number) => {
    updateState({
      distance: d,
      time: t,
    });
  };

  const calculateDistance = (_coordinates: any) => {
    console.log({ destinationCords });
    const end = {
      latitude: Number(_coordinates?.latitude),
      longitude: Number(_coordinates?.longitude),
    };
    const start = {
      latitude: Number(curLoc?.latitude),
      longitude: Number(curLoc?.longitude),
    };
    if (
      isNaN(start.latitude) ||
      isNaN(start.longitude) ||
      isNaN(end.latitude) ||
      isNaN(end.longitude)
    ) {
      console.error('Invalid coordinate values:', { start, end });
      return;
    }
    let dis = geolib.getDistance(start, end);
    setDistance(dis / 1000);
    console.log('Calculated distance:', { distance: dis / 1000 });
    return dis;
  };


  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1, width: width, height: height * 0.33 }}
        initialRegion={{
          latitude: curLoc.latitude,
          longitude: curLoc.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        customMapStyle={darkMode ? mapCustomStyle : []}
      >
        {/* Live Location */}
        <Marker.Animated
          ref={markerRef}
          coordinate={{
            latitude: Number(curentCoors.latitude),
            longitude: Number(curentCoors.longitude),
          }}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <Image
            source={Images.icons.utradeTruck}
            style={{
              width: responsiveWidth(20),
              height: responsiveWidth(20),
              transform: [{ rotate: `${heading || 0}deg` }],
            }}
            resizeMode="contain"
          />
        </Marker.Animated>
        {/* Pickup Location */}
        <Marker
          coordinate={{
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
          }}
          title={'Pickup Location'}
        ></Marker>

        <MapViewDirections
          origin={curLoc}
          destination={{
            latitude: destinationCords.latitude,
            longitude: destinationCords.longitude,
          }}
          apikey={GOOGLE_API_KEY}
          strokeWidth={2.5}
          strokeColor={'red'}
          optimizeWaypoints={true}
          onStart={params => {}}
          onReady={result => {
            console.log(`Distance: ${result.distance} km`);
            console.log(`Duration: ${result.duration} min.`);
            fetchTime(result.distance, result.duration),
              mapRef.current?.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 10, // Adjust the padding as needed
                  bottom: height / 10, // Adjust the padding as needed
                  left: width / 10, // Adjust the padding as needed
                  top: height / 6,
                },
              });
          }}
          onError={errorMessage => {
            console.log(errorMessage, 'Error Message');
          }}
        />
        <Marker
          coordinate={{
            latitude: destinationCords.latitude,
            longitude: destinationCords.longitude,
          }}
          title="Dropoff Location"
        ></Marker>
      </MapView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 40,
          right: 10,
          backgroundColor: Colors.gradientRed,
          padding: 10,
          borderRadius: 25,
        }}
        onPress={onCenter}
      >
        <MaterialIcons name="my-location" size={30} color={Colors.white} />
      </TouchableOpacity>
      {/* <CustomBottomSheet /> */}
      {load && <LoadingModal visible={isLoading || load} />}
    </View>
  );
};

export default DriverMap;

const mapCustomStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];
