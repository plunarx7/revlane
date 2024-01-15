'use strict'

const Koa = require("koa")
const Router = require("@koa/router")
const bodyParser = require("koa-bodyparser")
const logger = require("./logger")
const filterReq = require("./filterReq")

const PORT = 8800
const app = new Koa()
const router = new Router()

router.get('/get',  (ctx) => {
  console.log(ctx.request)

})

router.get('/json', (ctx) => {
  ctx.body = {text: 'hello'}
})

router.post('/adyen', async(ctx) => {
  let data = await ctx.request.body
  await filterReq(ctx, ctx.request.body)
  ctx.body = {success: true}
})

app
  .use(logger)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT, () => console.log(`Server runnning at ${PORT}`))
