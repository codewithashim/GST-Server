const supabase = require("../../config/supabase");

const businessCategoryController = {
  async getAllBusinessCategory(req, res) {
    try {
      const { data, error } = await supabase
        .from("business-category")
        .select("*") // select field
        .order("created_at", { ascending: false }); // sort by recent
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
  async getBusinessCategoryByTitle(req, res) {
    try {
      const title = req?.params?.title;
      const { data, error } = await supabase
      .from('business-category')
      .select('images')
      .eq('title', title)
      .single()
      if (error){
        res.status(500).json({ error: error.message }); // database error
    }else { res.status(200).send( { 
      success: true,
      data:data
    } );} // send response with data
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error
    }
  },
  async getBusinessCategorySearchByTitle(req, res) {
    try {
      const title = req?.query?.title;
      const { data, error } = await supabase 
        .from("business-category")
        .select("*")
        .ilike("title", `%${title}%`) // search  
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
  async getBusinessCategoryById(req, res) {
    try {
      const id = req?.params?.id;
      const { data, error } = await supabase
        .from("business-category")
        .select("images, title")
        .eq("id", id)
        .single();
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
};

module.exports = businessCategoryController;
