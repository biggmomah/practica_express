const express = require('express')
const fs = require('fs')
const app = express()
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// Basandonos en la metodologia DY tranquilamente podemos retirar los errores ahora que conocemos el uso de router.param. Asi que exportaremos una nueva funcion:

exports.checkID = (req,res,next,val) =>{
    console.log(`ID ${val}`);
    if(req.params.id * 1 > tours.length){
    return res.status(404).json({
        status: 'fail' ,
        message: 'Not found'
    })
    }
    next()
}



exports.getTours= (req, res)=>{
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

exports.getTour= (req, res)=>{
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)
    // if (!tour){
    //        return res.status(404).json({
    //            status:'fail',
    //            message: 'invalid ID'})
    //    }
   
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

exports.createTour = (req,res) =>{
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

exports.updateTour = (req, res)=>{
    // CODIGO REEMPLAZADO
    // if(req.params.id * 1 > tours.length){
    //     return res.status(404).json({
    //         status: 'fail' ,
    //         message: 'Not found'
    //     })
    // }

    res.status(200).json({
        status: 'Success',
        message: 'ID founded',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

exports.deleteTour = (req, res)=>{

    // CODIGO REEMPLAZADO
    // if(req.params.id * 1 > tours.length){
    //     return res.status(404).json({
    //         status: 'fail' ,
    //         message: 'Not found'
    //     })
    // }

    res.status(204).json({
        status: 'Success',
        message: 'ID founded',
        data: null
    })
}

// exports antes era const(ver explicacion.js), esto nos ayuda a exportar las funciones requeridas