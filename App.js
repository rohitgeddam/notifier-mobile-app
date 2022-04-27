import {Provider} from 'react-redux';
import { store } from './store'

import IndexScreen from './IndexScreen'

export default function App() {
 
  return (
    <Provider store={store}>
      <IndexScreen/>
    </Provider>
  );
}
