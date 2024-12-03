const { createServer } = require('http')
const next = require('next')
 
const isDevMode = process.env.NODE_ENV !== 'production'
const port = process.env.PORT ? process.env.PORT : 3000
 
const nextjsApp = next({ dev: isDevMode })
const nextjsRequestHandler = nextjsApp.getRequestHandler()
 
nextjsApp
  .prepare()
  .then(() => {
    createServer((req, res) => {
      // The request url likely will not include a protocol or host, therefore
      // resolve the request url against a dummy base url.
      const url = new URL(req.url, "http://w.w")
      nextjsRequestHandler(req, res, url)
    }).listen(port, (err) => {
      if (err) throw err
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })

// const { createServer } = require('http')
// const { parse } = require('url')
// const next = require('next')

// const dev = process.env.NODE_ENV !== 'production'
// const hostname = 'localhost'
// const port = process.env.PORT || 3000

// const app = next({ dev, hostname, port })
// const handle = app.getRequestHandler()

// app.prepare().then(() => {
//   createServer(async (req, res) => {
//     try {
//       const parsedUrl = parse(req.url, true)
//       const { pathname, query } = parsedUrl

//       if (pathname === '/a') {
//         await app.render(req, res, '/a', query)
//       } else if (pathname === '/b') {
//         await app.render(req, res, '/b', query)
//       } else {
//         await handle(req, res, parsedUrl)
//       }
//     } catch (err) {
//       console.error('Error occurred handling', req.url, err)
//       res.statusCode = 500
//       res.end('internal server error')
//     }
//   }).listen(port, (err) => {
//     if (err) throw err
//     console.log(`> Ready on http://${hostname}:${port}`)
//   })
// })