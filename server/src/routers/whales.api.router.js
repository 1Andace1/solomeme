const router = require('express').Router();
const { Whale } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const multer  = require('multer')
const upload = multer({ dest: 'public/img' })
const fs = require('fs'); 
const path = require('path');
router
  .post('/profile', upload.single('avatar'),function (req, res, next) {
    res.sendStatus(200)
    // res.json({message :"okey img"})
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
  .get('/', async (req, res) => {
    try {
      const entries = await Whale.findAll();
      res.json(entries);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .post('/',verifyAccessToken,upload.single('avatar'), async (req, res) => {
    const { name, description, user } = req.body;
    console.log(req.file,'24');
    // console.log(req.body);
    try {
      const entry = await Whale.create({name, image:req.file.filename, description, userId: user });
      if (entry) {
        const a = fs.readdirSync('./public/img')
        fs.renameSync(`./public/img/${req.file.filename}`,`./public/img/${req.file.filename}.jpg`);
        console.log(a);
      }
        // fs.readdirSync(path.join(__dirname, 'public'))


      // app.use(express.static(path.join(__dirname, 'public')));
      res.json(entry);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;

    try {
      const whale = await Whale.findByPk(id);
      if (res.locals.user.id === whale.userId) {
        whale.destroy();
        res.sendStatus(200);
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      console.error(error);
      res.json(400);
    }
  });

module.exports = router;
