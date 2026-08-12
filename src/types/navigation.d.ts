import type { RootStackParamList } from '../shared/navigation';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

