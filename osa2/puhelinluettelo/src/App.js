import { useState, useEffect } from "react";
import personService from "./services/persons";

const Error = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="info">{message}</div>;
};

const Filter = (props) => {
  return (
    <div>
      filter shown with: &nbsp;
      <input value={props.newFilter} onChange={props.handleFilter} />
    </div>
  );
};

const Name = (props) => {
  return (
    <li>
      {props.name} {props.number} &nbsp; &nbsp;
      <button className="btn" onClick={props.push2Delete}>
        Delete contact
      </button>
    </li>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: &nbsp;&nbsp; &nbsp;
        <input onChange={props.handleName} value={props.newName} />
      </div>{" "}
      <br />
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumber} />
      </div>
      <br />
      <div>
        <button className="btn" type="submit">
          Add
        </button>
        <br />
        <br />
      </div>
    </form>
  );
};

const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setNameFilter] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [infoMessage, setInfoMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialList) => {
      setPersons(initialList);
      setNameFilter(initialList);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const index = persons.findIndex((person) => person.name === newName);

    if (index > -1) {
      const update = window.confirm(
        `${newName} already in phonebook, replace the old number?`
      );
      if (!update) return;

      const updatedContact = persons[index];
      updatedContact.number = newNumber;

      const copyOfPersons = persons;
      copyOfPersons.splice(index, 1, updatedContact);

      personService
        .update(updatedContact)
        .then((returnedObj) => {
          setInfoMessage(
            `Notice! ${updatedContact.name}'s phonenumber was updated.`
          );
          setTimeout(() => {
            setInfoMessage(null);
          }, 5000);
          setPersons(copyOfPersons);
          setNameFilter(copyOfPersons);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${updatedContact.name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(copyOfPersons);
          setNameFilter(copyOfPersons);
          setNewName("");
          setNewNumber("");
        });
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
      };

      personService.create(newContact).then((returnedObj) => {
        console.log(returnedObj);
        setInfoMessage(`Notice! ${newName} was added to your phonebook.`);
        setTimeout(() => {
          setInfoMessage(null);
        }, 5000);

        setPersons(persons.concat(returnedObj));
        setNameFilter(persons.concat(returnedObj));
        setNewFilter("");
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameFilter = (event) => {
    console.log(event.target.value);
    const lowerCaseFilter = event.target.value.toLowerCase();
    const newFilteredList = persons.filter(function (person) {
      return person.name.toLowerCase().includes(lowerCaseFilter);
    });
    setNameFilter(newFilteredList);
    setNewFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  //console.log("rendering...", filteredNames);

  const pushToDelete = (id) => {
    const erase = window.confirm("Delete? Really?");
    if (!erase) return;
    personService.erase(id).then((returnedObj) => {
      const contactsLeft = persons.filter((p) => p.id !== id);
      const index = persons.findIndex((person) => person.id === id);

      setInfoMessage(
        `Notice! ${persons[index].name} was removed from your phonebook.`
      );
      setTimeout(() => {
        setInfoMessage(null);
      }, 5000);

      setPersons(contactsLeft);
      setNameFilter(contactsLeft);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Error message={errorMessage} />
      <Filter newFilter={newFilter} handleFilter={handleNameFilter} />

      <h3>Add new contact</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleName={handleNameChange}
        newNumber={newNumber}
        handleNumber={handleNumberChange}
      />
      <Notification message={infoMessage} />
      <h3>Numbers</h3>
      <ul>
        {filteredNames.map((person) => (
          <Name
            key={person.id}
            name={person.name}
            number={person.number}
            push2Delete={() => pushToDelete(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
