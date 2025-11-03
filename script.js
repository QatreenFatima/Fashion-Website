// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart function
function addToCart(product, price, size) {
    const item = {
        product: product,
        price: parseFloat(price),
        size: size,
        quantity: 1,
        image: getProductImage(product)
    };

    // Check if item already exists
    const existingItem = cart.find(cartItem => cartItem.product === product && cartItem.size === size);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }

    saveCart();
    updateCartDisplay();
    alert(`${product} added to cart!`);
}

// Get product image (simplified, in real app this would be stored with product data)
function getProductImage(product) {
    const imageMap = {
        'Elegant Dress': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
        'Chic Skirt': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
        'Stylish T-Shirt': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
        'Cozy Cardigan': 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop',
        'Summer Frock': 'https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa?w=400&h=500&fit=crop',
        'Trendy Bottoms': 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=500&fit=crop',
        'Classic Shirt': 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=500&fit=crop',
        'Flowy Skirt': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop'
    };
    return imageMap[product] || '';
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (!cartItemsContainer || !totalPriceElement) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.product}">
            <div class="cart-item-details">
                <h3>${item.product}</h3>
                <p>Size: ${item.size}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Subtotal: $${itemTotal.toFixed(2)}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    totalPriceElement.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = this.getAttribute('data-price');
            const sizeSelect = this.parentElement.querySelector('.size-select');
            const size = sizeSelect ? sizeSelect.value : 'N/A';
            addToCart(product, price, size);
        });
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Checkout button (now a link, but keep for cart page functionality)
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn && checkoutBtn.tagName === 'BUTTON') {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
            } else {
                alert('Checkout functionality would be implemented here. Total: $' + document.getElementById('total-price').textContent);
            }
        });
    }

    // Update cart display on page load
    updateCartDisplay();
});
