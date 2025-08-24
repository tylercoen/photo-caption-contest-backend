const express = require("express");
const router = express.Router();
const { Photo, Caption } = require("../models");

/**
 * @swagger
 * /api/photos:
 *   get:
 *     summary: Retriever all images
 *     responses:
 *       200:
 *         description: A list of images
 */

// Get all images
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.findAll({
      include: { model: Caption, as: "captions" },
    });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch photos" });
  }
});

/**
 * @swagger
 * /api/photos/{id}:
 *   get:
 *     summary: Retriever a single image with captions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Image with captions
 */

// GET image by ID (with captions)
router.get("/:id", async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.id, {
      include: { model: Caption, as: "captions" },
    });
    if (!photo) return res.status(404).json({ error: "Photo not found" });
    res.json(photo);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch photo" });
  }
});

/**
 * @swagger
 * /api/photos/{id}/captions:
 *   post:
 *     summary: Add a caption to an image
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Caption added
 */

// POST add caption to image
router.post("/:id/captions", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ error: "Caption text is required" });
    const photo = await Photo.findByPk(req.params.id);
    if (!photo) return res.status(404).json({ error: "Photo not found" });

    const caption = await Caption.create({ text, photoId: photo.id });
    res.status(201).json(caption);
  } catch (err) {
    res.status(500).json({ error: "Failed to add caption" });
  }
});

module.exports = router;
