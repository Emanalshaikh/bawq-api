const request = require("supertest");
const express = require("express");

const app = require("../app");

const devices = require('../constants/devices');

describe("test api routes", function () {
    test("GET /index, should show 'Welcome to bawq-api'", () => {
        return request(app)
            .get("/")
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual("Welcome to bawq-api");
            });
    });

    test("GET /devices, Responds with a json object containing an array of devices found in the file\n" + "devices.json and code 200'", () => {
        return request(app)
            .get("/devices")
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(expect.objectContaining({
                        devices: expect.arrayContaining([expect.objectContaining({
                            _id: expect.any(Number),
                            name: expect.any(String),
                            type: expect.any(String),
                            firmware: expect.any(String),
                        })])
                    }),
                );
            });
    });

    test("PUT /devices, Adds a device to devices.json called ‘new device’ with a new id. Respond with response code 200", () => {
        return request(app)
            .put("/devices")
            .expect(201)
            .then((res) => {
                expect(res.body).toEqual(expect.objectContaining({
                        _id: expect.any(Number),
                        name: expect.any(String),
                        type: expect.any(String),
                        firmware: expect.any(String),
                    }),
                );
            });
    });


    test("POST /devices/:_deviceId, Changes the name of the device found in devices.json to the new device name\n" +
        "found in the request’s body ‘name’. Respond with response 200. Example request body: { “_id”: 32, “name”: “Alpha Device”}", () => {

        const data = {_id: 2, name: "Alpha Device"};

        return request(app)
            .post(`/devices/${data._id}`)
            .send(data)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(expect.objectContaining({
                        _id: expect.any(Number),
                        name: expect.any(String),
                        type: expect.any(String),
                        firmware: expect.any(String),
                    }),
                );
            });
    });

    test("POST /devices/:_deviceId, not found", () => {
        const data = {_id: 100, name: "Alpha Device"};
        return request(app)
            .post(`/devices/${data._id}`)
            .send(data)
            .expect(404)
            .then((res) => {
            });
        ;
    });
});
