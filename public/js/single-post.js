const cards = document.querySelectorAll('.project-card')

cards.forEach(card => {
  card.addEventListener('click', async event => {
  event.preventDefault();
  event.stopPropagation();

  const post_id = event.target.id;
    console.log(event.target);
  const query = '/api/post/'+post_id
    console.log(query);

  const response = await fetch(`/api/post/${post_id}`, {
    method: 'GET'
  })
  if (response.ok) {
    document.location.replace('/dashboard/edit');
  };
})
});