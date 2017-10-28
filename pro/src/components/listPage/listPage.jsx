import React from 'react';
import Ysearch from './child/search.jsx';
import Ytlite from './child/tlite.jsx';
import store from './store.js'
import {Provider} from 'react-redux'

class YlistPage extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Provider store={store}>
        <div>
          <Ysearch />
          <div style={{width:"100%",height:'50px'}}></div>
          <Ytlite />
        </div>
      </Provider>
    )
  }
}

export default YlistPage
