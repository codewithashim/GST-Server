const express = require('express');
const router = express.Router();
const {
  getUserByEmail,
  getAllUsers,
  getAdminByEmail,
  getUserRoleByEmail,
  createUser,
  getAdvertiserAboutByEmail,
  getAdvertiserAdditionalLocationByEmail,
  getAdvertiserExperiencesByEmail,
  getAdvertiserFaqByEmail,
  getAdvertiserProductServicesByEmail,
  getAdvertiserByEmail,
} = require("../controller/auth/Auth.js");


/** HTTP Reqeust */
router.get("/users/v1/all", getAllUsers); // not use
router.get("/users/v1/:email", getUserByEmail); // not use
router.get("/users/v1/advertiser/:email", getAdvertiserByEmail); // verified
router.get("/users/v1/admin/:email", getAdminByEmail); // verified
router.get("/users/user/v1/:email", getUserRoleByEmail); // not use

 /**
 *@api{post} / post create user
 *@apiDescription create blogs.
 *@apiPermissions  only Admin.
 *@apiHeaders {access token}.
 *@apiSuccess {object} get a object contain with a property data, data is the main response value
 *@query {none}
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.post("/users/v1/create", createUser); 

/**
 *@api{get} / get about
 *@apiDescription get about by email
 *@apiPermissions only the email authorized user(advertiser)
 *@apiHeaders {access token}.
 *@apiSuccess {object} a object contain of one property called data, which is a list of about
 *@query {email} user email
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
 router.get("/users/v1/get/advertiser/about/by/:email", getAdvertiserAboutByEmail); 

 /**
 *@api{get} / get about
 *@apiDescription get about by email
 *@apiPermissions only the email authorized user(advertiser)
 *@apiHeaders {access token}.
 *@apiSuccess {object} a object contain of one property called data, which is a list of about
 *@query {email} user email
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
 router.get("/users/v1/get/advertiser/additional-location/by/:email", getAdvertiserAdditionalLocationByEmail); 

 /**
 *@api{get} / get about
 *@apiDescription get about by email
 *@apiPermissions only the email authorized user(advertiser)
 *@apiHeaders {access token}.
 *@apiSuccess {object} a object contain of one property called data, which is a list of about
 *@query {email} user email
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
 router.get("/users/v1/get/advertiser/experiences/by/:email", getAdvertiserExperiencesByEmail); 

 /**
 *@api{get} / get about
 *@apiDescription get about by email
 *@apiPermissions only the email authorized user(advertiser)
 *@apiHeaders {access token}.
 *@apiSuccess {object} a object contain of one property called data, which is a list of about
 *@query {email} user email
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
 router.get("/users/v1/get/advertiser/faq/by/:email", getAdvertiserFaqByEmail); 

 /**
 *@api{get} / get about
 *@apiDescription get about by email
 *@apiPermissions only the email authorized user(advertiser)
 *@apiHeaders {access token}.
 *@apiSuccess {object} a object contain of one property called data, which is a list of about
 *@query {email} user email
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
 router.get("/users/v1/get/advertiser/product-services/by/:email", getAdvertiserProductServicesByEmail); 

module.exports = router;