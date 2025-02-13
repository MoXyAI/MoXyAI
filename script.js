// Initialize Particles.js for the galaxy background
particlesJS.load('particles-js', 'particles.json', function() {
    console.log('Particles.js loaded');
});

// Background Audio
const backgroundAudio = document.getElementById('background-audio');
backgroundAudio.volume = 0.2; // Set volume to 20% (low volume)
backgroundAudio.muted = false; // Ensure audio is not muted

// OpenAI API setup
const apiKey = 'sk-your-actual-api-key-here'; // Replace with your actual API key
const chatlog = document.getElementById('chatlog');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const cryptoTicker = document.getElementById('crypto-ticker');

sendBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Display user message in the chat
    chatlog.innerHTML += `<div class="user-message">You: ${userMessage}</div>`;
    userInput.value = '';

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` // Ensure the API key is correctly passed
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }]
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const aiMessage = data.choices[0]?.message?.content || "Sorry, I couldn't process that.";

        // Display AI response in the chatlog
        chatlog.innerHTML += `<div class="ai-message">MoXy AI: ${aiMessage}</div>`;
        chatlog.scrollTop = chatlog.scrollHeight; // Scroll to bottom
    } catch (error) {
        console.error('Error fetching AI response:', error);
        chatlog.innerHTML += `<div class="ai-message">MoXy AI: I'm currently facing issues. Please try again later.</div>`;
    }
});

// Fetch and display top cryptos in ticker
async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        
        if (!Array.isArray(data)) throw new Error("Invalid crypto data");

        cryptoTicker.innerHTML = data.map(coin => 
            `<a href="https://coinmarketcap.com/currencies/${coin.id}" target="_blank">${coin.name}: $${coin.current_price.toLocaleString()}</a>`
        ).join(' ');
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}
setInterval(fetchCryptoData, 30000); // Refresh every 30 seconds
fetchCryptoData(); // Initial fetch

// Tweet Tracker
const twitterUsernameInput = document.getElementById('twitter-username');
const addTweetBtn = document.getElementById('add-tweet-btn');
const trackedTweets = document.getElementById('tracked-tweets');
const tweetBox = document.getElementById('tweet-box');

addTweetBtn.addEventListener('click', () => {
    const username = twitterUsernameInput.value.trim();
    if (!username) return;

    // Add username to tracked tweets
    const tweetDiv = document.createElement('div');
    tweetDiv.className = 'tweet';
    tweetDiv.textContent = `@${username}`;
    trackedTweets.appendChild(tweetDiv);

    // Clear input
    twitterUsernameInput.value = '';

    // Simulate fetching recent tweets (replace with actual API call)
    fetchRecentTweets(username);
});

function fetchRecentTweets(username) {
    // Simulated tweets (replace with actual API call to fetch tweets)
    const tweets = [
        `Just launched a new feature! 🚀 #Crypto #AI`,
        `Excited to share some big news soon. Stay tuned!`,
        `The future of trading is here. #MoXyAI`
    ];

    // Display tweets in the tweet box
    tweetBox.innerHTML = tweets.map(tweet => `<div class="tweet">${tweet}</div>`).join('');
}