const id = document.querySelector('#post-id').value;


const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const description = document.querySelector('#post-description').value.trim();

  console.log(title +' | ' +description);
  await fetch(`/api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: { 'Content-Type': 'application/json' },
    });
    document.location.replace('/dashboard');
  };

  const deleteBtnHandler = async ()=> {
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE'
    });
      document.location.replace('/dashboard');
    
  };

  
document 
  .querySelector('#update-button')
  .addEventListener('click', editFormHandler);

document
  .querySelector('#delete-button')
  .addEventListener('click', deleteBtnHandler);