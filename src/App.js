import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 1,
      name: "",
      number: "",
      contacts: [],
      contact: { id: "", name: "", number: "" },
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
  }

  setOpen(contact) {
    this.setState({ open: true, contact });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleEditChange(e) {
    let contact = this.state.contact;
    this.setState({ contact: { ...contact, [e.target.name]: e.target.value } });
    console.log(
      "ans",
      e.target.name,
      e.target.value,
      "one",
      this.state.contact
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    let newContact = {
      id: this.state.id,
      name: this.state.name,
      number: this.state.number,
    };
    let currentContacts = [...this.state.contacts];
    let currId = Number(this.state.id);
    this.setState({
      contacts: [...currentContacts, newContact],
      id: currId + 1,
      name: "",
      number: "",
    });
  }

  handleDelete(id) {
    let newContacts = [...this.state.contacts].filter((contact) => {
      return contact.id !== id;
    });
    this.setState({ contacts: newContacts });
  }

  handleEdit() {
    let contacts = [...this.state.contacts].map((contact) => {
      if (contact.id === this.state.contact.id) {
        return { ...this.state.contact };
      } else {
        return contact;
      }
    });

    this.setState({ contacts: contacts, contact: {}, open: false });
  }

  render() {
    let modal = this.state.open ? "block" : "none";
    const contacts = this.state.contacts.sort((a, b) => {
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    return (
      <div id="contacts">
        <h1 style={{ margin: "20px" }}> 📖 My Phone Book</h1>
        <div className="modal" style={{ display: modal }}>
          <div className="content">
            <div className="header">
              <h3>Edit Contact</h3>
            </div>
            <div>
              <div className="addForm">
                <input
                  name="name"
                  type="text"
                  placeholder="Name.."
                  value={this.state.contact.name}
                  onChange={this.handleEditChange}
                />

                <input
                  name="number"
                  type="number"
                  placeholder="Number.."
                  value={this.state.contact.number}
                  onChange={this.handleEditChange}
                />

                <button onClick={this.handleEdit}>Save</button>
              </div>
            </div>
          </div>
        </div>
        <div className="addForm">
          <input
            name="name"
            type="text"
            value={this.state.name}
            placeholder="Name.."
            onChange={this.handleChange}
          />
          <input
            name="number"
            type="number"
            value={this.state.number}
            placeholder="Number.."
            onChange={this.handleChange}
          />
          <button type="submit" onClick={this.handleSubmit}>
            ➕ Add
          </button>
        </div>

        {contacts.length ? (
          <table>
            <tr>
              <th> </th>
              <th>Name</th>
              <th>Number</th>
              <th> </th>
            </tr>
            {contacts.map((contact) => {
              return (
                <tr key={contact.id}>
                  <td>
                    <button onClick={() => this.setOpen(contact)}>🖊️</button>
                  </td>
                  <td>👤 {contact.name} </td>
                  <td>☎️ {contact.number} </td>
                  <td>
                    <button onClick={() => this.handleDelete(contact.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        ) : (
          <h3 style={{ margin: "20px" }}>Please add a Contact</h3>
        )}
      </div>
    );
  }
}
