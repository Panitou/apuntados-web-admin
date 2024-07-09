import Listing from "../models/listing.model.js";

// Crear un apunte
export const addListing = async (req, res) => {
  const { name, description, course, semester, price, imageUrls, userRef } =
    req.body;

  try {
    const newListing = new Listing({
      name,
      description,
      course,
      semester,
      price,
      imageUrls,
      userRef,
    });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(500).json({ message: "Error adding listing" });
  }
};

// Obtener todos los apuntes
export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings" });
  }
};

// Obtener un apunte por ID
export const getListingById = async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listing" });
  }
};

// Actualizar un apunte por ID
export const updateListingById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedListing = await Listing.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedListing)
      return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: "Error updating listing" });
  }
};

// Eliminar un apunte por ID
export const deleteListingById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing)
      return res.status(404).json({ message: "Listing not found" });
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting listing" });
  }
};
