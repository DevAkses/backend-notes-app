import {
  Box, Text, Button, IconButton, useToast, AlertDialog,
  AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
  AlertDialogContent, AlertDialogOverlay, Flex,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import Link from 'next/link';

type NoteCardProps = {
  id: number;
  title: string;
  body: string;
};

const NoteCard: React.FC<NoteCardProps> = ({ id, title, body }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await axios.delete('http://localhost:3000/api/notes', { data: { id } });
      toast({
        title: "Catatan berhasil dihapus.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push('/notes');
    } catch (error) {
      console.error('Failed to delete note:', error);
      toast({
        title: "Gagal menghapus catatan.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onClose = () => setIsDialogOpen(false);
  const onOpen = (event: React.MouseEvent) => {
    event.stopPropagation(); 
    setIsDialogOpen(true);
  };
  const onConfirmDelete = () => {
    setIsDialogOpen(false);
    handleDelete();
  };

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      p={4} 
      mb={4} 
      cursor="pointer"
    >
      <Link href={`/notes/${id}`} passHref>
        <Box>
          <Text fontSize="xl" fontWeight="bold">{title}</Text>
          <Text mt={2}>{body}</Text>
        </Box>
      </Link>
      {/* Menggunakan Flex untuk menyelaraskan tombol Edit dan ikon Delete */}
      <Flex mt={4} alignItems="center">
        <Button 
          colorScheme="teal" 
          onClick={(e) => { e.stopPropagation(); router.push(`/update/${id}`); }} 
        >
          Edit
        </Button>
        <IconButton
          aria-label="Delete note"
          icon={<DeleteIcon />}
          colorScheme="red"
          ml={4}
          onClick={(e) => { e.stopPropagation(); onOpen(e); }} 
        />
      </Flex>

      {/* AlertDialog untuk Konfirmasi Hapus */}
      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Hapus Catatan
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah Anda yakin ingin menghapus catatan ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Batal
              </Button>
              <Button colorScheme="red" onClick={onConfirmDelete} ml={3}>
                Hapus
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default NoteCard;
