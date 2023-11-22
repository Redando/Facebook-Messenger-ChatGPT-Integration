const Artist = class Artist {
    constructor(obj) {
        this.contentId = obj.contentId
        this.artistName = obj.artistName
        this.url = obj.url
        this.birthDayAsString = obj.birthDayAsString
        this.image = obj.image
    }

    toElement() {
        return {
            "title": this.artistName,
            "subtitle": this.birthDayAsString,
            "image_url": this.image,
            "buttons": [
              {
                "type": "postback",
                "title": "Learn More",
                "payload": this.artistName,
              }
            ],
        } 
    }
}

module.exports =  { Artist }