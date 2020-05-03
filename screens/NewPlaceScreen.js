import React, { useState,useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import {useDispatch} from 'react-redux'
import Colors from "../constants/Colors";
import * as placesActions from '../store/place-action'
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker'

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const [image,setImage]=useState();
  const [selectedLocation,setSelectedLocation]=useState()
  const dispatch=useDispatch();

  const NewPlaceHandler = (text) => {
    setTitleValue(text);
  };

  const savePlaceHandler=()=>{
    dispatch(placesActions.addPlace(titleValue,image,selectedLocation));
    props.navigation.goBack();
  }
  const imageTakenHandler=imagePath=>{
    setImage(imagePath);
  }
  const LocationPickedHandler=useCallback(location=>{
      setSelectedLocation(location)
  },[]) 

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={NewPlaceHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler}/>
        <LocationPicker navigation={props.navigation} onLocationPicked={LocationPickedHandler}/>
        <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
export default NewPlaceScreen;
