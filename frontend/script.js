
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
    'win', 'victory', 'achieve', 'accomplish', 'appreciate', 'grateful', 'thank', 'blessing'
  ],
  negative: [
    'awful', 'bad', 'terrible', 'horrible', 'disgusting', 'hate', 'worst', 'stupid', 'dumb',
    'annoying', 'frustrating', 'disappointed', 'sad', 'angry', 'furious', 'mad', 'upset',
    'depressed', 'miserable', 'pathetic', 'useless', 'worthless', 'fail', 'failure', 'disaster',
    'catastrophe', 'nightmare', 'pain', 'hurt', 'broken', 'damaged', 'wrong', 'mistake',
    'regret', 'sorry', 'apologize', 'blame', 'fault', 'problem', 'issue', 'trouble',
    'crisis', 'emergency', 'danger', 'risk', 'threat', 'fear', 'scared', 'worried'
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

