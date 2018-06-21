//
// Sean Kim
//
// BlackJack


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
    shuffled: function () {
    // shuffledDeck = [ [  [x1,y1] ],[ [x2,y2] ],[ [x3,y3] ] ... [ [x,y] ] ]

        var shuffledDeck = this.unshuffled();

        for (var i = shuffledDeck.length - 1; i > 0; i--) {
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
            console.log(testingDeck[1][1]);

        for (var i = 0; i < (testingDeck.length * (Math.floor(Math.random() * 3) + 1)); i++) {
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
// console.log(decks.shuffled());
// decks.testing();


// var playerSettings = {
//     players: [],
//     setPlayers: function(numPlayer, budget) {
//         for (var i = 0; i < numPlayer; i++) {
//             this.players[i] = {name: "player"+i, budget: budget, hand: [], handValue: 0, betAmt: 0, blackjack: false};
//         }
//         return this.players;
//     }
// }
// console.log(playerSettings.setPlayers(3,1000));


var blackJack = {
    // card setup
    getCardValue: function (arr) {
        if (arr[1] === 0) {
            return 11;
         } else if (arr[1] < 10) {
             return arr[1] + 1;
         } else {
            return 10;
         }
    },
    cards: decks.shuffled(),

    // table setup
    numPlayer: 3,
    playerBudget: 1000,
    table: [],
    setPlayers: function() {
        for (var i = 0; i < this.numPlayer; i++) {
            this.table[i] = {name: "player"+i, budget: this.playerBudget, hand: [], handValue: 0, betAmt: 0, blackjack: false};
        }
        return this.table;
    },
    dealer: {name: "dealer", hand: [], handValue: 0, blackjack: false},

    setTable: function() {
        this.setPlayers().push(this.dealer);
        return this.table;
    },

    // dealing 2 cards
    burnFirstCard: function() {     // ( used under deal() )
        this.cards.shift();
    },
    deal: function() {
        // if cards.length <= 52, reshuffle
        if (this.cards.length <= 52) {
            this.cards = decks.shuffled();
        }
        // if new tray, burn the first card
        if (this.cards.length === 52 * decks.numOfDecks) {
            this.burnFirstCard();
        }

        //*** this would need setTimeout motion implemented  
        // Dealing first cards
        for (var i = 0; i < this.table.length; i++) {
            this.table[i].hand.push(this.cards.shift());
            this.table[i].handValue += this.getCardValue(this.table[i].hand[0]);
        }
        // Dealing second cards
        for (var i = 0; i < this.table.length; i++) {
            this.table[i].hand.push(this.cards.shift());
            this.table[i].handValue += this.getCardValue(this.table[i].hand[1]);
        //***

            // set blackjack condition
            if (this.table[i].handValue === 21) {
                this.table[i].blackjack = true;
            }
        }

        // Dealer's second card face down
        // if dealer's first card is Ace, option to insurance
        // Dealer's second card face up after all playerAction
    },
    bust: function () {
        if (this.table[playerAction.currentPlayer].handValue > 21) {
            
        }
    },
    payOut: function() {
        if (this.table[playerAction.currentPlayer] !== this.table[table.length - 1]) {
            if (this.table[playerAction.currentPlayer].blackjack === true) {
                this.table[playerAction.currentPlayer].budget += this.table[playerAction.currentPlayer].betAmt * 2.5;

            } else {
                this.table[playerAction.currentPlayer].budget += this.table[playerAction.currentPlayer].betAmt * 2;
            }
        }
    }
}

var playerAction = {
    currentPlayer: 0,
    bet: function() {
        budget -= betAmt;
    },
    insurance: function() {
        // if player handValue !== 21,
            // when dealer's faceCard === 'A', insurance is optional with (1/4) of betting amount
    },
    doubleDown: function() {
        // player can hit Only once
        budget -= betAmt;
        betAmt *= 2;
        hit();
    },
    split: function() {

    },
    hit: function() {
        blackJack.table[this.currentPlayer].hand.push(this.cards.shift());
        blackJack.table[this.currentPlayer].handValue += getCardValue.value(this.table[i].hand[0]);
    },
    stand: function() {
        if (this.currentPlayer < blackJack.table.length) {
            this.currentPlayer = (this.currentPlayer + 1);
        }
    }
}


// Game Setup
console.log(blackJack.cards.length);
blackJack.setTable();
// Play Game
var play = function () {
    blackJack.deal();
    console.log(blackJack.cards.length);
};

play();
console.log(blackJack.table);


// blackJack.setPlayers();
// console.log(blackJack.players);
//     function deal() {
//         for (var i = 0; i < $(".hands_area").length; i++) {
//             dealtCard = shuffledDeck.shift()[0];
//             // display cards
//             var cardH = "<div class='cards'><img id='"
//             if (dealtCard[1] === 0) {
//                 cardH += "c";
//             } else if (dealtCard[1] === 1) {
//                 cardH +="s";
//             } else if (dealtCard[1] === 2) {
//                 cardH +="h";
//             } else if (dealtCard[1] === 3) {
//                 cardH += "d";
//             }
//             cardH += (dealtCard[0] + 1);
//             cardH += "' src='assets/images/deck.png' /></div>";
//             console.log(cardH);
//             $(".hands_area:eq(" + i + ")").delay(2000).append(cardH);
//         }
//     }
    

//         // <div class='card1 cards'>
//         //     <img id="d13" src="assets/images/deck.png" />
//         // </div>
//         // deal first card


// });