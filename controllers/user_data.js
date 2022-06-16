const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  /*
    #swagger.description =  Get all Users in the database
    #swagger.tags = ['user']
  */
  try {
    const result = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.USER)
      .find()
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingle = async (req, res, next) => {
  /*
    #swagger.description =  Get a single user based on the ID
    #swagger.tags = ['user']
    */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('User ID is not a valid Mongo ID');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.USER)
      .find({ _id: userId })
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const postNewUser = async (req, res) => {
  /*
    #swagger.description =  Create a new User
    #swagger.tags = ['user']
  */
  try {
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
        phone_number: req.body.phone_number,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,   
    };
    const response = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.USER)
      .insertOne(newUser);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error has occured');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const putUpdateUser = async (req, res) => {
  /*
    #swagger.description =  Update a User
    #swagger.tags = ['user']
  */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('User ID is not a valid Mongo ID');
    }
    const userId = new ObjectId(req.params.id);
    const updatedUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
        phone_number: req.body.phone_number,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
    };

    const response = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.USER)
      .replaceOne({ _id: userId }, updatedUser);

    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || 'Some error occurred while updating the contact.'
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  /*
    #swagger.description =  Delete a User
    #swagger.tags = ['user']
  */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('User ID is not a valid Mongo ID');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.USER)
      .deleteOne({ _id: userId });

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error has occured');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  postNewUser,
  putUpdateUser,
  deleteUser,
};
