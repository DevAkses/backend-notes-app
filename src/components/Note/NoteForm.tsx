import { Box, Input, Textarea, Button, FormControl, FormLabel, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

type NoteFormProps = {
  initialData?: { title: string; body: string };
  noteId?: number;
};

const NoteForm: React.FC<NoteFormProps> = ({ initialData, noteId }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [body, setBody] = useState(initialData?.body || '');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const router = useRouter();

  const handleSave = async () => {
    try {
      if (noteId) {
        await axios.put('http://localhost:3000/api/notes', { id: noteId, title, body });
        toast({
          title: "Catatan berhasil diperbarui.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await axios.post('http://localhost:3000/api/notes', { title, body });
        toast({
          title: "Catatan berhasil ditambahkan.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      router.push('/notes'); 
    } catch (error) {
      console.error('Failed to save note:', error);
      toast({
        title: "Gagal menyimpan catatan.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onClose = () => setIsDialogOpen(false);
  const onOpen = () => setIsDialogOpen(true);

  const onConfirmSave = () => {
    setIsDialogOpen(false);
    handleSave();
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <form>
        <FormControl id="title" mb={4} isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl id="body" mb={4} isRequired>
          <FormLabel>Body</FormLabel>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </FormControl>
        <Button 
          type="button" 
          colorScheme="teal" 
          onClick={onOpen}
        >
          {noteId ? 'Update Note' : 'Add Note'}
        </Button>
      </form>

      {/* AlertDialog untuk Konfirmasi Simpan */}
      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {noteId ? 'Update Catatan' : 'Tambah Catatan'}
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah Anda yakin ingin {noteId ? 'memperbarui' : 'menambahkan'} catatan ini?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Batal
              </Button>
              <Button colorScheme="teal" onClick={onConfirmSave} ml={3}>
                {noteId ? 'Perbarui' : 'Tambah'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default NoteForm;
