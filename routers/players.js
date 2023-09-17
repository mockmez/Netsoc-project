require('dotenv').config({path: './.env'})

const express = require('express')
const router = express.Router()
const fs = require('fs')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const passport = require('../passport-config');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const userRegisterSchema = require('../model/users')

const adminLoginSchema = require('../model/admin')

router.get('/', checkAuthenticated, (req, res) =>{
    
    console.log(req.user)
    res.render('players/index', {page: 'players'})

})

router.post('/', checkAuthenticated, async (req, res) =>{
            
    res.redirect('/players')

})

router.get('/auth', (req, res) =>{
    res.render('players/auth', {admin: new adminLoginSchema()})
})

router.post('/auth', (req, res) =>{
    if(req.body.name === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD){
        res.render(process.env.ADMIN_URL)
    }
    else if(req.body.code === 'change-canvas'){
        const data = "{\"Image\":[{\"id\":1,\"red\":0,\"green\":0,\"blue\":0},{\"id\":2,\"red\":0,\"green\":0,\"blue\":0},{\"id\":3,\"red\":0,\"green\":0,\"blue\":0},{\"id\":4,\"red\":0,\"green\":0,\"blue\":0},{\"id\":5,\"red\":0,\"green\":0,\"blue\":0},{\"id\":6,\"red\":0,\"green\":0,\"blue\":0},{\"id\":7,\"red\":0,\"green\":0,\"blue\":0},{\"id\":8,\"red\":0,\"green\":0,\"blue\":0},{\"id\":9,\"red\":0,\"green\":0,\"blue\":0},{\"id\":10,\"red\":0,\"green\":0,\"blue\":0},{\"id\":11,\"red\":0,\"green\":0,\"blue\":0},{\"id\":12,\"red\":0,\"green\":0,\"blue\":0},{\"id\":13,\"red\":0,\"green\":0,\"blue\":0},{\"id\":14,\"red\":0,\"green\":0,\"blue\":0},{\"id\":15,\"red\":0,\"green\":0,\"blue\":0},{\"id\":16,\"red\":0,\"green\":0,\"blue\":0},{\"id\":17,\"red\":0,\"green\":0,\"blue\":0},{\"id\":18,\"red\":0,\"green\":0,\"blue\":0},{\"id\":19,\"red\":0,\"green\":0,\"blue\":0},{\"id\":20,\"red\":0,\"green\":0,\"blue\":0},{\"id\":21,\"red\":0,\"green\":0,\"blue\":0},{\"id\":22,\"red\":0,\"green\":0,\"blue\":0},{\"id\":23,\"red\":0,\"green\":0,\"blue\":0},{\"id\":24,\"red\":0,\"green\":0,\"blue\":0},{\"id\":25,\"red\":0,\"green\":0,\"blue\":0},{\"id\":26,\"red\":0,\"green\":0,\"blue\":0},{\"id\":27,\"red\":0,\"green\":0,\"blue\":0},{\"id\":28,\"red\":0,\"green\":0,\"blue\":0},{\"id\":29,\"red\":0,\"green\":0,\"blue\":0},{\"id\":30,\"red\":0,\"green\":0,\"blue\":0},{\"id\":31,\"red\":0,\"green\":0,\"blue\":0},{\"id\":32,\"red\":0,\"green\":0,\"blue\":0},{\"id\":33,\"red\":0,\"green\":0,\"blue\":0},{\"id\":34,\"red\":0,\"green\":0,\"blue\":0},{\"id\":35,\"red\":0,\"green\":0,\"blue\":0},{\"id\":36,\"red\":0,\"green\":0,\"blue\":0},{\"id\":37,\"red\":0,\"green\":0,\"blue\":0},{\"id\":38,\"red\":0,\"green\":0,\"blue\":0},{\"id\":39,\"red\":0,\"green\":0,\"blue\":0},{\"id\":40,\"red\":0,\"green\":0,\"blue\":0},{\"id\":41,\"red\":0,\"green\":0,\"blue\":0},{\"id\":42,\"red\":0,\"green\":0,\"blue\":0},{\"id\":43,\"red\":0,\"green\":0,\"blue\":0},{\"id\":44,\"red\":0,\"green\":0,\"blue\":0},{\"id\":45,\"red\":0,\"green\":0,\"blue\":0},{\"id\":46,\"red\":0,\"green\":0,\"blue\":0},{\"id\":47,\"red\":0,\"green\":0,\"blue\":0},{\"id\":48,\"red\":0,\"green\":0,\"blue\":0},{\"id\":49,\"red\":0,\"green\":0,\"blue\":0},{\"id\":50,\"red\":0,\"green\":0,\"blue\":0},{\"id\":51,\"red\":0,\"green\":0,\"blue\":0},{\"id\":52,\"red\":0,\"green\":0,\"blue\":0},{\"id\":53,\"red\":0,\"green\":0,\"blue\":0},{\"id\":54,\"red\":0,\"green\":0,\"blue\":0},{\"id\":55,\"red\":0,\"green\":0,\"blue\":0},{\"id\":56,\"red\":0,\"green\":0,\"blue\":0},{\"id\":57,\"red\":0,\"green\":0,\"blue\":0},{\"id\":58,\"red\":0,\"green\":0,\"blue\":0},{\"id\":59,\"red\":0,\"green\":0,\"blue\":0},{\"id\":60,\"red\":0,\"green\":0,\"blue\":0},{\"id\":61,\"red\":0,\"green\":0,\"blue\":0},{\"id\":62,\"red\":0,\"green\":0,\"blue\":0},{\"id\":63,\"red\":0,\"green\":0,\"blue\":0},{\"id\":64,\"red\":0,\"green\":0,\"blue\":0},{\"id\":65,\"red\":0,\"green\":0,\"blue\":0},{\"id\":66,\"red\":0,\"green\":0,\"blue\":0},{\"id\":67,\"red\":0,\"green\":0,\"blue\":0},{\"id\":68,\"red\":0,\"green\":0,\"blue\":0},{\"id\":69,\"red\":0,\"green\":0,\"blue\":0},{\"id\":70,\"red\":0,\"green\":0,\"blue\":0},{\"id\":71,\"red\":0,\"green\":0,\"blue\":0},{\"id\":72,\"red\":0,\"green\":0,\"blue\":0},{\"id\":73,\"red\":0,\"green\":0,\"blue\":0},{\"id\":74,\"red\":0,\"green\":0,\"blue\":0},{\"id\":75,\"red\":0,\"green\":0,\"blue\":0},{\"id\":76,\"red\":0,\"green\":0,\"blue\":0},{\"id\":77,\"red\":0,\"green\":0,\"blue\":0},{\"id\":78,\"red\":0,\"green\":0,\"blue\":0},{\"id\":79,\"red\":0,\"green\":0,\"blue\":0},{\"id\":80,\"red\":0,\"green\":0,\"blue\":0},{\"id\":81,\"red\":0,\"green\":0,\"blue\":0},{\"id\":82,\"red\":0,\"green\":0,\"blue\":0},{\"id\":83,\"red\":0,\"green\":0,\"blue\":0},{\"id\":84,\"red\":0,\"green\":0,\"blue\":0},{\"id\":85,\"red\":0,\"green\":0,\"blue\":0},{\"id\":86,\"red\":0,\"green\":0,\"blue\":0},{\"id\":87,\"red\":0,\"green\":0,\"blue\":0},{\"id\":88,\"red\":0,\"green\":0,\"blue\":0},{\"id\":89,\"red\":0,\"green\":0,\"blue\":0},{\"id\":90,\"red\":0,\"green\":0,\"blue\":0},{\"id\":91,\"red\":0,\"green\":0,\"blue\":0},{\"id\":92,\"red\":0,\"green\":0,\"blue\":0},{\"id\":93,\"red\":0,\"green\":0,\"blue\":0},{\"id\":94,\"red\":0,\"green\":0,\"blue\":0},{\"id\":95,\"red\":0,\"green\":0,\"blue\":0},{\"id\":96,\"red\":0,\"green\":0,\"blue\":0},{\"id\":97,\"red\":0,\"green\":0,\"blue\":0},{\"id\":98,\"red\":0,\"green\":0,\"blue\":0},{\"id\":99,\"red\":0,\"green\":0,\"blue\":0},{\"id\":100,\"red\":0,\"green\":0,\"blue\":0},{\"id\":101,\"red\":0,\"green\":0,\"blue\":0},{\"id\":102,\"red\":0,\"green\":0,\"blue\":0},{\"id\":103,\"red\":0,\"green\":0,\"blue\":0},{\"id\":104,\"red\":0,\"green\":0,\"blue\":0},{\"id\":105,\"red\":0,\"green\":0,\"blue\":0},{\"id\":106,\"red\":0,\"green\":0,\"blue\":0},{\"id\":107,\"red\":0,\"green\":0,\"blue\":0},{\"id\":108,\"red\":0,\"green\":0,\"blue\":0},{\"id\":109,\"red\":0,\"green\":0,\"blue\":0},{\"id\":110,\"red\":0,\"green\":0,\"blue\":0},{\"id\":111,\"red\":0,\"green\":0,\"blue\":0},{\"id\":112,\"red\":0,\"green\":0,\"blue\":0},{\"id\":113,\"red\":0,\"green\":0,\"blue\":0},{\"id\":114,\"red\":0,\"green\":0,\"blue\":0},{\"id\":115,\"red\":0,\"green\":0,\"blue\":0},{\"id\":116,\"red\":0,\"green\":0,\"blue\":0},{\"id\":117,\"red\":0,\"green\":0,\"blue\":0},{\"id\":118,\"red\":0,\"green\":0,\"blue\":0},{\"id\":119,\"red\":0,\"green\":0,\"blue\":0},{\"id\":120,\"red\":0,\"green\":0,\"blue\":0},{\"id\":121,\"red\":0,\"green\":0,\"blue\":0},{\"id\":122,\"red\":0,\"green\":0,\"blue\":0},{\"id\":123,\"red\":0,\"green\":0,\"blue\":0},{\"id\":124,\"red\":0,\"green\":0,\"blue\":0},{\"id\":125,\"red\":0,\"green\":0,\"blue\":0},{\"id\":126,\"red\":0,\"green\":0,\"blue\":0},{\"id\":127,\"red\":0,\"green\":0,\"blue\":0},{\"id\":128,\"red\":0,\"green\":0,\"blue\":0},{\"id\":129,\"red\":0,\"green\":0,\"blue\":0},{\"id\":130,\"red\":0,\"green\":0,\"blue\":0},{\"id\":131,\"red\":0,\"green\":0,\"blue\":0},{\"id\":132,\"red\":0,\"green\":0,\"blue\":0},{\"id\":133,\"red\":0,\"green\":0,\"blue\":0},{\"id\":134,\"red\":0,\"green\":0,\"blue\":0},{\"id\":135,\"red\":0,\"green\":0,\"blue\":0},{\"id\":136,\"red\":0,\"green\":0,\"blue\":0},{\"id\":137,\"red\":0,\"green\":0,\"blue\":0},{\"id\":138,\"red\":126,\"green\":237,\"blue\":86},{\"id\":139,\"red\":126,\"green\":237,\"blue\":86},{\"id\":140,\"red\":126,\"green\":237,\"blue\":86},{\"id\":141,\"red\":126,\"green\":237,\"blue\":86},{\"id\":142,\"red\":126,\"green\":237,\"blue\":86},{\"id\":143,\"red\":126,\"green\":237,\"blue\":86},{\"id\":144,\"red\":126,\"green\":237,\"blue\":86},{\"id\":145,\"red\":126,\"green\":237,\"blue\":86},{\"id\":146,\"red\":126,\"green\":237,\"blue\":86},{\"id\":147,\"red\":126,\"green\":237,\"blue\":86},{\"id\":148,\"red\":126,\"green\":237,\"blue\":86},{\"id\":149,\"red\":126,\"green\":237,\"blue\":86},{\"id\":150,\"red\":0,\"green\":0,\"blue\":0},{\"id\":151,\"red\":0,\"green\":0,\"blue\":0},{\"id\":152,\"red\":0,\"green\":0,\"blue\":0},{\"id\":153,\"red\":0,\"green\":0,\"blue\":0},{\"id\":154,\"red\":0,\"green\":0,\"blue\":0},{\"id\":155,\"red\":0,\"green\":0,\"blue\":0},{\"id\":156,\"red\":0,\"green\":0,\"blue\":0},{\"id\":157,\"red\":0,\"green\":0,\"blue\":0},{\"id\":158,\"red\":0,\"green\":0,\"blue\":0},{\"id\":159,\"red\":0,\"green\":0,\"blue\":0},{\"id\":160,\"red\":0,\"green\":0,\"blue\":0},{\"id\":161,\"red\":0,\"green\":0,\"blue\":0},{\"id\":162,\"red\":0,\"green\":0,\"blue\":0},{\"id\":163,\"red\":0,\"green\":0,\"blue\":0},{\"id\":164,\"red\":0,\"green\":0,\"blue\":0},{\"id\":165,\"red\":0,\"green\":0,\"blue\":0},{\"id\":166,\"red\":126,\"green\":237,\"blue\":86},{\"id\":167,\"red\":126,\"green\":237,\"blue\":86},{\"id\":168,\"red\":126,\"green\":237,\"blue\":86},{\"id\":169,\"red\":126,\"green\":237,\"blue\":86},{\"id\":170,\"red\":0,\"green\":0,\"blue\":0},{\"id\":171,\"red\":0,\"green\":0,\"blue\":0},{\"id\":172,\"red\":0,\"green\":0,\"blue\":0},{\"id\":173,\"red\":0,\"green\":0,\"blue\":0},{\"id\":174,\"red\":0,\"green\":0,\"blue\":0},{\"id\":175,\"red\":0,\"green\":0,\"blue\":0},{\"id\":176,\"red\":0,\"green\":0,\"blue\":0},{\"id\":177,\"red\":0,\"green\":0,\"blue\":0},{\"id\":178,\"red\":0,\"green\":0,\"blue\":0},{\"id\":179,\"red\":0,\"green\":0,\"blue\":0},{\"id\":180,\"red\":0,\"green\":0,\"blue\":0},{\"id\":181,\"red\":0,\"green\":0,\"blue\":0},{\"id\":182,\"red\":126,\"green\":237,\"blue\":86},{\"id\":183,\"red\":126,\"green\":237,\"blue\":86},{\"id\":184,\"red\":126,\"green\":237,\"blue\":86},{\"id\":185,\"red\":126,\"green\":237,\"blue\":86},{\"id\":186,\"red\":0,\"green\":0,\"blue\":0},{\"id\":187,\"red\":0,\"green\":0,\"blue\":0},{\"id\":188,\"red\":0,\"green\":0,\"blue\":0},{\"id\":189,\"red\":0,\"green\":0,\"blue\":0},{\"id\":190,\"red\":0,\"green\":0,\"blue\":0},{\"id\":191,\"red\":0,\"green\":0,\"blue\":0},{\"id\":192,\"red\":0,\"green\":0,\"blue\":0},{\"id\":193,\"red\":0,\"green\":0,\"blue\":0},{\"id\":194,\"red\":0,\"green\":0,\"blue\":0},{\"id\":195,\"red\":0,\"green\":0,\"blue\":0},{\"id\":196,\"red\":126,\"green\":237,\"blue\":86},{\"id\":197,\"red\":126,\"green\":237,\"blue\":86},{\"id\":198,\"red\":0,\"green\":0,\"blue\":0},{\"id\":199,\"red\":0,\"green\":0,\"blue\":0},{\"id\":200,\"red\":0,\"green\":0,\"blue\":0},{\"id\":201,\"red\":0,\"green\":0,\"blue\":0},{\"id\":202,\"red\":0,\"green\":0,\"blue\":0},{\"id\":203,\"red\":0,\"green\":0,\"blue\":0},{\"id\":204,\"red\":0,\"green\":0,\"blue\":0},{\"id\":205,\"red\":0,\"green\":0,\"blue\":0},{\"id\":206,\"red\":0,\"green\":0,\"blue\":0},{\"id\":207,\"red\":0,\"green\":0,\"blue\":0},{\"id\":208,\"red\":0,\"green\":0,\"blue\":0},{\"id\":209,\"red\":0,\"green\":0,\"blue\":0},{\"id\":210,\"red\":0,\"green\":0,\"blue\":0},{\"id\":211,\"red\":0,\"green\":0,\"blue\":0},{\"id\":212,\"red\":0,\"green\":0,\"blue\":0},{\"id\":213,\"red\":0,\"green\":0,\"blue\":0},{\"id\":214,\"red\":0,\"green\":0,\"blue\":0},{\"id\":215,\"red\":0,\"green\":0,\"blue\":0},{\"id\":216,\"red\":0,\"green\":0,\"blue\":0},{\"id\":217,\"red\":0,\"green\":0,\"blue\":0},{\"id\":218,\"red\":126,\"green\":237,\"blue\":86},{\"id\":219,\"red\":126,\"green\":237,\"blue\":86},{\"id\":220,\"red\":126,\"green\":237,\"blue\":86},{\"id\":221,\"red\":0,\"green\":0,\"blue\":0},{\"id\":222,\"red\":0,\"green\":0,\"blue\":0},{\"id\":223,\"red\":0,\"green\":0,\"blue\":0},{\"id\":224,\"red\":0,\"green\":0,\"blue\":0},{\"id\":225,\"red\":0,\"green\":0,\"blue\":0},{\"id\":226,\"red\":0,\"green\":0,\"blue\":0},{\"id\":227,\"red\":126,\"green\":237,\"blue\":86},{\"id\":228,\"red\":0,\"green\":0,\"blue\":0},{\"id\":229,\"red\":0,\"green\":0,\"blue\":0},{\"id\":230,\"red\":0,\"green\":0,\"blue\":0},{\"id\":231,\"red\":0,\"green\":0,\"blue\":0},{\"id\":232,\"red\":0,\"green\":0,\"blue\":0},{\"id\":233,\"red\":0,\"green\":0,\"blue\":0},{\"id\":234,\"red\":0,\"green\":0,\"blue\":0},{\"id\":235,\"red\":0,\"green\":0,\"blue\":0},{\"id\":236,\"red\":0,\"green\":0,\"blue\":0},{\"id\":237,\"red\":0,\"green\":0,\"blue\":0},{\"id\":238,\"red\":0,\"green\":0,\"blue\":0},{\"id\":239,\"red\":0,\"green\":0,\"blue\":0},{\"id\":240,\"red\":0,\"green\":0,\"blue\":0},{\"id\":241,\"red\":0,\"green\":0,\"blue\":0},{\"id\":242,\"red\":0,\"green\":0,\"blue\":0},{\"id\":243,\"red\":0,\"green\":0,\"blue\":0},{\"id\":244,\"red\":0,\"green\":0,\"blue\":0},{\"id\":245,\"red\":0,\"green\":0,\"blue\":0},{\"id\":246,\"red\":0,\"green\":0,\"blue\":0},{\"id\":247,\"red\":0,\"green\":0,\"blue\":0},{\"id\":248,\"red\":0,\"green\":0,\"blue\":0},{\"id\":249,\"red\":0,\"green\":0,\"blue\":0},{\"id\":250,\"red\":0,\"green\":0,\"blue\":0},{\"id\":251,\"red\":0,\"green\":0,\"blue\":0},{\"id\":252,\"red\":0,\"green\":0,\"blue\":0},{\"id\":253,\"red\":126,\"green\":237,\"blue\":86},{\"id\":254,\"red\":126,\"green\":237,\"blue\":86},{\"id\":255,\"red\":0,\"green\":0,\"blue\":0},{\"id\":256,\"red\":0,\"green\":0,\"blue\":0},{\"id\":257,\"red\":0,\"green\":0,\"blue\":0},{\"id\":258,\"red\":0,\"green\":0,\"blue\":0},{\"id\":259,\"red\":126,\"green\":237,\"blue\":86},{\"id\":260,\"red\":0,\"green\":0,\"blue\":0},{\"id\":261,\"red\":0,\"green\":0,\"blue\":0},{\"id\":262,\"red\":0,\"green\":0,\"blue\":0},{\"id\":263,\"red\":0,\"green\":0,\"blue\":0},{\"id\":264,\"red\":0,\"green\":0,\"blue\":0},{\"id\":265,\"red\":0,\"green\":0,\"blue\":0},{\"id\":266,\"red\":0,\"green\":0,\"blue\":0},{\"id\":267,\"red\":0,\"green\":0,\"blue\":0},{\"id\":268,\"red\":0,\"green\":0,\"blue\":0},{\"id\":269,\"red\":0,\"green\":0,\"blue\":0},{\"id\":270,\"red\":0,\"green\":0,\"blue\":0},{\"id\":271,\"red\":126,\"green\":237,\"blue\":86},{\"id\":272,\"red\":0,\"green\":0,\"blue\":0},{\"id\":273,\"red\":0,\"green\":0,\"blue\":0},{\"id\":274,\"red\":0,\"green\":0,\"blue\":0},{\"id\":275,\"red\":0,\"green\":0,\"blue\":0},{\"id\":276,\"red\":0,\"green\":0,\"blue\":0},{\"id\":277,\"red\":0,\"green\":0,\"blue\":0},{\"id\":278,\"red\":0,\"green\":0,\"blue\":0},{\"id\":279,\"red\":0,\"green\":0,\"blue\":0},{\"id\":280,\"red\":0,\"green\":0,\"blue\":0},{\"id\":281,\"red\":0,\"green\":0,\"blue\":0},{\"id\":282,\"red\":0,\"green\":0,\"blue\":0},{\"id\":283,\"red\":0,\"green\":0,\"blue\":0},{\"id\":284,\"red\":0,\"green\":0,\"blue\":0},{\"id\":285,\"red\":0,\"green\":0,\"blue\":0},{\"id\":286,\"red\":0,\"green\":0,\"blue\":0},{\"id\":287,\"red\":126,\"green\":237,\"blue\":86},{\"id\":288,\"red\":0,\"green\":0,\"blue\":0},{\"id\":289,\"red\":0,\"green\":0,\"blue\":0},{\"id\":290,\"red\":0,\"green\":0,\"blue\":0},{\"id\":291,\"red\":126,\"green\":237,\"blue\":86},{\"id\":292,\"red\":0,\"green\":0,\"blue\":0},{\"id\":293,\"red\":0,\"green\":0,\"blue\":0},{\"id\":294,\"red\":0,\"green\":0,\"blue\":0},{\"id\":295,\"red\":0,\"green\":0,\"blue\":0},{\"id\":296,\"red\":0,\"green\":0,\"blue\":0},{\"id\":297,\"red\":0,\"green\":0,\"blue\":0},{\"id\":298,\"red\":0,\"green\":0,\"blue\":0},{\"id\":299,\"red\":0,\"green\":0,\"blue\":0},{\"id\":300,\"red\":126,\"green\":237,\"blue\":86},{\"id\":301,\"red\":0,\"green\":0,\"blue\":0},{\"id\":302,\"red\":0,\"green\":0,\"blue\":0},{\"id\":303,\"red\":126,\"green\":237,\"blue\":86},{\"id\":304,\"red\":0,\"green\":0,\"blue\":0},{\"id\":305,\"red\":0,\"green\":0,\"blue\":0},{\"id\":306,\"red\":0,\"green\":0,\"blue\":0},{\"id\":307,\"red\":0,\"green\":0,\"blue\":0},{\"id\":308,\"red\":126,\"green\":237,\"blue\":86},{\"id\":309,\"red\":0,\"green\":0,\"blue\":0},{\"id\":310,\"red\":0,\"green\":0,\"blue\":0},{\"id\":311,\"red\":126,\"green\":237,\"blue\":86},{\"id\":312,\"red\":0,\"green\":0,\"blue\":0},{\"id\":313,\"red\":0,\"green\":0,\"blue\":0},{\"id\":314,\"red\":0,\"green\":0,\"blue\":0},{\"id\":315,\"red\":126,\"green\":237,\"blue\":86},{\"id\":316,\"red\":0,\"green\":0,\"blue\":0},{\"id\":317,\"red\":0,\"green\":0,\"blue\":0},{\"id\":318,\"red\":0,\"green\":0,\"blue\":0},{\"id\":319,\"red\":126,\"green\":237,\"blue\":86},{\"id\":320,\"red\":0,\"green\":0,\"blue\":0},{\"id\":321,\"red\":0,\"green\":0,\"blue\":0},{\"id\":322,\"red\":0,\"green\":0,\"blue\":0},{\"id\":323,\"red\":126,\"green\":237,\"blue\":86},{\"id\":324,\"red\":0,\"green\":0,\"blue\":0},{\"id\":325,\"red\":0,\"green\":0,\"blue\":0},{\"id\":326,\"red\":0,\"green\":0,\"blue\":0},{\"id\":327,\"red\":0,\"green\":0,\"blue\":0},{\"id\":328,\"red\":126,\"green\":237,\"blue\":86},{\"id\":329,\"red\":0,\"green\":0,\"blue\":0},{\"id\":330,\"red\":0,\"green\":0,\"blue\":0},{\"id\":331,\"red\":126,\"green\":237,\"blue\":86},{\"id\":332,\"red\":0,\"green\":0,\"blue\":0},{\"id\":333,\"red\":126,\"green\":237,\"blue\":86},{\"id\":334,\"red\":0,\"green\":0,\"blue\":0},{\"id\":335,\"red\":126,\"green\":237,\"blue\":86},{\"id\":336,\"red\":126,\"green\":237,\"blue\":86},{\"id\":337,\"red\":0,\"green\":0,\"blue\":0},{\"id\":338,\"red\":0,\"green\":0,\"blue\":0},{\"id\":339,\"red\":126,\"green\":237,\"blue\":86},{\"id\":340,\"red\":0,\"green\":0,\"blue\":0},{\"id\":341,\"red\":0,\"green\":0,\"blue\":0},{\"id\":342,\"red\":126,\"green\":237,\"blue\":86},{\"id\":343,\"red\":0,\"green\":0,\"blue\":0},{\"id\":344,\"red\":126,\"green\":237,\"blue\":86},{\"id\":345,\"red\":0,\"green\":0,\"blue\":0},{\"id\":346,\"red\":126,\"green\":237,\"blue\":86},{\"id\":347,\"red\":0,\"green\":0,\"blue\":0},{\"id\":348,\"red\":126,\"green\":237,\"blue\":86},{\"id\":349,\"red\":0,\"green\":0,\"blue\":0},{\"id\":350,\"red\":0,\"green\":0,\"blue\":0},{\"id\":351,\"red\":126,\"green\":237,\"blue\":86},{\"id\":352,\"red\":0,\"green\":0,\"blue\":0},{\"id\":353,\"red\":0,\"green\":0,\"blue\":0},{\"id\":354,\"red\":0,\"green\":0,\"blue\":0},{\"id\":355,\"red\":126,\"green\":237,\"blue\":86},{\"id\":356,\"red\":0,\"green\":0,\"blue\":0},{\"id\":357,\"red\":0,\"green\":0,\"blue\":0},{\"id\":358,\"red\":0,\"green\":0,\"blue\":0},{\"id\":359,\"red\":126,\"green\":237,\"blue\":86},{\"id\":360,\"red\":0,\"green\":0,\"blue\":0},{\"id\":361,\"red\":126,\"green\":237,\"blue\":86},{\"id\":362,\"red\":0,\"green\":0,\"blue\":0},{\"id\":363,\"red\":126,\"green\":237,\"blue\":86},{\"id\":364,\"red\":126,\"green\":237,\"blue\":86},{\"id\":365,\"red\":0,\"green\":0,\"blue\":0},{\"id\":366,\"red\":0,\"green\":0,\"blue\":0},{\"id\":367,\"red\":126,\"green\":237,\"blue\":86},{\"id\":368,\"red\":0,\"green\":0,\"blue\":0},{\"id\":369,\"red\":0,\"green\":0,\"blue\":0},{\"id\":370,\"red\":0,\"green\":0,\"blue\":0},{\"id\":371,\"red\":126,\"green\":237,\"blue\":86},{\"id\":372,\"red\":0,\"green\":0,\"blue\":0},{\"id\":373,\"red\":0,\"green\":0,\"blue\":0},{\"id\":374,\"red\":126,\"green\":237,\"blue\":86},{\"id\":375,\"red\":0,\"green\":0,\"blue\":0},{\"id\":376,\"red\":126,\"green\":237,\"blue\":86},{\"id\":377,\"red\":0,\"green\":0,\"blue\":0},{\"id\":378,\"red\":126,\"green\":237,\"blue\":86},{\"id\":379,\"red\":0,\"green\":0,\"blue\":0},{\"id\":380,\"red\":0,\"green\":0,\"blue\":0},{\"id\":381,\"red\":0,\"green\":0,\"blue\":0},{\"id\":382,\"red\":0,\"green\":0,\"blue\":0},{\"id\":383,\"red\":126,\"green\":237,\"blue\":86},{\"id\":384,\"red\":0,\"green\":0,\"blue\":0},{\"id\":385,\"red\":0,\"green\":0,\"blue\":0},{\"id\":386,\"red\":0,\"green\":0,\"blue\":0},{\"id\":387,\"red\":126,\"green\":237,\"blue\":86},{\"id\":388,\"red\":0,\"green\":0,\"blue\":0},{\"id\":389,\"red\":0,\"green\":0,\"blue\":0},{\"id\":390,\"red\":0,\"green\":0,\"blue\":0},{\"id\":391,\"red\":126,\"green\":237,\"blue\":86},{\"id\":392,\"red\":0,\"green\":0,\"blue\":0},{\"id\":393,\"red\":126,\"green\":237,\"blue\":86},{\"id\":394,\"red\":0,\"green\":0,\"blue\":0},{\"id\":395,\"red\":126,\"green\":237,\"blue\":86},{\"id\":396,\"red\":0,\"green\":0,\"blue\":0},{\"id\":397,\"red\":0,\"green\":0,\"blue\":0},{\"id\":398,\"red\":0,\"green\":0,\"blue\":0},{\"id\":399,\"red\":126,\"green\":237,\"blue\":86},{\"id\":400,\"red\":0,\"green\":0,\"blue\":0},{\"id\":401,\"red\":126,\"green\":237,\"blue\":86},{\"id\":402,\"red\":0,\"green\":0,\"blue\":0},{\"id\":403,\"red\":0,\"green\":0,\"blue\":0},{\"id\":404,\"red\":126,\"green\":237,\"blue\":86},{\"id\":405,\"red\":0,\"green\":0,\"blue\":0},{\"id\":406,\"red\":126,\"green\":237,\"blue\":86},{\"id\":407,\"red\":0,\"green\":0,\"blue\":0},{\"id\":408,\"red\":126,\"green\":237,\"blue\":86},{\"id\":409,\"red\":0,\"green\":0,\"blue\":0},{\"id\":410,\"red\":126,\"green\":237,\"blue\":86},{\"id\":411,\"red\":0,\"green\":0,\"blue\":0},{\"id\":412,\"red\":126,\"green\":237,\"blue\":86},{\"id\":413,\"red\":0,\"green\":0,\"blue\":0},{\"id\":414,\"red\":0,\"green\":0,\"blue\":0},{\"id\":415,\"red\":126,\"green\":237,\"blue\":86},{\"id\":416,\"red\":0,\"green\":0,\"blue\":0},{\"id\":417,\"red\":0,\"green\":0,\"blue\":0},{\"id\":418,\"red\":0,\"green\":0,\"blue\":0},{\"id\":419,\"red\":126,\"green\":237,\"blue\":86},{\"id\":420,\"red\":0,\"green\":0,\"blue\":0},{\"id\":421,\"red\":0,\"green\":0,\"blue\":0},{\"id\":422,\"red\":0,\"green\":0,\"blue\":0},{\"id\":423,\"red\":126,\"green\":237,\"blue\":86},{\"id\":424,\"red\":0,\"green\":0,\"blue\":0},{\"id\":425,\"red\":126,\"green\":237,\"blue\":86},{\"id\":426,\"red\":0,\"green\":0,\"blue\":0},{\"id\":427,\"red\":0,\"green\":0,\"blue\":0},{\"id\":428,\"red\":126,\"green\":237,\"blue\":86},{\"id\":429,\"red\":126,\"green\":237,\"blue\":86},{\"id\":430,\"red\":0,\"green\":0,\"blue\":0},{\"id\":431,\"red\":126,\"green\":237,\"blue\":86},{\"id\":432,\"red\":126,\"green\":237,\"blue\":86},{\"id\":433,\"red\":0,\"green\":0,\"blue\":0},{\"id\":434,\"red\":0,\"green\":0,\"blue\":0},{\"id\":435,\"red\":126,\"green\":237,\"blue\":86},{\"id\":436,\"red\":0,\"green\":0,\"blue\":0},{\"id\":437,\"red\":0,\"green\":0,\"blue\":0},{\"id\":438,\"red\":0,\"green\":0,\"blue\":0},{\"id\":439,\"red\":126,\"green\":237,\"blue\":86},{\"id\":440,\"red\":0,\"green\":0,\"blue\":0},{\"id\":441,\"red\":0,\"green\":0,\"blue\":0},{\"id\":442,\"red\":0,\"green\":0,\"blue\":0},{\"id\":443,\"red\":126,\"green\":237,\"blue\":86},{\"id\":444,\"red\":0,\"green\":0,\"blue\":0},{\"id\":445,\"red\":0,\"green\":0,\"blue\":0},{\"id\":446,\"red\":0,\"green\":0,\"blue\":0},{\"id\":447,\"red\":126,\"green\":237,\"blue\":86},{\"id\":448,\"red\":0,\"green\":0,\"blue\":0},{\"id\":449,\"red\":0,\"green\":0,\"blue\":0},{\"id\":450,\"red\":0,\"green\":0,\"blue\":0},{\"id\":451,\"red\":126,\"green\":237,\"blue\":86},{\"id\":452,\"red\":0,\"green\":0,\"blue\":0},{\"id\":453,\"red\":0,\"green\":0,\"blue\":0},{\"id\":454,\"red\":0,\"green\":0,\"blue\":0},{\"id\":455,\"red\":0,\"green\":0,\"blue\":0},{\"id\":456,\"red\":0,\"green\":0,\"blue\":0},{\"id\":457,\"red\":0,\"green\":0,\"blue\":0},{\"id\":458,\"red\":0,\"green\":0,\"blue\":0},{\"id\":459,\"red\":0,\"green\":0,\"blue\":0},{\"id\":460,\"red\":0,\"green\":0,\"blue\":0},{\"id\":461,\"red\":0,\"green\":0,\"blue\":0},{\"id\":462,\"red\":0,\"green\":0,\"blue\":0},{\"id\":463,\"red\":0,\"green\":0,\"blue\":0},{\"id\":464,\"red\":0,\"green\":0,\"blue\":0},{\"id\":465,\"red\":0,\"green\":0,\"blue\":0},{\"id\":466,\"red\":0,\"green\":0,\"blue\":0},{\"id\":467,\"red\":0,\"green\":0,\"blue\":0},{\"id\":468,\"red\":0,\"green\":0,\"blue\":0},{\"id\":469,\"red\":0,\"green\":0,\"blue\":0},{\"id\":470,\"red\":0,\"green\":0,\"blue\":0},{\"id\":471,\"red\":0,\"green\":0,\"blue\":0},{\"id\":472,\"red\":0,\"green\":0,\"blue\":0},{\"id\":473,\"red\":0,\"green\":0,\"blue\":0},{\"id\":474,\"red\":0,\"green\":0,\"blue\":0},{\"id\":475,\"red\":0,\"green\":0,\"blue\":0},{\"id\":476,\"red\":0,\"green\":0,\"blue\":0},{\"id\":477,\"red\":0,\"green\":0,\"blue\":0},{\"id\":478,\"red\":126,\"green\":237,\"blue\":86},{\"id\":479,\"red\":0,\"green\":0,\"blue\":0},{\"id\":480,\"red\":0,\"green\":0,\"blue\":0},{\"id\":481,\"red\":0,\"green\":0,\"blue\":0},{\"id\":482,\"red\":0,\"green\":0,\"blue\":0},{\"id\":483,\"red\":0,\"green\":0,\"blue\":0},{\"id\":484,\"red\":126,\"green\":237,\"blue\":86},{\"id\":485,\"red\":0,\"green\":0,\"blue\":0},{\"id\":486,\"red\":0,\"green\":0,\"blue\":0},{\"id\":487,\"red\":0,\"green\":0,\"blue\":0},{\"id\":488,\"red\":0,\"green\":0,\"blue\":0},{\"id\":489,\"red\":0,\"green\":0,\"blue\":0},{\"id\":490,\"red\":0,\"green\":0,\"blue\":0},{\"id\":491,\"red\":0,\"green\":0,\"blue\":0},{\"id\":492,\"red\":0,\"green\":0,\"blue\":0},{\"id\":493,\"red\":0,\"green\":0,\"blue\":0},{\"id\":494,\"red\":0,\"green\":0,\"blue\":0},{\"id\":495,\"red\":0,\"green\":0,\"blue\":0},{\"id\":496,\"red\":0,\"green\":0,\"blue\":0},{\"id\":497,\"red\":0,\"green\":0,\"blue\":0},{\"id\":498,\"red\":0,\"green\":0,\"blue\":0},{\"id\":499,\"red\":0,\"green\":0,\"blue\":0},{\"id\":500,\"red\":0,\"green\":0,\"blue\":0},{\"id\":501,\"red\":0,\"green\":0,\"blue\":0},{\"id\":502,\"red\":0,\"green\":0,\"blue\":0},{\"id\":503,\"red\":0,\"green\":0,\"blue\":0},{\"id\":504,\"red\":0,\"green\":0,\"blue\":0},{\"id\":505,\"red\":0,\"green\":0,\"blue\":0},{\"id\":506,\"red\":0,\"green\":0,\"blue\":0},{\"id\":507,\"red\":0,\"green\":0,\"blue\":0},{\"id\":508,\"red\":0,\"green\":0,\"blue\":0},{\"id\":509,\"red\":126,\"green\":237,\"blue\":86},{\"id\":510,\"red\":0,\"green\":0,\"blue\":0},{\"id\":511,\"red\":0,\"green\":0,\"blue\":0},{\"id\":512,\"red\":0,\"green\":0,\"blue\":0},{\"id\":513,\"red\":0,\"green\":0,\"blue\":0},{\"id\":514,\"red\":0,\"green\":0,\"blue\":0},{\"id\":515,\"red\":0,\"green\":0,\"blue\":0},{\"id\":516,\"red\":0,\"green\":0,\"blue\":0},{\"id\":517,\"red\":126,\"green\":237,\"blue\":86},{\"id\":518,\"red\":126,\"green\":237,\"blue\":86},{\"id\":519,\"red\":126,\"green\":237,\"blue\":86},{\"id\":520,\"red\":126,\"green\":237,\"blue\":86},{\"id\":521,\"red\":126,\"green\":237,\"blue\":86},{\"id\":522,\"red\":0,\"green\":0,\"blue\":0},{\"id\":523,\"red\":0,\"green\":0,\"blue\":0},{\"id\":524,\"red\":0,\"green\":0,\"blue\":0},{\"id\":525,\"red\":0,\"green\":0,\"blue\":0},{\"id\":526,\"red\":0,\"green\":0,\"blue\":0},{\"id\":527,\"red\":0,\"green\":0,\"blue\":0},{\"id\":528,\"red\":0,\"green\":0,\"blue\":0},{\"id\":529,\"red\":0,\"green\":0,\"blue\":0},{\"id\":530,\"red\":0,\"green\":0,\"blue\":0},{\"id\":531,\"red\":0,\"green\":0,\"blue\":0},{\"id\":532,\"red\":0,\"green\":0,\"blue\":0},{\"id\":533,\"red\":0,\"green\":0,\"blue\":0},{\"id\":534,\"red\":0,\"green\":0,\"blue\":0},{\"id\":535,\"red\":0,\"green\":0,\"blue\":0},{\"id\":536,\"red\":0,\"green\":0,\"blue\":0},{\"id\":537,\"red\":126,\"green\":237,\"blue\":86},{\"id\":538,\"red\":126,\"green\":237,\"blue\":86},{\"id\":539,\"red\":126,\"green\":237,\"blue\":86},{\"id\":540,\"red\":126,\"green\":237,\"blue\":86},{\"id\":541,\"red\":0,\"green\":0,\"blue\":0},{\"id\":542,\"red\":0,\"green\":0,\"blue\":0},{\"id\":543,\"red\":0,\"green\":0,\"blue\":0},{\"id\":544,\"red\":0,\"green\":0,\"blue\":0},{\"id\":545,\"red\":0,\"green\":0,\"blue\":0},{\"id\":546,\"red\":0,\"green\":0,\"blue\":0},{\"id\":547,\"red\":0,\"green\":0,\"blue\":0},{\"id\":548,\"red\":0,\"green\":0,\"blue\":0},{\"id\":549,\"red\":0,\"green\":0,\"blue\":0},{\"id\":550,\"red\":0,\"green\":0,\"blue\":0},{\"id\":551,\"red\":0,\"green\":0,\"blue\":0},{\"id\":552,\"red\":0,\"green\":0,\"blue\":0},{\"id\":553,\"red\":0,\"green\":0,\"blue\":0},{\"id\":554,\"red\":126,\"green\":237,\"blue\":86},{\"id\":555,\"red\":126,\"green\":237,\"blue\":86},{\"id\":556,\"red\":126,\"green\":237,\"blue\":86},{\"id\":557,\"red\":126,\"green\":237,\"blue\":86},{\"id\":558,\"red\":126,\"green\":237,\"blue\":86},{\"id\":559,\"red\":126,\"green\":237,\"blue\":86},{\"id\":560,\"red\":126,\"green\":237,\"blue\":86},{\"id\":561,\"red\":126,\"green\":237,\"blue\":86},{\"id\":562,\"red\":126,\"green\":237,\"blue\":86},{\"id\":563,\"red\":126,\"green\":237,\"blue\":86},{\"id\":564,\"red\":126,\"green\":237,\"blue\":86},{\"id\":565,\"red\":126,\"green\":237,\"blue\":86},{\"id\":566,\"red\":126,\"green\":237,\"blue\":86},{\"id\":567,\"red\":126,\"green\":237,\"blue\":86},{\"id\":568,\"red\":126,\"green\":237,\"blue\":86},{\"id\":569,\"red\":0,\"green\":0,\"blue\":0},{\"id\":570,\"red\":0,\"green\":0,\"blue\":0},{\"id\":571,\"red\":0,\"green\":0,\"blue\":0},{\"id\":572,\"red\":0,\"green\":0,\"blue\":0},{\"id\":573,\"red\":0,\"green\":0,\"blue\":0},{\"id\":574,\"red\":0,\"green\":0,\"blue\":0},{\"id\":575,\"red\":0,\"green\":0,\"blue\":0},{\"id\":576,\"red\":0,\"green\":0,\"blue\":0}]}"
        fs.writeFileSync('./public/image.json', data)
        res.redirect('auth')
    }
    

})

router.get('js-files', (req, res) =>{
    res.setHeader('Content-Type', 'application/javascript')
    res.sendFile(path.join(__dirname, '../..public', 'players-socket.js'))
    res.sendFile(path.join(__dirname, '../..public', 'renderer.js'))
    res.sendFile(path.join(__dirname, '../public', 'Tile-canvas.js'))
    res.sendFile(path.join(__dirname, '../public', 'Color-palette.js'))
    res.sendFile(path.join(__dirname, '../public', 'index.js'))
    
})

router.get('css-files', (req, res) =>{
    res.setHeader('Content-Type', 'text/css')
    res.sendFile(path.join(__dirname, '../..public', 'styles.css'))
})

router.get('image.json', (req, res) =>{
    res.setHeader('Content-Type', 'application/json')
    res.sendFile(path.join(__dirname, '../..public', 'image-json.json'))
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next()
    }
    else{
        res.redirect('/users/login')
    }
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/users/')
    }
    else{
        next()
    }
}

module.exports = (io) =>{
    
    const routerNameSpace = io.of('/players')

    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    
    io.engine.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new mongoStore({
            mongoUrl: process.env.DATABASE_URI,
            collectionName: 'user_sess'
        }),
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    }))

    io.use(wrap(passport.initialize()))
    io.use(wrap(passport.session()))

    routerNameSpace.on('connection', (socket) =>{
    
        socket.on('chat message', (arg) =>{
            console.log(`Chat message: ${arg}`)
        })
    
        socket.on('color-change', (arg) =>{
            
            if(socket.request.session && socket.request.session.passport){
                const userId = socket.request.session.passport.user

                var current_date = Date.now()

                passport.deserializeUser(userId, async(err, user) =>{
                    if(err){
                        console.log(err)
                        return;
                    }

                    console.log('debug time', socket.request.session.passport.user)

                    if(user){
                        
                        if((current_date - user.timestamp) > 3600000){
                            console.log('it has not been an hour yet')
                            
                        }

                        user.timestamp = current_date
                        socket.request.session.passport.user = user;

                        socket.request.session.save((err) =>{
                            if(err){
                                console.log(err)
                                return;
                            }

                            console.log('updated user time', user)
                            console.log('this is the current time')
                            console.log(new Date(Date.now()))

                        })

                        try{
                            
                            userRegisterSchema.findByIdAndUpdate(userId,
                                {timestamp: current_date},
                                {new: true}).
                                then(() => console.log('user updated time')).
                                catch((error) =>{
                                    console.log(error)
                                })
                            userRegisterSchema.findById(userId).then((user) =>{
                                console.log('this user time', user)
                            })

                        }
                        catch(err){
                            console.log(err)
                        }

                    }

                })

            }
            else{
                console.log('error')
            }
            
            console.log(arg)
            console.log('Test point 2')
            let data = JSON.parse(fs.readFileSync('./public/image.json', {encoding: 'utf-8'}))
            console.log('Data reached backend')
            data['Image'][arg['index']]['red'] = arg['color']['red']
            data['Image'][arg['index']]['blue'] = arg['color']['blue']
            data['Image'][arg['index']]['green'] = arg['color']['green']
            fs.writeFileSync('./public/image.json', JSON.stringify(data))
    
            routerNameSpace.emit('client-change', arg)
    
        })
    
        socket.on('disconnect', () =>{
            console.log('A user has disconnected')
        })
    
    })
    
    
    return router;
}