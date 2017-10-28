import React from 'react';
import Yleft from './child/left.jsx';
import store from './store.js'
import {Provider} from 'react-redux'

class Yclassify extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Provider store={store}>
        <div>
          <Yleft />
        </div>
      </Provider>
    )
  }
}

export default Yclassify
