import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import {Alert, Box, Button, Chip, CircularProgress, Container, Grid, Paper} from "@mui/material";
import CardImage from "../../components/CardImage/CardImage";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectGetImageLoading, selectImages} from "../../store/imageSlice";
import {getImages} from "../../store/imageThunk";
import {Link, useParams} from "react-router-dom";
import {selectUser} from "../../store/userSlice";

const ImagesUser = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectImages);
  const loading = useAppSelector(selectGetImageLoading);
  const [nameAuthor, setNameAuthor] = useState('');
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
      dispatch(getImages(id));
      const nameUser = images.find((item) => item.user._id === id);

      if (nameUser) {
        setNameAuthor(nameUser.user.displayName);
      }

    }
  }, [dispatch, id]);


  return (
    <Layout>
      <Container>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Chip
            sx={{my: 2, fontSize: '20px', p: 3}}
            label={"Картинки автора: " + nameAuthor}
            variant="outlined"
            color="info"
          />
          {
            user && user._id === id ? (
              <Button
                component={Link}
                variant='contained'
                to='/createImage'
              >
                Создать картинку</Button>
            ) : null
          }
        </Box>
        <Paper elevation={3} sx={{minHeight: '80vh', p: 1}}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
              !loading ? (
                images.length !== 0 ? (
                  images.map((image) => (
                    <CardImage key={image._id} image={image}/>
                  ))
                ) : <Grid item><Alert severity='info'>В данный момент картинок нет !</Alert></Grid>
              ) : <Grid item><CircularProgress/></Grid>
            }
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default ImagesUser;