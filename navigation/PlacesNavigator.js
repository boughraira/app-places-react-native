import  {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {Platform} from 'react-native'
import PlacesListScreen from '../screens/PlacesListScreen';
import PLaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Colors'

const placesNavigator=createStackNavigator({
    places:PlacesListScreen,
    placeDetail:PLaceDetailScreen,
    NewPlace:NewPlaceScreen,
    Map:MapScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS ==='android' ? Colors.primary : ''
        },
        headerTintColor:Platform.OS ==='android' ? 'white' : Colors.primary
    }
});

export default createAppContainer(placesNavigator);
