import React, {useEffect} from 'react';
import Layout from "../../components/Layout/Layout";
import {Alert, Chip, CircularProgress, Container, Grid, Paper} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectGetImageLoading, selectImages} from "../../store/imageSlice";
import CardImage from "../../components/CardImage/CardImage";
import {getImages, removeImage} from "../../store/imageThunk";

const Home = () => {
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectImages);
  const loading = useAppSelector(selectGetImageLoading);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const removeImageOne = async (id: string) => {
    await dispatch(removeImage(id)).unwrap();
    await dispatch(getImages());
  };

  return (
    <Layout>
      <Container>
        <Chip
          sx={{my: 2, fontSize: '20px', p: 3}}
          label="Картинки"
          variant="outlined"
          color="info"
        />
        <Paper elevation={3} sx={{minHeight: '80vh', p: 1}}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {
              !loading ? (
                images.length !== 0 ? (
                  images.map((image) => (
                    <CardImage removeImageOne={() => removeImageOne(image._id)} key={image._id} image={image}/>
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

export default Home;