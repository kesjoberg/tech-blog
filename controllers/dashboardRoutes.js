const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req,res) =>{
  try {
    console.log(req.session.user_id);
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    
    const posts = postData.map((post) => post.get({ plain: true} ));
    console.log(posts);
    res.render('my-posts', {
      layout: 'dashboard',

      posts,
    });
  
  } catch (err) {
    // res.redirect('login');
    res.json(err);
  }
});

router

router.get('/create-post', withAuth, (req,res) => {
  res.render('create-post', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) =>{
  try {
    const postData = await Post.findByPk(req.params.id) 
     
      if (postData) {
        const post = postData.get({ plain: true });
        res.render('edit', {
          layout: 'dashboard',
          post,  
        }); 
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.redirect('login');
    }
  });



module.exports = router;