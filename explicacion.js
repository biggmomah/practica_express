const express = require('express')
// Morgan es un middleware de tercero. Primero hay que instalarlo( npm i morgan)

const app = express()
// Middlewares
const morgan = require ('morgan')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

// Middleware es una funcion que puede modificar la informacion solicitada( request), se llama asi porque se instancia en el medio.
app.use(express.json())
app.use(morgan('dev'))
// ======================

// Llamando a express y asignandolo a una variable nos aseguramos poder usar las funciones.
// Iniciamos el routing y enviamos la respuesta que obtuvimos. Agregamos 'status' con la respuesta que vamos a obtener.
// Get se utiliza como el http methods para el request.
/* app.get('/', (req,res)=>{
    res
    .status(200)
    .json({message: 'Hello from the server side', app: 'Natours'})
})

// METODO NUEVO: post.

app.post('/', (req,res)=>{
    res.send('You can post to this endpoint.')
}) */
// Escuchamos al servidor

// Directamente llamamos al JSON y parseamos para habilitar la lectura.
// Recordamos que dirname nos coloca en el directorio raiz.
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// INICIAMOS SERVIDOR
const port = 3000
app.listen(port, ()=>{
    console.log(`Running port : ${port}`)
})


// V1 es en caso que necesitemos hacer actualizaciones.
// A esto se llama 'route handler'
// READ de los archivos

/* app.get('/api/v1/tours', (req, res)=>{
    res
    .status(200)
    // El formato debajo escrito se conoce como JSON formatting standard
    .json({status: 'success',
        results: tours.length,
        data:{
        // Por que se llama tours? Porque es el nombre de la variable que recibimos, su en la linea 26 se hubiese escrito PEPE, dentro de tours iria PEPE. Lo dejamos comentado a modo de ejemplo ,pero recordamos que si un objeto tiene el mismo nombre podemos simplemente llamarlo
        // 
        tours}
        })
}) */

// Repetimos el proceso para llamar al ID, puede tomar cualquier valor

/* app.get('/api/v1/tours/:id', (req, res)=>{
    // Hacemos console log de params, que es donde se almacenaran todos las variables de ID
    // Las variables almacenadas en el URL son parametros
    console.log(req.params)
    // Podemos parsear como entero un parametro multiplicandolo por 1
    const id = req.params.id * 1
    // Solucion rapida para esto seria con un IF pero no es una solucion definitiva

    // Solucion 1
    if ( id > tours.length) {
        return res.status(404).json({
            status:'fail',
            message: 'invalid ID'
        })
    } 
    // Como buscariamos el ID de un objeto en el URL? Simple:
    const tour = tours.find(el => el.id === id)

    // Solucion 2

    if (!tour){
        return res.status(404).json({
            status:'fail',
            message: 'invalid ID'})
    }

    res
    .status(200)
    // El formato debajo escrito se conoce como JSON formatting standard
    .json({status: 'success',
        results: tours.length,
        data:{
        // Por que se llama tours? Porque es el nombre de la variable que recibimos, su en la linea 26 se hubiese escrito PEPE, dentro de tours iria PEPE. Lo dejamos comentado a modo de ejemplo ,pero recordamos que si un objeto tiene el mismo nombre podemos simplemente llamarlo
        // 
        tour}
        })
}) */

// Repetimos codigo para mostrar como ingresar variables en el URL opcionales

// app.get('/api/v1/tours/:id/:x?/:y?', (req, res)=>{
//     // Hacemos console log de params, que es donde se almacenaran todos las variables de ID
//     // Las variables almacenadas en el URL son parametros
//     console.log(req.params)


//     res
//     .status(200)
//     // El formato debajo escrito se conoce como JSON formatting standard
//     .json({status: 'success',
//       /*   results: tours.length,
//         data:{
//         // Por que se llama tours? Porque es el nombre de la variable que recibimos, su en la linea 26 se hubiese escrito PEPE, dentro de tours iria PEPE. Lo dejamos comentado a modo de ejemplo ,pero recordamos que si un objeto tiene el mismo nombre podemos simplemente llamarlo
//         // 
//         tours} */
//         })
// })



// Post se utilizaria para enviar informacion, en este ejemplo seria para crear un nuevo tour. Enviaremos informacion desde el cliente al servidor.
// CREAMOS un nuevo tour
/* app.post('/api/v1/tours', (req,res)=>{
    // console.log(req.body);

    // Como lo que queremos hacer es agregar un nuevo ID para el nuevo objeto que carguemos, primero creamos la funcion.
    // Resumiendo el procedimiento, newId va a ser igual a el JSON que parseamos en la linea 27, llamaremos al ultimo objeto de la cadena, y le sumaremos +1 al ID.
    const newId= tours[tours.length - 1].id + 1
    // Object.assign nos permite crear nuevos objetos de objetos ya existentes y agruparlos.
    const newTour = Object.assign({id: newId}, req.body)

    tours.push(newTour)
    
    // Pusheado el nuevo tour, procedemos a sobre escribirlo sobre nuestro archivo. Necesitamos pasarlo como strying para que pueda ser escrito, ya que recordamos que write file solo puede hacerlo con txt.
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
    JSON.stringify(tours), 
    err=>{
        res.
        status(201)
        .json({status: 'success',
                data:{
                tours: newTour
            }
            })
    })
}) */

// Esto es posible de crear gracias a middleware, la funcion que llamamos en la linea 6. Si esto no estuviese se retornaria el valor que instansiamos por Postman.

// Podemos comprobar que el archivo se agrego en POSTMAN en el metodo GET y en nuestro archivo tours.json. 
// Realizamos UPDATE 
/* app.patch('/api/v1/tours/:id', (req, res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail' ,
            message: 'Not found'
        })
    }

    res.status(200).json({
        status: 'Success',
        message: 'ID founded',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}) */

// Realizamos DELETE 

/* app.delete('/api/v1/tours/:id', (req, res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail' ,
            message: 'Not found'
        })
    }

    res.status(204).json({
        status: 'Success',
        message: 'ID founded',
        data: null
    })
}) */

// Con los metodos vistos hasta aca, tenemos Create, Read, Update y Delete ( CRUD ).

// Llega el momento de ordenar el codigo, es totalmente funcional pero se repite mucho(recordame que no hay que repetir, mala practica)
// Dejamos el codigo ordenado:
// ROUTER HANDLERS
/* const getTours= (req, res)=>{
    res
    .status(200)
    // El formato debajo escrito se conoce como JSON formatting standard
    .json({status: 'success',
        results: tours.length,
        data:{
        // Por que se llama tours? Porque es el nombre de la variable que recibimos, su en la linea 26 se hubiese escrito PEPE, dentro de tours iria PEPE. Lo dejamos comentado a modo de ejemplo ,pero recordamos que si un objeto tiene el mismo nombre podemos simplemente llamarlo
        // 
        tours}
        })
}

const getTour= (req, res)=>{
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)
    if (!tour){
           return res.status(404).json({
               status:'fail',
               message: 'invalid ID'})
       }
   
       res
       .status(200)
     // El formato debajo escrito se conoce como JSON formatting standard
       .json({status: 'success',
           results: tours.length,
           data:{
           // Por que se llama tours? Porque es el nombre de la variable que recibimos, su en la linea 26 se hubiese escrito PEPE, dentro de tours iria PEPE. Lo dejamos comentado a modo de ejemplo ,pero recordamos que si un objeto tiene el mismo nombre podemos simplemente llamarlo
           // 
           tour}
           })
   }

const createTour = (req,res) =>{
    const newId= tours[tours.length - 1].id + 1
    const newTour = Object.assign({id: newId}, req.body)
    tours.push(newTour)
    
    // Pusheado el nuevo tour, procedemos a sobre escribirlo sobre nuestro archivo. Necesitamos pasarlo como strying para que pueda ser escrito, ya que recordamos que write file solo puede hacerlo con txt.
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
    JSON.stringify(tours), 
    err=>{
        res.
        status(201)
        .json({status: 'success',
                data:{
                tours: newTour
            }
            })
    })
}

const updateTour = (req, res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail' ,
            message: 'Not found'
        })
    }

    res.status(200).json({
        status: 'Success',
        message: 'ID founded',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

const deleteTour = (req, res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail' ,
            message: 'Not found'
        })
    }

    res.status(204).json({
        status: 'Success',
        message: 'ID founded',
        data: null
    })
}
const getAllUsers = (req,res) =>{
    res.status(500).json({
        status: 'err',
        message: 'the route is not yet defined'
    })
}

const createUser = (req,res) =>{
    res.status(500).json({
        status: 'err',
        message: 'the route is not yet defined'
    })
}

const getUser = (req,res) =>{
    res.status(500).json({
        status: 'err',
        message: 'the route is not yet defined'
    })
}

const updateUser = (req,res) =>{
    res.status(500).json({
        status: 'err',
        message: 'the route is not yet defined'
    })
}

const deleteUser = (req,res) =>{
    res.status(500).json({
        status: 'err',
        message: 'the route is not yet defined'
    })
} */

// Simplificamos las rutas usando routes
// ROUTES


/* app.route('/api/v1/tours')
    .get(getTours)
    .post(createTour)

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

// Gracias al middleware que instalamos podemos routear a los usuarios y empezar a crear una base de datos

app.route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser)

app.route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)
 */
// EJEMPLO MIDDLEWARE PROPIO

// Es posible crear nuestro propio middleware, no vamos a hacerlo pero queda a modo de ejemplo.

/* app.use((req,res,next)=>{
    console.log('Hello from the middleware')
    // y siempre necesitamos llamar a NEXT
    next()
}) */

// Tenemos que tener en cuenta los ciclos de request y response, recordamos que los middleware funcionan en medio de estos, entonces, si llamamos un middleware en medio de un request-response, no se aplicara nunca.


// A partir de aqui nos pondremos más avanzados.
// Iniciaremos el proceso para limpiar un poco el codigo. Separaremos los routers para poder llamarlos por separado. Estas variables funcionaran como middlewares.
// Primero definimos las variables que seran usadas como Router, luego usamos .use()+

// Las rutas base ahora estaran limitadas por este middleware, a este proceso se le conoce como mounting the router

/* const tourRouter = express.Router()
const userRouter = express.Router()
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)


// Dejamos como ejemplo la ruta vieja
// app.route('/api/v1/tours')
// Y esta sera la nueva, aplica para ID tambien.
tourRouter
    .route('/')
    .get(getTours)
    .post(createTour)

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)
// Gracias al middleware que instalamos podemos routear a los usuarios y empezar a crear una base de datos
userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser)
    
userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)
 */

// A partir de aqui migramos los routers hacia la carpeta ROUTES.
// Es buena practica tener los archivos de express en un archivo y los de server en otro.