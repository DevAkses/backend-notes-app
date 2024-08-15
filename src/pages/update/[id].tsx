import { GetServerSideProps } from 'next';
import axios from 'axios';
import NoteForm from '../../components/Note/NoteForm';

type Note = {
  title: string;
  body: string;
};

type UpdateNotePageProps = {
  initialData: Note;
  noteId: number;
};

const UpdateNotePage: React.FC<UpdateNotePageProps> = ({ initialData, noteId }) => {
  return <NoteForm initialData={initialData} noteId={noteId} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const response = await axios.get(`http://localhost:3000/api/notes?id=${id}`);
  return { props: { initialData: response.data, noteId: Number(id) } };
};

export default UpdateNotePage;
