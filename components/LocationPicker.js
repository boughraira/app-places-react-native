import React,{useState,useEffect} from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import Colors from "../constants/Colors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapPreview from './MapPreview';

const LocationPicker = (props) => {
    const [fetchingLocation,setFetchingLocation]=useState(false);
    const [pickedLocation,setPickedLocation]=useState();

    const mapPickedLocation=props.navigation.getParam('pickedLocation')

    const {onLocationPicked}=props

    useEffect(() => {
      if(mapPickedLocation){
        setPickedLocation(mapPickedLocation)
        onLocationPicked(mapPickedLocation)
      }
      
    }, [mapPickedLocation,onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);

    if (result !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "okayy" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
  
    try {
        setFetchingLocation(true);
     const location= await Location.getCurrentPositionAsync({ timeout: 5000 });
    
     setPickedLocation({
      latitude:location.coords.latitude,
      longitude:location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
     })
     props.onLocationPicked({
      latitude:location.coords.latitude,
      longitude:location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
     })
    } catch (error) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location on the map",
        [{ text: "Okay" }]
      );
    }
    setFetchingLocation(false);
  };
  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation} >
        {fetchingLocation ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
         <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});
export default LocationPicker;
