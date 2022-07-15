// const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const JewelryData = require('../models/Jewelry_Item_Information');
const handleErrors = require('../helper/handleErrors');

const getAll = async (req, res, next) => {
	/*
    #swagger.description =  Get all jewelry items in the database
    #swagger.tags = ['jewelry']
  */
	try {
		const result = await JewelryData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.JEWELRY)
			.find();
		// .toArray((err, lists) => {
		//   if (err) {
		//     res.status(400).json({ message: err });
		//   }
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(result);
		// });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(500).json({ errors });
		res.status(401);
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
		const result = await JewelryData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.JEWELRY)
			.find({ _id: userId });
		// .toArray((err, lists) => {
		//   if (err) {
		//     res.status(400).json({ message: err });
		//   }
		res.setHeader('Content-Type', 'application/json');
		res.status(200).json(result);
		// });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(500).json({ errors });
		res.status(401);
	}
};

const postNewJewelry = async (req, res) => {
	/*
    #swagger.description =  Create a new jewerly item
    #swagger.tags = ['jewelry']
  */
	try {
		const jewelry = new JewelryData({
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
		});

		const response = await jewelry.save();
		// .getDb()
		// .db(process.env.PARENT_FOLDER)
		// .collection(process.env.JEWELRY)
		// .insertOne(newJewelry);

		res.status(201).json(response);
		// if (response.acknowledged) {
		//   res.status(201).json(response);
		// } else {
		//   res.status(500).json(response.error || 'An error has occured');
		// }
	} catch (err) {
		const errors = handleErrors(err);
		res.status(500).json({ errors });
		res.status(401);
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

		const response = await JewelryData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.JEWELRY)
			.findOneAndUpdate({ _id: userId }, updateJewelry, {
				runValidators: true,
				new: true,
			});

		console.log(response);
		if (response) {
			res.status(204).send();
		} else {
			res
				.status(500)
				.json(
					response.error || 'Some error occurred while updating the contact.'
				);
		}
	} catch (err) {
		const errors = handleErrors(err);
		res.status(500).json({ errors });
		res.status(401);
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
		const response = await JewelryData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.JEWELRY)
			.deleteOne({ _id: userId });

		if (response.acknowledged) {
			res.status(201).json(response);
		} else {
			res.status(500).json(response.error || 'An error has occured');
		}
	} catch (err) {
		const errors = handleErrors(err);
		res.status(500).json({ errors });
		res.status(401);
	}
};

module.exports = {
	getAll,
	getSingle,
	postNewJewelry,
	putUpdateJewelry,
	deleteJewelry,
};
