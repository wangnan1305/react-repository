import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formatDate, classNames, weekText } from '../tools/index';

export default class WeekSelect extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            weekText,
            startData: null,
            endData: null
        };
    }
    weekClickChange = e => {
        const { clickChange } = this.props;
        this.setState({
            startData: e.target.parentNode.dataset.start,
            endData: e.target.parentNode.dataset.end
        });
        clickChange(e, 'week');
    }
    generateDom = daysMap => {
        const { startData, endData } = this.state;
        const html = [];
        let line = 0;
        while (line < 6) {
            const weekctx = [];
            for (let i = line * 7; i < (line + 1) * 7; i++) {
                const dayText = formatDate(daysMap[i].day, 'yyyy-MM-dd');
                weekctx.push((
                    <div
                        className="week-con-item"
                        data-time={dayText}
                        key={dayText}
                    >{daysMap[i].text}
                    </div>
                ));
            }
            let cls = 'week-item';
            if (startData === weekctx[0].key && endData === weekctx[6].key) {
                cls = classNames(cls, { 'selected-active': true });
            }
            const weekHtml = (
                // "week-item"
                <div className={cls} key={`${weekctx[0].key}-${weekctx[6].key}`} data-start={weekctx[0].key} data-end={weekctx[6].key} onClick={this.weekClickChange}>
                    {weekctx}
                </div>
            );
            cls = null;
            html.push(weekHtml);
            line++;
        }
        return html;
    }
    render() {
        const { weekText } = this.state;
        const { daysMap } = this.props;
        return (
            <React.Fragment>
                <div className="datepicker-modal-content">
                    <div className="week-title">
                        {weekText.map((item, index) => <div className="week-title-item" key={`n${index}`}>{item}</div>)}
                    </div>
                    <div className="weeks-content">
                        {this.generateDom(daysMap)}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
WeekSelect.propTypes = {
    daysMap: PropTypes.array.isRequired,
    clickChange: PropTypes.func.isRequired
};
