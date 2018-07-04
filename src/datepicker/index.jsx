import React from 'react'

import './style/index.scss'

export default class Datepicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '2018-06-27'
        }
    }
    inputEnter = () => {
        console.log(1)
    }
    inputLeave = () => {
        this.setState({value: '2018-06-11'})
    }
    render() {
        const { value } = this.state;
        return (
            <div className="react-datepicker">
                <input type="text"
                    value={value}
                    onMouseEnter={this.inputEnter} 
                    onMouseLeave={this.inputLeave}
                />
            </div>
        )
    }
} 