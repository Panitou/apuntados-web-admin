import { Router } from "express";
import {
  addListing,
  getListings,
  getListingById,
  updateListingById,
  deleteListingById,
} from "../controllers/listing.controller.js";

const router = Router();

// Rutas para apuntes
router.post("/listings", addListing);
router.get("/listings", getListings);
router.get("/listings/:id", getListingById);
router.put("/listings/:id", updateListingById);
router.delete("/listings/:id", deleteListingById);

export default router;
