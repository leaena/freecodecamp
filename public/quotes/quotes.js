var quotes = [{text: "It's better to keep your mouth shut and give the impression that you're stupid than to open it and remove all doubt.",author: "Rami Belson"},{text: "When you want something, all the universe conspires in helping you to achieve it.",author: "Paulo Coelho"},{text: "The rarest thing in the world is a woman who is pleased with photograph of herself.",author: "Elizabeth Metcalf"},{text: "We all have our time machines. Some take us back, they're called memories. Some take us forward, they're called dreams.",author: "Jeremy Irons"},{text: "If you believe everything you read, you'd better not read.",author: "Japanese proverb"},{text: "The chief danger in life is that you may take too many precautions.",author: "Alfred Adler"},{text: "Life is not a problem to be solved, but a reality to be experienced.",author: "Soren Kierkegaard"},{text: "Conquering the world on horseback is easy; it is dismounting and governing that is hard.",author: "Genghis Khan"},{text: "Think of and look at your work as though it were done by your enemy. If you look at it to admire it, you are lost.",author: "Samuel Butler"},{text: "I think, therefore I'm single.",author: "Lizz Winstead"},{text: "In politics, if you want anything said, ask a man; if you want anything done, ask a woman.",author: "Margaret Thatcher"},{text: "Love is blind, but marriage restores its sight.",author: "Lichtenberg"},{text: "My life has no purpose, no direction, no aim, no meaning, and yet I'm happy. I can't figure it out. What am I doing right?",author: "C. Schulz"},{text: "You can catch more flies with honey than with vinegar.",author: "American proverb"},{text: "The temptation to quit will be greatest just before you are about to succeed.",author: "Ancient Chinese proverb"},{text: "Disobedience is the true foundation of liberty. The obedient must be slaves.",author: "Henry David Thoreau"},{text: "During times of universal deceit, telling the truth becomes a revolutionary act.",author: "George Orwell"},{text: "You can't be lucky all the time, but you can be smart everyday.",author: "Mos Def"},{text: "Out of life's school of war: what does not destroy me, makes me stronger.",author: "Friedrich Nietzsche"},{text: "The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires.",author: "William A. Ward"},{text: "A minute's success pays the failure of years.",author: "Robert Browning"},{text: "Assumptions are the termites of relationships.",author: "Henry Winkler"},{text: "If we believe absurdities, we shall commit atrocities.",author: "Voltaire"},{text: "Let us never negotiate out of fear. But let us never fear to negotiate.",author: "John F. Kennedy"},{text: "To achieve victory we must mass our forces at the hub of all power and movement. The enemy's center of gravity.",author: "Carl von Clausewitz"}];

function randomQuote(){
  var num = Math.floor(Math.random() * 25);
  return quotes[num];
}

function displayQuote(quote){
  var tweet = 'http://twitter.com/home/?status=';
  $('.quote-text').html(quote.text);
  $('.quote-author').html(quote.author);
  $('.link').prop('href', tweet + quote.text + ' - ' +  quote.author);
}

function newQuote(){
  var quote = randomQuote();
  displayQuote(quote);
}
newQuote();

$('.quote-button').on('click', function(){
  newQuote();
});
