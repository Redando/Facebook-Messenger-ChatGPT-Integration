const { Artist } = require("../model/Artist")
const { Painting } = require("../model/Painting")
const { Configuration, OpenAIApi } = require("openai");
const config = require('../config')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))


const fetchArtists = async () => {
    const url = 'https://www.wikiart.org/en/Popular-Artists/alltime/1?json=2&PageSize=1'
    const artistIds = [
        223667, //'pablo-picasso',
        204915, //'vincent-van-gogh',
        225091, //'leonardo-da-vinci'
    ]
    const response = await fetch(`${url}`).then(async value => await value.json())
    
    var artists = response.map(artist => new Artist(artist))
    const filtered = artists.filter(item => artistIds.includes(item.contentId))
    console.log(filtered)
    return filtered
}
const fetchArtistUrl = async (contentId) => {
    const artists = await fetchArtists()
    const artist = artists.filter(value => value.contentId == parseInt(contentId))[0]
    return artist.url
}
const fetchArtwork = async (payload) => {
    const artistUrl = await getArtistUrl(payload)
    const url = `https://www.wikiart.org/en/App/Painting/PaintingsByArtist?artistUrl=${artistUrl}&json=2&inPublicDomain=true`
    const response = await fetch(`${url}`).then(async value => await value.json())
    var paintings = response.map(painting => new Painting(painting)).filter(value => value.isLandscape())
    const randomPainting = paintings[getRandomNumber(0, paintings.length - 1)]
    const paintingElement = randomPainting.toElement()
    return [paintingElement]
}

const getArtistUrl = async (payload) => {
    if (/^\d+$/.test(payload)) {
        const url = await fetchArtistUrl(payload)
        return url
    } else {
        return payload
    }
}
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const fetchLearnMoreInfo = async (artistName) => {
    const apiKey = config.chatGptKey
    try {
      const configuration = new Configuration({
      apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `Write a biography of ${artistName} that is 150 characters.`}]
    })
    // console.log(response.data.choices[0].message);
      return response.data.choices[0].message.content
  } catch(err) {
    console.log(err)
    }
    
  }
 
module.exports =  { fetchArtists, fetchArtwork, fetchLearnMoreInfo }
