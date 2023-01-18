import { dateMaps } from "./dateMap";

const getWeeks = {
    run: function (year) {
        var days = getWeeks.getDate(year || new Date().getFullYear())
        var weeks = {}

        for (var i = 0; i < days.length; i++) {
            var nextday = days[i + 1] === undefined ? 13 : days[i + 1].split('-')[1]
            console.log(days)
            var daySplit = days[i].split('_')
            var monSplit = daySplit[0].split('-')
            console.log(daySplit)
            const index = dateMaps.monthList[monSplit[1] - 1].en

            if (weeks[index] === undefined) {
                const firstWeek = daySplit[1] == 0 ? 7 : daySplit[1]
                console.log(firstWeek)
                weeks[index] = {
                    name: dateMaps.monthList[monSplit[1] - 1].en,
                    pre: [],
                    main: [],
                    next: []
                }
                // pre
                const preMonth = dateMaps.monthList[monSplit[1] - 1].num - 1;
                console.log(preMonth)
                let preMonthData = [];
                if (preMonth > 0) {
                    for (let h = 1; h < firstWeek; h++) {
                        const p = days[i - firstWeek + h].split('_');
                        preMonthData = p[0].split('-')
                        weeks[index].pre.push(preMonthData[2])
                        console.log(weeks[index].pre)
                    }
                } else {
                    for (let h = (firstWeek - 1); 0 < h; h--) {
                        weeks[index].pre.push(32 - h)
                    }
                }
                // for (let i = 1; i < firstWeek; i++) {
                //     weeks[index].pre.push('')
                // }
                // main
                weeks[index].main.push(monSplit[2])
            } else {
                // main
                weeks[index].main.push(monSplit[2])
                // next
                if (nextday !== monSplit[1]) {
                    let lastWeek = parseInt(daySplit[1])
                    const totalAmound = weeks[index].main.length + weeks[index].pre.length + 7 - lastWeek
                    if (totalAmound < 42) {
                        lastWeek = lastWeek - 7
                    }
                    
                    const numberTo = 1 - lastWeek;
                    for (let h = lastWeek; h < 7; h++) {
                        weeks[index].next.push(h + numberTo)
                    }
                }
            }
        }
        return weeks
    },
    getDate: function(year) {
        var dates = []
        for (var i = 1; i <= 12; i++) {
            for (var j = 1; j <= new Date(year, i, 0).getDate(); j++) {
                dates.push(
                    year +
                    '-' + i + '-' + j + '_' + new Date([year, i, j].join('-')).getDay()
                )
            }
        }
        return dates
    }

}
export default getWeeks
