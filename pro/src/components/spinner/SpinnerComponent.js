import React, {Component} from 'react';
import './Spinner.scss';

class Spinner extends Component{
    render(){        
        return (
            <div id="spinner">
                <div className="dk-spinner-mask"></div>
                <div className="dk-spinner dk-spinner-three-bounce">
                    <div className="dk-bounce1"></div>
                    <div className="dk-bounce2"></div>
                    <div className="dk-bounce3"></div>
                </div>
            </div>
        )
    }
}

export default Spinner;