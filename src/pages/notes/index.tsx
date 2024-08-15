import { Box, Text, Stack, Heading, Center, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from '../../components/Note/NoteCard';

type Note = {
  id: number;
  title: string;
  createdAt: string;
  body: string;
};

const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  return (
    <Box padding="4">
      <Heading as="h2" size="lg" mb={4}>Daftar Catatan</Heading>
      {notes.length === 0 ? (
        <Text fontSize="xl" color="gray.500">Tidak ada catatan</Text>
      ) : (
        <Stack spacing={4}>
          {notes.map((note) => (
            <NoteCard 
              key={note.id} 
              id={note.id} 
              title={note.title} 
              body={note.body} 
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default NotesList;
