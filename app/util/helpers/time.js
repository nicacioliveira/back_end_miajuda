const TIME = {
    mili : {
        time: 1
    },
    second: {
        time: 1000,
        child: 'mili'
    },
    minute: {
        time: 60,
        child: 'second'
    },
    hour: {
        time: 60,
        child: 'minute'
    },
    day: {
        time: 24,
        child: 'hour'
    },
    week: {
        time: 7,
        child: 'day'
    },
    month: {
        time: 30,
        child: 'day'
    },
    year: {
        time: 365,
        child: 'month'
    }
};

function transformUnit(parent, child, multiplier) {
    var node = null;
    var factor = 1;
    while (node !== child) {
        var unit = TIME[node || parent];
        node = unit.child;
        factor = factor * unit.time;
    }
    return multiplier ? factor * multiplier : factor;
}

function getTomorrow() {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow
}

function setTime(date, hours, minutes, seconds) {
    date.setHours(hours + 3 || 0);
    date.setMinutes(minutes || 0);
    date.setSeconds(seconds || 0);
    return date;
}

function isInRange(interval) {
    if (!interval.start || !interval.end) {
        return true;
    }

    var now = new Date();
    var start = setTime(new Date(),interval.start);
    var end = setTime(new Date(), interval.end);
    return now > start && now < end;
}

module.exports = {
    setTime: setTime,
    transformUnit: transformUnit,
    getTomorrow: getTomorrow,
    isInRange: isInRange
};