const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// route api/post/
router.post('/', withAuth, async (req, res) => {
  try {
    const createPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(createPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // route api/post/id
// router.get('/:id', withAuth, async (req, res) =>{
//   try{
//     const post = await Post.findOne({
//       where: { id: req.params.id, }
//     }) 
//     console.log(post);
//     res.render('my-posts', {
//       layout: 'dashboard',
//       post
//     })
//   } catch (err) {
//     res.status(500).json(err);
//   }
  
// });

// route api/post/id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [updatedPost] = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
    console.log('**********'+ updatedPost);
    if (updatedPost >0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
  

// route api/post/id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [postData] = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (postData > 0) {
     res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
