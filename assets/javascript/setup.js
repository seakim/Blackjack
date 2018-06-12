//
// Sean Kim
//
// Setting up a set of suffled 8 decks to be ready to play

$(document).ready(function () {

    var unshuffledDeck = [],
        shuffledDeck = [],
        dealtCard = "",
        click = 1;

    // Set a set of 8 decks (416 cards); unshuffledDeck[i][j]
    for (var k = 0; k < 8; k++) {

        // Set a deck (52 cards); deck[i][j] 
        // where   j = 1, and y=0 -> spades, y=1 -> hearts, y=2 -> diamonds, y=3 -> clubs,
        //         j = 0, and x=0 -> A, x=1 -> 2, ..., x=8 -> 9, x=9 -> 10, x=10 -> J, x=11 -> Q, x=12 -> K;
        //         deck = [[0,0],[0,1],[0,2],[0,3],[1,0], ..., [x,y], ..., [12,3]];
        for (var i = 0; i < 13; i++) {
            for (var j = 0; j < 4; j++) {
                unshuffledDeck.push([i, j]);
            }
        }
    }
    // console.log(unshuffledDeck);


    // 8 decks shuffled; shuffledDeck[i][0][j]
    // shuffledDeck = [ [  [x1,y1] ],[ [x2,y2] ],[ [x3,y3] ] ... [ [x,y] ] ]

    for (var i = 0; i < 416; i++) {
        var rand = Math.floor(Math.random() * 416 - i);
        shuffledDeck.push(unshuffledDeck.splice(rand, 1));
    }

    // test code for shuffled deck;
    var c1 = 0,
        c2 = 0,
        c3 = 0;
    for (var i = 0; i < shuffledDeck.length; i++) {
        // console.log(shuffledDeck[i][0][1]);
        if (shuffledDeck[i][0][0] === 0) {
            c1 += 1;
        }
        if (shuffledDeck[i][0][0] === 1) {
            c2++;
        }
        if (shuffledDeck[i][0][0] === 12) {
            c3++;
        }
    }
    // console.log(c1);
    // console.log(c2);
    // console.log(c3);


    // Dealing
    $(".cards_area").on("click", ".player", function () {
        dealtCard = shuffledDeck.shift()[0];

        // <div class='card1 cards'>
        //     <img id="d13" src="assets/images/deck.png" />
        // </div>
        var cardH = "<div class='card" + click + " cards'><img id='"
        if (dealtCard[1] === 0) {
            cardH += "c";
        } else if (dealtCard[1] === 1) {
            cardH +="s";
        } else if (dealtCard[1] === 2) {
            cardH +="h";
        } else if (dealtCard[1] === 3) {
            cardH += "d";
        }
        cardH += (dealtCard[0] + 1);
        cardH += "' src='assets/images/deck.png' /></div>";
        console.log(cardH);
        $(".player").append(cardH);
        console.log(shuffledDeck.length);
        click++;
    });




});