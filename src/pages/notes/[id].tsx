import { Box, Text, Heading, Button, Spinner, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type Note = {
  id: number;
  title: string;
  createdAt: string;
  body: string;
};

const NoteDetail = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/notes?id=${id}`);
          setNote(response.data);
        } catch (error) {
          console.error('Failed to fetch note:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchNote();
    }
  }, [id]);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  if (!note) {
    return (
      <Center height="100vh">
        <Text>Catatan tidak ditemukan.</Text>
      </Center>
    );
  }

  return (
    <Box padding="4">
      <Heading as="h2" size="lg" mb={4}>{note.title}</Heading>
      <Text fontSize="sm" color="gray.500">
        Dibuat pada: {new Date(note.createdAt).toLocaleDateString()}
      </Text>
      <Text mt={4}>{note.body}</Text>
      <Link href="/notes" passHref>
        <Button mt={4} colorScheme="teal">Kembali ke Daftar Catatan</Button>
      </Link>
    </Box>
  );
};

export default NoteDetail;
