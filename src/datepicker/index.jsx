import React from 'react'

import './style/index.scss'

export default class Datepicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '2018-06-27',
            openModal: false
        }
    }
    inputEnter = () => {
        this.setState({openModal: true})
    }
    inputLeave = () => {
        this.setState({openModal: false}) 
    }
    render() {
        const { value,openModal } = this.state;
        return (
            <div className="react-datepicker">
                <div className="datepicker-input" onMouseOver={this.inputEnter} onMouseOut={this.inputLeave}>
                    <input readOnly={true} type="text" className="c-input" value={value} placeholder="请选择日期"/>
                    <span className="datepicker-icon"></span>
                </div>
                {openModal && <div className="datepicker-modal">
                    
                </div>}
            </div>
        )
    }
} 