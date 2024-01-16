'use strict'

// server
const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
const logger = require('./logger')
const filterReq = require('./filterReq')
const ratelimit =  require('koa-ratelimit')

// encryptions
const adyen = require('./encryptions/adyen')
// const cybersource = require('./encryptions/cybersource')
// const zuora = require('./encryptions/zuora')
// const braintree = require('./encryptions/braintree')
// const eway = require('./encryptions/eway')

// bincheck
// const binCheck = require('./extras/bin')

// proxycheck
// const proxyCheck = require('./extras/proxy')
const luhn = require('fast-luhn')
const eway = require('./encryptions/eway')

const PORT = 8800
const app = new Koa()
const router = new Router()

/*
  @route: /adyen
  @method: post
  requires: Public key, data to encrypt and version
  response: An object containing the encrypted data
*/
router.post('/adyen', async(ctx) => {
  let data = await ctx.request.body
  await filterReq(ctx, ctx.request.body)
  let pubkey = data.key
  let card = data.cardData
  let version = data.version
  if(!pubkey && !card && !version) {
    ctx.status = 400
    ctx.body = {error: 'Invalid or data missing!, Please make sure to follow the format - {key: string, card: object, version: int || string}'}
  }
  ctx.status = 200
  ctx.body = adyen(pubkey, card, version)
})

/*
  @route: /eway
  @method: post
  requires: Public key and data to encrypt
  response: An object containing the encrypted data
*/
router.post('/eway', async(ctx) => {
  let data = ctx.request.body
  let key = data.key
  let cardData = data.cardData
  eway(ctx, key, cardData)
})

/*
  @route: /cyber
  @method: post
  requires: a JWK object and data to encrypt
  response: An object containing the encrypted data
*/
router.post('/cyber', async(ctx) => {
  let data = await ctx.request.body
  // await filterReq(ctx, ctx.request.body)
  ctx.body = 'Please wait for this function'

})

/*
  @route: /zuora
  @method: post
  requires: Public key and data to encrypt
  response: An object containing the encrypted data
*/
router.post('/zuora', async(ctx) => {
  ctx.body = 'Please wait for this function'
})

/*
  @route: /braintree
  @method: post
  requires: Public key and data to encrypt
  response: An object containing the encrypted data
*/
router.post('/braintree', async(ctx) => {
  ctx.body = 'Please wait for this function'
})

/*
  @route: /bininfo
  @method: GET or POST
  requires:  BIN of length 6 atleast
  response: An object containing BIN information
*/
// router.get('/bin', async(ctx) => {
//   let data = await ctx.request.query
//   if(!data.bin && !luhn(data.bin)) {
//     ctx.status = 400
//     ctx.body = {error: 'BIN not passed or invalid!'}
//     return
//   }
//   ctx.body = binCheck(data.bin)
//   })

app
  .use(logger)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(ratelimit({
    driver: 'memory',
    db: 'db',
    duration: 10000,
    errorMessage: 'Take a chill pill, mate!',
    id: (ctx) => ctx.ip,
    headers: {
      remaining: 'Rate-Limit-Remaining',
      reset:  'Rate-Limit-Reset',
      total:  'Rate-Limit-Total'
    },
    max: 100,
    disableHeader: false
  }))

app.listen(PORT, () => console.log(`Server runnning at ${PORT}`))
