import { Sequelize } from 'sequelize'

const db = new Sequelize('economark', 'root', '',{
    host : 'localhost',
    dialect : 'mysql'
})

export default db