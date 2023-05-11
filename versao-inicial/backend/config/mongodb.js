const mongose = require('mongoose')

const { db_mongo } = require('./../.env')

mongose.connect(db_mongo, { useNewUrlParser: true })
    .catch(e => {
        const msg = 'Não foi possível conectar com o MongoDB'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m]')
    })

