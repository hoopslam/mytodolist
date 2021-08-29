import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8000/notes");
      const data = await res.json();
      setNotes(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });

    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div key={note.id} className="my-masonry-grid-column-div">
            <NoteCard note={note} handleDelete={handleDelete}>
              {note.title}
            </NoteCard>
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
