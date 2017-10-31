import React from 'react';
import Yleft from './child/left.jsx';
import {connect} from 'react-redux';
import * as ClassifyAction from './classifyAction';

class Yclassify extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Yleft />
            </div>
        )
    }
}

export default connect((state)=>{
    return state.Classify;
}, ClassifyAction)(Yclassify)
