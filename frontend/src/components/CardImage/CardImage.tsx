import React from 'react';
import {ImagesType} from "../../types";
import {
  Card,
  CardMedia,
  Grid,
  CardContent,
  Typography,
  CardActions,
  Paper,
  IconButton,
  CircularProgress
} from "@mui/material";
import {apiURl} from "../../constans";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/userSlice";
import {selectImageRemoveLoading} from "../../store/imageSlice";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  image: ImagesType;
}

const CardImage:React.FC<Props> = ({image}) => {
  const user = useAppSelector(selectUser);
  let removeBtn:React.ReactNode | null = null;
  const loadingRemove = useAppSelector(selectImageRemoveLoading);

  switch (user?.role) {
    case 'admin':
      removeBtn = (
        <IconButton disabled={loadingRemove} color='warning' aria-label="delete">
          {!loadingRemove ? <DeleteIcon /> : <CircularProgress/>}
        </IconButton>
      )
      break;
    case 'user':
      if (user?._id === image.user._id) {
        removeBtn = (
          <IconButton disabled={loadingRemove} color='warning' aria-label="delete">
            {!loadingRemove ? <DeleteIcon /> : <CircularProgress/>}
          </IconButton>
        )
      }
      break;
  }

  return (
    <>
      <Grid item xs={2} sm={4} md={4}>
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            sx={{ height: 200 }}
            image={apiURl + '/' + image.image}
            title="green iguana"
          />
          <CardContent>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  {image.title}
                </Typography>
              </Grid>

              <Grid item>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  {image.user.displayName}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Paper elevation={2}>
              {removeBtn}
            </Paper>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default CardImage;