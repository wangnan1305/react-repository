import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, classNames, nextDay } from './tools/index';
import DaySelect from './components/daySelect';
import WeekSelect from './components/weekSelect';

import './style/index.scss';

export default class Datepicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowValue: formatDate(new Date(), 'yyyy-MM-dd'), // 当前时间
            selectedValue: props.defaultValue || '', // 选中时间
            loopValue: props.defaultValue || formatDate(new Date(), 'yyyy-MM-dd'),
            // weekText: ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d'],
            openModal: false,
            ctxLine: 6,
            daysMap: [],
            whichSelect: 'day'
        };
    }
    componentWillMount() {
        const { nowValue, selectedValue } = this.state;
        const value = selectedValue || nowValue;
        this.setState({
            daysMap: this.getDays(new Date(value))
        });
    }
    getDays = date => {
        const { ctxLine } = this.state;
        const day = new Date(formatDate(date, 'yyyy-MM-dd')),
                month = day.getMonth(), // 月份
                year = day.getFullYear(),
                preMonthlastDay = new Date(year, month, 0), // 上个月的最后一天
                nowMonthLastDay = new Date(year, month + 1, 0), // 这个月的最后一天
                nowMonthDays = new Date(year, month + 1, 0).getDate(), // 这个月总共有多少天
                lastWeek = preMonthlastDay.getDay(), // 上个月的最后一天是周几
                nowWeek = nowMonthLastDay.getDay(); // 这个月最后一天是周几

        const daysMiddle = [], daysPre = [], daysNext = [];
        let days = [];
        for (let i = 1; i <= nowMonthDays; i++) {
            daysMiddle.push({
                text: i,
                day: new Date(year, month, i)
            });
        }
        if (lastWeek !== 0) {
            for (let i = lastWeek - 1; i >= 0; i--) {
                daysPre.push({
                    text: preMonthlastDay.getDate() - i,
                    day: new Date(year, month - 1, (preMonthlastDay.getDate() - i)),
                    cls: 'no-active'
                });
            }
        }
        if (nowWeek !== 0) {
            for (let i = 1; i <= 7 - nowWeek; i++) {
                daysNext.push({
                    text: i,
                    day: new Date(year, month + 1, i),
                    cls: 'no-active'
                });
            }
        }
        days = daysPre.concat(daysMiddle).concat(daysNext);
        if (days.length < (ctxLine * 7)) {
            const startDay = days[days.length - 1];
            for (let i = 1; i <= 7; i++) {
                days.push({
                    text: nextDay(startDay.day, i).getDate(),
                    day: nextDay(startDay.day, i),
                    cls: 'no-active'
                });
            }
        }
        return days;
    }
    addDayClsName = item => {
        const dayText = formatDate(item.day, 'yyyy-MM-dd');
        const { nowValue, selectedValue } = this.state;
        let cls = 'days-con-item';
        if (item.cls === 'no-active') {
            cls = classNames({
                'days-con-item': true,
                'no-active': true
            });
        }
        if (dayText === selectedValue) {
            cls = classNames({
                'days-con-item': true,
                'selected-active': true
            });
        } else if (dayText === nowValue) {
            cls = classNames({
                'days-con-item': true,
                'now-active': true
            });
        }
        return cls;
    }
    inputEnter = () => {
        clearTimeout(this.timer);
        this.setState({ openModal: true });
    }
    inputLeave = () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({ openModal: false });
        }, 300);
    }
    clickInput = e => {
        const value = e.target.dataset.time;
        const { onChange } = this.props;
        this.setState({
            selectedValue: value,
            loopValue: value,
            daysMap: this.getDays(new Date(value))
        });
        onChange && onChange(value);
    }
    lastYear = (year, month) => {
        this.setState({
            daysMap: this.getDays(new Date(`${Number(year, 10) - 1}-${month}-01`)),
            loopValue: `${Number(year, 10) - 1}-${month}-01`
        });
    }
    lastMonth = (year, month) => {
        if (month === '01') {
            year = Number(year) - 1;
            month = '12';
        } else {
            month = (Number(month) - 1) < 10 ? `0${Number(month) - 1}` : `${Number(month) - 1}`;
        }
        this.setState({
            daysMap: this.getDays(new Date(`${year}-${month}-01`)),
            loopValue: `${year}-${month}-01`
        });
    }
    nextMonth = (year, month) => {
        if (month === '12') {
            year = Number(year) + 1;
            month = '01';
        } else {
            month = (Number(month) + 1) < 10 ? `0${Number(month) + 1}` : `${Number(month) + 1}`;
        }
        this.setState({
            daysMap: this.getDays(new Date(`${year}-${month}-01`)),
            loopValue: `${year}-${month}-01`
        });
    }
    nextYear = (year, month) => {
        this.setState({
            daysMap: this.getDays(new Date(`${Number(year, 10) + 1}-${month}-01`)),
            loopValue: `${Number(year, 10) + 1}-${month}-01`
        });
    }
    selectContent = e => {
        this.setState({ whichSelect: e.target.dataset.select });
    }
    yearChange = () => {

    }
    monthChange = () => {

    }
    render() {
        const {
            nowValue, selectedValue, loopValue, openModal, daysMap, whichSelect
        } = this.state;
        const value = loopValue || nowValue;
        const navYear = value && `${value.split('-')[0]}年`;
        const navMonth = value && `${value.split('-')[1]}月`;
        const modalCls = classNames({
            "datepicker-modal": true,
            "over-animate": openModal,
            "leave-animate": !openModal
        });
        let contentHtml = null;
        switch (whichSelect) {
            case 'day':
                contentHtml = (<DaySelect
                    {...{
                        value,
                        navYear,
                        navMonth,
                        daysMap,
                        lastYear: this.lastYear,
                        lastMonth: this.lastMonth,
                        nextMonth: this.nextMonth,
                        nextYear: this.nextYear,
                        clickChange: this.clickInput,
                        addDayClsName: this.addDayClsName
                    }}
                />);
                break;
            case 'week':
                contentHtml = (
                    <WeekSelect />
                );
                break;
            default:
                contentHtml = null;
        }

        return (
            <div className="react-datepicker" onMouseEnter={this.inputEnter} onMouseLeave={this.inputLeave}>
                <div className="datepicker-input">
                    <input readOnly type="text" className="c-input" value={selectedValue || nowValue} placeholder="请选择日期" />
                    <span className="datepicker-icon"></span>
                </div>
                <div className={modalCls}>
                    <div className="left-switch">
                        <div className={whichSelect === "day" ? "day-select active" : "day-select"} data-select="day" onClick={this.selectContent} >按日选择</div>
                        <div className={whichSelect === "week" ? "day-select active" : "day-select"} data-select="week" onClick={this.selectContent}>按周选择</div>
                    </div>
                    <div className="right-content">
                        {contentHtml}
                    </div>
                </div>
            </div>
        );
    }
}
Datepicker.propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.string
};

Datepicker.defaultProps = {
    onChange: () => { },
    defaultValue: ''
};
