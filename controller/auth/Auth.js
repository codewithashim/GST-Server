const express = require("express");
const app = express();
const supabase = require("../../config/supabase");
const dotenv = require("dotenv");
dotenv.config();

const startApp = async (req, res) => {
  res.send("GST Api Server Is Running!");
};
const getAllUsers = async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  res.json(data);
};

const getUserByEmail = async (req, res) => {
  const email = req.params.email;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
  res.status(200).json(data);
};

const getAdvertiserByEmail = async (req, res) => {
  const email = req.params.email;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
    if(error){
      console.log(error?.message)
    }
  res.status(200).json({ isAdvertiser: data[0]?.role === "advertiser" });
};

const getAdminByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error retrieving data" });
    }
    res.status(200).json({
      success: true,
      message: "data get successfully",
      isAdmin: data[0]?.role === "admin"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get data",
      data: error,
    });
  }
};

const getUserRoleByEmail = async (req, res) => {
  const email = req.params.email;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
  res.status(200).json({ isUser: data[0]?.role === "user" });
};

// ============ Create User <Codewithashim> ============

const createUser = async (req, res) => {
  try {
    const email = req?.body?.email;
    const role = req?.body?.role;
    const firstName = req?.body?.firstName;
    const lastName = req?.body?.lastName;
    const phone = req?.body?.phone;
    const password = req?.body?.password;
    const { data, error } = await supabase.from("users").insert([
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        role: role,
        password: password,
      },
    ]);
    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User Creation Failed",
      data: error,
    });
  }
};

const getAdvertiserAboutByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const { data, error } = await supabase
      .from("about-us")
      .select("*")
      .eq("email", email);
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error retrieving data" });
    }
    res.status(200).json({
      success: true,
      message: "data get successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get data",
      data: error,
    });
  }
};

const getAdvertiserAdditionalLocationByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const { data, error } = await supabase
      .from("additional-location")
      .select("*")
      .eq("email", email);
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error retrieving data" });
    }
    res.status(200).json({
      success: true,
      message: "data get successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get data",
      data: error,
    });
  }
};

const getAdvertiserExperiencesByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .eq("email", email);
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error retrieving data" });
    }
    res.status(200).json({
      success: true,
      message: "data get successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get data",
      data: error,
    });
  }
};

const getAdvertiserFaqByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const { data, error } = await supabase
      .from("faq")
      .select("*")
      .eq("email", email);
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error retrieving data" });
    }
    res.status(200).json({
      success: true,
      message: "data get successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get data",
      data: error,
    });
  }
};

const getAdvertiserProductServicesByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const { data, error } = await supabase
      .from("product-services")
      .select("*")
      .eq("email", email);
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error retrieving data" });
    }
    res.status(200).json({
      success: true,
      message: "data get successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get data",
      data: error,
    });
  }
};

module.exports = {
  startApp,
  getUserByEmail,
  getAllUsers,
  getAdvertiserByEmail,
  getAdminByEmail,
  getUserRoleByEmail,
  createUser,
  getAdvertiserAboutByEmail,
  getAdvertiserAdditionalLocationByEmail,
  getAdvertiserExperiencesByEmail,
  getAdvertiserFaqByEmail,
  getAdvertiserProductServicesByEmail
};
