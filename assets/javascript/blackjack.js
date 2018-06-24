//
// Sean Kim
//
// BlackJack

/////
// timer component for time limit on betting and moving forward
var timerTemp = {
    clockRunning: false,
    intervalId: null,
    container: null,
    time: null,
    countCallback: null,
    setContainer: function(number) {
        this.container = $('#timer');
        this.time = parseInt(number);
    },
    setCountCallback(countCallback){
        if(typeof countCallback !== 'undefined'){
            this.countCallback = countCallback;
        }
    },
    reset: function(number) {
        clearInterval(this.intervalId);
        this.clockRunning = false;
        this.time = parseInt(number);
    },
    start: function () {
        if (!this.clockRunning) {
            this.intervalId = setInterval(this.count.bind(this), 1000);
            this.clockRunning = true;
        }
    },
    stop: function () {
        clearInterval(this.intervalId);
        this.clockRunning = false;
    },
    count: function () {
        this.time--;
        var converted = this.timeConverter(this.time);
        this.container.html(converted);
        if (this.time <= 0) {
            this.stop();
            if(typeof this.countCallback !== 'undefined'){
                this.countCallback();
            }
        }
    },
    timeConverter: function (t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }
}
// set 15 second timer
var timer = $.extend(true, {}, timerTemp);
timer.setContainer(15);

// running code for timer
// timerReg.reset(120);
// timerReg.start();
// timerReg.setCountCallback(this.showScoreReg.bind(this));


/////
// deck component to have 6 shuffled deck ready to play
var decks = {
    numOfDecks: 6,  //total number of decks
    // Set k decks (52 * k cards); deck of [x,y] * k
    unshuffled: function () {
        // unshuffledDeck[i][j]; where j = 0, x=0 -> spades, x=1 -> hearts, x=2 -> diamonds, x=3 -> clubs
        // unshuffledDeck[i][j]; where j = 1, y=0 -> A, y=1 -> 2, ..., y=8 -> 9, y=9 -> 10, y=10 -> J, y=11 -> Q, y=12 -> K;
        //         a deck = [[0,0],[0,1],[0,2],[0,3],[1,0], ..., [x,y], ..., [3,12]];
        var unshuffledDeck = [];
        for (var k = 0; k < this.numOfDecks; k++) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 13; j++) {
                    unshuffledDeck.push([i, j]);
                }
            }
        }
        return unshuffledDeck;
    },
    // *** check for better shuffling algorithm ***
    shuffled: function () {
        // shuffledDeck = [ [  [x1,y1] ],[ [x2,y2] ],[ [x3,y3] ] ... [ [x,y] ] ]
        var shuffledDeck = this.unshuffled();
        for (var i = (shuffledDeck.length - 1) ; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffledDeck[i];
            shuffledDeck[i] = shuffledDeck[j];
            shuffledDeck[j] = temp;
        }
        return shuffledDeck;
    },
    // test code for shuffled deck; expect to see same number on each shape.
    testing: function () {
        var spade = 0,
            heart = 0,
            diamond = 0,
            club = 0,
            testingDeck = this.shuffled();

        for (var i = 0; i < testingDeck.length; i++) {
            if (testingDeck[i][0] === 0) {
                spade += testingDeck[i][1];
            } else if (testingDeck[i][0] === 1) {
                heart += testingDeck[i][1];
            } else if (testingDeck[i][0] === 2) {
                diamond += testingDeck[i][1];
            } else if (testingDeck[i][0] === 3) {
                club += testingDeck[i][1];
            }
        }
        console.log("spade: " + spade + ", heart: " + heart + ", diamond: " + diamond + ", club: " + club);
    }

}
// running code for deck shuffling and testing
// console.log(decks.shuffled());
// decks.testing();



$(document).ready(function () {


    /////
    // game setup
    var dealerAction = {
        // calculating card value
        getCardValue: function (arr) {
            if (arr[1] === 0) {
                return 11;
            } else if (arr[1] < 10) {
                return arr[1] + 1;
            } else {
                return 10;
            }
        },
        // cards & dealingMotion
        cards: decks.shuffled(),
        dealingMotionSpeed: 250,

        // table setup
        numPlayer: 3,
        playerBudget: 1000,
        table: [],
        dealer: { name: "dealer", hand: [], handValue: 0, blackjack: false },

        setPlayerContainer: function () {
            for (var i = 0; i < this.numPlayer; i++) {
                var player_area_container = '<div class="card player_container player' + i + '_area"><h2>Player' + i + '</h2>'
                var hands_area_container = '<div class="player' + i + ' hands_area" value="0"></div></div>'
                player_area_container += hands_area_container;
                $('.play-area').append(player_area_container);
            }
            var dealer_area_container = '<div class="card player_container dealer_area"><h2>Dealer</h2><div class="dealer hands_area" value="0"></div></div>'
            $('.play-area').append(dealer_area_container);
        },
        setPlayers: function () {
            for (var i = 0; i < this.numPlayer; i++) {
                this.table[i] = { name: "player" + i, budget: this.playerBudget, hand: [], handValue: 0, betAmt: 0, blackjack: false };
            }

            return this.table;
        },
        setTable: function () {
            this.setPlayers().push(this.dealer);
            return this.table;
        },

        // display cards
        // <li class="hands"><a class="card-img" id="C7"></a></li>
        cardContainer: function (arr) {
            var card_container = '<li class="hands"><a class="card-img" id="';
            if (arr[0] === 0) {
                card_container += "C";
            } else if (arr[0] === 1) {
                card_container +="S";
            } else if (arr[0] === 2) {
                card_container +="H";
            } else if (arr[0] === 3) {
                card_container += "D";
            }

            if (arr[1] === 0) {
                card_container += "A";
            } else if (arr[1] === 10) {
                card_container +="J";
            } else if (arr[1] === 11) {
                card_container +="Q";
            } else if (arr[1] === 12) {
                card_container += "K";
            } else {
                card_container += (arr[1] + 1);
            }
            card_container += '"></a></li>';
            return card_container;
        },
        deal: function () {
            // if cards.length <= 52, reshuffle
            if (this.cards.length <= 52) {
                this.cards = decks.shuffled();
            }
            // deal to cards to each player
            for (var k = 0; k < 2; k++) {
                for (var i = 0; i < this.table.length; i++) {
                    var dealtCard = this.cards.shift();
                    
                    // dealing motion with setTimeout
                    var card_container = this.cardContainer(dealtCard);
                    // if !(k === 1 && i === this.table.length - 1)
                    if ((k !== 1) || (i !== this.table.length - 1)) {
                        setTimeout(function(i, card_container) {
                            $(".hands_area:eq(" + i + ")").append(card_container);
                        }, this.dealingMotionSpeed * i + (k * this.dealingMotionSpeed * this.table.length), i, card_container);
                    }

                    // pushing cards to players' hands & calculate handValue
                    this.table[i].hand.push(dealtCard);
                    this.table[i].handValue += this.getCardValue(this.table[i].hand[k]);

                    // setting blackjack condition
                    if (this.table[i].handValue === 21) {
                        this.table[i].blackjack = true;
                    }
                }
            }
            // Dealer's second card face down
            var card_cover = '<li class="hands"><a id="card-cover"></a>';
            setTimeout(function() {
                $(".hands_area:eq(" + (dealerAction.table.length - 1) + ")").append(card_cover);
            }, (this.dealingMotionSpeed * (2 * dealerAction.table.length) - this.dealingMotionSpeed));

            //*** if dealer's first card is Ace, option to insurance
        },
        // Dealer's second card face up after all playerAction
        showSecondCard: function () {
            $('.hands_area').on('click', function () {
                $('#card-cover').hide();    // not working
                $(".hands_area:eq(" + (dealerAction.table.length - 1) + ")").append(dealerAction.cardContainer(dealerAction.table[3].hand[1]));
                // console.log(dealerAction.cardContainer(dealerAction.table[3].hand[1]));
            })
        },
        burnFirstCard: function () {     // ( used under deal() )
            var burned = this.cards.shift();
            // var burnedCard_container = '<div class="card player_container burned_card"><div class="hands_area"></div></div>'
            var burnedCard_container = '<div class="burned_card"><div>Burning 1st Card<div></div>'
            $('.play-area').append(burnedCard_container);
            $(".burned_card").append(this.cardContainer(burned));
            setTimeout(function () {
                $(".burned_card").hide();
            },1000);
        }
    }


    /////
    // Player Action after two cards are dealt
    var playerAction = {
        currentPlayer: 0,
        bet: function () {
            budget -= betAmt;
        },
        insurance: function () {
            // if player handValue !== 21,
            // when dealer's faceCard === 'A', insurance is optional with (1/4) of betting amount
        },
        doubleDown: function () {
            // player can hit Only once
            budget -= betAmt;
            betAmt *= 2;
            hit();
        },
        split: function () {

        },
        hit: function () {
            dealerAction.table[this.currentPlayer].hand.push(this.cards.shift());
            dealerAction.table[this.currentPlayer].handValue += getCardValue.value(this.table[i].hand[0]);
        },
        stand: function () {
            if (this.currentPlayer < dealerAction.table.length) {
                this.currentPlayer = (this.currentPlayer + 1);
            }
        },
        bust: function () {
            if (this.table[playerAction.currentPlayer].handValue > 21) {

            }
        },
        payOut: function () {
            if (this.table[playerAction.currentPlayer] !== this.table[table.length - 1]) {
                if (this.table[playerAction.currentPlayer].blackjack === true) {
                    this.table[playerAction.currentPlayer].budget += this.table[playerAction.currentPlayer].betAmt * 2.5;

                } else {
                    this.table[playerAction.currentPlayer].budget += this.table[playerAction.currentPlayer].betAmt * 2;
                }
            }
        }
    }


    // Game Setup
    console.log(dealerAction.cards.length);
    dealerAction.setPlayerContainer();
    dealerAction.setTable();
    // Play Game
    var play = function () {
        // if new tray, burn the first card
        if (dealerAction.cards.length === 52 * decks.numOfDecks) {
            dealerAction.burnFirstCard();
        }
        setTimeout( function () {
            dealerAction.deal();
        },2000)
    };

    play();
    console.log(dealerAction.table);




});