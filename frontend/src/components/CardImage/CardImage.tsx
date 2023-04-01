import React, {useState} from 'react';
import {ImagesType} from "../../types";
import {
  Card,
  CardMedia,
  Grid,
  CardContent,
  CardActions,
  Paper,
  IconButton,
  CircularProgress, Dialog, DialogContent, DialogActions, Button, Chip
} from "@mui/material";
import {apiURl} from "../../constans";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/userSlice";
import {selectImageRemoveLoading} from "../../store/imageSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";
import {linksStyle} from "../Layout/Layout";
import FaceIcon from '@mui/icons-material/Face';

interface Props {
  image: ImagesType;
}

const CardImage:React.FC<Props> = ({image}) => {
  const [open, setOpen] = useState(false);
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
            onClick={() => setOpen(true)}
          />
          <CardContent>
            <Chip
              label={image.title}
              color="info"
              sx={{fontSize: '20px', width: '100%'}}
              onClick={() => setOpen(true)}
            />
            {
              image.user.displayName ? (
                <Chip
                  component={Link}
                  style={linksStyle} to={'/imagesUser/' + image.user._id}
                  icon={<FaceIcon />}
                  label={image.user.displayName}
                  variant="outlined"
                  color="info"
                  sx={{fontSize: '20px', cursor: 'pointer', mt: '10px'}}
                />
              ) : null
            }
          </CardContent>
          <CardActions>
            <Paper elevation={2}>
              {removeBtn}
            </Paper>
          </CardActions>
        </Card>
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <CardMedia
            sx={{ height: '500px', width: '500px' }}
            image={apiURl + '/' + image.image}
            title="green iguana"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardImage;