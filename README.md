# Blackjack

First time building a game with JQuery.  


    settings:
    1) 8 decks of cards; poping cards every time dealt
    2) Can hold 1 - 6 players 
    3) Player can in & out
    4) User can cut at the very first time before cards are dealt
    5) If total cards are 52 or less, deck will be replaced with new shuffled 8 decks

    
    deal & bet:
    2) Players bet before cards are dealt
    3) Cards are dealt clockwise
    4) After getting two cards player can either split or double down
    

    playing & payout:
    1) Blackjack if 21 (1.5x payout)
    2) A is counted either 1 or 11
    3) Soft 17 for dealer
    4) User has option to insure, if dealer's face card is A
    5) User can hit as many time until busted
    6) If dealer busts, all non-busted player win automatically



1. Set a deck (52 cards); deck[i][j] 
where   j = 1, and y=0 -> spades, y=1 -> hearts, y=2 -> diamonds, y=3 -> clubs,
        j = 0, and x=0 -> A, x=1 -> 2, ..., x=8 -> 9, x=9 -> 10, x=9 -> J, x=9 -> Q, x=9 -> K;

    deck = [[0,0],[0,1],[0,2],[0,3],[1,0], ..., [x,y], ..., [9,3]];


2. Set 8 decks shuffled (416 cards); newDecks[i][j]
    // old deck;
    8.times do { oldDecks += deck }



/////
    // pop from oldDecks, and push to newDecks
    for (var i = 0; i < 416; i++) {

        // pick random number (0 - 415); random415
        random415 = Math.floor(Math.random() * 416);

        newDecks.push(oldDecks[random415].pop());
    }
    // newDecks has 416 cards shuffled.


3. Set Player class
    var Player = {
        budget: 10000,
        betting: 0,
        alive: true,
        hands: [],
    }

    var dealer = {
        hands: [];
    }

    playerCount = [];

    // if join {
        new Player();
    }

3. Bet pre-hands
    betting: user_input;
    player.budget -= betting;

4. Dealing hands
function deal() {
    currentPlayer.hands.push(newDecks.pop[0]);
}

for (var i = 0; i < playerNumber.length * 2 + 1; i++) {
    if (i === playerCount.length - 1) {
        deal() to players;
    } else if (i === playerCount.length) {
        deal() to dealer;
    } else if (i === playerCount.length + i) {
        deal() to players;
    } else {
        deal() to dealer;
    }
}

5. Double-down
    player.budget -= betting;
    betting *= 2;

6. Split -- not covering yet

7. Hit
    function hit() {
        if sum <= 21 {  // sum === player.hands[0][0] + player.hands[1][0];
            deal();
        }
    }
