const express = require('express')
const router = express.Router();
const axios = require('axios');

router.get('/api/google/geocode', async (req, res) => {
    const lat = req?.query?.lat;
    const lng = req?.query?.lng;
    
    try {
        const {data} = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            {
              params: {
                latlng: `${lat},${lng}`,
                key: process.env.PUBLIC_GEO_KEY,
              },
            }
          );
    
          if (data.status === "OK") {
            res.status(200).send({
                success: true,
                message: "geocode get Successfully",
                data: data,
              });
          } else {
            console.log("trow error");
          }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to fetch data from the API',
            data: error,
          });
    }
  });

  router.get('/api/google/libraries/places', async (req, res) => {
    try{
      const {data}= await axios.get(`https://maps.googleapis.com/maps/api/js?key=PUBLIC_GEO_KEY=AIzaSyAOZgtD9HVEGXu34ks7oADFXORHAZB1NcY&libraries=places`)
      if(data){
        res.status(200).send({data});
      }else{

      }
    }catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to fetch data from the API',
        data: error,
      });
    }
  })

  module.exports= router