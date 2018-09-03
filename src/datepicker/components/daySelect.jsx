import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDate, classNames, weekText } from '../tools/index';

export default class DaySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        const { daysMap } = this.props;
        return (
            <React.Fragment>
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
    daysMap: PropTypes.array.isRequired,
    clickChange: PropTypes.func.isRequired
};

