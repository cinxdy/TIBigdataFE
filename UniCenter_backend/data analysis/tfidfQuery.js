const express = require('express');
const router = express.Router();
const TFIDF = require('./models/data analysis/tfidf');

function updateKeywordTable(req,res){
    
}

router.post('/getKeywordTable',(req,res)=>{
    let ids = req.body;
    TFIDF.find((err,table)=>{

    });
});