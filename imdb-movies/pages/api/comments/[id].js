import dbConnect from '../../../utils/dbConnect';
import Comment from '../../../models/Comment.js';
import * as mongoose from "mongoose";

dbConnect();


export default async (req, res) => {
    const {
        query: { id },
        method

    } = req;
    switch(method) {
        case 'GET':
            try {
                const comment = await Comment.aggregate([{
                    $lookup: {
                        from: 'movies',
                        localField: 'movie_id',
                        foreignField: '_id',
                        as: 'movie'
                    }
                },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'user_id',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    {
                        $match: { _id : mongoose.Types.ObjectId(id)}
                    }
                ])
                if (!comment) {
                    return res.status(400).json({success: false})
                }

                res.status(200).json({success: true, data: comment})
            } catch (e) {
                return res.status(400).json({success: false})
            }
            break;
        case 'PUT':
            try {
                const comment = await Comment.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                if (!comment) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: comment})

            } catch (e) {
                return res.status(400).json({success: false})
            }
            break;
        case 'DELETE':
            try {
                const deletedComment = await Comment.deleteOne({_id: id});
                if (!deletedComment) {
                    return res.status(400).json({success: false})
                }
                res.status(204).json({success: true, data: {}})

            } catch (e) {
                return res.status(400).json({success: false})
            }
            break;
        default:
                return res.status(400).json({success: false})
    }

}
