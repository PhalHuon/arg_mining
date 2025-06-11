function analyzeSentiment() {
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
}
