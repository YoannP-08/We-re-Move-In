import { useState } from 'react';
import { useRouter } from 'next/router';
import auth0 from '../../../utils/auth0';

const NewUser = ({ user }) => {
    const [form, setForm] = useState({ username: '', email: '', password: ''});
    const [userAuth, setUserAuth] = useState({ is_admin: false, id_auth0: ''});
    const [rqAuth0, setRqAuth0] = useState(false);
    const router = useRouter();

    const onChange = (e) => {
        setForm ({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onChangeAdmin= (e) => {
        setUserAuth(prevState => ({
            is_admin: !prevState.is_admin
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + process.env.AUTH0_BEARER_TOKEN
            },
            body: JSON.stringify ({
                connection: "Username-Password-Authentication",
                nickname: form.username,
                email: form.email,
                password: form.password,
                app_metadata: {
                    is_admin: userAuth.is_admin
                }
            })
        }).then(res => res.json())
        .then(res => {
            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: form.username,
                    email: form.email,
                    is_admin: userAuth.is_admin,
                    id_auth0: res.user_id
                })
            })
        })

        router.push('/admin/users')
    }


    return user['http://is_admin/app_metadata'].is_admin ? (
        <div className="container mx-auto mt-10 p-4 rounded bg-gray-900 border border-yellow-300 w-1/2 flex flex-col items-center justify-center">
                <h1 className="text-yellow-300 mb-4">Create New User</h1>
                <div>
                    <form onSubmit={onSubmit}>
                        <label className="text-yellow-300">Username</label><br/>
                        <input
                            className="rounded my-1 bg-gray-100 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
                            placeholder='Username'
                            name='username'
                            type='text'
                            // value={state.username}
                            onChange={onChange}
                        /><br/>

                        <label className="text-yellow-300">Email</label><br/>
                        <input
                            className="rounded my-1 bg-gray-100 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
                            placeholder='Email Address'
                            name='email'
                            type='email'
                            // value={state.email}
                            onChange={onChange}
                        /><br/>

                        <label className="text-yellow-300">
                            Password
                        </label><br/>
                        <input
                            className="rounded my-1 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
                            name='password'
                            type='password'
                            // value={state.password}
                            onChange={onChange}
                        /><br/>

                        { userAuth.is_admin == true ? (
                            <div>
                                <input defaultChecked={true} id="admin"  name="admin" type="checkbox" value={userAuth.is_admin} onChange={onChangeAdmin} />
                                <label className="text-yellow-300 ml-2">Admin</label><br/>
                            </div>
                        ):(
                            <div>
                                <input id="admin" name="admin" type="checkbox" value={userAuth.is_admin} onChange={onChangeAdmin} />
                                <label className="text-yellow-300 ml-2">Admin</label><br/>
                            </div>
                        )}

                        <button type='submit' className='rounded bg-yellow-300 text-gray-900 py-1 px-4 mt-2'>
                            Create User
                        </button>
                </form>
            </div>
        </div>
    ) : (
        <div className="text-white ml-4"> Restricted Access </div>
    );
}

export default NewUser;

export async function getServerSideProps(context) {
    const session = await auth0.getSession(context.req);
    
    return {
        props: {
            user: session?.user || null,
        },
    };
}