const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

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

router.get('/:id', withAuth, async (req, res) =>{
  try{
    const post = await Post.findOne({
      where: { id: req.params.id, }
    }) 
    console.log(post);
    res.render('my-posts', {
      layout: 'dashboard',
      post
    })
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      { 
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(updatedPost);  
  } catch (err) {
    res.status(500).json(err);
  }
});
  


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
