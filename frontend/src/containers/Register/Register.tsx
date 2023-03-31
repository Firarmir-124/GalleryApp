import React, { useState } from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { RegisterMutation } from '../../types';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Layout from "../../components/Layout/Layout";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectRegisterError, selectRegisterLoading} from "../../store/userSlice";
import {googleLogin, register} from "../../store/userThunk";
import FileInput from "../../components/FileInput/FileInput";
import {GoogleLogin} from "@react-oauth/google";

const Register = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRegisterLoading);
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    displayName: '',
    avatar: null,
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState(prevState => ({...prevState, [name]: value}));
  };

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    setState(prev => ({...prev, [name]: files && files[0] ? files[0] : null}))
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    }catch (e) {
      console.log(e);
    }
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <>
      <Layout>
        <Container>
          <Box
            style={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3, width: '520px'}}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    autoComplete="new-username"
                    fullWidth
                    value={state.email}
                    onChange={inputChangeHandler}
                    error={Boolean(getFieldError('email'))}
                    helperText={getFieldError('email')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="DisplayName"
                    name="displayName"
                    autoComplete="new-username"
                    fullWidth
                    value={state.displayName}
                    onChange={inputChangeHandler}
                    error={Boolean(getFieldError('displayName'))}
                    helperText={getFieldError('displayName')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FileInput
                    onChange={fileChangeHandler}
                    name='avatar'
                    label='Avatar'
                    error={Boolean(getFieldError('avatar'))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    fullWidth
                    value={state.password}
                    onChange={inputChangeHandler}
                    error={Boolean(getFieldError('password'))}
                    helperText={getFieldError('password')}
                    required
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                disabled={loading}
              >
                {!loading ? 'Sign Up' : <CircularProgress size={27}/>}
              </Button>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Link component={RouterLink} to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
                <Grid item>
                  <GoogleLogin
                    size='small'
                    shape='circle'
                    onSuccess={(credentialResponse) => {
                      if (credentialResponse.credential) {
                        void googleLoginHandler(credentialResponse.credential);
                      }
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default Register;