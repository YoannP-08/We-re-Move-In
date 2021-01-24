import Router from 'next/router';
import React, { Component } from 'react';

class ProfileEdit extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            userUpd: '',
            userMongo: []
        }
    }

    async componentDidMount() {
        this.getUserMongoDB();

        await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${this.props.user.sub}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.AUTH0_BEARER_TOKEN
            },
        }).then(res => res.json())
        .then(res => this.setState({userUpd: res}))
        this.setState({
            username: this.state.userUpd.nickname,
            email: this.state.userUpd.email
        })
    }
    
    onChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
      
        try {
            if (this.state.password != '') {
                fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${this.props.user.sub}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Authorization": "Bearer " + process.env.AUTH0_BEARER_TOKEN
                    },
                    body: JSON.stringify({
                        nickname: this.state.username,
                        name: this.state.email,
                        // email: this.state.email,
                        password: this.state.password
                    })
                }).then(res => res.json());
                
                fetch(`/api/users/${this.state.userMongo[0]._id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        _id: this.state.userMongo[0]._id,
                        username: this.state.username,
                        email: this.state.email
                    })
                })
                Router.push('/users/profile/profile')
            } else {
                fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${this.props.user.sub}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Authorization": "Bearer " + process.env.AUTH0_BEARER_TOKEN
                    },
                    body: JSON.stringify({
                        nickname: this.state.username,
                        name: this.state.email,
                        email: this.state.email,
                    })
                }).then(res => res.json())

                fetch(`/api/users/${this.state.userMongo[0]._id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        _id: this.state.userMongo[0]._id,
                        username: this.state.username,
                        email: this.state.email
                    })
                })
                Router.push('/users/profile/profile')
            }
        } catch (error) {
            console.log(error);
        }

        // this.setState({
        //     username: '',
        //     email: '',
        //     password: ''
        // })
    }

    async getUserMongoDB() {
        await fetch('/api/users', {
            method: 'GET'
        }).then(body => body.json())
        .then(body => this.setState({ userMongo: body.data.filter(user => user.id_auth0 === this.props.user.sub)}))
    }

    render() {
        return (
            <div className="container mx-auto mt-10 p-4 rounded bg-gray-900 border border-yellow-300 w-1/2 flex flex-col items-center justify-center">
                <h1 className="text-yellow-300 mb-4">Update Profile</h1>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <label className="text-yellow-300">Username</label><br/>
                        <input
                        className="rounded my-1 bg-gray-100 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
                        placeholder='Username'
                        name='username'
                        type='text'
                        value={this.state.username}
                        onChange={this.onChange}
                    /><br/>
                    <label className="text-yellow-300">Email</label><br/>
                    <input
                        className="rounded my-1 bg-gray-100 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
                        placeholder='Email Address'
                        name='email'
                        type='email'
                        value={this.state.email}
                        onChange={this.onChange}
                    /><br/>
                    <label className="text-yellow-300">
                        Password
                    </label><br/>
                    <input
                        className="rounded my-1 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
                        name='password'
                        type='password'
                        value={this.state.password}
                        onChange={this.onChange}
                    /><br/>
                    <button type='submit' className='rounded bg-yellow-300 text-gray-900 py-1 px-4 mt-2'>
                        Update
                    </button>
                </form>
            </div>
        </div>

        )
    }
}

// const ProfileEdit = ({ user }) => {
//     const [username, setUsername] = useState(user.nickname);
//     const [email, setEmail] = useState(user.email);
//     const [password, setPassword] = useState('');
//     // const [errors, setErrors] = useState({});
//     // const router = useRouter();

//     // useEffect(() => {
//     //     if (Object.keys(errors).length === 0) {
//     //         updateProfile();
//     //     }
//     // }, [errors])

//     // const updateProfile = async () => {
//     //     event.preventDefault()
//     //     try {
//     //         console.log(form.username);
//     //         console.log(form.email);
//     //         console.log(form.paswword);

//     //         // const res = await fetch(`http://localhost:3000/api/notes/${router.query.id}`, {
//     //         //     method: 'PUT',
//     //         //     headers: {
//     //         //         "Accept": "application/json",
//     //         //         "Content-Type": "application/json"
//     //         //     },
//     //         //     body: JSON.stringify(form)
//     //         // })
//     //         // router.push("/users/profile/profile");
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(username)
//         console.log(email)
//         console.log(password)
//     }

//     email: e.target.value
//     const handleChange = (e) => {
//         setUsername(
//             e.target.value
//         )
//         setEmail(
//             e.target.value
//         )
//         setPassword(
//             e.target.value
//         )
//     }

//     // const validate = () => {
//     //     let err = {};
//     //     let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//     //     if (!form.username) {
//     //         err.username = 'Username is required.';
//     //     }
//     //     if (!form.email) {
//     //         err.email = 'Email address is required.';
//     //     }
//     //     if (!form.email.match(emailFormat)) {
//     //         err.email = 'Invalid email address.'
//     //     }

//     //     return err;
//     // }

//     return (
//         <div className="container mx-auto mt-10 p-4 rounded bg-gray-900 border border-yellow-300 w-1/2 flex flex-col items-center justify-center">
//             <h1 className="text-yellow-300 mb-4">Update Profile</h1>
//             <div>
//                 <form onSubmit={handleSubmit}>
//                     <label className="text-yellow-300">Username</label><br/>
//                     <input
//                         className="rounded my-1 bg-gray-100 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
//                         // fluid
//                         // error={errors.username ? { content: 'Username cannot be empty.', pointing: 'below' } : null}
//                         placeholder='Username'
//                         name='username'
//                         type='text'
//                         value={username}
//                         onChange={handleChange}
//                     /><br/>
//                     <label className="text-yellow-300">Email</label><br/>
//                     <input
//                         className="rounded my-1 bg-gray-100 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
//                         // fluid
//                         // error={errors.email ? { content: 'Email cannot be empty.', pointing: 'below' } : null}
//                         placeholder='Email Address'
//                         name='email'
//                         type='email'
//                         value={email}
//                         onChange={handleChange}
//                     /><br/>
//                     <label className="text-yellow-300">
//                         Password
//                     </label><br/>
//                     <input
//                         className="rounded my-1 py-1 px-3 font-medium placeholder-gray-700 focus:outline-none"
//                         // fluid
//                         // error={errors.password ? { content: 'Password is required', pointing: 'below' } : null}
//                         name='password'
//                         type='password'
//                         value={password}
//                         onChange={handleChange}
//                     /><br/>
//                     <button type='submit' className='rounded bg-yellow-300 text-gray-900 py-1 px-4 mt-2'>
//                         Update
//                     </button>
//                 </form>
//             </div>
//         </div>
//     )
// }

export default ProfileEdit;