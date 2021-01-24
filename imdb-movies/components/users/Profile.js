// import { useEffect, useState } from 'react';
// import Link from 'next/link';


// const Profile = ({ id }) => {
//     const [user, setUser] = useState({});

//     useEffect(async () => {
//         fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`, {
//             method: 'GET',
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": "Bearer " + process.env.AUTH0_BEARER_TOKEN
//             },
//         }).then(res => res.json())
//         .then(res => setUser(res))
        
//     },[])
//     console.log(user)

//     return(
//         <div className="text-white grid grid-cols-1 divide-y"> Profile 
//             <div className="flex justify-between">
//                 <h1 className="text-white">Welcome, <span className="text-yellow-300">{user.nickname}</span></h1>
//                 <Link href="/users/edit">
//                     <a
//                         className="rounded bg-yellow-300 text-gray-900 py-1 px-4 hover:bg-gray-900 hover:text-yellow-300 border border-4 border-yellow-300"
//                     >
//                         Edit Profile
//                     </a>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default Profile;

import Link from 'next/link';
import { useEffect, useState } from 'react';


const Profile = ({ user }) => {
    const [userUpd, setUserUpd] = useState({}) 

    useEffect(async () => {
        fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user.sub}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.AUTH0_BEARER_TOKEN
            },
        }).then(res => res.json())
        .then(res => setUserUpd(res))
        
    },[])

    return(
        <div className="text-white"> Profile 
            <div className="flex justify-between">
                <h1 className="text-white">Welcome, <span className="text-yellow-300">{userUpd.nickname}</span></h1>
                <p> {userUpd.name} </p>
                { user.sub.startsWith('auth') ? (
                    <Link href="/users/profile/edit">
                        <a
                            className="rounded bg-yellow-300 text-gray-900 py-1 px-4 hover:bg-gray-900 hover:text-yellow-300 border border-4 border-yellow-300"
                        >
                            Edit Profile
                        </a>
                    </Link>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}

export default Profile;

