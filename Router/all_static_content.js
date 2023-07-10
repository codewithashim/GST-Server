const {
  updateSpecificContent,
  getSpecificContent,
} = require("../controller/all_static_content/all_static_content");

const router = require("express").Router();

/**
 *@api{get} / update content value
 *@apiDescription update content value
 *@apiPermissions only admin.
 *@apiHeaders {access token}.
 *@apiSuccess {object} get a object contain with a value called data.
 *@query {none}
 *@body {content, property, key} content, is the data what you want to insert. property is the property which property you want to update. and the key is the colum where the content is exist.
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@apiError (400) data is invalid
 *@validation {postman} tested by post postman
 */

router.put(
  "/api/v1/all-static-content/update/property",
  /* there will be middle for check is the user is a admin */
  updateSpecificContent
);

/**
 *@api{get} / get content value
 *@apiDescription get content value by  page name
 *@apiPermissions only admin.
 *@apiHeaders {access token}.
 *@apiSuccess {object} get a object contain with a value called data.
 *@query {pagename} pagename is the specific data key
 *@body {none}.
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@apiError (400) data is invalid
 *@validation {postman} tested by post postman
 */
router.get(
  "/api/v1/all-static-content/get/pagename",
  /* there will be middle for check is the user is a admin */
  getSpecificContent
);

module.exports = router;
