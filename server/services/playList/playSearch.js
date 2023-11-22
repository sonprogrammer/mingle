const Playlist = require("../../db/models/playListModel");

const playSearch = async (query, page, pageSize) => {
	try {
		const skip = (page - 1) * pageSize;
		const totalPlaylists = await Playlist.countDocuments({
			playListTitle: { $regex: new RegExp(query, "i") },
		  });
		  const searchPlayList = await Playlist.find({
			playListTitle: { $regex: new RegExp(query, "i") },
		})
		.skip(skip)
		.limit(pageSize);
		const totalPages = Math.ceil(totalPlaylists / pageSize);
		  
		if (searchPlayList.length === 0) {
			return [];
		}
		return {totalPages,searchPlayList };
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports = { playSearch };
