'use strict'
import fs from'fs'
// import url from'url'
// import path from'path'
import https from 'https'
import express from 'express'
import genServer from './server'

const httpApp = express()
const httpsApp = express()

const HTTP_PORT = 80
const HTTPS_PORT = 443

genServer(httpApp, false, HTTP_PORT)
genServer(httpsApp, https.createServer({
  key : fs.readFileSync(__dirname + '/ssl/liaoliaojun.com.key'),
  cert: fs.readFileSync(__dirname + '/ssl/liaoliaojun.com.crt'),
}, httpsApp), HTTPS_PORT)
