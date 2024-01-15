const filterReq = async (ctx, body) => {
  if (!body.key) {
    ctx.status = 400
    ctx.body = {error: 'PublicKey is missing!'}
    return;
  }
  if (!body.data) {
    ctx.status = 400
    ctx.body = {error: 'Data is missing or malformed!'}
    return;
  }
  if (!body.version) {
    ctx.status = 400
    ctx.body = {error: 'Version is not specified'}
    return;
  }
}

module.exports = filterReq