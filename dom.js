document.addEventListener("DOMContentLoaded", function () {
    const itemList = document.getElementById("item-list");
    const likeButtons = document.querySelectorAll(".like-button");
    const removeButtons = document.querySelectorAll(".remove-button");
    const incrementButtons = document.querySelectorAll(".increment");
    const decrementButtons = document.querySelectorAll(".decrement");
    const quantityElements = document.querySelectorAll(".quantity");
    const itemPrices = document.querySelectorAll(".item-price");
    const totalPriceElement = document.querySelector(".total-price");
  
    // Initialize total price
    let totalPrice = 0;
  
    // Update the total price
    function updateTotalPrice() {
      totalPrice = 0;
      itemPrices.forEach((price, index) => {
        totalPrice += parseFloat(price.textContent.replace("$", "")) * parseInt(quantityElements[index].textContent);
      });
      totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }
  
    // Event listener for like buttons
    likeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        button.classList.toggle("liked");
      });
    });
  
    // Event listener for remove buttons
    removeButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
        itemList.removeChild(itemList.children[index]);
        updateTotalPrice();
      });
    });
  
    // Event listeners for increment and decrement buttons
    incrementButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
        const currentQuantity = parseInt(quantityElements[index].textContent);
        quantityElements[index].textContent = currentQuantity + 1;
        updateTotalPrice();
      });
    });
  
    decrementButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
        const currentQuantity = parseInt(quantityElements[index].textContent);
        if (currentQuantity > 1) {
          quantityElements[index].textContent = currentQuantity - 1;
          updateTotalPrice();
        }
      });
    });
  
    // Initial total price calculation
    updateTotalPrice();
  });

  document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart');
    const totalElement = document.getElementById('total');
    let total = 0;
  
    // Sample data for cart items
    const cartItems = [
      { id: 1, name: 'Item 1', price: 10.00, quantity: 2 },
      { id: 2, name: 'Item 2', price: 15.00, quantity: 1 },
      // Add more items as needed
    ];
  
    // Function to render cart items
    function renderCart() {
      // Clear existing items
      cartContainer.innerHTML = '';
  
      // Render each item in the cart
      cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
  
        // Create and configure delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.addEventListener('click', () => deleteItem(item.id));
  
        // Create and configure increase button
        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => increaseQuantity(item.id));
  
        // Create and configure quantity input
        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.value = item.quantity;
        quantityInput.addEventListener('input', (e) => updateQuantity(item.id, e.target.value));
  
        // Create and configure heart icon
        const heartIcon = document.createElement('span');
        heartIcon.classList.add('heart-icon', item.liked ? 'active' : '');
        heartIcon.innerHTML = ' &#10084;';
        heartIcon.addEventListener('click', () => toggleLike(item.id));
  
        // Create and configure item details
        const itemDetails = document.createElement('div');
        itemDetails.textContent = `${item.name} - $${item.price.toFixed(2)}`;
  
        // Update total price
        total += item.price * item.quantity;
  
        // Append elements to cart item
        cartItem.appendChild(deleteButton);
        cartItem.appendChild(increaseButton);
        cartItem.appendChild(quantityInput);
        cartItem.appendChild(heartIcon);
        cartItem.appendChild(itemDetails);
  
        // Append cart item to container
        cartContainer.appendChild(cartItem);
      });
  
      // Update total price
      totalElement.textContent = total.toFixed(2);
    }
  
    // Function to delete an item from the cart
    function deleteItem(itemId) {
      const index = cartItems.findIndex(item => item.id === itemId);
      if (index !== -1) {
        cartItems.splice(index, 1);
        renderCart();
      }
    }
  
    // Function to update the quantity of an item
    function updateQuantity(itemId, newQuantity) {
      const index = cartItems.findIndex(item => item.id === itemId);
      if (index !== -1) {
        cartItems[index].quantity = parseInt(newQuantity, 10) || 1;
        renderCart();
      }
    }
  
    // Function to increase the quantity of an item
    function increaseQuantity(itemId) {
      const index = cartItems.findIndex(item => item.id === itemId);
      if (index !== -1) {
        cartItems[index].quantity += 1;
        renderCart();
      }
    }
  
    // Function to toggle the like status of an item
    function toggleLike(itemId) {
      const index = cartItems.findIndex(item => item.id === itemId);
      if (index !== -1) {
        cartItems[index].liked = !cartItems[index].liked;
        renderCart();
      }
    }
  
    // Initial rendering
    renderCart();
  });
  