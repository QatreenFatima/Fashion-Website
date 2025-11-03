// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();

    // Payment method toggle
    const paymentOptions = document.querySelectorAll('input[name="payment-method"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            const cardDetails = document.getElementById('card-details');
            if (this.value === 'online') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });

    // Checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', handleCheckout);
});

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total-price');

    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>Your cart is empty. <a href="shop.html">Go back to shopping</a></p>';
        return;
    }

    let total = 0;
    const orderItemsHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="order-item">
                <div class="order-item-details">
                    <h4>${item.product}</h4>
                    <p>Size: ${item.size} | Quantity: ${item.quantity}</p>
                </div>
                <div class="order-item-price">$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    }).join('');

    orderItemsContainer.innerHTML = orderItemsHTML;
    orderTotalElement.textContent = total.toFixed(2);
}

function handleCheckout(event) {
    event.preventDefault();

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Basic form validation
    const formData = new FormData(event.target);
    const requiredFields = ['first-name', 'last-name', 'email', 'phone', 'address', 'city', 'country'];
    let isValid = true;

    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            element.style.borderColor = 'red';
            isValid = false;
        } else {
            element.style.borderColor = '#ddd';
        }
    });

    const paymentMethod = formData.get('payment-method');
    if (paymentMethod === 'online') {
        const cardFields = ['card-number', 'expiry', 'cvv'];
        cardFields.forEach(field => {
            const element = document.getElementById(field);
            if (!element.value.trim()) {
                element.style.borderColor = 'red';
                isValid = false;
            } else {
                element.style.borderColor = '#ddd';
            }
        });
    }

    if (!isValid) {
        alert('Please fill in all required fields.');
        return;
    }

    // Simulate order processing
    alert('Processing your order...');

    // Simulate API call delay
    setTimeout(() => {
        // Clear cart
        localStorage.removeItem('cart');

        // Show success message and redirect
        alert('Order placed successfully! Thank you for shopping with us.');
        window.location.href = 'index.html';
    }, 2000);
}
