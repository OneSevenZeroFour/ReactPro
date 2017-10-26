import React, { Component } from 'react';
import './checkbox.scss';

class CheckboxSelf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ischecked: false
        }
    }
    componentWillReceiveProps(nextProps) {
        let self = this;
        //console.log(this.props)
        //console.log('nextProps', nextProps)
        if (typeof nextProps.checked == 'boolean') {
            self.setState({
                ischecked: nextProps.checked
            })
            //console.log(self.state)
        }
    }
    componentDidMount() {
        let self = this;
        if (typeof this.props.checked == 'boolean') {
            self.setState({
                ischecked: this.props.checked
            })
            //console.log(self.state)
        }
        //console.log(this.props)
    }
    render() {
        return (
            <label className={`el-checkbox ${this.props.className}`}>
                <span className={`el-checkbox__input ${this.state.ischecked ? "is-checked" : ""}`}>
                    <span className="el-checkbox__inner"></span>
                    <input type="checkbox"
                        className="el-checkbox__original"
                        checked={this.state.ischecked}
                        onChange={this.props.onChange}
                        value={this.props.value}
                    />
                </span>
                <span className="el-checkbox__label">{this.props.title}</span>
            </label>
        )
    }
}

export default CheckboxSelf;