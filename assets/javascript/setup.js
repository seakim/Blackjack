//
// Sean Kim
//
// Setting up a set of suffled 8 decks to be ready to play

$(document).ready(function() {

    var unshuffledDeck = [],
        shuffledDeck = [];
        
        

// Set a set of 8 decks (416 cards); unshuffledDeck[i][j]
    for (var k = 0; k < 8; k++) {

    // Set a deck (52 cards); deck[i][j] 
    // where   j = 1, and y=0 -> spades, y=1 -> hearts, y=2 -> diamonds, y=3 -> clubs,
    //         j = 0, and x=0 -> A, x=1 -> 2, ..., x=8 -> 9, x=9 -> 10, x=10 -> J, x=11 -> Q, x=12 -> K;
    //         deck = [[0,0],[0,1],[0,2],[0,3],[1,0], ..., [x,y], ..., [12,3]];
        for (var i = 0; i < 13; i++) {
            for (var j = 0; j < 4; j++) {
                unshuffledDeck.push([i,j]);
            }
        }
    }
    // console.log(unshuffledDeck);




// ***************** having trouble getting one extra layer of array on shuffledDeck;

// 8 decks shuffled; shuffledDeck[i][j]
    for (var i = 0; i < 416; i++) {
        // var rand = Math.floor(Math.random() * 416 - i);
        // shuffledDeck.push(unshuffledDeck.splice(rand,1));
    }
    // console.log(shuffledDeck);
    // console.log(unshuffledDeck);
    // for (var i = 0; i < 10; i++) {
    // var rand = Math.floor(Math.random() * 416 );

    // var x = unshuffledDeck.splice(rand,1,"");
    // console.log(x);
    

// console.log(unshuffledDeck.splice(1,1));
// shuffledDeck.concat(unshuffledDeck.splice(1,1));
// shuffledDeck.concat(unshuffledDeck.splice(1,1));
//     console.log(shuffledDeck);


// test code;
    for (var i = 0; i < shuffledDeck.length; i++) {
        var c1 = 0,
            c2 = 0,
            c3 = 0;

        if (shuffledDeck[i][0] === 0) {
            c1++;
        }
        if (shuffledDeck[i][0] === 1) {
            c2++;
        }
        if (shuffledDeck[i][0] === 2) {
            c3++;
        }
    }
    // console.log( c1);
    // console.log(shuffledDeck[0][0])













});