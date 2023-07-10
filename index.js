const express = require("express");
const cors = require("cors");
require("dotenv").config();
const supabase = require("./config/supabase.js");
const jwt = require("jsonwebtoken");
let app = express();
const PORT = process.env.PORT || 8080;

// Import All Router
const BlogRouter = require("./Router/blogs_router_v1.js");
const ListBusinessRouter = require("./Router/list_business_v1.js");
const AllStaticContentRouter = require("./Router/all_static_content.js");
const BusinessCategoryRouter = require("./Router/business_category_v1.js");
const BusinessSubCategoryRouter = require("./Router/business_sub_category_v1.js");
const ContactRouter = require("./Router/contact_router.js");
const GeocodeRouter = require("./Router/geocode_router.js");
const UserRouter = require("./Router/user_router.js"); 

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

// Middleware
app.use("/api",UserRouter);
app.use("/api/v1/blogs", BlogRouter);
app.use("/api/v1/business-sub-category", BusinessSubCategoryRouter);
app.use(ListBusinessRouter);
app.use(AllStaticContentRouter);
app.use(BusinessCategoryRouter);
app.use(ContactRouter);
app.use(GeocodeRouter);

// root route
app.use("/", (req, res) => {
  res.status(200).send("GST Api Server Is Running !!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});