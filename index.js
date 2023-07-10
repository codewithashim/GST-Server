const express = require("express");
const cors = require("cors");
require("dotenv").config();
const appRoute = require("./Router/user.router.js");
const supabase = require("./config/supabase.js");
const jwt = require("jsonwebtoken");
const ContactRouter = require("./router/contact.router");
let app = express();
const PORT = process.env.PORT || 8080;

// import all router
const blogs = require("./router/blogs_router_v1.js");
const listBusiness = require("./router/list_business_v1");
const allStaticContent = require("./router/all_static_content.js");
const business_category = require("./router/business_category_v1.js");
const business_sub_category = require("./Router/business_sub_category_v1")
const geocode = require("./router/geocode.router.js")

// white listed domain. Only the white listed domain can access the public api.
var whitelist = ["http://localhost:3000", "https://makemylisting.com.au"];
// cors option
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// middleware
app.use(cors());

app.use(express.json());

app.get('/api/jwt', async (req, res) => {
  const email = req.query.email;
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (error) {
    return res.status(500).send({ message: 'Error retrieving user data' });
  }

  const user = users[0];

  if (user) {
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN);
    return res.send({ accessToken: token });
  }

  res.status(403).send({ accessToken: '' });
});

/** routes */
app.use("/api", appRoute);
app.use("/api/v1/blogs", blogs);
app.use(listBusiness);
app.use(allStaticContent);
app.use(business_category);
app.use("/api/v1/business-sub-category", business_sub_category)
app.use(ContactRouter);
app.use(geocode)


// root route
app.use("/", (req, res) => {
  res.status(200).send("GST Api Server Is Running !!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});