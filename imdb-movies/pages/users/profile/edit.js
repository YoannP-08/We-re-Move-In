import auth0 from '../../../utils/auth0';
import ProfileEdit from '../../../components/users/ProfileEdit';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const EditProfile = ({ user }) => {
    const router = useRouter();

    useEffect( async () => {
        if (!user) {
            router.push('/api/auth/login')
        }
    }, [])

    return user ? (
        <div>
            <ProfileEdit user={user}></ProfileEdit>
        </div>
    ) : (
        <div></div>
    );
}

export default EditProfile;

export async function getServerSideProps(context) {
    const session = await auth0.getSession(context.req);
    
    return {
        props: {
            user: session?.user || null,
        },
    };
}