const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    
    const postData = await Post.findAll({
      include: [ User ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    
    res.render('homepage', { 
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment, include: [User] }],
    }); 
      if (postData) {
        const post = postData.get({ plain: true });
        res.render('comment', {
          post,  
          user_id: req.session.user_id,
          logged_in: true,
        }); 
      } else {
        res.status(404).end();
      }
    } catch (err) {
      console.log(err);
    res.status(500).json(err);
    }
  });



router.get('/login', (req, res) => {
  //If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});
module.exports = router;
