import { Router } from "express";
import {
  getListings,
  deleteListingById,
} from "../controllers/listing.controller.js";

const router = Router();

// Rutas para apuntes
router.get("/listings", getListings);
router.delete("/listings/:id", deleteListingById);

export default router;
