//
// Sean Kim
//
// BlackJack


var decks = {
    numOfDecks: 8,  //total number of decks
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
// console.log(decks.shuffled());
// decks.testing();


var getCardValue = {
    value: function (arr) {
        if (arr[1] === 0) {
            return 11;
         } else if (arr[1] < 10) {
             return arr[1] + 1;
         } else {
            return 10;
         }
    }
}
// console.log(getCardValue.value([0,10]));
// console.log(getCardValue.value([0,0]));


var playerSettings = {
    players: [],
    setPlayers: function(numPlayer, budget) {
        for (var i = 0; i < numPlayer; i++) {
            this.players[i] = {name: "player"+(i+1), budget: budget, hand: [], handValue: 0};
        }
        return this.players;
    }
}
// console.log(playerSettings.setPlayers(3,1000));


var blackJack = {
    // Dealing first cards
    // Dealing second cards; second card for dealer is face down;
    newDeck: decks.shuffled(),
    dealer: {name: "dealer", hand: [], handValue: 0},
    players: playerSettings.setPlayers(3,1000),
    setTable: function() {
        this.players.push(this.dealer);
        return this.players;
    }
}
console.log(blackJack.setTable());




// console.log(blackJack.newDeck);
// blackJack.setPlayers()
// console.log(blackJack);
    
//     function deal() {
//         for (var i = 0; i < $(".hands_area").length; i++) {
//             dealtCard = shuffledDeck.shift()[0];

//             // get the card value
//             // console.log(dealtCard[0]);
//             // cardValue += dealtCard[0] + 1;
//             // $(".hands_area:eq(" + i + ")").attr("value", cardValue);

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
    
//     function gameStart() {
//         deal();
//         deal();
//         console.log(shuffledDeck.length);
//     }
//     $(".deal").on("click", function (){
//         gameStart();
//     });


//         // <div class='card1 cards'>
//         //     <img id="d13" src="assets/images/deck.png" />
//         // </div>
//         // deal first card






// });