import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import auth0 from '../../../utils/auth0';
// import ProfileEdit from '../../../components/users/ProfileEdit';

const EditUser = ({ user }) => {
    const [form, setForm] = useState({ username: '', email: '', password: ''});
    const [userAuth, setUserAuth] = useState({ is_admin: '' });
    const [userMongo, setUserMongo] = useState([]);
    const router = useRouter();
    const userId = router.query.id;    

    useEffect(async () =>{
        getUserMongoDB();

        if (user['http://is_admin/app_metadata'].is_admin === true) {
            await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + process.env.AUTH0_BEARER_TOKEN
                }
            }).then(res => res.json())
            .then(res => {setForm({username: res.nickname, email: res.name}), setUserAuth({is_admin: res.app_metadata.is_admin})})
        }
    }, [])

    const getUserMongoDB = async () =>{
        await fetch('/api/users', {
            method: 'GET'
        }).then(body => body.json())
        .then(body => setUserMongo( body.data.filter(user => user.id_auth0 === userId) ))
    }

    const onChange = (e) => {
        setForm ({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onChangeAdmin = async (e) => {
        await setUserAuth( prevState => ({
            is_admin: !prevState.is_admin
        }));
        
        // if(document.querySelector('#admin').checked == 1) {
        //     setUser({ is_admin: true});
        // } else {
        //     setUser({ is_admin: true});
        // }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form.password != 'undefined') {
                await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Authorization": "Bearer " + process.env.AUTH0_BEARER_TOKEN
                    },
                    body: JSON.stringify ({
                        nickname: form.username,
                        name: form.email,
                        // email: form.email,
                        password: form.password,
                        app_metadata: {
                            is_admin: userAuth.is_admin
                        }
                    })
                }).then(res => res.json())

                await fetch(`/api/users/${userMongo[0]._id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: form.username,
                        email: form.email,
                        is_admin: userAuth.is_admin,
                    })
                })
                
                router.push('/admin/users')
            } else {
                await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Authorization": "Bearer " + process.env.AUTH0_BEARER_TOKEN
                    },
                    body: JSON.stringify ({
                        nickname: form.username,
                        name: form.email,
                        email: form.email,
                        app_metadata: {
                            is_admin: userAuth.is_admin
                        }
                    })
                }).then(res => res.json())

                await fetch(`/api/users/${userMongo[0]._id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: form.username,
                        email: form.email,
                        is_admin: userAuth.is_admin,
                    })
                })
                
                router.push('/admin/users')
            }
        } catch (error) {
            console.log(error);
        }
    }


    return user['http://is_admin/app_metadata'].is_admin ? (
        <div>
        { userId.startsWith('auth') ? (
            <div className="container mx-auto mt-10 p-4 rounded bg-gray-900 border border-yellow-300 w-1/2 flex flex-col items-center justify-center">
                <h1 className="text-yellow-300 mb-4">Edit User</h1>
                <div>
                    <form onSubmit={onSubmit}>
                        <label className="text-yellow-300">Username</label><br/>
                        <input
                            className="rounded my-1 bg-gray-100 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
                            placeholder='Username'
                            name='username'
                            type='text'
                            value={form.username}
                            onChange={onChange}
                        /><br/>

                        <label className="text-yellow-300">Email</label><br/>
                        <input
                            className="rounded my-1 bg-gray-100 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
                            placeholder='Email Address'
                            name='email'
                            type='email'
                            value={form.email}
                            onChange={onChange}
                        /><br/>

                        <label className="text-yellow-300">
                            Password
                        </label><br/>
                        <input
                            className="rounded my-1 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
                            name='password'
                            type='password'
                            value={form.password}
                            onChange={onChange}
                        /><br/>

                        { userAuth.is_admin == true ? (
                            <div>
                                <input checked id="admin"  name="admin" type="checkbox" value={userAuth.is_admin} onChange={onChangeAdmin} />
                                <label className="text-yellow-300 ml-2">Admin</label><br/>
                            </div>
                        ):(
                            <div>
                                <input id="admin" name="admin" type="checkbox" value={userAuth.is_admin} onChange={onChangeAdmin} />
                                <label className="text-yellow-300 ml-2">Admin</label><br/>
                            </div>
                        )}
                        

                        <button type='submit' className='rounded bg-yellow-300 text-gray-900 py-1 px-4 mt-2'>
                            Edit
                        </button>
                </form>
            </div>
        </div>
        ) : (
            <div className="container mx-auto mt-10 p-4 rounded bg-gray-900 border border-yellow-300 w-1/2 flex flex-col items-center justify-center">
                <h1 className="text-yellow-300 mb-4">Edit User</h1>
                <div>
                    <form onSubmit={onSubmit}>
                        <label className="text-yellow-300">Username</label><br/>
                        <input
                            className="rounded my-1 bg-gray-100 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
                            placeholder='Username'
                            name='username'
                            type='text'
                            value={form.username}
                            onChange={onChange}
                            readOnly
                        /><br/>

                        <label className="text-yellow-300">Email</label><br/>
                        <input
                            className="rounded my-1 bg-gray-100 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
                            placeholder='Email Address'
                            name='email'
                            type='email'
                            value={form.email}
                            onChange={onChange}
                            readOnly
                        /><br/>

                        <label className="text-yellow-300">
                            Password
                        </label><br/>
                        <input
                            className="rounded my-1 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
                            name='password'
                            type='password'
                            value={form.password}
                            onChange={onChange}
                        /><br/>

                        { userAuth.is_admin == true ? (
                            <div>
                                <input checked id="admin"  name="admin" type="checkbox" value={userAuth.is_admin} onChange={onChangeAdmin} />
                                <label className="text-yellow-300 ml-2">Admin</label><br/>
                            </div>
                        ):(
                            <div>
                                <input id="admin" name="admin" type="checkbox" value={userAuth.is_admin} onChange={onChangeAdmin} />
                                <label className="text-yellow-300 ml-2">Admin</label><br/>
                            </div>
                        )}
                        
                        <button type='submit' className='rounded bg-yellow-300 text-gray-900 py-1 px-4 mt-2'>
                            Edit
                        </button>
                </form>
            </div>
        </div>
        )} </div>
    ) : (
        <div className="text-white ml-4"> Restricted Access </div>
    );
    
}

export default EditUser;

export async function getServerSideProps(context) {
    const session = await auth0.getSession(context.req);

    return {
        props: {
            user: session?.user || null        
        },
    };
}

