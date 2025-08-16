import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {Like} from '../models/like.models.js'
import { isValidObjectId } from "mongoose";

const toggleTweetLike = asyncHandler (async (req, res) => {
  // first tweetId 
  // check tweet is already like 

  const {tweetId} = req.params
  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id")
  }

  const likedAlready = await Like.findOne({
    tweet : tweetId,
    likedBy : req.user?._id
  });

  if (likedAlready) {
    await Like.findByIdAndDelete(likedAlready?._id);

    return res
    .status(200)
    .json(
        new ApiResponse(201, {tweetId, likedBy : req.user?._id})
    )
  }

  await Like.create({
    tweet : tweetId,
    likedBy : req.user?._id,
  })

  return res
  .status(201)
  .json(
    new ApiResponse (201, {isLiked : true})
  )
});

export {
    toggleTweetLike,
    
}