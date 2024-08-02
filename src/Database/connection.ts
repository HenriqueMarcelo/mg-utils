/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { app } = require("electron");
const ADODB = require('node-adodb');
if (app.isPackaged) {
    ADODB.PATH = "./resources/adodb.js";
 }
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\\MGMobile\\Gestor\\Gestor.mdb;');

export default connection