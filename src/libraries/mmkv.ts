import { createMMKV } from "react-native-mmkv";

const mmkvStorage = createMMKV({
    id: 'did-i-store',
});

const persistentStorage = {
    getItem: (name: string) => mmkvStorage.getString(name) ?? null,
    setItem: (name: string, value: string) => mmkvStorage.set(name, value),
    removeItem: (name: string) => mmkvStorage.remove(name),
};

export default persistentStorage;