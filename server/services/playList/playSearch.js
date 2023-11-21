const Playlist = require("../../db/models/playListModel");

const playSearch = async (query, page, pageSize) => {
	try {
		const skip = (page - 1) * pageSize;
		const searchPlayList = await Playlist.find({
			playListTitle: { $regex: new RegExp(query, "i") },
		})
			.skip(skip)
			.limit(pageSize);
		if (searchPlayList.length === 0) {
			return [];
		}
		return searchPlayList;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports = { playSearch };
