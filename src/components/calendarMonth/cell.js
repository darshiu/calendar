export default {
    functional: true,
    props: ['config'],
    render: (h, ctx) => {
        const [i, j, data] = ctx.props.config;
        const arr = [];
        const dateObj = h('div', {
            class: 'date',
            domProps: {
                innerHTML: j
            }
        });
        arr.push(dateObj)

        if (data.hasOwnProperty(i) && data[i].hasOwnProperty(j)) {
            const nodes = data[i][j]
            const length = nodes.length
            const colorMap = [
                { bg: '#F1D57D', border: '#BFA963', font: '#000'},
                { bg: '#B8E986', border: '#799958', font: '#000'},
                { bg: '#3A84FF', border: '#0054DF', font: '#FFF'},
                { bg: '#37C1CF', border: '#29919C', font: '#FFF'},
            ]
            nodes.forEach((el, index) => {
                const obj1 = h('span', {
                    domProps: {
                        innerHTML: el.beginTime.substring(11, 16) + '~' + el.endTime.substring(11, 16) + ' | ' + el.shiftName
                    }
                })
                const obj2 = h(
                    'div',
                    {
                        class: 'cellContent',
                        style: {
                            height: `calc((100% - 24px) / ${length})`,
                            background: colorMap[index].bg,
                            borderColor: colorMap[index].border,
                            color: colorMap[index].font,
                        }
                    },
                    [obj1]
                );
                arr.push(obj2)
            })
        }
        return h(
            'div',
            {
                class: 'cell',
                style: {
                    width: '100%',
                    height: '100%'
                }
            },
            arr
        );
    }
}