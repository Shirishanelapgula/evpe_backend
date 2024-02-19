const contactModel = require("../models/contactModel");

const addContact = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    designation,
    company,
    department,
    phone,
    address,
  } = req.body;
  try {
    if (
      firstName &&
      lastName &&
      email &&
      company &&
      department &&
      phone &&
      address &&
      designation
    ) {
      const newContact = await contactModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        designation: designation,
        company: company,
        department: department,
        phone: phone,
        address: address,
      });
      res.status(200).json(newContact);
    } else {
      res.status(401).json({ message: "Please fill all the fields" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find({});
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContacts = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    designation,
    company,
    department,
    phone,
    address,
  } = req.body;
  try {
    if (
      firstName &&
      lastName &&
      email &&
      designation &&
      company &&
      department &&
      phone &&
      address
    ) {
      const updatedContact = await contactModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          designation: designation,
          company: company,
          department: department,
          phone: phone,
          address: address,
        },
        { new: true }
      );
      res.status(200).json(updatedContact);
    } else {
      res.status(401).json({ message: "Please fill all the fields" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    if (req.params.id === undefined) {
      res.status(401).json({ message: "Please provide an id" });
    } else {
      const deletedContact = await contactModel.findByIdAndDelete(
        req.params.id
      );
      res.status(200).json(deletedContact);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneContact = async (req, res) => {
  try {
    if (req.params.id === undefined) {
      res.status(401).json({ message: "Please provide an id" });
    } else {
      const oneContactData = await contactModel.findById(req.params.id);
      res.status(200).json(oneContactData);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addContact,
  getContacts,
  updateContacts,
  deleteContact,
  getOneContact,
};
