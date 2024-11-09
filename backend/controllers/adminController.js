import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import multer from "multer";
import jwt from "jsonwebtoken";

const upload = multer({ dest: "uploads/" });

// API for adding doctor
const addDoctor = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("File received:", req.file);

    try {
        const { name, email, password, speciality, degree, experience, about, fee, address } = req.body;
        const imageFile = req.file;

        // Check for missing image file
        if (!imageFile) {
            console.log("Error: Image file missing.");
            return res.json({ success: false, message: "Image file missing" });
        }

        // Checking for all required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fee || !address) {
            console.log("Error: Missing details.");
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validating Email Format
        if (!validator.isEmail(email)) {
            console.log("Error: Invalid email format.");
            return res.json({ success: false, message: "Please Enter a valid email" });
        }

        // Validating password
        if (password.length < 8) {
            console.log("Error: Weak password.");
            return res.json({ success: false, message: "Please Enter a strong password" });
        }

        // Hashing doctor password
        console.log("Hashing password...");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary only if it exists
        let imageUrl = null
        if (imageFile) {
            console.log("Uploading image to Cloudinary...");
            try {
                const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
                imageUrl = imageUpload.secure_url;
            } catch (error) {
                console.log("Cloudinary upload error:", error);
                return res.json({ success: false, message: "Image upload failed" });
            }
        }
        // Preparing doctor data
        console.log("Preparing doctor data...");
        // Parsing address JSON string to an object
        const addressObj = JSON.parse(address);
        console.log('Parsed address: ', addressObj);

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fee,
            address: addressObj,  
            date: Date.now()
        };


        // Saving new doctor
        console.log("Saving doctor to database...");
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        console.log("Doctor saved successfully.");

        // Response
        res.json({ success: true, message: "Doctor Added" });

    } catch (error) {
        console.log("Error in addDoctor:", error);
        res.json({ success: false, message: error.message });
    }
};

// API for admin Login

const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { addDoctor, upload, loginAdmin };
