//* For the local method of saving avatars
// const Jimp = require("jimp");

// const avatarManipulator = async (avatarURL) => {
//   try {
//     const image = await Jimp.read(avatarURL);

//     const resizedImage = await image.resize(250, 250).quality(60);

//     await resizedImage.writeAsync(avatarURL);

//   } catch (error) {
//     console.log("Error: ", error.message);
//     throw error;
//   }
// };

// module.exports = avatarManipulator;
