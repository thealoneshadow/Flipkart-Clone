/** @format */

// const Configuration = require("openai");
// const OpenAIApi = require("openai");
const { Configuration, OpenAIApi } = require("openai");
const { writeFileSync } = require("fs");

exports.generateAIImage = async (prompt) => {
	const config = new Configuration({
		apiKey: "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",
	});

	const openai = new OpenAIApi(config);
	const result = await openai.createImage({
		prompt,
		n: 1,
		size: "1024x1024",
		user: "divyanshu2307",
	});

	const url = await result.data.data[0].url;

	//console.log(url);

	// const image = await fetch(url);
	// const blob = await image.blob();
	// const buffer = Buffer.from(await blob.arrayBuffer());
	// writeFileSync(`./img/${Date.now()}`, buffer);
	return url;
};
