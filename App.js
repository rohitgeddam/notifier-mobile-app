import {Provider} from 'react-redux';
import { store } from './store'

import IndexScreen from './IndexScreen'
import Toast from 'react-native-toast-message';


export default function App() {

  return (
    <Provider store={store}>
      <IndexScreen/>
      <Toast />
    </Provider>
  );
}
