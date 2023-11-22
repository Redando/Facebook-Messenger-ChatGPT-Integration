const Painting = class Painting {
    constructor(obj) {
        this.title = obj.title
        this.contentId = obj.contentId
        this.artistContentId = obj.artistContentId
        this.artistName = obj.artistName
        this.image = obj.image
        this.width = obj.width
        this.height = obj.height
    }
    isLandscape() {
        return this.width > this.height
    }
    toElement() {
        return {
            "title": this.title,
            "subtitle": this.artistName,
            "image_url": this.image,
            "buttons": [
              {
                "type": "postback",
                "title": "Next",
                "payload": this.artistContentId,
              },
              {
                "type": "postback",
                "title": "Artists",
                "payload": "Artists",
              }
            ],
        }
    }
}
module.exports =  { Painting }