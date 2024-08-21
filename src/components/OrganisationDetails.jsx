import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Paper,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CustomButton from "./CustomButton";
import InputField from "./InputField";
import FileInput from "./FileInput";
import {
  getOrganisationDetails,
  postOrganisationDetails,
  updateOrganisationDetails,
  uploadFile,
} from "../lib/appwrite";

const Organisation = () => {
  const router = useRouter();
  const { Edit } = router.query;

  const [formValues, setFormValues] = useState({
    desc: "",
    license: "",
    location: "",
    address: "",
    phno: "",
    files: null,
    fileURL: "",
    impact: "",
    type: "",
  });

  // Fetch existing details if in edit mode
  useEffect(() => {
    if (Edit === "true") {
      fetchOrganisationDetails();
    }
  }, [Edit]);

  const fetchOrganisationDetails = async () => {
    try {
      const organisationDetails = await getOrganisationDetails(); // Fetch existing details
      setFormValues({
        desc: organisationDetails.description || "",
        license: organisationDetails.license_id || "",
        location: organisationDetails.location || "",
        address: organisationDetails.address || "",
        phno: organisationDetails.ph_no || "",
        files: null, // Assuming file isn't refetched
        fileURL: organisationDetails.photos || "",
        impact: organisationDetails.impact || "",
        type: organisationDetails.type || "",
      });
    } catch (error) {
      console.error("Error fetching organisation details:", error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files[0],
        fileURL: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleFileUpload = async (event) => {
    const { name, files } = event.target;
    const file = files[0];

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: file,
      fileURL: URL.createObjectURL(file),
    }));

    try {
      const fileUrl = await uploadFile(file, "image");
      setFormValues((prevValues) => ({
        ...prevValues,
        fileURL: fileUrl,
      }));
    } catch (error) {
      console.error("Error uploading file:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (Edit === "true") {
        await updateOrganisationDetails(formValues);
        router.push("/organisationprofile"); // Update existing details
      } else {
        await postOrganisationDetails(formValues);
        router.push("/bank"); // Create new entry
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <Container component="main" className="mt-10 w-[50%]">
      <Paper elevation={6} className="p-16 rounded-lg">
        <Typography component="h1" variant="h5" align="center">
          {Edit === "true"
            ? "Edit Organisation Details"
            : "Organisation Details"}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <InputField
            title="Description (Enter less than 250 characters)"
            holder="Write about your organisation. Enter less than 250 characters to avoid any error in data updation."
            type="textarea"
            name="desc"
            id="desc"
            value={formValues.desc}
            handleChange={handleChange}
          />
          <Typography variant="subtitle1">Upload Photo</Typography>
          <div className="justify-center align-middle ml-[20%] mt-4 mb-4">
            <FileInput handleChange={handleFileUpload} />
            {formValues.fileURL && (
              <Box mt={2} textAlign="center">
                <Typography variant="subtitle1">Uploaded Photo</Typography>
                <img
                  src={formValues.fileURL}
                  alt="Uploaded"
                  style={{ width: "100%", height: "auto", marginTop: "10px" }}
                />
              </Box>
            )}
          </div>
          <FormControl fullWidth margin="normal" variant="outlined">
            <FormLabel>Type</FormLabel>
            <Select
              name="type"
              value={formValues.type}
              onChange={handleChange}
              required
              sx={{ mt: 1, mb: 2 }}
            >
              <MenuItem value="NGO">NGO</MenuItem>
              <MenuItem value="Hospitals">Hospitals</MenuItem>
              <MenuItem value="Orphanage">Orphanage</MenuItem>
              <MenuItem value="Oldage Home">Oldage Home</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
          <InputField
            title="No.of People Impacted"
            holder="5000+ people"
            type="text"
            name="impact"
            id="impact"
            value={formValues.impact}
            handleChange={handleChange}
          />
          <InputField
            title="License ID"
            holder="Enter your license id"
            type="text"
            name="license"
            id="license"
            value={formValues.license}
            handleChange={handleChange}
          />
          <InputField
            title="Google Map Location URL Link"
            holder="www.google.com/maps"
            type="text"
            name="location"
            id="location"
            value={formValues.location}
            handleChange={handleChange}
          />
          <InputField
            title="Address"
            holder="Enter your address"
            type="text"
            name="address"
            id="address"
            value={formValues.address}
            handleChange={handleChange}
          />
          <InputField
            title="Phone Number"
            holder="+91 9956867412"
            type="text"
            name="phno"
            id="phno"
            value={formValues.phno}
            handleChange={handleChange}
          />

          <CustomButton title={Edit === "true" ? "Update" : "Next"} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Organisation;
