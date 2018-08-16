import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Common extends PureComponent {
    render() {
        const {
            value, navYear, navMonth, lastMonth, lastYear, nextYear, nextMonth
        } = this.props;
        return (
            <div className="datepicker-modal-top">
                <span className="top-year-left" title="上一年" onClick={() => lastYear(value.split('-')[0], value.split('-')[1])}></span>
                <span className="top-month-left" title="上个月" onClick={() => lastMonth(value.split('-')[0], value.split('-')[1])}></span>
                <span className="top-content">
                    <span className="year-change" onClick={this.yearChange}>{navYear}</span>
                    <span className="month-change" onClick={this.monthChange}>{navMonth}</span>
                </span>
                <span className="top-year-right" title="下一年" onClick={() => nextYear(value.split('-')[0], value.split('-')[1])}></span>
                <span className="top-month-right" title="下个月" onClick={() => nextMonth(value.split('-')[0], value.split('-')[1])}></span>
            </div>
        );
    }
}
Common.propTypes = {
    value: PropTypes.string.isRequired,
    navYear: PropTypes.string.isRequired,
    navMonth: PropTypes.string.isRequired,
    lastYear: PropTypes.func.isRequired,
    lastMonth: PropTypes.func.isRequired,
    nextMonth: PropTypes.func.isRequired,
    nextYear: PropTypes.func.isRequired
};
