const { getBusinessSubCategoryById, 
    getBusinessSubCategorySearchByTitle, 
    getSubCategoryForManageCategory, 
    getSubCategoryById, 
    createSubCategory,
    updateSubCategory, 
    deleteSubCategory 
} = require("../controller/business_sub_category/business_sub_category");

const router = require("express").Router();

/**
 *@api{get} / get business-sub-category
 *@apiDescription get data by match id.
 *@apiPermissions all visitor.
 *@apiHeaders {none}.
 *@apiSuccess {object} get a list of business id
 *@query {id}
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman 
 */
 router.get("/get/by/id/:id", getSubCategoryById);

/**
 *@api{get} / get business-sub-category
 *@apiDescription get data by match categoryid.
 *@apiPermissions all visitor.
 *@apiHeaders {none}.
 *@apiSuccess {object} get a list of business sub categoryid
 *@query {categoryid}c
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman 
 */
 router.get("/get/by/:categoryid", getBusinessSubCategoryById);

/**
 *@api{get} / get business sub category
 *@apiDescription get object with first match data. No need match full title. But giving parameter should be match with a small part or full title.
 *@apiPermissions all user.
 *@apiHeaders {access token}.
 *@apiSuccess {object} get a object contain with a property data, data is the main response value
 *@query {title} title is the value of title proper
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
 router.get("/get/search/by/title", getBusinessSubCategorySearchByTitle);

 /**
 *@api{get} / get business sub category for manage
 *@apiDescription get object with first match data. No need match full title. But giving parameter should be match with a small part or full title.
 *@apiPermissions all only Admin.
 *@apiHeaders {access token}.
 *@apiSuccess {object} get a object contain with a property data, data is the main response value
 *@query {title} title is the value of title proper
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
 router.get("/manage-category/get/search/by/title", getSubCategoryForManageCategory);

 /** 
 * @api {post} /api/v1/subCategory/create create subCategory
 * @apiDescription create subCategory
 *  @apiPermissions all user.
 * @apiHeaders {access token}.
 * @apiSuccess {object} get a object contain with a property named data. data is contain with the main math data.
 * @query {req.body} title is the value of title proper
 * @apiError (500) internal server error
 * @apiError (400) bad request
 * @validation {postman} tested by post postman
 * @apiSuccessExample {json} Success-Response:
 *  
*/

router.post("/api/v1/subCategory/create", createSubCategory);

/**
 * @api {put} Success-Response: Success
 * @apiDescription update subCategory
 * @apiPermissions all user.
 * @apiHeaders {access token}.
 * @apiSuccess {object} get a object contain with a property named data. data is contain with the main math data.
 * @query {req.body} title is the value of title proper
 * @apiError (500) internal server error
 * @apiError (400) bad request
 * @validation {postman} tested by post postman
 * @apiSuccessExample {json} Success-Response:
 */

router.patch("/update", updateSubCategory);

/**
 * @api {delete} /api/v1/subCategory/delete delete subCategory
 * @apiDescription delete subCategory
 * @apiPermissions all user.
 * @apiHeaders {access token}.
 * @apiSuccess {object} get a object contain with a property named data. data is contain with the main math data.
 * @query {req.body} title is the value of title proper
 * @apiError (500) internal server error
 * @apiError (400) bad request
 * @validation {postman} tested by post postman
 * @apiSuccessExample {json} Success-Response:
 */

router.delete("/delete/:id", deleteSubCategory);

 module.exports = router;