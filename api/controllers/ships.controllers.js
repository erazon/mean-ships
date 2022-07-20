const mongoose = require("mongoose");
const Ship = mongoose.model(process.env.SHIP_MODEL);

const _runGeoQuery = function (req, res) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const dist = parseFloat(req.query.dist);
    const point = { //Geo JSON Point
        type: "Point",
        coordinates: [lng, lat]
    };
    const query = {
        "coordinates": {
            $near: {
                $geometry: point,
                $maxDistance: dist,
                $minDistance: parseFloat(process.env.GEO_SEARCH_MIN_DIST, 10)
            }
        }
    };
    Ship.find(query).exec(function (err, ships) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ships
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const getAll = function (req, res) {
    console.log('in getAll');
    if (req.query && req.query.lat && req.query.lng) {
        _runGeoQuery(req, res);
        return;
    }
    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET, 10);
    let count = parseInt(process.env.DEFAULT_FIND_COUNT, 10);
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({
            "message": "QueryString Offset and Count should be numbers"
        });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({
            "message": "Cannot exceed count of " + maxCount
        });
        return;
    }
    Ship.find().skip(offset).limit(count).exec(function (err, ships) { // issue 5
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ships
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const shipId = req.params.shipId; // issue 6
    Ship.findById(shipId).exec(function (err, ship) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ship
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!ship) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne
};