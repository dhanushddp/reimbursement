const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy: {
      '/two': {
        // target: 'http://10.30.1.5:8000',
        target:'https://d9be-103-224-33-94.ap.ngrok.io',
        // target:'https://e99f-49-249-56-118.in.ngrok.io',
        // target:'https://624f-103-224-32-230.ap.ngrok.io',
        // target:'https://9fc1-49-249-56-118.in.ngrok.io',
        pathRewrite: {'^/two' : ''}
      }
    
    }
  }
})
