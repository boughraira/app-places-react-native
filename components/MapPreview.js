import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';


const MapPreview = props => {
 
  return (
    <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <MapView style={styles.mapImage} region={props.location}  />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});

export default MapPreview;
