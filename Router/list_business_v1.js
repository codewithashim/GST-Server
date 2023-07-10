const express = require("express");
const router = express.Router();
const {
  getAllListBusiness,
  getBusinessListByEmail,
  getBusinessListById,
  getBusinessListBySubCategory,
  searchBusinessListForManage,
  searchBusinessList,
  deleteAddListing,
  updateAddListing,
  addListingCreate,
} = require("../controller/list_business/list_business");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const supabase = require("../config/supabase");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploadsImages";
    fs.mkdirSync(uploadPath, { recursive: true }); // Create the directory if it doesn't exist
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/api/v1/list-buissness/upload-image",
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    // Access uploaded file details
    const { filename, path: filePath } = req.file;
    const imageFilePath = path.join("uploadsImages", filename);

    // Read the file data
    const fileData = fs.readFileSync(filePath);

    try {
      // Upload the file to Supabase storage bucket
      const { data, error } = await supabase.storage
        .from("addlisting") // Replace with your actual bucket name
        .upload(imageFilePath, fileData);

      if (error) {
        console.error(error);
        throw new Error("Failed to upload image");
      }

      // Get the image URL from the uploaded file
      const imageURL = supabase.storage
        .from("addlisting") // Replace with your actual bucket name
        .getPublicUrl(imageFilePath);
      res.json({ message: "File uploaded successfully", imageURL });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload image" });
    } finally {
      // Delete the local file after uploading
      fs.unlinkSync(filePath);
    }
  }
);

/**
 *@api{get} / get list business
 *@apiDescription get all list business
 *@apiPermissions all visitor.
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one value called data with a list of all business list
 *@query {none}
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */

router.get("/api/v1/list-business/get/all", getAllListBusiness);

/**
 *@api{get} / get list business
 *@apiDescription get list business by email
 *@apiPermissions authorized user
 *@apiHeaders {access token}.
 *@apiSuccess {object} a object contain of one value called data with a list of all business list
 *@query {none}
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/api/v1/list-business/get/by/email", getBusinessListByEmail);

/**
 *@api{get} / get list business
 *@apiDescription get list business by id
 *@apiPermissions all valid visitor
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one value called data which is also business list
 *@query {id} list business id
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/api/v1/list-business/get/single/:id", getBusinessListById);

/**
 *@api{get} / get list business
 *@apiDescription get list business by subcategory
 *@apiPermissions all valid visitor
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one value called data which is also business list
 *@query {subcategory} list business id
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get(
  "/api/vi/list-business/get/by/subcategory/:subcategory",
  getBusinessListBySubCategory
);

/**
 *@api{get} / get list business
 *@apiDescription get list business by business category, businessName, business subcategory
 *@apiPermissions all visitor
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one value called data which is also business list
 *@query {business category, businessName, business subcategory} list business
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/api/vi/list-business/get/search/by/search", searchBusinessList);

/**
 *@api{get} / get list business
 *@apiDescription get list business by business category, businessName, business subcategory for buniness management
 *@apiPermissions all  visitor
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one value called data which is also business list
 *@query {business category, businessName, business subcategory} list business
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get(
  "/api/vi/list-business/manage/get/search/by/search",
  searchBusinessListForManage
);

/**
 *@api{delete} / get list business
 *@apiDescription get all list business
 *@apiPermissions all visitor.
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one value called data with a list of all business list
 *@query {none}
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.delete("/api/v1/list-business/delete/:id", deleteAddListing);

/**
 *@api{put} / get list business
 *@apiDescription get all list business
 *@apiPermissions all visitor.
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one value called data with a list of all business list
 *@query {none}
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */

router.put("/api/v1/list-business/update/:id", updateAddListing);

/**
 *@api{post} / get list business
 *@apiDescription get all list business
 *@apiPermissions all visitor.
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one value called data with a list of all business list
 *@query {none}
 *@apiError (500) internal server error
 *@apiError (400) bad request
 */

router.post("/api/v1/list-business/create", addListingCreate);

module.exports = router;
