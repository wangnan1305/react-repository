import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Common extends PureComponent {
    lastYear = (year, month) => {
        const data = new Date(`${Number(year, 10) - 1}-${month}-01`),
                value = `${Number(year, 10) - 1}-${month}-01`;
        this.props.navClick(data, value);
    }
    lastMonth = (year, month) => {
        let data = null, value = null;
        if (month === '01') {
            year = Number(year) - 1;
            month = '12';
        } else {
            month = (Number(month) - 1) < 10 ? `0${Number(month) - 1}` : `${Number(month) - 1}`;
        }
        data = new Date(`${year}-${month}-01`);
        value = `${year}-${month}-01`;
        this.props.navClick(data, value);
    }
    nextMonth = (year, month) => {
        let data = null, value = null;
        if (month === '12') {
            year = Number(year) + 1;
            month = '01';
        } else {
            month = (Number(month) + 1) < 10 ? `0${Number(month) + 1}` : `${Number(month) + 1}`;
        }
        data = new Date(`${year}-${month}-01`);
        value = `${year}-${month}-01`;
        this.props.navClick(data, value);
    }
    nextYear = (year, month) => {
        const data = new Date(`${Number(year, 10) + 1}-${month}-01`),
                value = `${Number(year, 10) + 1}-${month}-01`;
        this.props.navClick(data, value);
    }
    render() {
        const { value, navYear, navMonth } = this.props;
        return (
            <div className="datepicker-modal-top">
                <span className="top-year-left" title="上一年" onClick={() => this.lastYear(value.split('-')[0], value.split('-')[1])}></span>
                <span className="top-month-left" title="上个月" onClick={() => this.lastMonth(value.split('-')[0], value.split('-')[1])}></span>
                <span className="top-content">
                    <span className="year-change" onClick={this.yearChange}>{navYear}</span>
                    <span className="month-change" onClick={this.monthChange}>{navMonth}</span>
                </span>
                <span className="top-year-right" title="下一年" onClick={() => this.nextYear(value.split('-')[0], value.split('-')[1])}></span>
                <span className="top-month-right" title="下个月" onClick={() => this.nextMonth(value.split('-')[0], value.split('-')[1])}></span>
            </div>
        );
    }
}
Common.propTypes = {
    navClick: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    navYear: PropTypes.string.isRequired,
    navMonth: PropTypes.string.isRequired,
    lastYear: PropTypes.func.isRequired,
    lastMonth: PropTypes.func.isRequired,
    nextMonth: PropTypes.func.isRequired,
    nextYear: PropTypes.func.isRequired
};
