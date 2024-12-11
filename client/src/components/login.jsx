import { Box, TextField, Button, styled, Typography} from '@mui/material'
import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginApi } from '../redux/features/authentication/authslice';


const Component = styled(Box)`
width: 400px;
margin: auto;
box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6) 
`

const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0',
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button {
        margin-top: 20px;
    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
    
`

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2873f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`

const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;
`

const Login = () => {

    // const imageURL = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.linkedin.com%2Fcompany%2Fgrras-solutions-p-ltd&psig=AOvVaw3iNkg9SvHdZaKp2H19QglP&ust=1733838505190000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKiMnvPpmooDFQAAAAAdAAAAABAE'

    const [account, toggleAccount] = useState('login');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const toggleSignup = () => {
       account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const handleChange = (e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSignup = async () => {
        if (!formData.name || !formData.email || !formData.password) {
          setError('Please fill in all fields');
          return;
        }
        try {
          await axios.post('/signup', formData);
          alert('Signup successful! Please login.');
          toggleAccount('login');
        } catch (error) {
          setError('Signup failed. Try again.');
        }
      };

      const handleLogin = async () => {
        if (!formData.email || !formData.password) {
          setError('Please fill in all fields');
          return;
        }
        dispatch(loginApi(formData))
      };

    return (
       <Component>
            <Box>
                {/* <Image src={imageURL} alt='login'/> */}
                {
                    account ==='login' ?
                        <Wrapper>
                            <TextField variant="standard" label="Enter Username" name='email' onChange={handleChange} />
                            <TextField variant="standard" label="Enter Password" name='password' onChange={handleChange}/>
                            <LoginButton variant="contained" onClick={handleLogin}>Login</LoginButton>
                            <Text style={{textAlign: 'center'}}>OR</Text>
                            <LoginButton onClick={() => toggleSignup('login')}> Already have an account </LoginButton>
                            
                        </Wrapper>
                    :
                    <Wrapper>
                        <TextField variant="standard" label="Enter Name" name='name' onChange={handleChange}  />
                        <TextField variant="standard"  label="Enter Username" name='email' onChange={handleChange}/>
                        <TextField variant="standard" label="Enter Password" name='password' onChange={handleChange}/>

                        <SignupButton onClick={handleSignup} >Signup</SignupButton>
                        <Text style={{textAlign: 'center'}}>OR</Text>
                        <SignupButton onClick={() => toggleSignup('signup')}> Create Account</SignupButton>
                    </Wrapper>
                }
            </Box>
        </Component> 
    )
}

export default Login;