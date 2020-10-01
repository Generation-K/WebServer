const path = require('path')
const express = require('express')   //express is basically just 1 function
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()  


//Defining path for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views path
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sharan'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sharan'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Sharan'
    })
})

app.get('',(req,res) => {    //get() is used to configure what the server should do when someone tries to get resource
    res.send('<h1>Hello Express!</h1>')   //get() uses 2 args. req & res short for request and response
})

app.get('/help',(req,res) => {
    res.send([{
        name: 'SHARAN S'
    },{
        name: 'DIVYA BHAT N'
    }])
})

app.get('/about',(req,res) => {
    res.send('<h1>About Page</h1>')
})

app.get('/weather',(req,res) => {
    if(!(req.query.address)){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res) => {
    if(!(req.query.search)){
        return res.send({
            error: 'You must provide search item'
        })
    }
        console.log(req.query.search)
        res.send({
            products:[]
        })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Sharan',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name:'Sharan',
        errorMessage:'Page not found'
    })
})

app.listen(3000, () => {        //listen() gets the server up and running with 2 args, 1st being the port and 2nd being optional which is a callback function
    console.log('Server is running at port 3000')
})