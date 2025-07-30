
/*function analyzeSentiment() {
  const input = document.getElementById("inputText").value;

  // Placeholder logic for sentiment analysis
  // Replace this with API call to your ML model
  let sentiment;
  if (input.toLowerCase().includes("love") || input.toLowerCase().includes("great")) {
    sentiment = "Positive 😊";
  } else if (input.toLowerCase().includes("hate") || input.toLowerCase().includes("terrible")) {
    sentiment = "Negative 😠";
  } else {
    sentiment = "Neutral 😐";
  }

  document.getElementById("outputResult").innerText = sentiment;
}*/

// Simple sentiment analysis using keyword-based approach
const sentimentKeywords = {
  positive: [
    'amazing', 'awesome', 'brilliant', 'excellent', 'fantastic', 'great', 'good', 'happy',
    'incredible', 'love', 'perfect', 'wonderful', 'best', 'outstanding', 'superb', 'terrific',
    'delighted', 'pleased', 'satisfied', 'thrilled', 'excited', 'joy', 'beautiful', 'nice',
    'marvelous', 'spectacular', 'impressive', 'remarkable', 'extraordinary', 'fabulous',
    'magnificent', 'splendid', 'phenomenal', 'exceptional', 'stellar', 'triumph', 'success',
    'win', 'victory', 'achieve', 'accomplish', 'appreciate', 'grateful', 'thank', 'blessing',
    'abundant', 'accept', 'accomplish', 'achievement', 'active', 'admire', 'adore', 'adventurous',
    'affectionate', 'agree', 'amazing', 'angelic', 'appealing', 'appreciate', 'awesome', 'beautiful',
    'believe', 'beneficial', 'bliss', 'brave', 'brilliant', 'calm', 'celebrate', 'charming',
    'cheerful', 'clean', 'clever', 'compassionate', 'confident', 'congratulations', 'considerate',
    'cool', 'courageous', 'creative', 'cute', 'dazzling', 'delight', 'desirable', 'determined',
    'diligent', 'divine', 'dream', 'easy', 'ecstatic', 'effective', 'effortless', 'efficient',
    'elegant', 'enchanting', 'encourage', 'energetic', 'engaging', 'enjoy', 'enthusiastic', 'excellent',
    'exciting', 'exquisite', 'fabulous', 'fair', 'faith', 'fantastic', 'favorable', 'fine',
    'flawless', 'fortunate', 'free', 'friendly', 'fun', 'funny', 'generous', 'genius', 'gentle',
    'gifted', 'glad', 'glamorous', 'gleaming', 'glorious', 'good', 'gorgeous', 'graceful', 'grateful',
    'great', 'happy', 'harmonious', 'healing', 'healthy', 'helpful', 'honest', 'honor', 'hopeful',
    'hug', 'ideal', 'impressive', 'independent', 'innovative', 'inspiring', 'intelligent', 'interesting',
    'invincible', 'jolly', 'joy', 'jubilant', 'kind', 'kiss', 'laugh', 'legendary', 'light', 'like',
    'lively', 'lovable', 'love', 'lucky', 'magnificent', 'marvelous', 'masterpiece', 'merry', 'miracle',
    'motivated', 'neat', 'nice', 'noble', 'optimistic', 'outstanding', 'paradise', 'perfect', 'pleasant',
    'polite', 'positive', 'powerful', 'precious', 'pretty', 'productive', 'prosperous', 'proud',
    'radiant', 'remarkable', 'resilient', 'respect', 'safe', 'satisfying', 'sensational', 'serene',
    'sharp', 'shiny', 'skillful', 'smart', 'smile', 'soothing', 'sparkling', 'spectacular', 'splendid',
    'strong', 'stunning', 'successful', 'sunny', 'super', 'sweet', 'terrific', 'thankful', 'thrilled',
    'top', 'tranquil', 'trust', 'trustworthy', 'truthful', 'unique', 'valuable', 'vibrant', 'victorious',
    'vivid', 'warm', 'welcome', 'well', 'whole', 'wise', 'wonderful', 'worthy'
  ],
  negative: [
    'awful', 'bad', 'terrible', 'horrible', 'disgusting', 'hate', 'worst', 'stupid', 'dumb',
    'annoying', 'frustrating', 'disappointed', 'sad', 'angry', 'furious', 'mad', 'upset',
    'depressed', 'miserable', 'pathetic', 'useless', 'worthless', 'fail', 'failure', 'disaster',
    'catastrophe', 'nightmare', 'pain', 'hurt', 'broken', 'damaged', 'wrong', 'mistake',
    'regret', 'sorry', 'apologize', 'blame', 'fault', 'problem', 'issue', 'trouble',
    'crisis', 'emergency', 'danger', 'risk', 'threat', 'fear', 'scared', 'worried',
    'abysmal', 'adverse', 'alarming', 'angry', 'annoy', 'anxious', 'appalling', 'atrocious',
    'awful', 'bad', 'banal', 'barbaric', 'bewildered', 'bitter', 'bizarre', 'boring',
    'broken', 'callous', 'chaotic', 'clumsy', 'coarse', 'cold', 'combative', 'complain',
    'confused', 'corrupt', 'crazy', 'creepy', 'cruel', 'cry', 'damaged', 'dangerous',
    'dark', 'dead', 'decrepit', 'defeated', 'defective', 'deficient', 'deplorable',
    'depressed', 'deprived', 'deranged', 'desolate', 'despicable', 'destroy', 'detrimental',
    'dirty', 'disagree', 'disappointed', 'disastrous', 'discomfort', 'discontent',
    'discourage', 'disgust', 'dishonest', 'dismal', 'disorder', 'displeased', 'disrespect',
    'disruptive', 'distasteful', 'distress', 'disturb', 'dread', 'dreary', 'embarrass',
    'enraged', 'evil', 'fail', 'fake', 'fear', 'filthy', 'foolish', 'frighten', 'frustrated',
    'gloomy', 'greed', 'grim', 'gross', 'guilty', 'hard', 'harm', 'harsh', 'hate', 'hideous',
    'hopeless', 'horrible', 'hostile', 'hurt', 'ignorant', 'ill', 'immature', 'imperfect',
    'impossible', 'incompetent', 'indecent', 'ineffective', 'inferior', 'injustice',
    'insane', 'insensitive', 'insult', 'irritate', 'jealous', 'junky', 'kill', 'lazy',
    'liar', 'lonely', 'loser', 'lousy', 'mean', 'messy', 'miss', 'mistake', 'moody', 'morbid',
    'nasty', 'negative', 'neglect', 'nonsense', 'noxious', 'obnoxious', 'offensive',
    'old-fashioned', 'oppress', 'outrage', 'pain', 'pathetic', 'perverse', 'pessimistic',
    'pitiful', 'poor', 'problem', 'rude', 'rough', 'ruin', 'sad', 'savage', 'scared',
    'scary', 'selfish', 'severe', 'shame', 'shocking', 'sick', 'sinister', 'slow', 'smelly',
    'spiteful', 'stubborn', 'stupid', 'suffer', 'suspect', 'terrible', 'tense', 'terrify',
    'toxic', 'tragic', 'ugly', 'unacceptable', 'uncertain', 'uncomfortable', 'unfair',
    'unfortunate', 'unhappy', 'unhealthy', 'unjust', 'unlucky', 'unpleasant', 'unsatisfied',
    'untidy', 'useless', 'vague', 'vicious', 'vile', 'villain', 'violent', 'weak', 'weary',
    'wicked', 'worthless', 'wound', 'wrong', 'yell'
  ]
};

function analyzeSentiment() {
  const inputText = document.getElementById('inputText').value.trim();
  const outputDiv = document.getElementById('outputResult');
  const button = document.querySelector('button');

  if (!inputText) {
    outputDiv.innerHTML = 'Please enter some text to analyze.';
    outputDiv.className = '';
    return;
  }

  // Show loading state
  button.disabled = true;
  outputDiv.innerHTML = '<div class="loading"></div>Analyzing sentiment...';
  outputDiv.className = '';

  // Simulate processing delay for better UX
  setTimeout(() => {
    const result = performSentimentAnalysis(inputText);
    displayResult(result);
    button.disabled = false;
  }, 1000);
}

function performSentimentAnalysis(text) {
  const words = text.toLowerCase().split(/\W+/);
  let positiveScore = 0;
  let negativeScore = 0;
  let totalWords = words.length;

  // Count sentiment words
  words.forEach(word => {
    if (sentimentKeywords.positive.includes(word)) {
      positiveScore++;
    }
    if (sentimentKeywords.negative.includes(word)) {
      negativeScore++;
    }
  });

  // Calculate sentiment
  const netScore = positiveScore - negativeScore;
  const intensity = Math.abs(netScore);
  const confidence = Math.min((intensity / totalWords) * 100 * 10, 100);

  let sentiment, emoji, color;

  if (netScore > 0) {
    sentiment = 'Positive';
    emoji = '😊';
    color = '#28a745';
  } else if (netScore < 0) {
    sentiment = 'Negative';
    emoji = '😔';
    color = '#dc3545';
  } else {
    sentiment = 'Neutral';
    emoji = '😐';
    color = '#ffc107';
  }

  return {
    sentiment,
    emoji,
    color,
    confidence: Math.round(confidence),
    positiveWords: positiveScore,
    negativeWords: negativeScore,
    totalWords,
    netScore
  };
}

function displayResult(result) {
  const outputDiv = document.getElementById('outputResult');

  outputDiv.innerHTML = `
    <div class="sentiment-details">
      <div class="sentiment-score">${result.emoji} ${result.sentiment}</div>
      <div>Confidence: ${result.confidence}%</div>
      <div class="confidence-bar">
        <div class="confidence-fill" style="width: ${result.confidence}%; background-color: ${result.color};"></div>
      </div>
      <div style="margin-top: 15px; font-size: 14px; color: #666;">
        Positive words: ${result.positiveWords} | Negative words: ${result.negativeWords}<br>
        Total words analyzed: ${result.totalWords}
      </div>
    </div>
  `;

  // Apply sentiment-specific styling
  outputDiv.className = `sentiment-${result.sentiment.toLowerCase()}`;
}

// Allow Enter key to trigger analysis
document.getElementById('inputText').addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'Enter') {
    analyzeSentiment();
  }
});

// Auto-resize textarea
document.getElementById('inputText').addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
});

