export function formatDate(date, fmt, flag) {
    if (!date) return '';
    let hour = 0;
    if (flag) {
        hour = date.getHours();
    } else if (date.getHours() % 12 === 0) {
        hour = 12;
    } else {
        hour = date.getHours() % 12;
    }
    const o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": hour,
        "H+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3)
    };
    const week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    }

    if (/(E+)/.test(fmt)) {
        let str = "";
        if (RegExp.$1.length > 1) {
            str = RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468";
        }
        fmt = fmt.replace(RegExp.$1, str + week[`${date.getDay()}`]);
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
        }
    }
    return fmt;
}
/**
 * 获取当前日期后n天的单日期
 * @param {*} date
 * @param {*} n
 * @param {*} pattern
 */
export function nextDay(date = new Date(), n = 1) {
    const temDate = new Date(date.getTime());
    temDate.setDate(temDate.getDate() + n);
    return temDate;
}

export function nextDays(date = new Date(), n = 1, pattern = "yyyy-MM-dd") {
    const temDateArr = [];
    for (let i = 0; i < n; i++) {
        temDateArr.push(nextDay(date, i + 1, pattern));
    }
    return temDateArr;
}
/**
 * 获取当前日期前n天的单日期
 * @param {*} date
 * @param {*} n
 * @param {*} pattern
 */
export function previousDay(date = new Date(), n = 1) {
    const temDate = new Date(date.getTime());
    temDate.setDate(temDate.getDate() - n);
    return temDate;
}

export function previousDays(date = new Date(), n = 1, pattern = "yyyy-MM-dd") {
    const temDateArr = [];
    for (let i = 0; i < n; i++) {
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
    const dyadicArray = [];
    const col = arr.length / row;
    for (let i = 0; i < col; i++) {
        dyadicArray.push(arr.slice(i * row, (i + 1) * row));
    }
    return dyadicArray;
}
function getWeekOfYear(today) {
    let firstDay = new Date(today.getFullYear(), 0, 1), spendDay = 1;
    const dayOfWeek = firstDay.getDay();
    if (dayOfWeek !== 0) {
        spendDay = (7 - dayOfWeek) + 1;
    }
    firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);

    const d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
    let result = Math.ceil(d / 7) + 1;

    result = result < 10 ? `0${result}` : result;
    return result;
}

export function classNames(...args) {
    const classes = [];
    const hasOwn = {}.hasOwnProperty;
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg) {
            const argType = typeof arg;
            if (argType === 'string' || argType === 'number') {
                classes.push(arg);
            } else if (Array.isArray(arg) && arg.length) {
                const inner = classNames(...arg);
                if (inner) {
                    classes.push(inner);
                }
            } else if (argType === 'object') {
                for (const key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
            }
        }
    }
    return classes.join(' ');
}
