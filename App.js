import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true)

export default function App() {
    return (
        <Provider store={store}>
        <NavigationContainer>
            <Main />
        </NavigationContainer>
        </Provider>
    );
}
