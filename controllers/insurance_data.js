// const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const InsuranceData = require('../models/User_Insurance_Info');
const handleErrors = require('../helper/handleErrors');

const getAll = async (req, res, next) => {
	/*
    #swagger.description =  Get all insurance instances in the database
    #swagger.tags = ['insurance']
  */
	try {
		const result = await InsuranceData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.INSURANCE)
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
    #swagger.description =  Get a single insurance instance based on the ID
    #swagger.tags = ['insurance']
    */
	try {
		if (!ObjectId.isValid(req.params.id)) {
			res.status(400).json('User ID is not a valid Mongo ID');
		}
		const userId = new ObjectId(req.params.id);
		const result = await InsuranceData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.INSURANCE)
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

const postNewInsurance = async (req, res) => {
	/*
    #swagger.description =  Create a new insurance instance
    #swagger.tags = ['insurance']
  */
	try {
		const insurance = new InsuranceData({
			insurance_company: req.body.insurance_company,
			insurance_agent: req.body.insurance_agent,
			insurance_policy: req.body.insurance_policy,
		});

		const response = await insurance.save();
		// .getDb()
		// .db(process.env.PARENT_FOLDER)
		// .collection(process.env.INSURANCE)
		// .insertOne(newInsurance);

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

const putUpdateInsurance = async (req, res) => {
	/*
    #swagger.description =  Update an insurance instance
    #swagger.tags = ['insurance']
  */
	try {
		if (!ObjectId.isValid(req.params.id)) {
			res.status(400).json('User ID is not a valid Mongo ID');
		}
		const userId = new ObjectId(req.params.id);
		const updateInsurance = {
			insurance_company: req.body.insurance_company,
			insurance_agent: req.body.insurance_agent,
			insurance_policy: req.body.insurance_policy,
		};

		const response = await InsuranceData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.INSURANCE)
			.findOneAndUpdate({ _id: userId }, updateInsurance, {
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

const deleteInsurance = async (req, res) => {
	/*
    #swagger.description =  Delete an insurance instance
    #swagger.tags = ['insurance']
  */
	try {
		if (!ObjectId.isValid(req.params.id)) {
			res.status(400).json('User ID is not a valid Mongo ID');
		}
		const userId = new ObjectId(req.params.id);
		const response = await InsuranceData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.INSURANCE)
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
	postNewInsurance,
	putUpdateInsurance,
	deleteInsurance,
};
