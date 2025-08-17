import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})

        return {accessToken, refreshToken}
        
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating accessToken and refreshToken")
    }
}

const register = asyncHandler (async (req, res) => {
    // get all user details
    // check it is valide
    // check user is already register
    // check image & avatar
    // upload on cloudinary
    // create a user 
    // return res

    const {fullName, username, email, password} = req.body

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All filed is required")
    }

    const userAlready = await User.findOne({
        $or : [{username}, {email}]
    })

    if (userAlready) {
        throw new ApiError(400, "User is already register")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    
    let coverImageLocalPath;

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(500, "avatar file is Failed to upload")
    }

    const user = await User.create({
        fullName,
        username : username.toLowerCase(),
        email,
        password,
        avatar : avatar.url,
        coverImage :  coverImage?.url || "",
    })

     const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(500, "Failed to create")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, createdUser, "User created successfully")
    )
})

const login = asyncHandler (async (req, res) => {
    // user details
    // check is empty
    // user is exits
    // access and refresh token
    // send cookie

    const {username, email, password} = req.body;
     if (!(username) && !(email)) {
        throw new ApiError(400, "username and email is required")
     }

     const findUser = await User.findOne({
        $or : [{email}, {username}]
     })

     if (!findUser) {
        throw new ApiError(400, "user is missing")
     }

     const isPasswordCorrect = await findUser.isPasswordCorrect(password)

     if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid password")
     }

     const {accessToken, refreshToken} =await generateAccessAndRefreshToken(findUser._id)
      
     const loggedInUser = await User.findById(findUser._id).select("-password -refreshToken")

     const options = {
        httpOnly : true,
        secure : true
     }

     return res
     .status(201)
     .cookie("accessToken",  accessToken, options)
     .cookie("refershToken",  refreshToken, options)
     .json(
        new ApiResponse(201, 
            {
            user : loggedInUser, accessToken, refreshToken
        },
        "User login is succefully"
    )
     )
})

const logout = asyncHandler (async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                refreshToken : undefined
            }
        },
        {
            new : true
        }
    )

     const options = {
        httpOnly : true,
        secure : true
     }

     return res
     .status(201)
     .clearCookie("accessToken", options)
     .clearCookie("refreshToken", options)
     .json(
        new ApiResponse(201 ,{} , "User logged out")
     )
})

export {
    register,
    login,
    logout,
    
}