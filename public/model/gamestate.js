export const gameState = {
    balance: 100,
    oddEvenBet: null,
    oddselected:false,
    evendisabled:false,
    odddisabled:false,
    evenselected:false,
    oddEvenAmount: 0,
    oddEvenAmountdisabled:false,
    rangeBet: null,
    rangeAmount: 0,
    diceValue: null,
    range1selected: false,
    range1disabled: false,
    range2selected: false,
    trange2disabled:false,
    range3selected: false,
    range3disabled:false, 
    inPlay:false,
    newGamebtn:false,
    playbtn:false,
    showcheatkey:true,
    historycleared:false,

    defMsg:'Choose bet(s) and press [PLAY]',

    setBalance(newBalance) {
        this.balance = newBalance;
    },
    setoddselected(selected){
        this.oddselected= selected
    },
    setodddisabled(selected){
        this.odddisabled= selected
    },
    setEvenselected(selected){
        this.evenselected= selected
    },
    setevendisabled(selected){
        this.even= selected
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

    setRange1Disabled(selected) {
        this.range1disabled = selected;
    },
    setRange2Disabled(selected) {
        this.range2disabled = selected;
    },
    setRange3Disabled(selected) {
        this.range3disabled = selected;
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
    setNewGamebtn(selected){
        this.newGamebtn = selected;
    },
    getNewGamebtn(){
        return this.newGamebtn;
    },
    setPlayBtn(selected){
        this.playbtn = selected;
    },
    setDefaultMsg(msg){
        this.defMsg = msg;
    },
    sethistorycleared(selected){
        this.historycleared = selected;
    },
    getPlaybtn(){
        return this.playbtn;
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
