import express from "express";
import pool from '../db/connect.js';
import auth from "../middleware/auth.js";

const listRouter = new express.Router();

listRouter.get(
    '/list',
    auth,
    async({userid}, res)=>{
        try {
            const queryText = 
                'SELECT readinglist.bookID, books.title, books.author, readinglist.state FROM readinglist INNER JOIN books ON readinglist.userID = $1 AND readinglist.bookID = books.bookID';
            const result = await pool.query(queryText, [userid]);
            res.send(result.rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

listRouter.post(
    '/list',
    auth,
    async ({userid, body}, res)=>{
        try {
            const result = await pool.query('INSERT INTO readinglist (userID, bookID, state) VALUES ($1,$2,$3) RETURNING *', [userid, body.bookid, body.state]);
            res.send(result.rows[0]);
        } catch (error) {
            res.send(400).send(error.message);
        }
    });

listRouter.patch(
    '/list',
    auth,
    async ({userid, body}, res)=>{
        try {
            const result = await pool.query('UPDATE readinglist SET state = $1 WHERE userid = $2 AND bookid = $3 RETURNING *', [body.state, userid, body.bookid]);
            res.send(result.rows[0]);
        } catch (error) {
            res.send(400).send(error.message);
        }
    });

listRouter.delete(
    '/list',
    auth,
    async ({userid, body}, res)=>{
        try {
            const result = await pool.query('DELETE FROM readinglist WHERE userid = $1 AND bookid = $2 RETURNING *', [userid, body.bookid]);
            res.send(result.rows[0]);
        } catch (error) {
            res.send(400).send(error.message);
        }
    });
    
export default listRouter;