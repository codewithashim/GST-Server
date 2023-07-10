const supabase = require("../../config/supabase");

const blogController = {
  async getAllBlogs(req, res) {
    try {
      // page query
      const pageNum = req?.query?.pagenum ? parseInt(req?.query?.pagenum) : 0 ; // page for skip data
      const blogPerPage = req?.query?.dataperpage
        ? parseInt(req?.query?.dataperpage)
        : 6; // total data per request
      // length of all data
      const length = await supabase
        .from("new_blogs")
        .select("*", { count: "exact", head: true }); // get the number of total data
      //get data by condition
      const { data: blogs, error } = await supabase
        .from("new_blogs")
        .select(`id, created_at, heading, images, business_category`) // select specific field
        .range(pageNum, pageNum * blogPerPage) // give the range
        .limit(blogPerPage) // add data limit
        .order("created_at", { ascending: false }); // sort by recent
      if (error) {
        res.status(500).json({ error: error.message }); // database error
      } else {
        res.status(200).json({ 
          success: true,
          data: blogs, 
          count: 
          length?.count 
        });
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },

  async getLimitedBlogs(req, res) {
    try {
      // request to the database for blogs
      const { data: blogs, error } = await supabase
        .from("new_blogs")
        .select(`id, created_at, heading, images, business_category`) // select only specific field
        .order("created_at", { ascending: false }) // sort by recent
        .limit(3); // add limit
      if (error)
        res.status(500).json({ error: error.message }); // database error
      else res.status(200).send({ 
        success: true,
        data: blogs 
      }); // send response with data
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error
    }
  },

  async getBlogByCategory(req, res) {
    try {
      // page query 
      const category = req?.query?.category;
      // request to the database for blogs
      const { data: blogs, error } = await supabase
      .from("new_blogs")
      .select(`id, created_at, heading, images, business_category`)
      .eq("business_category", category)// add limit
      if (error)
        res.status(500).json({ error: error.message }); // database error
      else res.status(200).send({ 
        success: true, 
        data: blogs 
      }); // send response with data
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error
    }
  },
  async getBlogsByEmail(req, res) {
    try {
      const email = req?.query?.email; // get user email
      const { data: blogs, error } = await supabase
        .from("new_blogs")
        .select("*") // select all field
        .eq("email", email) // filer by email
        .order("created_at", { ascending: false }); // sort by resent blogs
      if (error)
        res.status(500).json({ error: error.message }); // database error
      else res.status(200).send({ 
        success: true,
        data: blogs 
      }); // send response with data
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error
    }
  },
  async getBlogById(req, res) {
    try {
      const id = req.params.id; // take id from query
      const { data, error } = await supabase
        .from("new_blogs")
        .select("created_at, heading, descriptions, business_category") // select specific field
        .eq("id", id) // filer by id
        .single(); // get singe data
      if (error)
        res.status(500).json({ error: error.message }); // database error
      else res.status(200).send({
        success: true,
        data:data
      }); // send response with data
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error 
    }
  },
  async getBlogsBySearch(req, res) {
    try {
      const searchQuery = req?.query?.search; // search text
      const { data, error } = await supabase
        .from("new_blogs")
        .select("id, heading, business_category, created_at, images") // select field
        .or(
          `heading.ilike.%${searchQuery}%,business_category.ilike.%${searchQuery}%` // filer blogs
        );
      if (error)
        res.status(500).json({ error: error.message }); // database error
      else res.status(200).send({ 
        success: true,
        data: data 
      }); // send response with data
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error
    }
  },

  async getLimitedBlogsFooter (req, res) {
    try {
      const { data: blogs, error } = await supabase
    .from("new_blogs")
    .select(`id, created_at, heading`)
    .order("created_at", { ascending: false })
    .limit(2);
    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(200).json({
          success: true,
          data:blogs
        });
    }
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error
    }
  }
};

module.exports = blogController;
