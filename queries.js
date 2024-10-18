const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'abhi1',
  password: 'tiger123',
  port: 5432,
})


const getUsers = (request, response) => {
   
  pool.query('SELECT * FROM "Registration" ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};



const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM "Registration" WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createUser = (request, response) => {
    const { id,first_name,password,number,email,date_of_birth,save_information } = request.body
  
    pool.query('INSERT INTO "Registration" (id,first_name,password,number,email,date_of_birth,save_information) VALUES ($1,$2,$3,$4,$5,$6,$7)',
         [id,first_name,password,number,email,date_of_birth,save_information], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User added with ID: ${id}`)
     // response.status(200).send(`User added with ID: ${results.insertId}`)
    })
  }             
  
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {first_name,last_name,password,number,email,date_of_birth,save_information } = request.body
  
    pool.query(
      'UPDATE "Registration" SET first_name = $2 ,password=$3 ,number=$4 ,email=$5 ,date_of_birth=$6,save_information=$7 WHERE id = $1',
      [id,first_name,last_name,password,number,email,date_of_birth,save_information],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM "Registration" WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}