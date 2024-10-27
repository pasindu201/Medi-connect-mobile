import React, { useState, useRef } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate(); 

  const handleLogin = () => {
    setError(''); 

    if (!email) {
      emailRef.current.focus();
      return;
    }
    if (!password) {
      passwordRef.current.focus();
      return;
    }

    console.log('Email:', email, 'Password:', password);
    if (email === "robert21@gmail.com" && password === "eXample&35") {
      localStorage.setItem('isLoggedIn', 'true'); // Store login status
      navigate('/main');
    } else {
      setError('Email or Password is incorrect');
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem('isLoggedIn')) {
      navigate('/main'); 
    }
  }, [navigate]);



  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '100px',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="80%"
        height="70vh"
        sx={{
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 className='text-3xl font-sansmat font-semibold'>MediConnect</h2>
        <h2 className='text-xl font-sansmat font-semibold'>Admin</h2>
        <Stack>
          <Avatar
            alt="logo"
            src="/logo.jpg"
            sx={{ width: 100, height: 100, border: '1px solid #ccc' }}
          />
        </Stack>

        <TextField
          inputRef={emailRef}
          type='email'
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          inputRef={passwordRef}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          height
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          style={{ marginTop: '10px' }}
        >
          Login
        </Button>

        
        {error && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ marginTop: '10px' }}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Login;
