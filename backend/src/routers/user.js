import express from "express";
import pool from '../db/connect.js';
import jwt from "jsonwebtoken";

const userRouter = new express.Router();

const createJWT = (userid)=> jwt.sign({userid}, 'lifesucks', {expiresIn:60*60*24*7});

userRouter.get(
    '/user',
    async(req, res)=>{
        try {
            const result = await pool.query('SELECT * FROM users');
            res.send(result.rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

userRouter.get(
    '/user/:id',
    async({ params }, res)=>{
        try {
            const result = await pool.query('SELECT * FROM users WHERE userID=$1', [params.id]);
            res.send(result.rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });    

//login
userRouter.post(
    '/login',
    async({ body }, res)=>{
        try {
            const {email, password} = body;
            const result = await pool.query('SELECT userid, username, email, password FROM users WHERE users.email = $1', [email]);
            if(result.rowCount===0)throw new Error("invalid email");
            if(result.rows[0].password!==password)throw new Error("invalid password");
            res.send({email, username:result.rows[0].username, token: createJWT(result.rows[0].userid)});
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

//signup
userRouter.post(
    '/signup',
    async({ body }, res)=>{
        try {
            const {username, password, email} = body;
            const result = await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', [username, password, email]);
            res.send({email, username:result.rows[0].username, token: createJWT(result.rows[0].userid)});
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

export default userRouter;