/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { app } = require("electron");
const ADODB = require('node-adodb');
if (app.isPackaged) {
    ADODB.PATH = "./resources/adodb.js";
 }
export const connectionGestor = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\\MGMobile\\Gestor\\Gestor.mdb;');

export const conectionVemovel = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\\MGMobile\\Vemovel\\Vemovel.mdb;');