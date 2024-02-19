const express = require("express");

const contactRouter = express.Router();

const AuthMiddleWare = require("../middlewares/authMiddleWare");

const {
  addContact,
  getContacts,
  updateContacts,
  deleteContact,
  getOneContact,
} = require("../controllers/contactController");

contactRouter.post("/add-contact", AuthMiddleWare, addContact);

contactRouter.get("/get-contacts", AuthMiddleWare, getContacts);

contactRouter.put("/update-contact/:id", AuthMiddleWare, updateContacts);

contactRouter.delete("/delete-contact/:id", AuthMiddleWare, deleteContact);

contactRouter.get("/get-one-contact/:id", AuthMiddleWare, getOneContact);

module.exports = contactRouter;
