import type { RootStackParamList } from '../shared/features/navigation';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

