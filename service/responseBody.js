class ResponseBody {

  static  welcomeScreenBody = () => {
    return {
        "greeting" : [
            {
                "locale":"default",
                "text":"Welcome {{user_first_name}}! Explore the timeless artwork of legendary artists."
            }
        ]
    }
  }
  static getStartedBody = () => {
    return {
        "get_started": {"payload": "GET_STARTED"}
    }
  }
  greetingMessageBody = (senderId, message) => {
      return {
          "recipient": {
            "id": senderId
          },
          "message": {
              "text": message
            }
        }
  }
  greetingMessageWithQuickReplies = (senderId) => {
      return {
          "recipient": {
            "id": senderId
          },
          "messaging_type": "RESPONSE",
          "message": {
            "text": "Which of these artists are you interesed in?",
            "quick_replies": [
              {
                "content_type":"text",
                "title":"Pablo Picasso",
                "payload":"ARTIST_BIO",
              },
              {
                "content_type":"text",
                "title":"Michelangelo",
                "payload":"ARTIST_BIO",
              },
              {
                "content_type":"text",
                "title":"Vincent van Gogh",
                "payload":"ARTIST_BIO",
              }
            ]
          }
        }
  }
  artistCarouselBody = (senderId, artists) => {
      const elements = artists.map(item => item.toElement())
  
      const message = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": elements
            }
          }
        } 
      return {
          "recipient": {
            "id": senderId
          },
          "message": message
      }
  }
  typingIndicatorBody = (senderId, isActive) => {
    const typingIndicator = isActive ? "typing_on" : "typing_off"
    return {
      "recipient": {
        "id": senderId
      },
      "sender_action": typingIndicator
    }
  }

  uploadImageBody = (senderId) => {
    return {
      "recipient":{
        "id":senderId
      },
      "message":{
        "attachment":{
          "type":"image", 
          "payload":{
            "url":"https://uploads5.wikiart.org/images/pablo-picasso/female-bust.jpg!Large.jpg",
            "is_reusable":true
          }
        }
      }
    }
  }
}

module.exports = { ResponseBody }
