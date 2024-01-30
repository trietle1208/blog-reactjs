const notFound = (req, res, next) => {
    console.log(res.headersSent)
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (error, req, res, next) => { 
    if(res.headersSent) {
        return next(error)
    }

    res.status(error.code || 500).json({message: error.message || "An unknow error occurred"})
}

module.exports = {notFound, errorHandler}