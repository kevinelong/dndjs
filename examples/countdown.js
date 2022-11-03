const { promisify } = require('util')
const sleep = promisify(setTimeout);

const doSomething = async () => {
    let countdown = 10;
    while (countdown >= 0) {
        console.log(countdown);
        countdown--;
        await sleep(500);
    }
    console.log("BLAST_OFF!");
}
doSomething();
