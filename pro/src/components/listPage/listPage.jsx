import React from 'react';
import Ysearch from './child/search.jsx';
import Ytlite from './child/tlite.jsx';
import {connect} from 'react-redux';

class YlistPage extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <div>
          <Ysearch />
          <div style={{width:"100%",height:'50px'}}></div>
          <Ytlite />
        </div>
    )
  }
}

export default connect()(YlistPage);
