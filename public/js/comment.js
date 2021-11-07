const commentFormHandler = async function(event) {
  event.preventDefault();

  const user_id = document.querySelector('#user_id').value;
  const post_id = document.querySelector('#post_id').value;
  let description = document.querySelector('#comment').value;

  if (description) {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        user_id,
        post_id,
        description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    document.querySelector('#comment').value = '';
    document.location.reload();
  }
};


document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);

