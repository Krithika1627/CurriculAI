/** @type {import("drizzle-kit").Config} */
export default{
    schema: "./configs/schema.jsx",
    dialect: 'postgresql',
    dbCredentials:{
        url: process.env.DATABASE_URL,
    }
};