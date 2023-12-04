
import { FcGoogle } from 'react-icons/fc';
// import useAuth from '../../hooks/useAuth';

interface GoogleSignInProps {
    text: string;
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ text }) => {
    // const { signInWithGoogle} = useAuth();

    return (
        <>
            {/* //google signin g */}
            <div className="border-t border-gray-200 mt-6">
                <p className="text-center text-gray-400 py-4">OR </p>
                <div className="flex items-center space-x-3 justify-center border border-gray-300 rounded-lg w-full py-3 cursor-pointer hover:bg-gray-100" >
                    <FcGoogle className="w-6 h-6" />
                    <span className="poppins">{text}</span>
                </div>
            </div>
        </>
    )
}

export default GoogleSignIn