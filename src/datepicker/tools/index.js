/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * Utils.formatDate(new Date(),'yyyy-MM-dd') ==> 2014-03-02
 * Utils.formatDate(new Date(),'yyyy-MM-dd hh:mm') ==> 2014-03-02 05:04
 * Utils.formatDate(new Date(),'yyyy-MM-dd HH:mm') ==> 2014-03-02 17:04
 * Utils.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 * Utils.formatDate(new Date(),'yyyy-MM-dd E HH:mm:ss') ==> 2009-03-10 二 20:09:04
 * Utils.formatDate(new Date(),'yyyy-MM-dd EE hh:mm:ss') ==> 2009-03-10 周二 08:09:04
 * Utils.formatDate(new Date(),'yyyy-MM-dd EEE hh:mm:ss') ==> 2009-03-10 星期二 08:09:04
 * Utils.formatDate(new Date(),'yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
 */
export function formatDate(date, fmt, flag) {
    if (!date) return;
    let hour = 0;
    if (flag) {
        hour = date.getHours();
    } else if (date.getHours() % 12 === 0) {
        hour = 12;
    } else {
        hour = date.getHours() % 12;
    }
    const o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": hour, // 小时
        "H+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3) // 季度
    };
    const week = {
        "0": "\u65e5", // 日
        "1": "\u4e00", // 一
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[date.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/**
 * 获取当前日期前n天的单日期
 * @param {*} date
 * @param {*} n
 * @param {*} pattern
 */
export function previousDay(date = new Date(), n = 1, pattern = "yyyy-MM-dd") {
    let temDate = new Date(date.getTime());
    temDate.setDate(temDate.getDate() - n);
    return temDate;
}

export function previousDays(date = new Date(), n = 1, pattern = "yyyy-MM-dd") {
    let temDateArr = [];
    for (var i = 0; i < n; i++) {
        temDateArr.push(previousDay(date, i + 1, pattern));
    }
    return temDateArr;
}

/**
 * @name convertDyadicArray 一维数组转换为二维数组
 * @param {Array} arr
 * @param {Number} row
 * @author Sven
 * @example convertDyadicArray([2,3,4,5,6,7], 3) => [[2,3,4],[5,6,7]]
 */
export function convertDyadicArray(arr, row) {
    let dyadicArray = [];
    const col = arr.length / row;
    for (let i = 0; i < col; i++) {
        dyadicArray.push(arr.slice(i * row, (i + 1) * row))
    }
    return dyadicArray;
}

export function getTimeParam(selectDate) {
    var t = {};
    if (/*selectDate[2] == 1 || */selectDate[2] == 7 || selectDate[2] == 15 || selectDate[2] == 30 || selectDate[2] == 90 || selectDate[2] == 1 || selectDate[2] == 365) {
        t.startDate = formatDate(selectDate[0], 'yyyy-MM-dd');
        t.endDate = formatDate(selectDate[1], 'yyyy-MM-dd');
        if (selectDate[2] == 1) {
            t.date = t.endDate;
        } else {
            t.date = selectDate[2] + t.endDate;
        }
    } else if (selectDate[2] == "dayRange") {
        t.startDate = formatDate(selectDate[0], 'yyyy-MM-dd');
        t.endDate = formatDate(selectDate[1], 'yyyy-MM-dd');
        t.date = "10" + t.endDate;
    } else if (selectDate[2] == 'month') {
        t.startDate = formatDate(selectDate[0], 'yyyy-MM-dd');
        t.endDate = formatDate(selectDate[1], 'yyyy-MM-dd');
        t.date = formatDate(selectDate[0], 'yyyyMM');
    } else if (selectDate[2] == 'week') {
        t.startDate = formatDate(selectDate[0], 'yyyy-MM-dd');
        t.endDate = formatDate(selectDate[1], 'yyyy-MM-dd');
        t.date = formatDate(selectDate[0], 'yyyyMM');
        // yuhp 20160708
        // 由于自然周的时间格式改为 99yyyyxx，之前是yyyy99xx
        t.date = '99' + t.startDate.substring(0, 4) + getWeekOfYear(selectDate[0]);
    } else if (selectDate[2] == 'day' || selectDate[2] == 'usually') {
        var temp = formatDate(selectDate[0], 'yyyy-MM-dd');
        t.startDate = temp;
        t.endDate = temp;
        t.date = temp;
    } else if (selectDate[2] == 'range') {
        var temp = formatDate(selectDate[0], 'yyyy-MM-dd'),
            temp2 = formatDate(selectDate[1], 'yyyy-MM-dd');
        t.startDate = temp;
        t.endDate = temp2;
        t.date = '';
    } else if (selectDate[2] == '0') {
        var temp = formatDate(selectDate[0], 'yyyy-MM-dd'),
            temp2 = formatDate(selectDate[1], 'yyyy-MM-dd');
        t.startDate = temp;
        t.endDate = temp2;
        t.date = temp;
    } else if (selectDate[2].indexOf("promotionDay") > -1) {
        var temp = formatDate(selectDate[0], 'yyyy-MM-dd');
        t.startDate = temp;
        t.endDate = temp;
        t.date = temp;
    }
    return t;
}

function getWeekOfYear(today) {
    var firstDay = new Date(today.getFullYear(), 0, 1),
        dayOfWeek = firstDay.getDay(),
        spendDay = 1;
    if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1;
    }
    firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
    let d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000),
        result = Math.ceil(d / 7) + 1;
    result = result < 10 ? "0" + result : result;
    return result;
}

export function getQueryStringArgs() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
        args = {},
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;

    for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }

    return args;
}
