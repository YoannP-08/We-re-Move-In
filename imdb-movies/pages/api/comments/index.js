import dbConnect from '../../../utils/dbConnect';
import Comment from '../../../models/Comment.js';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const comments = await Comment.aggregate([{
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
            }]);
                res.status(200).json({success: true, data: comments})
            } catch (e) {
                res.status(400).json({success:false})
            }
            break;
        case 'POST':
            try {
                const comment = await Comment.create(req.body);
                res.status(201).json({success: true, data: comment})
            } catch (e) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false})
            break;

    }
}
