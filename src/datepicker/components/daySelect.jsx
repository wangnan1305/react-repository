import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../tools/index';

export default class DaySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weekText: ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d']
        };
    }
    componentDidMount() {

    }

    render() {
        const { weekText } = this.state;
        const {
            value, navYear, navMonth, daysMap
        } = this.props;
        return (
            <React.Fragment>
                <div className="datepicker-modal-top">
                    <span className="top-year-left" title="上一年" onClick={() => this.props.lastYear(value.split('-')[0], value.split('-')[1])}></span>
                    <span className="top-month-left" title="上个月" onClick={() => this.props.lastMonth(value.split('-')[0], value.split('-')[1])}></span>
                    <span className="top-content">
                        <span className="year-change" onClick={this.yearChange}>{navYear}</span>
                        <span className="month-change" onClick={this.monthChange}>{navMonth}</span>
                    </span>
                    <span className="top-year-right" title="下一年" onClick={() => this.props.nextYear(value.split('-')[0], value.split('-')[1])}></span>
                    <span className="top-month-right" title="下个月" onClick={() => this.props.nextMonth(value.split('-')[0], value.split('-')[1])}></span>
                </div>
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
    lastYear: PropTypes.func.isRequired,
    lastMonth: PropTypes.func.isRequired,
    nextMonth: PropTypes.func.isRequired,
    nextYear: PropTypes.func.isRequired,
    addDayClsName: PropTypes.func.isRequired
};
