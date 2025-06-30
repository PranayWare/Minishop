// public/script.js
document.getElementById('product-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const category = document.getElementById('category').value;

  await fetch('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price, category })
  });

  loadProducts();
});

async function loadProducts() {
  const res = await fetch('/products');
  const products = await res.json();
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach((p) => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerText = `${p.name} - ₹${p.price} [${p.category}]`;
    container.appendChild(div);
  });
}

loadProducts();
