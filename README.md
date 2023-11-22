# Facebook Messenger + ChatGPT Integration


## [Tutorial Video](https://www.example.com)
🎥 https://youtu.be/0c-RNYb6XiQ  🎥 

---
This repository contains the source code for automating Facebook messenger conversations for business pages through integrating OpenAI's ChatGPT. This integration allows you to leverage the power of ChatGPT to respond to user messages on Facebook Messenger in real-time.

## Getting Started
## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js and npm
- Facebook Developer Account and App
- OpenAI GPT-3 API Key

## Setup
1. Clone this repository to your local machine:
> git clone https://github.com/Redando/Facebook-Messenger-ChatGPT-Integration.git

2. Install dependencies:
```
 cd classical-art-webhook
 npm install
 ```
2. Edit credentials in `config.js` (Do not commit personal tokens/keys):
```
accessToken: 'YOUR_FACEBOOK_MESSENGER_ACCESS_TOKEN',
chatGptKey: 'YOUR_OPEN_AI_API_KEY'
```

## Usage
### Configuring Facebook App
1. Create a new Facebook App on the [Facebook Developer Portal](https://developers.facebook.com/apps/).
2. Set up the Messenger product for your app and generate a Page Access Token.
3. Subscribe the app to your Facebook page and obtain the Verify Token.

### Setting Up ChatGPT
1. Sign up for the OpenAI GPT-3 API and obtain your API key.
2. Update config.js with your OpenAI GPT-3 API key.

### Deploying Webhook
1. Deploy the webhook to a server or a cloud platform of your choice.
2. Make your webhook accessible over HTTPS (Facebook requires this for webhook endpoints).
3. Configure the Facebook App webhook URL with the deployed endpoint.
4. Verify the webhook using the Verify Token.

Now, your Facebook Messenger integration with ChatGPT should be set up and ready to respond to user messages.

### Customizations

Feel free to customize the code and responses according to your specific use case. You can modify the carousel items to present alternative elements and update the ChatGPT prompt to get a response appropriate for your conversation. Drop a comment of your use case in the comments of the video comment! ✌🏽
