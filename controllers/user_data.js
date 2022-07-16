// const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const UserData = require('../models/User_Data');
const handleErrors = require('../helper/handleErrors');

const getAll = async (req, res, next) => {
	/*
    #swagger.description =  Get all Users in the database
    #swagger.tags = ['user']
  */
	try {
		const result = await UserData.find();
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
    #swagger.description =  Get a single user based on the ID
    #swagger.tags = ['user']
    */
	try {
		if (!ObjectId.isValid(req.params.id)) {
			res.status(400).json('User ID is not a valid Mongo ID');
		}
		const userId = new ObjectId(req.params.id);
		const result = await UserData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.USER)
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

const postNewUser = async (req, res) => {
	/*
    #swagger.description =  Create a new User
    #swagger.tags = ['user']
  */
	try {
		const user = new UserData({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email_address: req.body.email_address,
			phone_number: req.body.phone_number,
			street_address: req.body.street_address,
			city: req.body.city,
			state: req.body.state,
			zipcode: req.body.zipcode,
		});

		const response = await user.save();
		// .getDb()
		// .db(process.env.PARENT_FOLDER)
		// .collection(process.env.USER)
		// .insertOne(newUser);

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

		const response = await UserData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.USER)
			.findOneAndUpdate({ _id: userId }, updatedUser, {
				runValidators: true,
				new: true,
			});

		if (response) {
			res.status(204).send();
			// } else {
			//   res
			//     .status(500)
			//     .json(
			//       response.error || 'Some error occurred while updating the contact.'
			//     );
		}
	} catch (err) {
		const errors = handleErrors(err);
		res.status(500).json({ errors });
		res.status(401);
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
		const response = await UserData
			// .getDb()
			// .db(process.env.PARENT_FOLDER)
			// .collection(process.env.USER)
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
	postNewUser,
	putUpdateUser,
	deleteUser,
};
