const post_id = document.querySelector('.editPost-form').nodeValue;

const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-post').value.trim;
  const description = document.querySelector('#description-post').value.trim();

  await fetch(`api/post/${post_id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: { 'Content-Type': 'application/json' },
    });
    document.location.replace('/dashboard');
  };

  const deleteFormHandler = async ()=> {
    await fetch(`api/post/${post_id}`, {
      method: 'DELETE'
    });
    document.location.replace('/dashboard');
  }
document 
  .querySelector('#update-button')
  .addEventListener('click', editFormHandler);

document
  .querySelector('#delete-button')
  .addEventListener('click', deleteFormHandler);