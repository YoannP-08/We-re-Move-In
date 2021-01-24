import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (request, response) => {
    const { method } = request;

    switch (method) {
        case 'GET': 
            try{
                const users = await User.find({});

                response.status(200).json({ success: true, data: users });
            } catch (error) {
                response.statut(400).json({ success: false, data: error});
            }
            break;
        
        case 'POST':
            try{
                // const bcrypt = require('bcryptjs');
                // const pwdHashed = await bcrypt.hash(request.body.password, 10); // login => await bcrypt.compare(request.body.password, hashPwd)
                const userDB = await User.findOne({ "email": request.body.email });

                if (!userDB) {
                    const user = await User.create({
                        username: request.body.username,
                        email: request.body.email,
                        // password: pwdHashed
                        is_admin: request.body.is_admin,
                        id_auth0: request.body.id_auth0
                    });
                    
                } else {
                    return response.status(400).json({ success: false, message: "User already exist." })
                }
                
                response.status(201).json({ success: true, data: user });
            } catch (error) {
                response.status(400).json({ success: false, data: error });
            }
            break;
        default:
            response.status(400).json({ success: false });
            break;
    }
}