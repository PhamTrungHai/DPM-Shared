#!/bin/env node
require('readline')
    .createInterface({input:process.stdin,output:process.stdout,historySize:0})
    .question('PAT> ',p => { b64=Buffer.from(p.trim().toString('base64'));console.log(b64);process.exit();})