const mongoose = require("mongoose");

const playListSchema = new mongoose.Schema(
	{
		playListSongs: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
			default: [],
		},
		playListTitle: { type: String, required: true },
		playListExplain: { type: String, required: true },
		playListOwner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		playListComments: [
			{
				author: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				comment: { type: String, required: true },
				date: { type: Date, default: Date.now },
			},
		],
		// 이미지가 없을 시에는 기본 이미지로 대체
		playListImg: { type: String, default: null },
		genre: { type: String, required: true },
	},
	{
		versionKey: false,
		timestamps: true,
		collection: "playlist", // 몽고디비 컬렉션 이름 설정
	}
);

module.exports = mongoose.model("Playlist", playListSchema);
