import colors from "colors"


const trafficLight = { green: 0, yellow: 1, red: 2 }
let currentColor = trafficLight.green
let numsAreNotSimple = true
let arr = []
let stNum = Number(process.argv[2])
let endNum = Number(process.argv[3])

function numIsSimple(n) {
    if (n <= 1) return false
    for (let j = 2; j < n; j++) {
        if (n % j === 0) return false
    }
    return true
}

function changeColor() {
    currentColor++
    if (currentColor > trafficLight.red) return currentColor = trafficLight.green
}

function switchColor(num) {
    if (numsAreNotSimple) return numsAreNotSimple = false
    switch (currentColor) {
        case trafficLight.green:
            console.log(`${num}`.green)
            break;
        case trafficLight.yellow:
            console.log(`${num}`.yellow)
            break;
        case trafficLight.red:
            console.log(`${num}`.red)
            break;
    }
    changeColor()
}

function validate(n, m) {
    if (isNaN(n) || isNaN(m)) {
        console.log('incorrect range'.red)
        return false
    } else return true
}

function init(n, m) {
    if (validate(n, m)) {
        for (let i = n; i <= m; i++) {
            if (numIsSimple(i)) {
                switchColor(i)
                arr.push(i)
            }
        }
        if (!arr.length) console.log(`no simple nums between ${n} and ${m}`.red)
    }

}

init(stNum, endNum)