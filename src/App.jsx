import { useState, useEffect } from 'react'
// import axios from 'axios'
import services from './assets/person'

const Name = (props) => {
  // console.log(props)
  const { person, onDelete } = props;
  if (!person) {
    return null;
  }
  else {
    return (
      <li>{person.name} with Ph.No : {person.number}  <button onClick={() => onDelete(person.name)}>Delete</button></li>
    )
  }
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 32
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Phonebook App, Department of Mechanical Eng.. IIT BHILAI</em>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [nextPhoneNumber, setNextPhoneNumber] = useState();
  const [filter, setFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const deleteName = (nameToDelete) => {
    const confirm = window.confirm(`Are you sure to delete ${nameToDelete} !!`)
    if (confirm) {
      setPersons(persons.filter(person => person.name !== nameToDelete));
      setErrorMessage(
        `Note '${nameToDelete}' Deleted Succesfully !`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }

  };

  // const toggleImportanceOf = id => {
  //   const number = persons.find(n => n.id === id)
  //   const changednumber={ ...number, number:  }
  //   services
  //     .update(id, changedNote)
  //     .then(response => {
  //       setNextPhoneNumber(persons.map(note => note.id !== id ? note : response))
  //     })
  // }


  useEffect(() => {
    console.log('effect');
    services
      .getAll()
      .then(response => {
        // console.log('promise fulfilled');
        if (Array.isArray(response)) {
          setPersons(response);
          setErrorMessage(
            `All Note are Added to your Server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        } else {
          console.error('Data from the API is not an array.');
        }
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      });
  }, []);



  const addName = (event) => {
    event.preventDefault()
    const flag = persons.some((person) => person.name === newName);
    if (flag) {
      setErrorMessage(
        `ERROR:  Note '${newName}' already exist in your Phonebook !!`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
    else {
      const nameObject = {
        name: newName,
        number: nextPhoneNumber,
      }
      services
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNextPhoneNumber('')
        })
        setErrorMessage(
          `New person'${newName}' Added to your Phonebook!!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNextPhoneNumber(event.target.value);
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <div>
        Search For Existing people:
        <input
          value={filter}
          onChange={handleFilterChange}
          placeholder='Search By Name'
        />
      </div>
      <h1>Add a New</h1>
      <form onSubmit={addName}>
        <div>
          name:
          <input value={newName}
            onChange={handleNameChange}
            placeholder='Name'
          />
        </div>
        <div>
          number:
          <input value={nextPhoneNumber}
            onChange={handleNumberChange}
            placeholder='Ph.Number'
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Name and Numbers of persons are as :</h2>
      <ul>
        {persons
          .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((person) => (
            <Name key={person.name} person={person} onDelete={deleteName} />
          ))}
        {/* {persons.map((person) =>
          <Name person={person} />
        )} */}
      </ul>
      <Footer />
    </div>
  )
}

export default App