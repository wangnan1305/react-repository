import React from 'react';
import PropTypes from 'prop-types';

import './style/index.scss';
import { formatDate, classNames } from './tools/index';

export default class Datepicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowValue: formatDate(new Date(), 'yyyy-MM-dd'), // 当前时间
            selectedValue: '', // 选中时间
            weekText: ['一', '二', '三', '四', '五', '六', '日'],
            openModal: false
        };
    }
    // componentWillMount() {
    //     this.getDays();
    // }
    getDays = date => {
        const day = new Date(formatDate(date, 'yyyy-MM-dd')),
                month = day.getMonth(), // 月份
                year = day.getFullYear(),
                preMonthlastDay = new Date(year, month, 0), // 上个月的最后一天
                nowMonthLastDay = new Date(year, month + 1, 0), // 这个月的最后一天
                nowMonthDays = new Date(year, month + 1, 0).getDate(), // 这个月总共有多少天
                lastWeek = preMonthlastDay.getDay(), // 上个月的最后一天是周几
                nowWeek = nowMonthLastDay.getDay(); // 这个月最后一天是周几

        const daysMiddle = [], daysPre = [], daysNext = [];

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
                    day: new Date(year, month - 1, (preMonthlastDay.getDate() - i))
                });
            }
        }
        if (nowWeek !== 0) {
            for (let i = 1; i <= 7 - nowWeek; i++) {
                daysNext.push({
                    text: i,
                    day: new Date(year, month + 1, i)
                });
            }
        }
        return daysPre.concat(daysMiddle).concat(daysNext);
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
            openModal: false
        });
        onChange && onChange(value);
    }
    render() {
        const {
            nowValue, selectedValue, openModal, weekText
        } = this.state;
        const daysMap = this.getDays(new Date());
        const value = selectedValue || nowValue;
        return (
            <div className="react-datepicker" onMouseEnter={this.inputEnter} onMouseLeave={this.inputLeave}>
                <div className="datepicker-input">
                    <input readOnly type="text" className="c-input" value={value} placeholder="请选择日期" />
                    <span className="datepicker-icon"></span>
                </div>
                <div className="datepicker-modal" style={{ display: openModal ? 'block' : 'none' }}>
                    <div className="datepicker-modal-top">
                        <span className="top-left"></span>
                        <span className="top-content">2018-07</span>
                        <span className="top-right"></span>
                    </div>
                    <div className="datepicker-modal-content">
                        <div className="week-title">
                            {weekText.map((item, index) => <div className="week-title-item" key={`n${index}`}>{item}</div>)}
                        </div>
                        <div className="days-content">
                            {daysMap.map((
                                item => {
                                    const dayText = formatDate(item.day, 'yyyy-MM-dd');
                                    let cls = 'days-con-item';
                                    if (dayText === nowValue && dayText === selectedValue) {
                                        cls = classNames({
                                            'days-con-item': true,
                                            'now-selected-active': true
                                        });
                                    } else if (dayText === selectedValue) {
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
                                    return (
                                        <div
                                            className={cls}
                                            data-time={dayText}
                                            key={dayText}
                                            onClick={this.clickInput}
                                        >{item.text}
                                        </div>
                                    );
                                }
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Datepicker.propTypes = {
    onChange: PropTypes.func
};

Datepicker.defaultProps = {
    onChange: () => {}
};
