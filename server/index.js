require("dotenv").config()

import express from 'express'
import next from 'next'
import { urlencoded, json } from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";

import { to } from 'await-to-js'
import {getUserByEmail} from './database/user'

import router from "./router";
import { connectToDatabase, connection } from "./database/connection"
import { initialiseAuthentication } from "./auth";

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const port = 3000

nextApp.prepare().then(async () => {
  const app = express()

  app.get('/my-custom-route', (req, res) =>
    res.status(200).json({ hello: 'Hello, from the back-end world!' })
  )


    app.use(urlencoded({ extended: true }));
    app.use(json());
    app.use(cookieParser());

    app.use(passport.initialize());

    router(app);
    initialiseAuthentication(app);


    app.get('/getUserFromDB/:email', async (req, res) =>{
      const email = req.params.email
      const [err, user] = await to(getUserByEmail(email))
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
      res.send(userData)
    })

  app.get('/hey/:name', (req, res) =>{
    res.send(req.params.name)
  })
  app.get('*', (req, res) => {
    return handle(req, res)
  })

  await connectToDatabase()
 

  app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on localhost:${port}`)
  })
})