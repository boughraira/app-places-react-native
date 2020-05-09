import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";

export const ADD_PLACE = "Add_PLACE";
export const SET_PLACE = "Set_Place";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&latlng=${location.latitude},${location.longitude}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
          "x-rapidapi-key":
            "",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Something went wrong!");
    }
    const address = resData.results[0].formatted_address;
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.latitude,
        location.longitude
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.inseretId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.latitude,
            lng: location.longitude,
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      console.log(dbResult);
      dispatch({ type: SET_PLACE, places: dbResult.rows._array });
    } catch (error) {
      throw error;
    }
  };
};
