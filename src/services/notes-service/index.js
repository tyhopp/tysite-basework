class NotesService {

  getNotes() {
    return fetch('', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: query,
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }
}

export default new NotesService();