$(document).ready(function()
{

var wins = 0;
var loss = 0;
var record = "";

//array of faces
var faces = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
//array of suits
var suits = ['diamonds','clubs','hearts','spades'];
//array that holds cards
var deck = [];

//function to create a deck of cards
function newDeck()
{
  deck = [];
  
  //loop that creates 52 cards with face, suit and a value
  for(var i = 0; i < faces.length; i++)
  {
    for(var j = 0; j < suits.length; j++)
    {
      var temp;

      if(i > 9)
      {
        temp = new card(faces[i], suits[j], 10);
      }
      else
      {
        temp = new card(faces[i], suits[j], i + 1);
      }

      //pushes the created card to deck
      deck.push(temp);
    }
  }
  //returns deck
  return deck;
}

//creates a new deck
newDeck();

//function card that accepts 3 values(face,suit,value)
function card(face, suit, value) {

  this.face = face;
  this.suit = suit;
  this.value = value;
}

//function hand has player name, number of cards in hand, and value of hand
function hand()
{
  this.player = 'none';
  this.cards = [];
  this.value = 0;
}

//function gameover is called when there is not enough cards left in deck
function gameover()
{
    var person = "";
    
    while(person == "")
    {
      person = prompt("Not enough cards on deck! Game over! Please enter your name", "");

    }

    playerHand.player = person;

}

//function startingHand deals 2 cards to player and 1 to computer
function startingHand()
{
  for(var i = 0; i < 2; i++)
  {
    hit(playerHand);
  }
  computerHit();
}

//computer hit
function computerHit()
{
  hit(computerHand);
  showCompValue();
}

//shows the value of player hand
function showValue()
{
  $('#gameBoard').append('<div class="player-value">' + playerHand.value.toString() + '</div');
  if(playerHand.value > 21)
  {
    $('#gameBoard').append('<div class="player-value">You Bust!</div');
    showCompValue();
    computerTurn();
    $('.buttons').addClass('hide');
  }
}

//show value of computer hand
function showCompValue()
{
  $('#gameBoard').append('<div class="computer-value">' + computerHand.value.toString() + '</div');
  if(computerHand.value > 21)
  {
    $('#gameBoard').append('<div class="computer-value">Computer Bust!</div');
  }
}

//function to add cards
function addCards(addHand)
{
  var total = 0;
  var list = [];

  for(var i = 0; i < addHand.cards.length; i++)
  {
    if(addHand.cards[i].face != 'A' )
    {
      list.unshift(addHand.cards[i]);
    }
    else
    {
      list.push(addHand.cards[i]);
    }
  }
  
  for( var i = 0; i < list.length; i++)
  {
    if( list[i].face != 'A' ) 
    {
      total += list[i].value;
    }
    else
    {
      if( total < 11)
      {
        total += 11;
      }
      else
      {
        total += 1;
      }
    }
  }
  
  return total;
}


function hit(hitHand) 
{
  var num = Math.floor((Math.random() * (deck.length - 1)));
  var temp = deck[num];

  hitHand.cards.push(temp);

  hitHand.value = addCards(hitHand);

  if(deck[num].suit == "diamonds" )
  {
    if(hitHand.player == 'player')
    {
      buildCard('player', 'red', deck[num].face, '&diams;', hitHand );
    }
    else 
    {
      buildCard('computer', 'red', deck[num].face, '&diams;', hitHand );
    }
  }

  if( deck[num].suit == "clubs" )
  {
    if( hitHand.player == 'player')
    {
      buildCard('player', 'black', deck[num].face, '&clubs;', hitHand );
    }
    else
    {
      buildCard('computer', 'black', deck[num].face, '&clubs;', hitHand );
    }
  }

  if( deck[num].suit == "hearts" )
  {
    if( hitHand.player == 'player')
    {
      buildCard('player', 'red', deck[num].face, '&hearts;', hitHand );
    }
    else 
    {
      buildCard('computer', 'red', deck[num].face, '&hearts;', hitHand );
    }
  }

  if( deck[num].suit == "spades" )
  {
    if( hitHand.player == 'player')
    {
      buildCard('player', 'black', deck[num].face, '&spades;', hitHand );
    }
    else
    {
      buildCard('computer', 'black', deck[num].face, '&spades;', hitHand );
    }
  }

  deck.splice(num,1);

}

//function that starts the game
//creates 2 player
function startGame()
{

  playerHand = new hand();
  computerHand = new hand();

  playerHand.player = 'player';
  computerHand.player = 'computer';

  startingHand();
  showValue();

  //if player hand == 21, call win() function
  //hides Hit and Stay button
  //show Next Round button
  if(playerHand.value == 21)
  {
    win();
    $('.buttons').addClass('hide');
    $('#nextround').removeClass('hide');
  }

  if( deck.length < 5)
  {
    $('#gameBoard').append('<div class="result">Not enough cards left in deck! <br> Game over!</div>');
    $('#startover').removeClass('hide');
    $('.buttons').addClass('hide');
    gameover();

    record = playerHand.player  + " Wins: " + wins + " Loss "  + loss;

    WriteFile(record);
  }
}


//builds a card
function buildCard( Player, Color, Face, Suit, Hand )
{
  var str = '<div class="single-left ';
  str = str.concat(Color);
  str = str.concat('"><div class="facevalue">');
  str = str.concat(Face);
  str = str.concat('</div><div class="facetype">');
  str = str.concat(Suit);
  str = str.concat('</div></div>');
  if(Player == 'player') {
    $('.player-section').append( str );
    if(Hand.cards.length == 1) {
      $('.player-section .single-left').addClass('first');  
    }
  }
  else {
    $('.computer-section').append( str );
    if(Hand.cards.length == 1) {
      $('.computer-section .single-left').addClass('first');  
    }
  }
}

//computer turn
function computerTurn()
{
  if(playerHand.value < 22)
  {
    if(computerHand.value < 17)
    {
      computerHit();
      computerTurn();
    }
    else
    {
      checkScore();
    }
  }
  else
  {
    checkScore();
  }
}

//update the wins and loss
function updateRecord()
{
  $('#wins').text('Wins: ' + wins.toString());
  $('#loss').text('Loss: ' + loss.toString());
}

//outputs "You win" in gameboard
function win()
{
  $('#gameBoard').append('<div class="result">You win!</div');
  //increment wins
  wins++;
  updateRecord();
}

//outputs "Its a draw" in gameboard
function draw()
{
  $('#gameBoard').append('<div class="result">Its a Draw!</div');
  updateRecord();
}

//outputs "You lost" in gameboard
function lose()
{
  $('#gameBoard').append('<div class="result">You lost!</div');
  //decrement loss
  loss++;
  updateRecord();
}

//check score of hand
function checkScore() 
{
  if(playerHand.value < 22)
  {
    if(playerHand.value > computerHand.value)
    {
      win();
    }
    else
    {
      if(computerHand.value < 22)
      {
        if(computerHand.value == playerHand.value)
        {
          draw();
        }
        else
        {
          lose();
        }
      }
    }
    if(computerHand.value > 21)
    {
      win();
    }
  }
  else
  {
    lose();
  }

  //if deck.lenght is > than 4
  //shows the nextround button to continue
  //else outputs "game over" and shows start over button
  if( deck.length > 4)
  {
    $('#nextround').removeClass('hide');
  }
  else 
  {
    $('#gameBoard').append('<div class="result">Not enough cards left in deck! <br> Game over!</div>');
    $('#startover').removeClass('hide');
    $('.buttons').addClass('hide');
    gameover();
    
    record = playerHand.player  + " Wins: " + wins + " Loss "  + loss;

    WriteFile(record);

  }
}



function WriteFile(record)
{
  $.ajax({
        type: 'POST',
        url: 'blackjack.php',
        data: {'variable': record}
        
    });

}



//reset the gameboard
function reset()
{
  $('#gameBoard').text('');
  $('#gameBoard').append('<div class="player-section card-section"></div><div class="computer-section card-section"></div>');
  updateRecord();
  $('.deal').removeClass('hide');
}

//reset the initial wins and loss and create new deck
function startover()
{
  wins = 0;
  loss = 0;
  newDeck();
  reset();
}

//when playhit is clicked, add card and show value
$('#playHit').click(function() {
  hit(playerHand);
  showValue();
});

//when playstay is clicked, computers turn
//and hit and stay button are hidden
$('#playStay').click(function() {
  computerHit();
  computerTurn();
  $('.buttons').addClass('hide');
});

//when deal is clicked, hide deal button
//and show hit and stay button
//starts game
$('#deal').click(function() {
  $('.deal').addClass('hide');
  $('.buttons').removeClass('hide');
  startGame();
});

//when nextround is clicked, hide nextround button
//and reset gameboard
$('#nextround').click(function() {
  $('#nextround').addClass('hide');
  reset();
});

//when startover is clicked, hide startover button
//and start game
$('#startover').click(function() {
  $('#startover').addClass('hide');
  startover();

});


});

