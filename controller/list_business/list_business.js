const supabase = require("../../config/supabase");

const listBusinessController = {
  async getAllListBusiness(req, res) {
    try {
      const { data, error } = await supabase
        .from("list-business")
        .select("businessName")
        .order("created_at", { ascending: false }); // sort by recent
      if (error)
        res.status(500).json({ error: error.message }); // database error
      else
        res.status(200).send({
          success: true,
          data: data,
        }); // send response with data
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  async getBusinessListByEmail(req, res) {
    try {
      const email = req?.query?.email; // take email from query
      const { data, error } = await supabase
        .from("list-business")
        .select("*") // select field
        .eq("email", email) // filter with email
        .order("created_at", { ascending: false }); // sort by recent
      if (error)
        res.status(500).json({ error: error.message }); // database error
      else
        res.status(200).send({
          success: true,
          data: data,
        }); // send response with data
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error
    }
  },

  async getBusinessListById(req, res) {
    try {
      const id = req?.params?.id;
      const { data, error } = await supabase
        .from("list-business")
        .select("*") // select field
        .eq("id", id) // filter with email 
        .single(); // get singe value
      if (error)
        res.status(500).json({ error: error.message }); // database error 
      else
        res.status(200).send({
          success: true,
          data: data,
        }); // send response with data
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error
    }
  },

  async getBusinessListBySubCategory(req, res) {
    const subcategory = req?.params?.subcategory;
    try {
      const { data, error } = await supabase
        .from("list-business") // select field
        .select("*")
        .eq("businessSubCategory", subcategory); // filter with subcategory
      if (error) {
        return res.status(500).json({ error: error.message }); // database error
      }
      res.status(200).send({
        success: true,
        data: data,
      }); // send response with data
    } catch (error) {
      res.status(400).send({ message: error.message }); // server error
    }
  },

  async searchBusinessList(req, res) {
    const searchQuery = req.query?.search;
    try {
      if (searchQuery != "") {
        const { data, error } = await supabase
          .from("list-business")
          .select("*")
          .or(
            `businessName.ilike.%${searchQuery}%,businessCategory.ilike.%${searchQuery}%,businessSubCategory.ilike.%${searchQuery}%` // filer blogs
          );
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.status(200).send({
          success: true,
          data: data,
        });
      }
      if (searchQuery == "") {
        res.status(200).send({
          success: true,
          data: [],
        });
      }
    } catch (error) {
      res.status(400).send({ message: "Internal server error" });
    }
  },

  async searchBusinessListForManage(req, res) {
    const searchQuery = req.query?.search;
    try {
      if (searchQuery != "") {
        const { data, error } = await supabase
          .from("list-business")
          .select("*")
          .or(
            `businessName.ilike.%${searchQuery}%,businessCategory.ilike.%${searchQuery}%,businessSubCategory.ilike.%${searchQuery}%` // filer blogs
          );
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.status(200).send({
          success: true,
          data: data,
        });
      }
      if (searchQuery == "") {
        const d = await supabase
          .from("list-business")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20);
        if (d.error) {
          console.error(error);
        }
        res.status(200).send({
          success: true,
          data: d?.data,
        });
      }
    } catch (error) {
      res.status(400).send({ message: "Internal server error" });
    }
  },

  async addListingCreate (req, res){
    const { ABN,
      businessName,
      businessAddress,
      listingPhone,
      businessCategory,
      businessSubCategory,
      website,
      contactEmail,
      email,
      addOneLatitude,
      addOneLongitude } = req.body;
  
    try {
      const { data, error } = await supabase
        .from("list-business")
        .insert({
          ABN,
          businessName,
          businessAddress,
          listingPhone,
          businessCategory,
          businessSubCategory,
          website,
          contactEmail,
          email,
          addOneLatitude,
          addOneLongitude
        });
  
      if (error) {
        return res.status(500).json({ error: error.message });
      }
  
      res.status(200).send({
        success: true,
        message: "Blogs Created Successfully",
        data: data,
      });
  
    } catch (error) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Blogs Creation Failed",
        data: error,
      });
    }
  },

  async updateAddListing (req, res) {
    const { id } = req.params;
    const { ABN,
      businessName,
      businessAddress,
      listingPhone,
      businessCategory,
      businessSubCategory,
      website,
      contactEmail,
      email,
      addOneLatitude,
      addOneLongitude } = req.body;
  
    try {
      const { data, error } = await supabase
        .from("list-business")
        .update({
          ABN,
          businessName,
          businessAddress,
          listingPhone,
          businessCategory,
          businessSubCategory,
          website,
          contactEmail,
          email,
          addOneLatitude,
          addOneLongitude
        })
        .eq("id", id);
  
      if (error) {
        return res.status(500).json({ error: error.message });
      }
  
      res.status(200).send({
        success: true,
        message: "Blogs Updated Successfully",
        data: data,
      });
  
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Blogs Deletion Failed",
        data: error,
      });
    }
  },
  
  async deleteAddListing (req, res) {
    const { id } = req.params;
    try {
      const { data, error } = await supabase
        .from("list-business")
        .delete()
        .eq("id", id);
      if (error) {
        return res.status(500).json({ error: error.message });
      }
  
      res.status(200).send({
        success: true,
        message: "Blogs Deleted Successfully",
        data: data,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Blogs Deletion Failed",
        data: error,
      });
    }
  }
};


module.exports = listBusinessController;
