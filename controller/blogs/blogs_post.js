const supabase = require("../../config/supabase");
const imageCompression = require('browser-image-compression');


const createBlogs = async (req, res) => {
  const {
    heading,
    email,
    descriptions,
    business_category,
    card_description,
    metaTag,
    metaTitle,
    images
  } = req.body;
  try {
    const { data, error } = await supabase
      .from("new_blogs")
      .insert([
        {
          heading,
          email,
          images,
          business_category,
          card_description,
          descriptions,
          metaTag,
          metaTitle,
        },
      ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).send({
      success: true,
      message: "Blogs Created Successfully",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Blogs Creation Failed",
      data: error,
    });
  }
};

const updateBlogs = (req, res) => {
  const { id } = req.params;
  const { heading, email, descriptions, business_category, card_description, metaTag, metaTitle } = req.body;

  supabase
    .from("new_blogs")
    .update({
      heading,
      email,
      descriptions,
      business_category,
      card_description,
      metaTag,
      metaTitle,
    })
    .eq("id", id)
    .then((data) => {
      res.status(200).send({
        success: true,
        message: "Blogs Updated Successfully",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Blogs Updation Failed",
        data: error,
      });
    });
}

const deleteBlogs = (req, res) => {
  const { id } = req.params;
  supabase
    .from("new_blogs")
    .delete()
    .eq("id", id)
    .then((data) => {
      res.status(200).send({
        success: true,
        message: "Blogs Deleted Successfully",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Blogs Deletion Failed",
        data: error,
      });
    });
}


module.exports = {
  createBlogs,
  deleteBlogs,
  updateBlogs,
};
