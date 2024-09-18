import React from 'react';

const NoteCard = ({ note, onDelete, onUpdate }) => {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div>
        <button onClick={() => onUpdate(note)}>Update</button>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
