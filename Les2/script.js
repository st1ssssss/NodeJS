
import EventEmitter from 'events'

class Emitter extends EventEmitter { }
const emitterObj = new Emitter()
const endYear = Number(process.argv[2])
const endMonth = Number(process.argv[3] - 1)
const endDay = Number(process.argv[4])
const endingDate = new Date(endYear, endMonth, endDay, 17, 48)



function showDiff(endingDate) {
    const currentDate = new Date()



    var diff = (endingDate - currentDate) / 1000;
    var diff = Math.abs(Math.floor(diff));

    var days = Math.floor(diff / (24 * 60 * 60));
    var leftSec = diff - days * 24 * 60 * 60;

    var hrs = Math.floor(leftSec / (60 * 60));
    var leftSec = leftSec - hrs * 60 * 60;

    var min = Math.floor(leftSec / (60));
    var leftSec = leftSec - min * 60;



    if (days === 0 && hrs === 0 && min === 0 && leftSec === 0) emitterObj.emit('close', 'Ваше время вышло!')


    console.log(`До ${endingDate} осталось ${days} ${hrs} ${min} ${leftSec}`)


}

const timer = setInterval(() => showDiff(endingDate), 1000)


emitterObj.on('close', (res) => {
    console.log(res)
    clearInterval(timer)
}

)



