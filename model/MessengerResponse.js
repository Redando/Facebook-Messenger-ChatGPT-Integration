const MessengerResponse = class MessengerResponse {
    constructor(obj) {
        this.senderId = obj.sender.id
        this.recipientId = obj.recipient.id
        this.timestamp = obj.timestamp
        this.message = obj.message
        this.postback = obj.postback
    }
    
    messageId() {
        return this.mid
    }
    messageText() {
        return this.text
    }
    isGetStartedPostback() {
        try {
            return this.postback.payload == "GET_STARTED"
        } catch {
            return false
        }
    }
    isQuickReplyPostback() {
        try {
            return this.message.quick_reply.payload == "ARTISTS"
        } catch {
            return false
        }
    }
    postbackId() {
        return this.postback.mid
    }
    postbackTitle() {
        return this.postback.title
    }
    postbackPayload() {
        return this.postback.payload
    }
}

module.exports =  { MessengerResponse }