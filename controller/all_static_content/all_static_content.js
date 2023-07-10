const supabase = require("../../config/supabase");

const allStaticContentController = {
  async updateSpecificContent(req, res) {
    try {
      console.log(
        "🚀 ~ file: all_static_content.js:5 ~ updateSpecificContent ~ req:",
        req
      );
      const { content, property, key } = await req?.body; // retrieve data from body
      // check data validation
      if (
        !content ||
        typeof content !== "string" ||
        !property ||
        typeof property !== "string" ||
        !key ||
        typeof key !== "string"
      ) {
        // if there is error send error response
        return res.status(400).send({ error: "data is invalid" });
      }
      const id = "a9b19466-9924-412d-b874-b7994166c638";
      const { data: existingData, error: existDataError } = await supabase // get the existing data
        .from("all_static_content")
        .select(key)
        .eq("id", id)
        .single();
      if (existDataError) {
        // data do not exist send error response
        return res.status(400).send({ error: existDataError?.message });
      }
      const existingContent = existingData?.[key]; // get existing data
      existingContent[property] = content; // set new value in the specific property
      const body = { id, [key]: existingContent }; // create new data for insert
      const { data, error } = await supabase // finally update data
        .from("all_static_content")
        .upsert(body)
        .select(key)
        .single();
      if (error)
        res.status(500).json({ error: error.message }); // database error
      else res.status(200).send({ data: data?.[key]?.[property] }); // send response with data
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error
    }
  },
  async getSpecificContent(req, res) {
    try {
      const pagename = req?.query?.pagename; // get data from dadatabse by page name
      const { data, error } = await supabase // get all data from database
        .from("all_static_content")
        .select(pagename)
        .single();
      if (error)
        res.status(500).json({ error: error.message }); // database error
      else res.status(200).send(data); // send response with data
    } catch (error) {
      res.status(400).send({ error: error.message }); // server error
    }
  },
};
/**
 * home_page: ["main heading", "get quotes"]
 * advertise_page ["heading", "sub_heading"]
 * blogs_page ["heading", "sub_heading"]
 * about_us_page ["heading", "sub_heading", "content"]
 * get_quotes_page ["heading", "sub_heading"]
 * footer_page ["copyRight"]
 */

module.exports = allStaticContentController;
