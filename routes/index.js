var express = require("express");
var router = express.Router();

let devices = require('../constants/devices');

/* GET Responds with the text “Welcome to bawq-api” and response code 200. */
router.get("/", function (req, res, next) {
    return res.status(200).json("Welcome to bawq-api");
});

/* GET Responds with a json object containing an array of devices found in the file"devices.json and code 200 */
router.get("/devices", function (req, res, next) {
    return res.status(200).json(devices);
});

/* PUT /devices, Adds a device to devices.json called ‘new device’ with a new id. Respond with response code 200 */
router.put("/devices", function (req, res, next) {

    let newDevice = {
        "_id": devices['devices'].length + 1,
        "name": "new device",
        "type": "GPS",
        "firmware": `${Math.floor(Math.random() * 10).toString()}.0`
    };

    return res.status(201).json(newDevice);
});
/* POST /devices/:_deviceId, Changes the name of the device found in devices.json to the new device name\n" +
        "found in the request’s body ‘name’. Respond with response 200. Example request body: { “_id”: 32, “name”: “Alpha Device”} */
router.post("/devices/:id", function (req, res, next) {

    const id = req.params.id;
    let device = devices['devices'].find((devices) => devices._id == id);

    if (device == null) {
        return res.status(404).json({
            'msg': "no devices found.",
            'status': 404
        });
    }

    const data = req.body;
    let index = devices['devices'].findIndex((devices) => devices._id == id);

    device['name'] = data['name'];
    devices['devices'][index] = device;

    res.status(200).json(device);
});

module.exports = router;
