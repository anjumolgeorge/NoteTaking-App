import React, { useState, useEffect } from "react";

interface TitleProps {
  onAdd: (note: { title: string; content: string }) => void;
  note?: { title: string; content: string };
}

export default function Title({ onAdd, note }: TitleProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    onAdd({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg ">
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title"
          className="border-2 max-w-md"
        />
      </div>
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full p-2 border rounded-lg h-32"
        />
      </div>
      <button type="submit" className="bg-gray-500 text-white p-3 rounded-lg w-full">
        {note ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
