require("dotenv").config();
const mongoose = require("mongoose");
const mongodbUri = `${process.env.DB_URI}`;

module.exports = { MongoConnect };

async function MongoConnect() {
	await mongoose
		.connect(mongodbUri)
		.then(() => {
			console.log("mongo connect");
		})
		.catch((err) => {
			console.log(err);
		});
}

mongoose.connection.on("error", (error) => {
	console.error("몽고디비 연결 에러", error);
});

mongoose.connection.on("disconnected", () => {
	console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
	MongoConnect(); // 연결 재시도
});
