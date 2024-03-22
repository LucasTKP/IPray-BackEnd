import App from './src/app'

const app = App({
  logger: true
})

app.listen(process.env.PORT || 5000, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})