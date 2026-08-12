import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActionEditor from '../../screens/action-editor';
import { DidI } from '../../screens/did-i';
import { IDid } from '../../screens/i-did';

const RootStack = createNativeStackNavigator({
    initialRouteName: 'did-i',
    screenOptions: {
        headerShown: false,
    },
    screens: {
        'did-i': DidI,
        'i-did': IDid,
        'action-editor': {
            screen: ActionEditor,
            params: {
                actionId: undefined,
            },
        },
    },
});

const RootNavigation = createStaticNavigation(RootStack);

export type RootStackParamList = {
    'did-i': undefined;
    'i-did': undefined;
    'action-editor': { actionId?: string } | undefined;
};

export default RootNavigation;
