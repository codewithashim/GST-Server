const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

// verifyJWT
 function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Unauthorized access");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

// verifyAdmin
 const verifyAdmin = async (req, res, next) => {
  const decodedEmail = req.decoded.email;
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", decodedEmail);

    if (error) {
      return res.status(500).send({ message: "Error retrieving user data" });
    }

    const user = users[0];

    if (!user || user.role !== "admin") {
      return res.status(403).send({ message: "Forbidden access" });
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: "Error verifying admin access" });
  }
};

module.exports = { verifyJWT, verifyAdmin };