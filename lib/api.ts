import axios from 'axios';
import type { Note, NewNote } from '../types/note';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export const fetchNotes = async (searchText: string, page: number): Promise<NotesHttpResponse> => {
  const config = {
    params: {
      search: searchText,
      page,
      perPage: 12,
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  };

  const res = await axios.get<NotesHttpResponse>('/notes', config);
  return res.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const config = {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  };

  const res = await axios.get<Note>(`/notes/${noteId}`, config);
  return res.data;
};

export const createNote = async (newNote: NewNote) => {
  const config = {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  };

  const res = await axios.post<Note>('/notes', newNote, config);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  };

  const res = await axios.delete<Note>(`/notes/${noteId}`, config);
  return res.data;
};
