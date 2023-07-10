const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getBlogByCategory,
  getBlogById,
  getBlogsByEmail,
  getBlogsBySearch,
  getLimitedBlogs,
  getLimitedBlogsFooter,
} = require("../controller/blogs/blogs_controller");


const multer = require("multer");

const fs = require("fs");
const path = require("path");
const supabase = require("../config/supabase");
const {
  createBlogs,
  deleteBlogs,
  updateBlogs,
} = require("../controller/blogs/blogs_post");
const { verifyJWT, verifyAdmin } = require("../shared/authorization");

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

router.post("/upload-image", upload.single("image"), async (req, res) => {
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
      .from("blogs") // Replace with your actual bucket name
      .upload(imageFilePath, fileData);

    if (error) {
      console.error(error);
      throw new Error("Failed to upload image");
    }

    // Get the image URL from the uploaded file
    const imageURL = supabase.storage
      .from("blogs") // Replace with your actual bucket name
      .getPublicUrl(imageFilePath);

    res.json({ message: "File uploaded successfully", imageURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload image" });
  } finally {
    // Delete the local file after uploading
    fs.unlinkSync(filePath);
  }
});

/**
 *@api{get} / get all blogs
 *@apiDescription get all blogs by query
 *@apiPermissions all visitor.
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of 2 value first one is data a list of blogs and second one is a number of total blogs.
 *@query {pagenum, dataperpage} pagenum is number of page, dataperpage is total number of data per page;
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/get/by/condition", getAllBlogs);

/**
 *@api{get} / get  3 blogs
 *@apiDescription get 3 recent blogs
 *@apiPermissions all visitor.
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one property called data
 *@query {none}
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/get/recent/limit", getLimitedBlogs);

/**
 *@api{get} / get  2 blogs
 *@apiDescription get 3 recent blogs
 *@apiPermissions all visitor.
 *@apiHeaders {none}.
 *@apiSuccess {array of object} get specific column id,heading,created-at
 *@query {none}
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/get/footer/recent/limit", getLimitedBlogsFooter);

/**
 *@api{get} / get blogs
 *@apiDescription get only 2 blog resent blogs with only two property created_at and heading.
 *@apiPermissions all visitor.
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one property called data
 *@query {category}
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/get/by/search/category", getBlogByCategory);

/**
 *@api{get} / get blogs
 *@apiDescription get blogs by id
 *@apiPermissions all visitor
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one property called data, which is also a object
 *@query {id} blog id
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */

router.get("/details/get/by/:id", getBlogById);

/**
 *@api{get} / get blogs
 *@apiDescription get blogs by search
 *@apiPermissions the user who search for blogs
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one property called data, which is a list search result blogs.
 *@query {search} search text
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/get/by/search", getBlogsBySearch);

/**
 *@api{get} / get  2 blogs
 *@apiDescription get 3 recent blogs
 *@apiPermissions all visitor.
 *@apiHeaders {none}.
 *@apiSuccess {array of object} get specific column id,heading,created-at
 *@query {none}
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/get/footer/recent/limit", getLimitedBlogsFooter);

/**
 *@api{get} / get blogs
 *@apiDescription get only 2 blog resent blogs with only two property created_at and heading.
 *@apiPermissions all visitor.
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one property called data
 *@query {category}
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/get/by/search/category", getBlogByCategory);

/**
 *@api{get} / get blogs
 *@apiDescription get blogs by search
 *@apiPermissions the user who search for blogs
 *@apiHeaders {none}.
 *@apiSuccess {object} a object contain of one property called data, which is a list search result blogs.
 *@query {search} search text
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/get/by/search", getBlogsBySearch);

/**
 *@api{get} / get blogs
 *@apiDescription get blogs by email
 *@apiPermissions only the email authorized user
 *@apiHeaders {access token}.
 *@apiSuccess {object} a object contain of one property called data, which is a list of blogs
 *@query {email} user email
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.get("/get/by/email", getBlogsByEmail); // need update for select specific data field

/**
 *@api{post} / create blogs
 *@apiDescription create blogs
 *@apiPermissions only the email authorized user
 *@apiHeaders {access token}.
 *@apiSuccess {object} a object contain of one property called data, which is a list of blogs
 *@query {email} user email
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.post("/create", verifyJWT, verifyAdmin, createBlogs);

/**
 *@api{post} / update blogs image
 *@apiDescription update blogs image
 *@apiPermissions only admin
 *@apiHeaders {access token}.
 *@apiSuccess {object} a object contain of one property called data, which is a list of blogs
 *@query {email} user email
 *@apiError (500) internal server error
 *@apiError (400) bad request
 *@validation {postman} tested by post postman
 */
router.post("/update/:id", updateBlogs);

/**
 * @api {delete} / delete blogs
 * @apiDescription delete blogs
 * @apiPermissions only the email authorized user
 * @apiHeaders {access token}.
 * @apiSuccess {object} a object contain of one property called data, which is a list of blogs
 * @query {email} user email
 * @apiError (500) internal server error
 * @apiError (400) bad request
 * @validation {postman} tested by post postman
 */

router.delete("/delete/:id", deleteBlogs);

module.exports = router;