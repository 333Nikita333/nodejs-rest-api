const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contactJoi");

const router = express.Router();

router.use(authenticate);

router.get("/", ctrl.getContacts);

router.post(
  "/",
  authenticate,
  validateBody(schemas.userSchema),
  ctrl.addContact
);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.userSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
