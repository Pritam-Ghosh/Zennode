

class ShoppingCart {
    constructor() {
        this.products = {
            "Product A": { price: 20, quantity: 0, giftWrap: 0 },
            "Product B": { price: 40, quantity: 0, giftWrap: 0 },
            "Product C": { price: 50, quantity: 0, giftWrap: 0 },
        };
        this.cartTotal = 0;
        this.subtotal = 0;
        this.discountName = "";
        this.discountAmount = 0;
        this.shippingFee = 0;
        this.giftWrapFee = 0;
    }

    applyDiscount() {
        const totalQuantity = Object.values(this.products).reduce((total, product) => total + product.quantity, 0);

        if (totalQuantity > 30 && Object.values(this.products).some(product => product.quantity > 15)) {
            this.discountName = "tiered_50_discount";
            const discountProducts = Object.values(this.products).filter(product => product.quantity > 15);
            discountProducts.forEach(product => {
                const discountedQuantity = product.quantity - 15;
                this.discountAmount += discountedQuantity * product.price * 0.5;
            });
        } else if (totalQuantity > 20) {
            this.discountName = "bulk_10_discount";
            this.discountAmount = this.subtotal * 0.1;
        } else if (Object.values(this.products).some(product => product.quantity > 10)) {
            this.discountName = "bulk_5_discount";
            Object.values(this.products).forEach(product => {
                if (product.quantity > 10) {
                    this.discountAmount += product.quantity * product.price * 0.05;
                }
            });
        } else if (this.cartTotal > 200) {
            this.discountName = "flat_10_discount";
            this.discountAmount = 10;
        }
    }

    calculateFees() {
        const totalQuantity = Object.values(this.products).reduce((total, product) => total + product.quantity, 0);
        this.shippingFee = Math.floor(totalQuantity / 10) * 5;
        this.giftWrapFee = Object.values(this.products).reduce((total, product) => total + product.giftWrap * product.quantity, 0);
    }

    processOrder() {
        console.log("Enter the quantity for each product:");
        for (const productName in this.products) {
            const quantity = parseInt(prompt(`${productName}:`), 10);
            const giftWrap = parseInt(prompt(`Gift wrap for ${productName}? (0 for No, 1 for Yes):`), 10);
            this.products[productName].quantity = quantity;
            this.products[productName].giftWrap = giftWrap;
            this.subtotal += quantity * this.products[productName].price;
        }

        this.cartTotal = this.subtotal + this.giftWrapFee + this.shippingFee;

        this.applyDiscount();
        this.calculateFees();

        console.log("\nOrder Summary:");
        for (const productName in this.products) {
            const productInfo = this.products[productName];
            console.log(`${productName}: ${productInfo.quantity} - $${productInfo.quantity * productInfo.price}`);
        }

        console.log(`\nSubtotal: $${this.subtotal}`);

        if (this.discountName) {
            console.log(`Discount (${this.discountName}): -$${this.discountAmount}`);
        }

        console.log(`Shipping Fee: $${this.shippingFee}`);
        console.log(`Gift Wrap Fee: $${this.giftWrapFee}`);
        console.log(`\nTotal: $${this.cartTotal - this.discountAmount}`);
    }
}

const shoppingCart = new ShoppingCart();
shoppingCart.processOrder();
