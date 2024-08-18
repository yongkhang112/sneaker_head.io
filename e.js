//Open and Close Cart
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

//Start with the document is ready
if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}

// ===== Start =======
function start() {
    addEvents();
}

// ===== Update and Rerender =======
function update() {
    addEvents();
    updateTotal();
}

// ===== Add Events =======
function addEvents() {
    // Remove items from cart
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btns);
    cartRemove_btns.forEach(btn => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    //Change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    //Add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach(btn => {
        btn.addEventListener("click", handle_addCartItem);
    });

    // Buy Order 
    const buy_btn = document.querySelector(".btn-buy");
    buy_btn.addEventListener("click", handle_buyOrder);

}

//==== Handle Events Functions=====
let itemsAdded = []
function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title, price, imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // handle item id ready exists
    if (itemsAdded.find(el => el.title == newToAdd.title)) {
        alert("This Item Is Already Exist!");
        return;
    } else {
        itemsAdded.push(newToAdd);
    }

    // add product to cart
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);
    update();
}

function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(
        (el) =>
            el.title !=
            this.parentElement.querySelector('.cart-product-title').innerHTML
    );

    update();
}

function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value); //to keep it integer

    update();
}

function handle_buyOrder() {
    if (itemsAdded.length <= 0) {
        alert("There is No Order to Place Yet! \n Please Make an Order first.");
        return;
    }
    const cardContent = cart.querySelector(".cart-content");
    cardContent.innerHTML = '';
    alert("Your Order id Placed Successfully :) ");
    itemsAdded = [];
    update();
}


// ==== Update and Rerender Functions
function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });
    //keep 2 digits
    total = total.toFixed(2);
    // or you can use also
    // total = Math .round(total * 100) / 100;
    totalElement.innerHTML = "$" + total;
}
// ===== Html Component =====
function CartBoxComponent(title, price, imgSrc) {
    return `
    <div class="cart-box">
    <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!--Remove cart-->
        <i class='bx bxs-trash-alt cart-remove'></i>
</div>`;
}


// Inside the handle_buyOrder function
function handle_buyOrder() {
    if (itemsAdded.length <= 0) {
        alert("There is No Order to Place Yet! \n Please Make an Order first.");
        return;
    }

    // Log details to the console
    console.log("Items Added:", itemsAdded);

    // Display details in an alert
    let orderDetails = "Your Order is Placed Successfully:\n\n";
    itemsAdded.forEach(item => {
        orderDetails += `${item.title} - ${item.price}\n`;
    });
    orderDetails += `\nTotal Price: ${cart.querySelector(".total-price").innerHTML}`;

    alert(orderDetails);

    // Clear the cart content
    const cardContent = cart.querySelector(".cart-content");
    cardContent.innerHTML = '';

    // Reset itemsAdded array
    itemsAdded = [];

    // Update the total
    update();
}

function handle_buyOrder() {
    if (itemsAdded.length <= 0) {
        alert("There is No Order to Place Yet! \n Please Make an Order first.");
        return;
    }

    // Log details to the console
    console.log("Items Added:", itemsAdded);

    // Generate receipt
    let orderDetails = "Your Order is Placed Successfully:\n\n";
    itemsAdded.forEach(item => {
        orderDetails += `${item.title} - ${item.price}\n`;
    });
    orderDetails += `\nTotal Price: ${cart.querySelector(".total-price").innerHTML}`;

    // Display details in an alert
    alert(orderDetails);

    // Optionally, you can print the receipt
    printReceipt(orderDetails);

    // Clear the cart content
    const cardContent = cart.querySelector(".cart-content");
    cardContent.innerHTML = '';

    // Reset itemsAdded array
    itemsAdded = [];

    // Update the total
    update();
}

// Function to print the receipt
function printReceipt(receiptDetails) {
    // You can implement printing logic here
    // For example, open a new window and write the receipt details
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Receipt</title></head><body>');
    printWindow.document.write('<pre>' + receiptDetails + '</pre>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

function handle_buyOrder() {
    if (itemsAdded.length <= 0) {
        alert("There is No Order to Place Yet! \n Please Make an Order first.");
        return;
    }

    // Log details to the console
    console.log("Items Added:", itemsAdded);

    // Generate receipt
    let orderDetails = "Your Order is Placed Successfully:\n\n";
    itemsAdded.forEach(item => {
        orderDetails += `${item.title} - ${item.price}\n`;
    });
    orderDetails += `\nTotal Price: ${cart.querySelector(".total-price").innerHTML}`;

    // Display details in an alert
    const userResponse = confirm(orderDetails + "\n\nDo you want to proceed?");
    
    if (userResponse) {
        // Optionally, you can print the receipt
        printReceipt(orderDetails);

        // Clear the cart content
        const cardContent = cart.querySelector(".cart-content");
        cardContent.innerHTML = '';

        // Reset itemsAdded array
        itemsAdded = [];

        // Update the total
        update();
    } else {
        // Handle cancellation (optional)
        alert("Order has been canceled.");
    }
}


// Function to print the receipt
function printReceipt(receiptDetails) {
    // You can implement printing logic here
    // For example, open a new window and write the receipt details
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Receipt</title></head><body>');
    printWindow.document.write('<pre>' + receiptDetails + '</pre>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}




