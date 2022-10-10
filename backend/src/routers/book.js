import express, { query } from "express";
import pool from '../db/connect.js';

const bookRouter = new express.Router();

bookRouter.get(
    '/book',
    async({query}, res)=>{
        try {
            const queryString = "SELECT * FROM books WHERE title ILIKE '%"+query.search+"%' ORDER BY title ASC LIMIT 6";
            const result = await pool.query(queryString);
            res.send(result.rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

bookRouter.post(
    '/book',
    async({ body }, res)=>{
        try {
            const {title, author} = body;
            const result = await pool.query('INSERT INTO books(title, author) VALUES ($1, $2) RETURNING *', [title, author]);
            res.send(result.rows[0]);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

export default bookRouter;