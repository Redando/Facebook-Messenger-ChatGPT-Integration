const { URL, URLSearchParams } = require("url")
const config = require('../config')
const { ResponseBody } = require('./responseBody')
const { fetchArtists, fetchLearnMoreInfo } = require('./ArtService')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
class ResponseService {

    handleReceivedMessage = async (body) => {
        body.entry.forEach(async (entry) => {
            entry.messaging.forEach(async (message) => {
                if (message.postback.payload == config.postbackGetStarted) {            
                  await this.sendGreeting(message.sender.id, config.welcomeMessage)
                  await this.sendArtistCarousel(message.sender.id)
                }   
                if (message.postback.title == config.postbackLearnMore) {
                    console.log(message)
                    await this.sendArtistBio(message.sender.id, message.postback.payload)
                }
            })
        })

    }
    sendGreeting = async (senderId, message) => {
        const responseBody = new ResponseBody()
        await this.sendApi(config.urlMesseges, responseBody.greetingMessageBody(senderId, message))        
    }
    sendArtistCarousel = async (senderId) => {
        const responseBody = new ResponseBody()
        await this.updateTypingIndicator(senderId, true)
        const artists = await fetchArtists()
        console.log(responseBody.artistCarouselBody(senderId, artists))
        await this.sendApi(config.urlMesseges, responseBody.artistCarouselBody(senderId, artists))
        await this.updateTypingIndicator(senderId, false)
    }
    sendApi = async (apiUrl, body) => {
        let url = new URL(apiUrl)
            url.search = new URLSearchParams({
              access_token: config.accessToken
            })
        let response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          }).catch(err => console.log(err))
          console.log(body)
          if (response.ok) {
            const responseJson = await response.json().catch(err => console.log(err))
            console.log(responseJson)
        } else {
            // TODO() Handle Error
          console.log(response)
        }
    }
    updateTypingIndicator = async (senderId, isActive) => {
        const responseBody = new ResponseBody()
        await this.sendApi(config.urlMesseges, responseBody.typingIndicatorBody(senderId, isActive))
    }
    sendArtistBio = async (senderId, artistName) => {
        const responseBody = new ResponseBody()
        await this.updateTypingIndicator(senderId, true)
        const artistBio = await fetchLearnMoreInfo(artistName)
        await this.sendApi(config.urlMesseges, responseBody.greetingMessageBody(senderId, artistBio))
        await this.updateTypingIndicator(senderId, false)
    }
    
    getAttachmentId = async (senderId) => {
        const responseBody = new ResponseBody()
        await this.sendApi(config.urlMesseges, responseBody.uploadImageBody(senderId))
    }
}

// const response = new ResponseBody()
// const service = new ResponseService()
// service.sendApi(config.urlProfile, response.getStartedBody())
// service.sendApi(config.urlProfile, response.welcomeScreenBody())

module.exports = { ResponseService }