import React,{useState,useCallback,useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Platform } from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import Colors from '../constants/Colors';

const MapScreen = props => {
    const [selectedLocation,setSelectedLocation]=useState()
    const initialLocation = props.navigation.getParam('initialLocation');
    const readonly = props.navigation.getParam('readonly');





  const mapRegion = {
    latitude:initialLocation ? initialLocation.latitude :  35.627144787184584,
    longitude:initialLocation ? initialLocation.longitude :  10.892590954899786,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  };

  const selectLocationHandler=event=>{
    if (readonly) {
      return;
    }
    setSelectedLocation({
        latitude:event.nativeEvent.coordinate.latitude,
        longitude:event.nativeEvent.coordinate.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    })
}

  let markerCoordinates;
  if(selectedLocation){
      markerCoordinates={
          latitude:selectedLocation.latitude,
          longitude:selectedLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
      }
  }

  const savePickedLocationHandler=useCallback(()=>{
      if(!selectedLocation){
          return;
      }
    props.navigation.navigate('NewPlace',{pickedLocation:selectedLocation})
  },[selectedLocation]);
  useEffect(()=>{
      props.navigation.setParams({saveLocation:savePickedLocationHandler})
  },[savePickedLocationHandler])

  return <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler} >
      
       {markerCoordinates && <Marker title="Picked a Location" coordinate={markerCoordinates}/> } 

       
      </MapView>;
};

MapScreen.navigationOptions=navData=>{
    const saveFn=navData.navigation.getParam('saveLocation')
    const readonly = navData.navigation.getParam('readonly');
    if (readonly) {
      return {};
    }
    return{
        headerRight:()=>(
        <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
            <Text style={styles.headerButtonText}>
                Save
            </Text>
        </TouchableOpacity>
        )
        

    }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton:{
    marginHorizontal:20
  },
  headerButtonText:{
      fontSize:16,
       color:Platform.OS==='android' ? 'white' : Colors.primary 
  }
});

export default MapScreen;