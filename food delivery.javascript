// Get menu items from server
fetch('https://example.com/menu')
  .then(response => response.json())
  .then(menuItems => {
    // Display menu items on page
    const menu = document.getElementById('menu');
    menu.innerHTML = '';

    for (let i = 0; i < menuItems.length; i++) {
      const menuItem = menuItems[i];

      const itemHTML = `
        <li>
          <img src="${menuItem.image}" alt="${menuItem.name}">
          <h3>${menuItem.name}</h3>
          <p>${menuItem.description}</p>
          <p>$${menuItem.price.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${menuItem.id}">Add to cart</button>
        </li>
      `;

      menu.innerHTML += itemHTML;
    }

    // Add event listeners to add-to-cart buttons
    const addToCartButtons = document.getElementsByClassName('add-to-cart');
    for (let i = 0; i < addToCartButtons.length; i++) {
      const button = addToCartButtons[i];
      button.addEventListener('click', addToCart);
    }
  });

// Initialize cart
let cart = [];

// Add item to cart
function addToCart(event) {
  const id = parseInt(event.target.getAttribute('data-id'));
  const menuItem = getMenuitemById(id);

  if (!menuItem) {
    console.error('Menu item not found');
    return;
  }

  const cartItem = {
    id: menuItem.id,
    name: menuItem.name,
    price: menuItem.price,
    quantity: 1
  };

  // Check if item is already in cart
  const existingCartItemIndex = cart.findIndex(item => item.id === cartItem.id);
  if (existingCartItemIndex >= 0) {
    // Item is already in cart, so just increase quantity
    cart[existingCartItemIndex].quantity++;
  } else {
    // Item is not yet in cart, so add it
    cart.push(cartItem);
  }

  updateCart();
}

// Get menu item by ID
function getMenuitemById(id) {
  // Assume menuItems array is already loaded
  return menuItems.find(item => item.id === id);
}

// Update cart display
function updateCart() {
  const cartCount = document.getElementById('cart-count');
  cartCount.innerText = cart.length;

  const cartItemsList = document.getElementById('cart-items');
  cartItemsList.innerHTML = '';

  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const cartItem = cart[i];

    const itemHTML = `
      <li>
        <span>${cartItem.quantity}x ${cartItem.name}</span>
        <span>$${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
      </li>
    `;

    cartItemsList.innerHTML += itemHTML;

    total += cartItem.price * cartItem.quantity;
  }

  const cartTotal = document.getElementById('cart-total');
  cartTotal.innerText = `$${total.toFixed(2)}`;
}