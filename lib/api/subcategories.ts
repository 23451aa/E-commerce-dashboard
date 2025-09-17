export async function getSubcategories() {
  const res = await fetch('/api/subcategories');
  return res.json();
}

export async function createSubcategory(data: {
  name: string;
  parentCategoryId: string;
  image: string;
}) {
  const res = await fetch('/api/subcategories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateSubcategory(id: string, data: {
  name: string;
  parentCategoryId: string;
  image: string;
}) {
  const res = await fetch(`/api/subcategories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteSubcategory(id: string) {
  const res = await fetch(`/api/subcategories/${id}`, { method: 'DELETE' });
  return res.json();
}
