// const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const MarketData = require('../models/Market_Data');
const handleErrors = require('../helper/handleErrors');

const getAll = async (req, res, next) => {
	/*
    #swagger.description =  Get all market instanaces in the database
    #swagger.tags = ['market']
  */
	try {
		const result = await MarketData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.MARKET)
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
    #swagger.description =  Get a single market instance based on the ID
    #swagger.tags = ['market']
    */
	try {
		if (!ObjectId.isValid(req.params.id)) {
			res.status(400).json('User ID is not a valid Mongo ID');
		}
		const userId = new ObjectId(req.params.id);
		const result = await MarketData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.MARKET)
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

const postNewMarket = async (req, res) => {
	/*
    #swagger.description =  Create a new market instance
    #swagger.tags = ['market']
  */
	try {
		const market = new MarketData({
			entry_date: req.body.entry_date,
			metal_name: req.body.metal_name,
			metal_karatage: req.body.metal_karatage,
			metal_price: req.body.metal_price,
			diamond_price_per_carat: req.body.diamond_price_per_carat,
			gemstone_price_per_carat: req.body.gemstone_price_per_carat,
			labor_total: req.body.labor_total,
			retail_modifier: req.body.retail_modifier,
		});

		const response = await market.save();
		// .getDb()
		// .db(process.env.PARENT_FOLDER)
		// .collection(process.env.MARKET)
		// .insertOne(newMarket);

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

const putUpdateMarket = async (req, res) => {
	/*
    #swagger.description =  Update a market instance
    #swagger.tags = ['market']
  */
	try {
		if (!ObjectId.isValid(req.params.id)) {
			res.status(400).json('User ID is not a valid Mongo ID');
		}
		const userId = new ObjectId(req.params.id);
		const updatedMarket = {
			entry_date: req.body.entry_date,
			metal_name: req.body.metal_name,
			metal_karatage: req.body.metal_karatage,
			metal_price: req.body.metal_price,
			diamond_price_per_carat: req.body.diamond_price_per_carat,
			gemstone_price_per_carat: req.body.gemstone_price_per_carat,
			labor_total: req.body.labor_total,
			retail_modifier: req.body.retail_modifier,
		};

		const response = await MarketData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.MARKET)
			.findOneAndUpdate({ _id: userId }, updatedMarket, {
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

const deleteMarket = async (req, res) => {
	/*
    #swagger.description =  Delete a Market Instance
    #swagger.tags = ['market']
  */
	try {
		if (!ObjectId.isValid(req.params.id)) {
			res.status(400).json('User ID is not a valid Mongo ID');
		}
		const userId = new ObjectId(req.params.id);
		const response = await MarketData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.MARKET)
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
	postNewMarket,
	putUpdateMarket,
	deleteMarket,
};
