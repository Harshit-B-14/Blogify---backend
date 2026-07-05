const multer = require('multer')

// creating the storage object
const storage = multer.diskStorage({

    // define the destination
    destination : function( req, file, cb ){
        return cb( null, `./uploads/${req.user.id}`)
    },

    // define the filename to be stored
    filename : function( req, file, cb ){
        return cb( null, `${Date.now()}-${file.originalname}`)
    }
})

// creating upload variable using storage object
const upload = multer({ storage })

module.exports = { upload }