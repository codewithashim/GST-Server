const {
    createContact,
    getContact
} = require("../controller/contact/contact.controller");

const router = require("express").Router();

/**
 * @api {post} /api/v1/contact/create create contact
 * @apiDescription create contact
 * @apiPermissions all user.
 * @apiHeaders {access token}.
 * @apiSuccess {object} get a object contain with a property named data. data is contain with the main math data.
 * @query {req.body} title is the value of title proper
 * @apiError (500) internal server error
 * @apiError (400) bad request
 * @validation {postman} tested by post postman
 */

router.post("/api/v1/contact/create", createContact);

/**
 * @api {get} /api/v1/contact/get get contact
 * @apiDescription get contact
 * @apiPermissions all user.
 * @apiHeaders {access token}.
 * @apiSuccess {object} get a object contain with a property named data. data is contain with the main math data.
 * @query {req.body} title is the value of title proper
 * @apiError (500) internal server error
 * @apiError (400) bad request
 * @validation {postman} tested by post postman
 * @apiSuccessExample {json} Success-Response:
 * 
 */

router.get("/api/v1/contact/get", getContact);




module.exports = router;