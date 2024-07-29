"use client";

import React, { useState } from "react";
import Title from "./Title";

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showTitle, setShowTitle] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const addNotes = (newNote: { title: string; content: string }) => {
    const id = new Date().getTime();
    setNotes((prevNotes) => [...prevNotes, { ...newNote, id }]);
  };

  const showFile = () => {
    setShowTitle((prevShowTitle) => !prevShowTitle);
    setCurrentNote(null);
  };

  const handleDelete = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleEdit = (note: Note) => {
    setCurrentNote(note);
    setShowTitle(true);
  };

  const updateNote = (updatedNote: { title: string; content: string }) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === currentNote?.id ? { ...note, ...updatedNote } : note
      )
    );
    setCurrentNote(null);
    setShowTitle(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={showFile}
        className="bg-gray-500 text-white p-3 rounded-lg mb-6"
      >
        {showTitle ? "Close" : "Create"}
      </button>
      {showTitle && (
        <Title
          onAdd={currentNote ? updateNote : addNotes}  
          note={currentNote}
        />
      )}
      <div className="notes-list grid grid-cols-1 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="note bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
            <p className="text-gray-700 mb-4">{note.content}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDelete(note.id)}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(note)}
                className="bg-green-500 text-white p-2 rounded-lg"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
