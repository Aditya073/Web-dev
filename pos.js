const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Menu items
const menu = {
  1: { name: 'Paneer Butter Masala', price: 180 },
  2: { name: 'Biryani', price: 200 },
  3: { name: 'Veg Thali', price: 150 },
  4: { name: 'Masala Dosa', price: 90 },
  5: { name: 'Lassi', price: 50 }
};

let cart = []; // this is to store all the items

function showMenu() { // to  display the menu
  console.log('\n--- Restronet Menu ---');
  for (const key in menu) {
    console.log(`${key}. ${menu[key].name} - ₹${menu[key].price}`);
  }
  console.log('----------------------');
}

function showCart() { // current item in cart
  console.log('\n Your Order:');
  let total = 0; 
  cart.forEach((item, i) => {
    console.log(`${i + 1}. ${item.name} - ₹${item.price}`);
    total += item.price;
  });
  console.log(`\n Total: ₹${total}\n`);
}

function promptUser() {
  console.log('\nWhat would you like to do?');
  console.log('1. Order an Item');
  console.log('2. View Bill');
  console.log('3. Exit\n');

  rl.question('Enter choice (1-3): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        showMenu();
        rl.question('\nEnter item number to order: ', (itemNum) => {
          const item = menu[itemNum.trim()];
          if (item) {
            cart.push(item);
            console.log(`Added "${item.name}" to your cart.`);
          } else {
            console.log('Invalid item number.');
          }
          promptUser();
        });
        break;
      case '2':
        if (cart.length === 0) {
          console.log('\nYour cart is empty.');
        } else {
          showCart();
        }
        promptUser();
        break;
      case '3':
        console.log('\n Thank you for visiting Restronet!');
        rl.close();
        break;
      default:
        console.log('Invalid choice.');
        promptUser();
        break;
    }
  });
}

console.log('Welcome to Restronet POS System!'); 
promptUser();
