const models = require('../models');

module.exports = {
    get: (req, res, next) => {
    models.Book.find()
      .populate({path:'seller', select:'username'})
      .then((books) =>  res.send(books))
			.catch(next);
    },

    post: (req, res, next) => {
        const { bookName, photoUrl, bookCondition, discription, price } = req.body;
        const { _id } = req.user;

        models.Book.create({ bookName, photoUrl, bookCondition, discription, price, seller: _id })
            .then((createdBook) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { books: createdBook } }),
                    models.Book.findOne({ _id: createdBook._id })
                ]);
            })
            .then(([modifiedObj, bookObj]) => {
                res.send(bookObj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const _id = req.params.id;
        const { bookName, photoUrl, bookCondition, discription, price  } = req.body;
        models.Book.updateOne({ _id: _id }, { bookName, photoUrl, bookCondition, discription, price })
            .then((updatedBook) => res.send(updatedBook))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Book.deleteOne({ _id: id })
            .then((removedBook) => res.send(removedBook))
            .catch(next)
    }
};