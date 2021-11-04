const loginFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-post').value.trim();
  const description = document.querySelector('#description-post').value.trim();

  if (title && description) {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post.');
    }
  }
};


document
  .querySelector('.createPost-form')
  .addEventListener('submit', loginFormHandler);