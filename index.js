const app = require('express')()
const mysql = require('mysql')
const port = 5000;
const util = require('util')
const cors = require('cors')
const bodyParser = require('body-parser')

// app.use(bodyParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sricomp2',
    database: 'movieindoxxi',
    port: 3306
});

const dba = util.promisify(db.query).bind(db);


app.get('/', (req,res)=> {
    res.status(200).send('<h1>Ini Homepage</h1>')
})

// ============ CRUD MANAGE MOVIES ============ CRUD MANAGE MOVIES============ CRUD MANAGE MOVIES============ CRUD MANAGE MOVIES============ CRUD MANAGE MOVIES
// ============ CRUD MANAGE MOVIES ============ CRUD MANAGE MOVIES============ CRUD MANAGE MOVIES============ CRUD MANAGE MOVIES============ CRUD MANAGE MOVIES
// ============ CRUD MANAGE MOVIES ============ CRUD MANAGE MOVIES============ CRUD MANAGE MOVIES============ CRUD MANAGE MOVIES============ CRUD MANAGE MOVIES

app.get('/movies', async (req,res)=> {
    let sql = `select * from movies`
    try{
        let result = await dba(sql)
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message)
    }
})

app.post('/movies', async (req,res)=>{
const {id,nama,tahun,description} = (req.body)
    // console.log((req.body))
    // console.log(req.body.id)
    // console.log(req.body.nama)
    // console.log(nama)
    
    let sql = `INSERT INTO movies (id, nama, tahun, description) VALUES (${id},'${nama}','${tahun}','${description}');`
    try{
        await dba(sql,req.body)
        let get = `Select * from movies`
        let result = await dba(get)
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message)
    }
})

app.patch('/movies/:id', async (req,res)=>{
    let {id} = req.params
    let sql = `UPDATE movies SET ? where id=${id}`
    // let sql = `UPDATE movies SET nama = '${nama}' WHERE (id = ${id});`
    try{
        await dba(sql,req.body)
        let get = `Select * from movies`
        let result = await dba(get)
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message)
    }
})

app.delete('/movies/:id',async (req,res)=>{
    let sql = `DELETE from movies where id=${req.params.id}`
    try{
        await dba(sql)
        let get = `Select * from movies`
        let result = await dba(get)
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message)
    }
})

// ====== MANAGE CATEGORIES ====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES
// ====== MANAGE CATEGORIES ====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES
// ====== MANAGE CATEGORIES ====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES
// ====== MANAGE CATEGORIES ====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES====== MANAGE CATEGORIES

app.get('/categories', async (req,res)=> {
    let sql = `select * from categories`
    try{
        let result = await dba(sql)
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message)
    }
})

app.post('/categories', async (req,res)=>{
    const {id,nama} = (req.body)

        
        let sql = `INSERT INTO categories (id, nama) VALUES (${id},'${nama}');`
        try{
            await dba(sql,req.body)
            let get = `Select * from categories`
            let result = await dba(get)
            res.status(200).send(result)
        }catch(err){
            res.status(400).send(err.message)
        }
    })

app.patch('/categories/:id', async (req,res)=>{
    let {id} = req.params
    let sql = `UPDATE categories SET ? where id=${id}`
    try{
        await dba(sql,req.body)
        let get = `Select * from categories`
        let result = await dba(get)
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message)
    }
})
    
app.delete('/categories/:id',async (req,res)=>{
    let sql = `DELETE from categories where id=${req.params.id}`
    try{
        await dba(sql)
        let get = `Select * from categories`
        let result = await dba(get)
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message)
    }
})

// ====== CONNECT MOVIE&CATEGORIES ====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES
// ====== CONNECT MOVIE&CATEGORIES ====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES
// ====== CONNECT MOVIE&CATEGORIES ====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES
// ====== CONNECT MOVIE&CATEGORIES ====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES====== CONNECT MOVIE&CATEGORIES

app.get('/movcat', async (req,res)=> {
    let sql = `SELECT movies.nama as 'namamovie', categories.nama as 'namacategory'
    FROM movcat
    INNER JOIN categories ON categories.id=movcat.idcategory
    INNER JOIN movies ON movies.id=movcat.idmovie;`
    try{
        let result = await dba(sql)
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message)
    }
})

app.post('/movcat', async (req,res)=>{
    const {idmovie,idcategory} = (req.body)

        
        let sql = `INSERT INTO movcat (idmovie, idcategory) VALUES (${idmovie},'${idcategory}');`
        try{
            await dba(sql,req.body)
            let get = `Select * from categories`
            let result = await dba(get)
            res.status(200).send(result)
        }catch(err){
            res.status(400).send(err.message)
        }
    })

app.delete('/movcat/:id',async (req,res)=>{
    let sql = `DELETE from categories where id=${req.params.id}`
    try{
        await dba(sql)
        let get = `SELECT movies.nama as 'namamovie', categories.nama as 'namacategory'
        FROM movcat
        INNER JOIN categories ON categories.id=movcat.idcategory
        INNER JOIN movies ON movies.id=movcat.idmovie`
        let result = await dba(get)
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message)
        }
    })

app.get('/movcat', async (req,res)=> {
    let sql = `SELECT movies.nama as 'namamovie', categories.nama as 'namacategory'
    FROM movcat
    INNER JOIN categories ON categories.id=movcat.idcategory
    INNER JOIN movies ON movies.id=movcat.idmovie WHERE movies.nama = 'equalizer' and categories.nama = 'action'`
    try{
        let result = await dba(sql)
        res.status(200).send(result)
    }catch(err){
        res.status(400).send(err.message)
    }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})