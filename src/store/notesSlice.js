import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNotes, createNote, updateNote, deleteNote, getNoteById } from '../services/noteService';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (userId) => {
  const response = await getNotes(userId);
  return response;
});

export const fetchNoteById = createAsyncThunk('notes/fetchNoteById', async ({ userId, noteId }) => {
  const response = await getNoteById(userId, noteId);
  return response;
});

export const addNote = createAsyncThunk('notes/addNote', async ({ userId, note }) => {
  const response = await createNote(userId, note);
  return response;
});

export const editNote = createAsyncThunk('notes/editNote', async ({ userId, noteId, note }) => {
  const response = await updateNote(userId, noteId, note);
  return response;
});

export const removeNote = createAsyncThunk('notes/removeNote', async ({ userId, noteId }) => {
  await deleteNote(userId, noteId);
  return noteId;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchNoteById.fulfilled, (state, action) => {
        return state.filter(note => note.id === action.payload.id);
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(editNote.fulfilled, (state, action) => {
        const index = state.findIndex(note => note.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(removeNote.fulfilled, (state, action) => {
        return state.filter(note => note.id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
