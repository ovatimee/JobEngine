const port = 8000

const express = require('express')
const axios = require('axios').default
const cheerio = require('cheerio')
const { response } = require('express')

const app = express()
const searchCards = []


app.get('/', (req, res) => {
  axios.get("https://www.linkedin.com/jobs/search/?keywords=frontend")
    .then((response) => {
      const page = response.data
      const $ = cheerio.load(page)

      $('.job-search-card').each((index, element) => {
        // console.log($(element).find(".job-search-card__listdate").text() )
        const company = ($(element).find(".base-search-card__subtitle").text()).trim()
        const tiltle = ($(element).find(".base-search-card__title").text()).trim()
        const location = ($(element).find(".job-search-card__location").text().trim())
        const salary = ($(element).find(".job-search-card__salary-info").text()).trim()
        const time = ($(element).find(".job-search-card__listdate").text()).trim()

        searchCards[index] = { company, tiltle, location, salary, time }
      })

      res.sendFile(__dirname + "/index.html")

    }).catch((err) => console.log(err))

})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})


