import type { StaticParamList } from '@react-navigation/native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewAction from '../../../screens/add-action';
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
        'new-action': NewAction,
    },
});

const RootNavigation = createStaticNavigation(RootStack);

export type RootStackParamList = StaticParamList<typeof RootStack>;

export default RootNavigation;
