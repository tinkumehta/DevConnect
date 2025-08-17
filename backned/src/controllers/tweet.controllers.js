import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {Tweet} from "../models/tweet.models.js"
import mongoose, { isValidObjectId } from "mongoose";

const createTweet = asyncHandler (async (req, res) => {
  const {content} = req.body;
  if (!content) {
    throw new ApiError(400, "content is empty")
  }

  const tweet = await Tweet.create({
    content,
    owner : req.user?._id
  })

  if (!tweet) {
    throw new ApiError(500, "Failed to tweet create")
  }

  return res
  .status(201)
  .json(
    new ApiResponse(200, tweet, "tweet create is successfully")
  )
})

const updatedTweet = asyncHandler (async (req, res) => {
    const {content} = req.body;
    const {tweetId} = req.params;

    if (!content) {
        throw new ApiError(400, "Content is empty")
    }
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweetId")
    }

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
        throw new ApiError(400, "Invalid tweetId")
    }

    if (tweet?.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "Only owner can edit their tweet")
    }

    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set : {
                content
            }
        },
        {
            new : true
        }
    )

    if (!updatedTweet) {
        throw new ApiError(500, "Failed to updated tweet")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, updatedTweet, "Updated tweet is successfully")
    )
})

const deleteTweet = asyncHandler (async (req, res) => {
    const {tweetId} = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweetId")
    }

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
        throw new ApiError(400, "Invalid tweetId")
    }

    if (tweet?.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(400, "Only owner can edit their tweet")
    }

    await Tweet.findByIdAndDelete(tweetId);

    return res
    .status(201)
    .json(
        new ApiResponse(201, {}, "Tweet delete is successfully")
    )
})

const getUserTweet = asyncHandler (async (req, res) => {
    const {userId} = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId")
    }

    const tweet = await Tweet.aggregate([
        {
            $match : {
                owner : new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup : {
                from : "users",
                localField : "owner",
                foreignField : "_id",
                as : "ownerDetails",
                pipeline : [
                    {
                        $project : {
                            username : 1,
                            "avatar" : 1
                        }
                    }
                ]
            }
        },
        {
            $lookup : {
                from :"likes",
                localField : "_id",
                foreignField : "tweet",
                as : "likeDetails",
                pipeline : [
                    {
                        $project : {
                            likedBy : 1,
                        }
                    }
                ]
            }
        },
        {
            $addFields : {
                likeCount : {
                    $size : "$likeDetails"
                },
                ownerDetails : {
                    $first : "$ownerDetails"
                },
                isLiked : {
                    $cond : {
                        if : {$in : [req.user?._id, "$likeDetails.likedBy"]},
                        then : true,
                        else : false
                    }
                }
            }
        },
        {
            $sort : {
                createdAt :-1
            }
        },
        {
            $project : {
                content : 1,
                ownerDetails : 1,
                likeCount : 1,
                createdAt : 1,
                isLiked : 1,
            }
        }
    ])

    return res
    .status(201)
    .json(
        new ApiResponse(201, tweet, "Tweet fetched successfully")
    )
})

const getAllTweets = asyncHandler (async (req, res) => {
    const tweets = await Tweet.aggregate([
        {
            $lookup : {
                from : "users",
                localField : "owner",
                foreignField : "_id",
                as : "ownerDetails",
                pipeline : [
                    {
                        $project : {
                            username : 1,
                            fullName : 1,
                            "avatar" : 1
                        }
                    }
                ]
            }
        },
        {
            $lookup : {
                from : "likes",
                localField : "_id",
                foreignField : "tweet",
                as : "likeDetails",
            }
        },
        {
            $addFields : {
                likeCount : {
                    $size : "$likeDetails"
                },
                ownerDetails : {
                    $first : "$ownerDetails"
                },
                isLiked : {
                    $cond : {
                        if : {$in : [req.user?._id, "$likeDetails.likedBy"]},
                        then : true,
                        else : false
                    }
                },
            }
        },
        {
            $sort : {
                createdAt : -1
            }
        },
        {
            $project : {
                content : 1,
                createdAt : 1,
                ownerDetails : 1,
                likeCount : 1,
                isLiked : 1
            }
        }
    ])

    if (!tweets) {
        throw new ApiError(500, "Failed to show tweet")
    }

    return res
    .status(201)
    .json(
        new ApiResponse (201, tweets, "All tweets fetched successfully")
    )
})

export {
    createTweet,
    updatedTweet,
    deleteTweet,
    getUserTweet,
    getAllTweets,
}