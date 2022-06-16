const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  /*
    #swagger.description =  Get all jewelry items in the database
    #swagger.tags = ['jewelry']
  */
  try {
    const result = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.JEWELRY)
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
    #swagger.description =  Get a single jewelry item based on the ID
    #swagger.tags = ['jewelry']
    */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('User ID is not a valid Mongo ID');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.JEWELRY)
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

const postNewJewelry = async (req, res) => {
  /*
    #swagger.description =  Create a new jewerly item
    #swagger.tags = ['jewelry']
  */
  try {
    const newJewelry = {
        finger_size: req.body.finger_size,
        metal_weight_grams: req.body.metal_weight_grams,
        number_of_stones_1: req.body.number_of_stones_1,
        number_of_stones_2: req.body.number_of_stones_2,
        number_of_stones_3: req.body.number_of_stones_3,
        cttw_stones_1: req.body.cttw_stones_1,
        cttw_stones_2: req.body.cttw_stones_2,
        cttw_stones_3: req.body.cttw_stones_3,
        price_stones_1: req.body.price_stones_1,
        price_stones_2: req.body.price_stones_2,
        price_stones_3: req.body.price_stones_3,
        labor_1: req.body.labor_1,
        labor_2: req.body.labor_2,
        labor_3: req.body.labor_3,
        item_condition: req.body.item_condition,
        appraisal_note: req.body.appraisal_note,
        item_description: req.body.item_description,
    };
    const response = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.JEWELRY)
      .insertOne(newJewelry);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error has occured');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const putUpdateJewelry = async (req, res) => {
  /*
    #swagger.description =  Update a jewelry item
    #swagger.tags = ['jewelry']
  */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('User ID is not a valid Mongo ID');
    }
    const userId = new ObjectId(req.params.id);
    const updateJewelry = {
        finger_size: req.body.finger_size,
        metal_weight_grams: req.body.metal_weight_grams,
        number_of_stones_1: req.body.number_of_stones_1,
        number_of_stones_2: req.body.number_of_stones_2,
        number_of_stones_3: req.body.number_of_stones_3,
        cttw_stones_1: req.body.cttw_stones_1,
        cttw_stones_2: req.body.cttw_stones_2,
        cttw_stones_3: req.body.cttw_stones_3,
        price_stones_1: req.body.price_stones_1,
        price_stones_2: req.body.price_stones_2,
        price_stones_3: req.body.price_stones_3,
        labor_1: req.body.labor_1,
        labor_2: req.body.labor_2,
        labor_3: req.body.labor_3,
        item_condition: req.body.item_condition,
        appraisal_note: req.body.appraisal_note,
        item_description: req.body.item_description, 
    };

    const response = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.JEWELRY)
      .replaceOne({ _id: userId }, updateJewelry);

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

const deleteJewelry = async (req, res) => {
  /*
    #swagger.description =  Delete a Jewelry Item
    #swagger.tags = ['jewelry']
  */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('User ID is not a valid Mongo ID');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.JEWELRY)
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
  postNewJewelry,
  putUpdateJewelry,
  deleteJewelry,
};
