const express = require("express");
const multer = require("multer");
const router = express.Router();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const AWS_BUCKET = process.env.AWS_BUCKET;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_KEY = process.env.AWS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const crypto = require("crypto");

const s3 = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  if (req.file.buffer.length > 0) {
    const key = crypto.randomBytes(16).toString("hex");
    const comment = new PutObjectCommand({
      Bucket: AWS_BUCKET,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });
    await s3.send(comment);
    res.send(`${process.env.AWS_BUCKET_URL}/${key}`);
  }
});

module.exports = router;
