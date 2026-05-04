'use client';

import css from './NotePreview.module.css';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const close = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error) return <p>Something went wrong.</p>;

  return (
    note &&
    !isLoading && (
      <Modal onClose={close}>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
            <button className={css.backBtn} onClick={close}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    )
  );
}
