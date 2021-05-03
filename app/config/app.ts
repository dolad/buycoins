export default () => ({
    circle:{
        baseUrl: process.env.CIRCLE_BASEURL,
        apiKey:process.env.API_KEY
    },
    session:{
        secret:process.env.SESSION_SECRET
    }
})