import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDate, classNames } from '../tools/index';
import Common from '../components/common';

export default class DaySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekText: ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d']
        };
    }
    dayClickChange = e => {
        const { clickChange } = this.props;
        clickChange(e, 'day');
    }
    addDayClsName = item => {
        const { nowValue, selectedValue } = this.props;
        const dayText = formatDate(item.day, 'yyyy-MM-dd');
        let cls = 'days-con-item';
        if (item.cls === 'no-active') {
            cls = classNames(cls, { 'no-active': true });
        }
        if (dayText === selectedValue) {
            cls = classNames(cls, { 'selected-active': true });
        } else if (dayText === nowValue) {
            cls = classNames(cls, { 'now-active': true });
        }
        return cls;
    }
    render() {
        const { weekText } = this.state;
        const {
            daysMap, value, navYear, navMonth, lastMonth, lastYear, nextYear, nextMonth
        } = this.props;
        return (
            <React.Fragment>
                <Common
                    {...{
                        value,
                        navYear,
                        navMonth,
                        lastMonth,
                        lastYear,
                        nextMonth,
                        nextYear
                    }}
                />
                <div className="datepicker-modal-content">
                    <div className="week-title">
                        {weekText.map((item, index) => <div className="week-title-item" key={`n${index}`}>{item}</div>)}
                    </div>
                    <div className="days-content">
                        {daysMap.map((
                            item => {
                                const dayText = formatDate(item.day, 'yyyy-MM-dd');
                                const cls = this.addDayClsName(item, 'day');
                                return (
                                    <div
                                        className={cls}
                                        data-time={dayText}
                                        key={dayText}
                                        onClick={this.dayClickChange}
                                    >{item.text}
                                    </div>
                                );
                            }
                        ))}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
DaySelect.propTypes = {
    nowValue: PropTypes.string.isRequired,
    selectedValue: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    navYear: PropTypes.string.isRequired,
    navMonth: PropTypes.string.isRequired,
    daysMap: PropTypes.array.isRequired,
    clickChange: PropTypes.func.isRequired,
    addDayClsName: PropTypes.func.isRequired,
    lastYear: PropTypes.func.isRequired,
    lastMonth: PropTypes.func.isRequired,
    nextMonth: PropTypes.func.isRequired,
    nextYear: PropTypes.func.isRequired
};
