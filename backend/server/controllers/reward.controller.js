import db from "../models";

const RewardGroup = db.reward_group;
const User = db.user;


const create = async (req, res) =>
{
	try {
		let result = await RewardGroup.findOne({ name: req.body.name });
		if (result != null){
			res.send({
				status_code: 401,
				message: "すでに登録されているグループです!"
			})
		}
		else {
			await new RewardGroup({ ...req.body }).save();
			getAll(req, res);
		}
	} catch(err) {
		res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		});
	};
}


const update = async (req, res) =>
{
	try {
		await RewardGroup.findOneAndUpdate({
			_id: req.params.groupID
		}, { ...req.body }, { returnOriginal: false });
		getAll(req, res);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}


const getAll = async (req, res) =>
{
	try {
		let groups = await RewardGroup.find().sort({ created_at: -1 });
		let promises = groups.map(async (group) => {
			let id = group._id;
			let count = await User.find({ rewardGroup: id }).count();
			return {
				...group._doc,
				countOfUser: count,
			}
		});
		Promise.all(promises).then((rewardGroups) => {
			return res.json({
				status_code: 200,
				rewardGroups: rewardGroups,
			});
		})
		
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}


const deleteOne = async (req, res) =>
{
	try {
		let id = req.params.groupID;
		let count = await User.find({ rewardGroup: id }).count();
		if (count > 0) {
			return res.json({
				status_code: 400,
				message: "所属するユーザーが存在します。 削除できません!"
			})
		} else {
			await RewardGroup.findOneAndDelete({ _id: id });
			getAll(req, res);		
		}
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}


export default {
  create,
  update,
  getAll,
  deleteOne,
}