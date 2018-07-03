import React from 'react'

import './style/index.scss'

export default class Datepicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '2018-07-03',
            openModal: false
        }
    }
    componentWillMount(){
        this.getDays()
    }
    inputEnter = () => {
        this.setState({openModal: true})
    }
    inputLeave = () => {
        this.setState({openModal: false}) 
    }
    getDays = () => {
        const day = new Date(this.state.value), 
            month = day.getMonth(),   //月份
            year = day.getFullYear(),
            preMonthlastDay = new Date(year,month,0), //上个月的最后一天
            nowMonthLastDay = new Date(year,month+1,0), //这个月的最后一天
            nowMonthDays = new Date(year,month+1,0).getDate(), //这个月总共有多少天
            lastWeek = preMonthlastDay.getDay(); //上个月的最后一天是周几;
        let days_middle = [],days_pre=[],days_next=[];
        for(let i = 1;i <= nowMonthDays;i++){
            days_middle.push({
                text:i,
                day: new Date(year,month,i)
            })
        }
        if(lastWeek !== 0){
            for(let i = 0;i < lastWeek;i++){
                days_pre.push({
                    text:preMonthlastDay.getDate() - i,
                    day: new Date(year,month,(preMonthlastDay.getDate() - i))
                })
            }
        }
        console.log(days_pre)
        console.log(days_middle)

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
                    <div className="datepicker-modal-top">
                        <span className="top-left"></span>
                        <span className="top-content">2018-07</span>
                        <span className="top-right"></span>
                    </div>
                    <div className="datepicker-modal-content">

                    </div>
                </div>}
            </div>
        )
    }
} 