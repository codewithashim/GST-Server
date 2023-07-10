const supabase = require("../../config/supabase");

const businessSubCategoryController = {
  async getSubCategoryById(req, res) {
    const { id } = req.params;
    try {
      const { data, error } = await supabase
        .from("business-sub-category")
        .select("*")
        .eq("id", id)
        .single()
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error
    }
  },

  async getBusinessSubCategoryById(req, res) {
    const { categoryid } = req.params;
    try {
      const { data, error } = await supabase
        .from("business-sub-category")
        .select("*")
        .eq("category_id", categoryid);
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json({
        success: true,
        data: data
      });
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error
    }
  },

  async getBusinessSubCategorySearchByTitle(req, res) {
    try {
      const title = req?.query?.title;
      if (title != "") {
        const { data, error } = await supabase 
          .from("business-sub-category")
          .select("*")
          .ilike("title", `%${title}%`); // search
        if (error)
          res.status(500).json({ error: error.message }); // database error
        else res.status(200).send({
          success: true,
          data: data
        }); // send response with data
      } else {
        res.send({
          success: true,
          data: []
        });
      }
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error
    }
  },

  async getSubCategoryForManageCategory(req, res) {
    const { title } = req.query;
    try {
      if (title == "") {
        const { data, error } = await supabase
          .from("business-sub-category")
          .select("*") 
          .order("id", { ascending: false })
          .limit(20);
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.status(200).send({
          success: true,
          data: data
        });         
      } else {
        let { data: searchData, error: err } = await supabase
          .from("business-sub-category")
          .select("*")
          .ilike("title", `%${title}%`); // search
        if (err) {
          res.status(500).json({ error: err.message }); // database error
        }
        res.status(200).send({
          success: true,
          data: searchData
        });
      }
    } catch (error) {
      res.status(400).json({ error: error.message }); // server error
    }
  },

  async createSubCategory (req, res) {
    const { title, category_id } = req.body;
    try {
        const { data, error } = await supabase
            .from("business-sub-category")
            .insert([{ title, category_id }]);

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).send({
            success: true,
            message: "SubCategory Created Successfully",
            data: data,
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "SubCategory Creation Failed",
            data: error,
        });
    }
},

async updateSubCategory (req, res) {
    const { id, title, category_id } = req.body;

    try {
        const { data, error } = await supabase
            .from("business-sub-category")
            .update({ title, category_id })
            .match({ id });

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).send({
            success: true,
            message: "SubCategory Updated Successfully",
            data: data,
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "SubCategory Updation Failed",
            data: error,
        });
    }
},

async deleteSubCategory (req, res) {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from("business-sub-category")
            .delete()
            .eq("id", id);

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).send({
            success: true,
            message: "SubCategory Deleted Successfully",
            data: data
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "SubCategory Deletion Failed",
            data: error,
        });
    }
},
};

module.exports = businessSubCategoryController;
