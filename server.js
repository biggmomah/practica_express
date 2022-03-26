const app = require('./app')
// INICIAMOS SERVIDOR
const port = 3000
app.listen(port, ()=>{
    console.log(`Running port : ${port}`)
})