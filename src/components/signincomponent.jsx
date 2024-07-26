import { MdMailOutline, MdLockOutline } from 'react-icons/md';

const SignIn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue to-background">
      <div className="relative p-8 bg-black/15 rounded-3xl shadow-lg w-full max-w-md">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <form className="relative space-y-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="username" className="flex items-center justify-center w-8 h-8 bg-gray-200 cursor-pointer rounded-full">
              <MdMailOutline className="text-gray-600" />
            </label>
            <input id="email" className="flex-1 p-4 border-none text-gray-600 text-lg placeholder-gray-400 rounded-lg outline-none transition-transform duration-150 transform focus:scale-105" placeholder="Email" type="text" />
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="password" className="flex items-center justify-center w-8 h-8 bg-gray-200 cursor-pointer rounded-full">
              <MdLockOutline className="text-gray-600" />
            </label>
            <input id="password" className="flex-1 p-4 border-none text-gray-600 text-lg placeholder-gray-400 rounded-lg outline-none transition-transform duration-150 transform focus:scale-105" placeholder="Password" type="password" />
          </div>
          <input className="w-full p-4 bg-gradient-to-r from-blue to-blue-100 text-white font-semibold text-sm rounded-lg cursor-pointer transition-transform duration-150 transform focus:scale-105" type="submit" value="LOGIN" />
        </form>
        <div className="flex justify-center items-center text-xs mt-4">
          <span className="text-primary">New User?</span>
          <a href="#" className="text-blue-300 hover:font-bold focus:font-bold ml-1">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
