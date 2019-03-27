// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(store => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
  })
}

const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async store => {
    const { data } = await axios.get('https://reddit.lidong.me/r/OldSchoolCool.json')

    const contentType = store.addContentType({
      typeName: 'RedditPost',
      route: '/reddit/:id' // optional
    })
    console.log(data)

    for (const item of data.data.children) {
      contentType.addNode({
        id: item.data.id,
        title: item.data.title,
        path: '/reddit/'+item.data.id,
        fields:{
          thumbnail:item.data.thumbnail,
          img:item.data.preview.images[0].source.url
        }
      })
    }
  })
}
