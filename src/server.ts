import App from './app'

const app = App({
  logger: true
})

const port = process.env.PORT || 5000
app.listen({ port:Number(port)}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})