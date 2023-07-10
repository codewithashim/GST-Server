const supabase = require("../../config/supabase");

const createContact = async (req, res) => {
    const { firstName, lastName, contactEmail, phoneNumber,
        businessName, businessCategory, postcode, businessWebsite, subject, message
    } = req.body;
    try {
        const { data, error } = await supabase
            .from("contact")
            .insert([{ firstName, lastName, contactEmail, phoneNumber, businessName, businessCategory, postcode, businessWebsite, subject, message }]);

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).send({
            success: true,
            message: "User Created Successfully",
            data: data,
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "User Creation Failed",
            data: error,
        });
    }
}

const getContact = async (req, res) => {
    try {
        const { data, error } = await supabase.from("contact-us").select("*");

        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).send({
            success: true,
            message: "Contact Get Successfully",
            data: data,
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "Contact Get Failed",
            data: error,
        });
    }
}


module.exports = {
    createContact,
    getContact
}
