import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';


dbConnect();

export default async (request, response) => {
    const {
        query: { id },
        method
    } = request;

    switch(method) {
        case 'GET':
            try {
                const user = await User.findById(id);

                if (!user) {
                    return response.status(400).json({ success: false, message: 'User does not exist.' });
                }

                response.status(200).json({ success: true, data: user });
            } catch (error) {
                response.status(400).json({ success: false, data: error });
            }
            break;

        case 'PUT':
            try {
                // const newPwdHashed = await bcrypt.hash(request.body.password, 10);
                // const userDB = await User.findOne({ "email": request.body.email });
                console.log(typeof(request.body))
                // let body = JSON.parse(request.body)
                console.log(request.body)

                    const updateUser = await User.findByIdAndUpdate(
                        id, request.body
                    );
                const updatedUser = await User.findById(id)
                
                if (!updatedUser) {
                    return response.status(400).json({ success: false, message: 'User does not exist.' });
                }

                response.status(200).json({ success: true, data: updatedUser });
            } catch (error) {
                response.status(400).json({ success: false, data: error });
            }
            break;

        case 'DELETE':
            try {
                const user = await User.findOne({ _id: id });
                const username = user.username;                
                const deleteUser = await User.deleteOne({ _id : id });
                
                if (!deleteUser) {
                    return response.status(400).json({ success: false, message: 'User does not exist.'});
                }

                response.status(200).json({ success: true, message: `User ${username} deleted successfully.` });
            } catch (error) {
                response.status(400).json({ success: false, data: error });
            }
            break;
        default:
            response.status(400).json({ success: false });
            break;
    }
}