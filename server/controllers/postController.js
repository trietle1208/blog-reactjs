const Post = require('../models/postModel');
const User = require('../models/userModel');
const HttpError = require('../models/errorModel')
const path = require('path');
const fs = require('fs');
const {v4: uuid} = require('uuid');

const createPost = async (req, res, next) => {
    try {
        let {title, category, description} = req.body;

        if(!title || !category || !description) {
            return next(new HttpError("Fill in all fiedls", 400))
        }

        const {thumbnail} = req.files;

        if(thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail too big. File should be less than 2mb", 400))
        }

        let fileName = thumbnail.name;

        let splittedFileName = fileName.split('.');
        let newFileName = splittedFileName[0] + uuid() + "." + splittedFileName[splittedFileName.length - 1]
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFileName), async (err) => {
            if(err) {
                return next(new HttpError(err))
            } else {
                const newPost = await Post.create({
                    title,
                    category,
                    description,
                    thumbnail: newFileName,
                    creator: req.user.id
                })

                if(!newPost) {
                    return next(new HttpError("Create post failed. Please check your requests", 422))
                }

                const currentUser = await User.findById(req.user.id)
                const userPostCount = currentUser.posts + 1
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})

                res.status(201).json(newPost)
            }
        })
    } catch (error) {
        return next(new HttpError("Create post failed. Please check your requests", 422))
    }
}

const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({updateAt: -1})

        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError("Get posts failed. Please check your requests", 422))
    }
}

const getPost = async (req, res, next) => {
    try {
        const id = req.params.id;

        const post = await Post.findById(id)

        if(!post) {
            return next(new HttpError("Post not found", 404))
        }

        res.status(200).json(post);
    } catch (error) {
        return next(new HttpError("Get posts failed. Please check your requests", 422))
    }
}

const getCatPosts = async (req, res, next) => {
    try {
        const {category} = req.params;
        const posts = await Post.find({category}).sort({updateAt: -1})

        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError("Get posts by category failed. Please check your requests", 422))
    }
}

const getUserPosts = async (req, res, next) => {
    try {
        const {id} = req.params;
        const posts = await Post.find({creator: id}).sort({createdAt: -1})

        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError("Get posts by creator failed. Please check your requests", 422))
    }
}

const editPost = async (req, res, next) => {
    try {
        let fileName;
        let newFileName;
        let updatedPost;
        const postId = req.params.id;
        let {title, category, description} = req.body;

        if(!title || !category || !description) {
            return next(new HttpError("Fill in all fiedls", 400))
        }

        if(!req.files) {
            updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description}, {new: true})
        } else {
            const oldPost = await Post.findById(postId);

            fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) => {
                if(err) {
                    return next(new HttpError(err))
                }
            })

            const {thumbnail} = req.files;

            if(thumbnail.size > 2000000) {
                return next(new HttpError("Thumbnail too big. File should be less than 2mb", 400))
            }

            fileName = thumbnail.name;

            let splittedFileName = fileName.split('.');
            newFileName = splittedFileName[0] + uuid() + "." + splittedFileName[splittedFileName.length - 1]
            thumbnail.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
                if(err) {
                    return next(new HttpError(err))
                }
            })

            updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description, thumbnail: newFileName}, {new: true})
            
            if(!updatedPost) {
                return next(new HttpError("Edit post failed. Please check your requests", 422))
            }

            res.status(200).json(updatedPost)
        }
    } catch (error) {
        return next(new HttpError("Edit post failed. Please check your requests", 422))
    }
}

const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id
        
        const post = await Post.findById(postId)

        const fileName = post?.thumbnail

        fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
            if(err) {
                return next(new HttpError(err))
            } else {
                await Post.findByIdAndDelete(postId)

                const userId = post.creator

                const currentUser = await User.findById(userId)

                const currentPostCount = currentUser?.posts - 1;

                await User.findByIdAndUpdate(userId, {posts: currentPostCount}, {new: true})

                res.status(200).json("Delete post successfully")
            }
        })
    } catch (error) {
        return next(new HttpError("Delete post failed. Please check your requests", 422))
    }
}

module.exports = {
    createPost,
    getPosts,
    getPost,
    getCatPosts,
    getUserPosts,
    editPost,
    deletePost,
}