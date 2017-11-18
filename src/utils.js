
const colorMap = {
    lightBlue: '#dee0ef',
    blue: '#050D58',
    lightRed: '#f9c7c8',
    red: '#fc3c40'
}

const evenColorsMap = len => {
    const colors = [ colorMap['blue'], colorMap['red']]
    const map = []
    for (let i = 0; i < len; i++) {
        map.push(i % 2 === 0 ? colors[0] : colors[1])
    }
    return map
}

const oddModulusIndex = index => (index + 3) % 3

const oddColorsMap = len => {
    const colors = [colorMap['blue'], colorMap['red'], colorMap['lightBlue']]
    const map = []
    for (let i = 0; i < len; i++) {
        map.push(colors[oddModulusIndex(i)])
    }
    if (map[0] === map[len - 1]) {
        map[len - 1] = colorMap['lightRed']
    }
    return map
}

export const colorsFromDataLength = len => {
    return len % 2 === 0 ? evenColorsMap(len) : oddColorsMap(len)
}
