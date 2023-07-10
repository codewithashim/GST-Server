const {
  getAllBusinessCategory,
  getBusinessCategoryByTitle,
  getBusinessCategoryById,
  getBusinessCategorySearchByTitle,
} = require("../controller/business_category/business_category");

const router = require("express").Router();

/**
 *@api{get} / get business-category
 *@apiDescription get all list business
 *@apiPermissions all visitor.
 *@apiHeaders {none}.
 *@apiSuccess {object} get a list of business category
 *@query {none}
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/api/v1/business-category/get/all", getAllBusinessCategory);

/**
 *@api{get} / get business category
 *@apiDescription get object with first match data.  need match full title. giving parameter should be match with full title.
 *@apiPermissions all user.
 *@apiHeaders {access token}.
 *@apiSuccess {object} get a object contain with a property data, data is the main response value
 *@query {title} title is the value of title proper
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/api/v1/business-category/get/by/title/:title", getBusinessCategoryByTitle);

/**
 *@api{get} / get business category
 *@apiDescription get object with first match data. No need match full title. But giving parameter should be match with a small part or full title.
 *@apiPermissions all user.
 *@apiHeaders {access token}.
 *@apiSuccess {object} get a object contain with a property data, data is the main response value
 *@query {title} title is the value of title proper
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
 router.get("/api/v1/business-category/get/search/by/title", getBusinessCategorySearchByTitle);

/**
 *@api{get} / get list business
 *@apiDescription get a object contain with a property named data. data is contain with the main math data.
 *@apiPermissions all user.
 *@apiHeaders {access token}.
 *@apiSuccess {id} specific data id.
 *@query {title} title is the value of title proper
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/api/v1/business-category/get/by/:id", getBusinessCategoryById);

module.exports = router;
