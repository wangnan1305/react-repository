import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDate, classNames, weekText } from '../tools/index';

export default class RangeSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            clearCss: false
        };
    }
    getTime = data => new Date(data).getTime();
    dayClickChange = e => {
        const { startDate, endDate } = this.state;
        const { clickChange } = this.props;
        const time = e.target.dataset.time;
        if (startDate === null) {
            this.setState({ startDate: time, clearCss: false });
        } else if (startDate !== null && endDate === null) {
            this.setState({ endDate: time, clearCss: false }, () => {
                if (this.getTime(startDate) > this.getTime(this.state.endDate)) {
                    clickChange({ startDate: this.state.endDate, endDate: startDate }, 'range');
                    return;
                }
                clickChange({ startDate, endDate: this.state.endDate }, 'range');
            });
        } else if (startDate !== null && endDate !== null) {
            this.setState({ startDate: time, endDate: null, clearCss: true });
        }
    }
    addDayClsName = item => {
        const { nowValue, selectedValue } = this.props;
        const { startDate, endDate, clearCss } = this.state;
        const dayText = formatDate(item.day, 'yyyy-MM-dd');
        let cls = 'days-con-item';
        try {
            const start = selectedValue.split('至')[0] && selectedValue.split('至')[0].replace(/^\s+|\s+$/g, ''),
                    end = selectedValue.split('至')[1] && selectedValue.split('至')[1].replace(/^\s+|\s+$/g, '');
            if (item.cls === 'no-active') {
                cls = classNames(cls, { 'no-active': true });
            }
            if ((startDate && endDate && this.getTime(dayText) >= this.getTime(start) && this.getTime(dayText) <= this.getTime(end))
            ) {
                cls = classNames(cls, { 'selected-active': !clearCss });
            } else if ((startDate === dayText) && endDate === null) {
                cls = classNames(cls, { 'selected-active': true });
            }
            else if (dayText === nowValue) {
                cls = classNames(cls, { 'now-active': true });
            }
        } catch (error) {
            return cls;
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
RangeSelect.propTypes = {
    nowValue: PropTypes.string.isRequired,
    selectedValue: PropTypes.string.isRequired,
    daysMap: PropTypes.array.isRequired,
    clickChange: PropTypes.func.isRequired
};

