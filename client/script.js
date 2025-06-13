const sectionIds = ['notice-board', 'quick-links', 'student-corner'];

async function loadContent() {
  for (const id of sectionIds) {
    const res = await fetch(`/api/content/${id}`);
    const data = await res.json();
    document.getElementById(id).innerHTML = data.content;
  }
}
async function saveContent(id) {
  const token = localStorage.getItem('token');
  const content = document.getElementById(id).innerHTML;
  await fetch(`/api/content/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });
}
document.addEventListener('DOMContentLoaded', () => {
  loadContent();
  if (localStorage.getItem('token')) {
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      el.setAttribute('contenteditable', true);
      el.addEventListener('input', () => saveContent(id));
    });
  }
});