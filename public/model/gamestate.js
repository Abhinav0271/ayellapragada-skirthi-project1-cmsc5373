export const gameState = {
    balance: 100,
    oddEvenBet: null,
    oddselected:false,
    evenselected:false,
    oddEvenAmount: 0,
    rangeBet: null,
    rangeAmount: 0,
    diceValue: null,
    range1selected: false,
    range2selected: false,
    range3selected: false,
    inPlay:false,

    setBalance(newBalance) {
        this.balance = newBalance;
    },
    setoddselected(selected){
        this.oddselected= selected
    },
    setEvenselected(selected){
        this.evenselected= selected
    },

    setOddEvenBet(bet, amount) {
        this.oddEvenBet = bet;
        this.oddEvenAmount = amount;
    },
    setRange1Selected(selected) {
        this.range1selected = selected;
    },
    setRange2Selected(selected) {
        this.range2selected = selected;
    },
    setRange3Selected(selected) {
        this.range3selected = selected;
    },
    setRangeBet(bet, amount) {
        this.rangeBet = bet;
        this.rangeAmount = amount;
    },

    setDiceValue(value) {
        this.diceValue = value;
    },
    getDiceValue(){
        return this.diceValue;
    },
    setrangeAmount(value) {
        this.rangeAmount = value;
    },
    setoddEvenAmount(value) {
        this.oddEvenAmount = value;
    },
    setInPlay(selected){
        this.inPlay = selected;
    },
    resetGame() {
        this.oddEvenBet = null;
        this.oddEvenAmount = 0;
        this.rangeBet = null;
        this.rangeAmount = 0;
        this.diceValue = null;
        this.oddselected= false,
        this.evenselected= false
        this.range1selected= false,
        this.range2selected= false,
        this.range3selected= false,
        this.inPlay =false
    },


    getGameDetails() {
        return {
            oddEvenBet: this.oddEvenBet,
            oddEvenAmount: this.oddEvenAmount,
            rangeBet: this.rangeBet,
            rangeAmount: this.rangeAmount,
            balance: this.balance,
            diceValue: this.diceValue
        };
    }
};
