import { Alert, Button, Spinner, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearState,
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import  {axiosPrivate}  from '../axiosAPI/axios';

export default function SignIn() {
  const [formData, setFormData] = useState({});   
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(() => {
  dispatch(clearState()); 
}, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {   
      dispatch(signInStart());   
      const res = await axiosPrivate.post(`auth/signin`, formData);
      const { user, accessToken } = res.data;
      user.accessToken = accessToken;
      dispatch(signInSuccess(user));
      navigate('/', { replace: true })
    } catch (err) {
      if (err.response) {
        const errormsg = err.response.data.message || 'Something went wrong'
        dispatch(signInFailure(errormsg));
      } else {
        dispatch(signInFailure(err.message));
      }
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
          <span className="pr-2 bg-gradient-to-r orbitron from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Techbytes
            </span>
          </Link>
          <p className='text-sm mt-4'>
            Exploring the latest trends and innovations in technology
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <TextInput
                type='email'
                placeholder='Your email'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <TextInput
                type='password'
                placeholder='Your password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
