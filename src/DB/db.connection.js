import { Sequelize } from 'sequelize';
import env from 'dotenv'
env.config()
const db_url=process.env.DB_URL
const sequelize_config=new Sequelize(db_url)

const db_connection=async () => {
try {
  await sequelize_config.authenticate();
  console.log('Connection has been established successfully.');
await sequelize_config.sync({logging:false,alter:true,force:true})
} catch (error) {
  console.error('Unable to connect to the database:', error);
}}

export  {sequelize_config};
export default db_connection;

