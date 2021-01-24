import Profile from '../../components/users/Profile';
import { useRouter } from 'next/router';

export default function userProfile() {

    const router = useRouter();

    return (
        <div className="mx-44 mt-5">
            <Profile id={router.query.id}></Profile>
        </div>
    );
}


