var getHint = function(secret, guess) {
    let bulls = 0;
    const cntS = new Array(secret.length).fill(0);
    const cntG = new Array(guess.length).fill(0);
    for (let i = 0; i < secret.length; ++i) {
        if (secret[i] == guess[i]) {
            ++bulls;
        } else {
            ++cntS[secret[i].charCodeAt() - '0'.charCodeAt()]; // 非公牛重复字符数
            ++cntG[guess[i].charCodeAt() - '0'.charCodeAt()]; // 非公牛重复猜测字符数
        }
    }
    let cows = 0;
    for (let i = 0; i < 10; ++i) {
        cows += Math.min(cntS[i], cntG[i]);
    }
    return '' + bulls + "A" + '' + cows + "B";
};