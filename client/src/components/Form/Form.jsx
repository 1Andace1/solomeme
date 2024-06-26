import { useState } from 'react';
import styles from './Form.module.css';
import { Input, Button, FormControl, FormLabel, Box, Image } from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';

const { VITE_API } = import.meta.env;

export default function Form({ user, setEntries }) {
  const [inputs, setInputs] = useState({ name: '', description: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const imageHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', inputs.name);
    formData.append('description', inputs.description);
    formData.append('user', user.id);
    if (image) {
      formData.append('avatar', image);
    }

    try {
      const res = await axiosInstance.post(`${VITE_API}/whales`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.status === 200) {
        setEntries((prev) => [...prev, res.data]);
        setInputs({ name: '', description: '' });
        setImage(null);
        setImagePreview(null);
        e.target.reset(); // Очистка формы
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Скрыть' : 'Добавить'}
      </button>
      {isFormVisible && (
        <form onSubmit={submitHandler} className={styles.wrapper} encType="multipart/form-data">
          <h3 className={styles.head}>Добавь свой мем:</h3>
          <div className={styles.inputs}>
            <FormControl>
              <FormLabel>Выберите изображение</FormLabel>
              <Input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={imageHandler}
                display="none"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  borderStyle="dashed"
                  p={4}
                  textAlign="center"
                  cursor="pointer"
                >
                  {imagePreview ? (
                    <Image src={imagePreview} alt="Preview" maxH="200px" objectFit="cover" />
                  ) : (
                    'Загрузить изображение'
                  )}
                </Box>
              </label>
            </FormControl>
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              name="name"
              value={inputs.name}
              placeholder="Имя"
            />
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              name="description"
              value={inputs.description}
              placeholder="Описание"
            />
          </div>
          <div className={styles.btns}>
            <Button type="submit" colorScheme="blue">
              Создать
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}