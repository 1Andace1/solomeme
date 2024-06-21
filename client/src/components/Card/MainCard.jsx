import styles from './MainCard.module.css';
import {
  Avatar,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';
import { useState } from 'react';

export default function MainCard({ user, entry, setEntries }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState({
    name: entry?.name,
    description: entry?.description,
  });
  const [likes, setLikes] = useState(entry?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  const deleteHandler = async () => {
    if (user?.id === entry.userId) {
      const res = await axiosInstance.delete(
        `${import.meta.env.VITE_API}/whales/${entry.id}`
      );

      if (res.status === 200) {
        setEntries((prev) => prev.filter((el) => el.id !== entry.id));
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log('Сохраняем изменения:', editedEntry);
    try {
      const res = await axiosInstance.put(
        `${import.meta.env.VITE_API}/whales/${entry.id}`,
        editedEntry
      );

      if (res.status === 200) {
        console.log('Успешно сохранено:', res.data);
        setEntries((prev) =>
          prev.map((el) => (el.id === entry.id ? { ...el, ...editedEntry } : el))
        );
        setIsEditing(false);
      } else {
        console.error('Ошибка при сохранении:', res.status, res.data);
      }
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Изменение поля:', name, value);
    setEditedEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleLike = async () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Card bgColor='#313133' className={styles.container} maxW='sm'>
        <CardBody className={styles.body}>
          <Stack mt='3' spacing='3'>
            <img src={`http://localhost:3100/img/${entry?.image}.jpg`} />
            {isEditing ? (
              <FormControl>
                <FormLabel>Имя</FormLabel>
                <Input
                  Color="#3f3e3e"
                  name='name'
                  value={editedEntry.name}
                  onChange={handleChange}
                />
                <FormLabel>Описание</FormLabel>
                <Textarea
                  Color="#3f3e3e"
                  name='description'
                  value={editedEntry.description}
                  onChange={handleChange}
                />
              </FormControl>
            ) : (
              <>
                <Heading size='md'>{entry?.name}</Heading>
                <Text>{entry?.description}</Text>
              </>
            )}
          </Stack>
          <Stack mt='3' spacing='3'>
            <Avatar name={entry?.name} />
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
        <Button variant='solid' colorScheme='purple' onClick={handleLike} className={styles.likeButton}>
        ❤️{likes}
            </Button>
          <ButtonGroup spacing='2'>
            {isEditing ? (
              <Button variant='solid' colorScheme='green' onClick={handleSave}>
                Сохранить
              </Button>
            ) : (
              <Button isLoading={user?.id !== entry.userId} spinner={<p>Редактировать</p>}variant='solid' colorScheme='green' onClick={handleEdit}>
                Редактировать
              </Button>
            )}
            <Popover placement='top' className={styles.popover}>
              <PopoverTrigger>
                <Button
                  isLoading={user?.id !== entry.userId}
                  spinner={<p>Удалить</p>}
                  variant='solid'
                  colorScheme='red'
                >
                  Удалить
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  Вы действительно хотите удалить запись?
                </PopoverHeader>
                <PopoverBody>
                  <Button
                    onClick={deleteHandler}
                    variant='ghost'
                    colorScheme='blue'
                  >
                    Удалить
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}
