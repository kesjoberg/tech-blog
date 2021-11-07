const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

//route is /api/comments/
router.post('/', withAuth, async (req, res) => {
  try {
    const createComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(createComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router