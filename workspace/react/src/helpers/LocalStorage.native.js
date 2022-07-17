import AsyncStorage from '@react-native-async-storage/async-storage';
import Runtime from '../Runtime';

class LocalStorage {
    static async getObject_(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (e) {
            Runtime.log('error', e);
        }
    }

    static async setObject_(key, value) {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            Runtime.log('error', e);
        }
    }

    static async getString_(key) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (e) {
            Runtime.log('error', e);
        }
    }

    static async setString_(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            Runtime.log('error', e);
        }
    }

    static async removeItem_(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            Runtime.log('error', e);
        }
    }
}

export default LocalStorage;
