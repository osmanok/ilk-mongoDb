const express = require('express');
const router = express.Router();

const Books = require('../models/Book');
const Users = require('../models/User');

router.post('/new', function(req, res, next) {
    const book = new Books({
        userId: req.users.id,
        published: true,
        comments: [
            {message: "Murat mentes okunurken titanikden inilmez"},
            {message: "burada ask ile bela ayni anlama gelir"}
            ],
        meta: {

           votes: 100,
           favs: 25,
        }
    });

    book.save((err, data) => {
        if(err)
            console.log(err);
        res.json({data});
    });
});

router.post('/newuser', (req, res) => {
    const user = new Users({
        fullname: 'ali ozayin',
        age: 23
    });

    user.save((err, data) => {
        if(err)
            console.log(err);
        res.json(data);
    });
});

router.get('/search', (req, res) => {
    Books.find({ published: true }, 'comments' ,(err, data) => {
       res.json(data);
    });
});

router.get('/searchOne', (req, res) => {
   Books.findOne({title: 'imparatorluk ve vakif'}, (err, data) => {
      res.jsone(data);
   });
});

router.put('/update', (req, res) => {
   Books.update(
       {
           published: false
       },
       {
           published: true
       },
       {
         multi: true
       },
       (err, data) => {
           res.json(data);
       });
});

router.delete('/remove', (req, res) => {
   Books.remove({published: true}, (err, data) => {
      res.json(data);
   });
});

router.get('/sort', (req, res) => {
   Books.find({ }, (err, data) => {
       res.json(data);
   }).sort({'meta.votes': -1})
});

router.get('/aggregate', (req, res) => {
   Books.aggregate([
       {
           $match: {
               published: true
           }
       },
       /*{
           $group: {
               _id: "$category",
               totalSanaBagli: { $sum: 1 }
           }
       }*/
       {
           $project: {
               title: 1,
               meta: 1
           }
       },
       {
           $sort: {
               title: 1
           }
       },
       {
           $limit: 2
       },
       {
           $skip: 1
       }
   ], (err, result) => {
       res.json(result);
   });
});

router.get('/aggrate-lookup', (req, res) => {
    Books.aggrate([

    ])
});



module.exports = router;