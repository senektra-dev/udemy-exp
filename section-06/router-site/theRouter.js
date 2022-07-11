import express from 'express';

const router = express.Router();

// router.use is used to add middleware to the router.
// it only works for this router.

// instead of app.get
// we'll use router.get
router.get('/', (req, res, next) => {
  res.json({
    msg: "Router works",
  })
});

export default router;
