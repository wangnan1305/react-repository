import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../tools/index';
import Common from '../components/common';

export default class DaySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekText: ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d']
        };
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
                                const cls = this.props.addDayClsName(item);
                                return (
                                    <div
                                        className={cls}
                                        data-time={dayText}
                                        key={dayText}
                                        onClick={this.props.clickChange}
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
