import React from 'react';
import PropTypes from 'prop-types';
import Common from './common';

export default class WeekSelect extends React.Component {
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
            value, navYear, navMonth, lastMonth, lastYear, nextYear, nextMonth, daysMap
        } = this.props;
        console.log(daysMap);
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
                        
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
WeekSelect.propTypes = {
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
