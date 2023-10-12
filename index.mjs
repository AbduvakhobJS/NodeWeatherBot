import { configDotenv } from 'dotenv'
import Fetch from 'node-fetch'
import axios from 'axios'
import TelegramBot from 'node-telegram-bot-api'
configDotenv()


const bot = new TelegramBot(process.env.TOKEN, {polling: true})


bot.on('message', msg => {
    
    const chatId = msg.chat.id
    const text = msg.text
    if (text === '/start'){
        bot.sendMessage(chatId, 'Salom ushbu bot sizga ObHavo malumotlarini aniqlab beradi. Menga biron bir shaxar nomini yuboring')
    }
    
    if(text){
        // axios.get(`${process.env.URL}?q=${text}&units=metric&APPID=${process.env.API_KEY}`)
        Fetch(`${process.env.URL}?q=${text}&units=metric&APPID=${process.env.API_KEY}`)
        .then((data) => {
            return data.json()
        })
        .then((weather) => {
            console.log(weather)
            const country = weather.sys?.country
            const city = weather.name
            const tepm = weather.main?.temp
            const namlik = weather.main?.humidity
            
            if (weather.cod === '404' && !text == '/start') {
                    bot.sendMessage(chatId, `Kechirasiz shahar nomini to'g'ri kirgizing😊 `)
            }
            else{
                bot.sendMessage(chatId, `🌍 Mamlakat: ${country}
🌆Shahar: ${city}
🌡 Havo harorati: ${tepm}
💦 Namlik: ${namlik}% 
            `)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }    
    
    
})



    
       
    // if (text){
    //     send()
    // }

    
    
    

    // async function send(){
    //     axios.get(`${process.env.URL}?q=${text}&units=metric&APPID=${process.env.API_KEY}`)
    //     .then((objectData) => {
    //         console.log(objectData)
    //         const country = objectData.data.sys?.country
    //         const city = objectData.data.name
    //         const tepm = objectData.data.main?.temp
    //         const namlik = objectData.data.main?.humidity
            

    //         bot.sendMessage(chatId, `🌍 Mamlakat: ${country}
    //         🌆Shahar: ${city}
    //         🌡 Havo harorati: ${tepm}
    //         💦 Namlik: ${namlik}% 
    //         `)
    // //    if ( objectData.code === 'ERR_BAD_REQUEST' ){
    //     .catch(() => {
    //         if(objectData.data.cod === '404' && objectData.data.message === 'city not found' ){
    //             bot.sendMessage(chatId, `Kechirasiz shaxar nomini noto'g'ri kiritdingiz`)
    //         }
    //     })
        
    
    // })}   
           
   

    