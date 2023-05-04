const express = require("express");
const router = express.Router();
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) throw HttpError(404, "Not found");

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);

    if (!result) throw HttpError(400, "missing required name field");

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  if (!body) throw HttpError(400, "missing fields");

  const result = await contacts.updateContact(contactId, body);
  if (!result) throw HttpError(404, "Not found");

  res.status(200).json(result);
});

module.exports = router;
