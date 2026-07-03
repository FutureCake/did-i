import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DidI } from '../../../screens/did-i';
import { IDid } from '../../../screens/i-did';

const RootStack = createNativeStackNavigator({
    initialRouteName: 'did-i',
    screenOptions: {
        headerShown: false,
    },
    screens: {
        'did-i': DidI,
        'i-did': IDid,
    },
});

const RootNavigation = createStaticNavigation(RootStack);

export default RootNavigation;
