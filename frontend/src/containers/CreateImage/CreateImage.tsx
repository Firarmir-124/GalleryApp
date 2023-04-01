import React from 'react';
import Layout from "../../components/Layout/Layout";
import {Chip, Container, Paper} from "@mui/material";
import Form from "../../components/Form/Form";
import {ImagesMutation} from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {createImage} from "../../store/imageThunk";
import {useNavigate} from "react-router-dom";

const CreateImage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (image: ImagesMutation) => {
    await dispatch(createImage(image)).unwrap();
    navigate('/');
  };

  return (
    <Layout>
      <Container>
        <Chip
          sx={{my: 2, fontSize: '20px', p: 3}}
          label='Создать картинку'
          variant="outlined"
          color="info"
        />
        <Paper elevation={3} sx={{minHeight: '80vh', p: 1}}>
          <Form onSubmit={onSubmit}/>
        </Paper>
      </Container>
    </Layout>
  );
};

export default CreateImage;