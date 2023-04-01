import React, {useState} from 'react';
import {Box, Button, CircularProgress, Grid, TextField} from "@mui/material";
import FileInput from "../FileInput/FileInput";
import {ImagesMutation} from "../../types";
import {useAppSelector} from "../../app/hooks";
import {selectImageError, selectPostImageLoading} from "../../store/imageSlice";

interface Props {
  onSubmit: (image: ImagesMutation) => void;
}

const Form:React.FC<Props> = ({onSubmit}) => {
  const [value, setValue] = useState<ImagesMutation>({
    title: '',
    image: null,
  });
  const loading = useAppSelector(selectPostImageLoading);
  const error = useAppSelector(selectImageError);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setValue(prev => ({...prev, [name]: value}));
  };

  const fileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target
    setValue(prev => ({...prev, [name]: files && files[0] ? files[0] : null}));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <Box component='form' onSubmit={onFormSubmit}>
      <Grid spacing={3} container>
        <Grid xs={12} item>
          <TextField
            name='title'
            value={value.title}
            onChange={onChange}
            id="outlined-basic"
            label="Название картинки..."
            variant="outlined"
            fullWidth
            required
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>
        <Grid xs={12} item>
          <FileInput
            onChange={fileInputChange}
            name='image'
            label='Выбрать картинку: '
            error={Boolean(getFieldError('image'))}
          />
        </Grid>
        <Grid xs={12} item>
          <Button type='submit' disabled={loading} variant='contained'>
            {!loading ? 'Создать картинку' : <CircularProgress/>}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;