import axios from "axios";
import { useState } from "react";

const API_URL = "https://scribble-7qcp.onrender.com/notes";

const App = () => {
  const [note, setNote] = useState("");
  const [heading, setHeading] = useState("");
  const [message, setMessage] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [name, setName] = useState("");
  async function handleSave() {
    const trimmedName = name.trim();
    const trimmedHeading = heading.trim();
    const trimmedNote = note.trim();

    if (trimmedHeading.length > 20) {
      setMessage("Heading should not exceed 20 characters");
      return;
    }

    try {
      const responsePost = await axios.post(`${API_URL}/create-note`, {
        name: trimmedName,
        heading: trimmedHeading,
        content: trimmedNote,
      });

      setHeading("");
      setNote("");
      setMessage("Notes Saved");

      await handleGet(trimmedName);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to save note");
    }
  }

  async function handleGet(searchName = name) {
    const trimmedName = searchName.trim();

    if (!trimmedName) {
      setMessage("Enter your name to get notes");
      return;
    }

    try {
      const responseGet = await axios.get(
        `${API_URL}/get-note/${encodeURIComponent(trimmedName)}`,
      );

      setAllNotes(responseGet.data.notes || []);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to fetch notes");
    }
  }
  return (
    <div>
      <div className="nav">
        <h2 id="scribble-nav">Scribble</h2>
        <nav id="navbar">
          <a href="#" id="home-link">
            Home
          </a>
          <a
            href="#allNotes"
            id="all-notes-link"
            onClick={(event) => {
              event.preventDefault();
              handleGet();
            }}
          >
            All Notes
          </a>
          <a href="#" id="create-note-link">
            Create Note
          </a>
        </nav>
      </div>

      <div className="container">
        <h1 id="scribble">Notes</h1>

        <div className="inputs">
          <div className="header">
            <input
              type="text"
              name=""
              id="name"
              value={name}
              placeholder="Your Name"
              onChange={(eve) => {
                setName(eve.target.value);
              }}
            />
            <input
              placeholder="Your Heading"
              type="text"
              name="heading"
              id="heading"
              value={heading}
              onChange={(event) => {
                const nextValue = event.target.value;

                if (nextValue.length > 20) {
                  alert("Heading should not exceed 20 characters");
                  return;
                }


                setHeading(nextValue);
              }}
            />
          </div>

          <br />

          <div className="textarea-wrapper">
            <textarea
              placeholder="Your Note"
              name="note"
              id="note"
              value={note}
              onChange={(event) => {
                const nextValue = event.target.value;

                setNote(nextValue);
              }}
            ></textarea>
          </div>
        </div>

        <button type="button" onClick={handleSave} id="Save">
          Save
        </button>

        <h1 id="message">{message && <p>{message}</p>}</h1>
      </div>

      <div className="part-2">
        <div id="allNotes">
          {allNotes.map((singleNote) => (
            <div key={singleNote._id} className="Note">
              <h2>{singleNote.heading}</h2>
              <p>{singleNote.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
