// ============================================================
// 308A.2 — Exercises: Classes & OOP
// ============================================================
// These exercises build progressively toward the skills needed
// for GLAB 308A.2.1 and the SBA capstone.
//
// Instructions:
//   - Complete each TODO section.
//   - Run this file with Node.js:  node exercise.js
// ============================================================


// ------------------------------------------------------------
// Exercise 1: Object Literals Review
// ------------------------------------------------------------
// Goal: Refresh object syntax before introducing classes.
const book = {
  title: "The Great Gatsby",        // Property: string value
  author: "F. Scott Fitzgerald",     // Property: string value
  pages: 180,                         // Property: number value
  isRead: false,                      // Property: boolean value (mutable)
  markAsRead() {                      // Shorthand method syntax (same as markAsRead: function() {})
    this.isRead = true;               // `this` refers to the `book` object when called as book.markAsRead()
    console.log(`${this.title} has been marked as read.`);
  },
  summary() {
    return `${this.title} by ${this.author}, ${this.pages} pages`;
  },
};

// 1. Log the book's title and author
console.log(book.title);   // "The Great Gatsby"
console.log(book.author);  // "F. Scott Fitzgerald"

// 2. Call markAsRead() and verify isRead is now true
book.markAsRead();
console.log(book.isRead);  // true

// 3. summary() method
console.log(book.summary()); // "The Great Gatsby by F. Scott Fitzgerald, 180 pages"


// ------------------------------------------------------------
// Exercise 2: The `this` Keyword
// ------------------------------------------------------------

const dog = {
  name: "Buddy",
  breed: "Golden Retriever",
  tricks: ["sit", "shake", "roll over"],
  showTricks() {
    // `this` refers to `dog` because showTricks is called as dog.showTricks()
    console.log(`${this.name} can do: ${this.tricks.join(", ")}`);
  },
};

// 1. Call dog.showTricks()
dog.showTricks(); // "Buddy can do: sit, shake, roll over"

// 2. Standalone function that uses this.name
function greet() {
  console.log(`Hi, my name is ${this.name}`); // `this` depends on HOW greet() is called
}

// 3. Assign to dog and call — it works because `this` now refers to dog
dog.greet = greet;   // Attach the function as a method on the dog object
dog.greet();         // "Hi, my name is Buddy" — called as dog.greet(), so this === dog

// 4. Call greet() alone
// greet(); // `this` is undefined (strict mode) or the global object.
// In Node.js, this.name is undefined. In a browser, it may reference
// window.name. This demonstrates that `this` depends on HOW a function
// is called, not WHERE it's defined.


// ------------------------------------------------------------
// Exercise 3: Your First Class
// ------------------------------------------------------------

class Pet {
  constructor(name, species) {    // constructor runs automatically when you call `new Pet(...)`
    this.name = name;             // `this` refers to the NEW object being created
    this.species = species;       // Assign each parameter as a property on the instance
    this.isHungry = true;         // Default value — every new Pet starts hungry
  }

  feed() {                        // Instance method — shared via Pet.prototype
    this.isHungry = false;        // Mutate the instance's own property
    console.log(`${this.name} has been fed!`);
  }

  describe() {
    console.log(`${this.name} is a ${this.species}`);
  }
}

// 1. Create 3 different pets
const pet1 = new Pet("Buddy", "Dog");
const pet2 = new Pet("Whiskers", "Cat");
const pet3 = new Pet("Nemo", "Fish");

// 2. Feed one and verify isHungry changed
pet1.feed();                  // "Buddy has been fed!"
console.log(pet1.isHungry);  // false
console.log(pet2.isHungry);  // true (unfed)

// 3. describe() method
pet1.describe(); // "Buddy is a Dog"
pet3.describe(); // "Nemo is a Fish"


// ------------------------------------------------------------
// Exercise 4: Constructor Practice
// ------------------------------------------------------------

class Rectangle {
  constructor(width, height) {
    this.width = width;                 // Store dimensions as instance properties
    this.height = height;
  }

  area() {
    return this.width * this.height;    // width × height = area
  }

  perimeter() {
    return 2 * (this.width + this.height); // 2 × (w + h) = perimeter
  }

  isSquare() {
    return this.width === this.height;  // A square is a rectangle with equal sides
  }

  describe() {
    return `Rectangle: ${this.width}×${this.height}, Area: ${this.area()}`;
    // Calls this.area() — methods can call other methods on the same instance
  }
}

// 1. 5×10 rectangle
const rect1 = new Rectangle(5, 10);
console.log(rect1.area());       // 50
console.log(rect1.perimeter());  // 30

// 2. 7×7 rectangle
const rect2 = new Rectangle(7, 7);
console.log(rect2.isSquare());   // true

// 3. describe() method
console.log(rect1.describe()); // "Rectangle: 5×10, Area: 50"


// ------------------------------------------------------------
// Exercise 5: Inheritance Basics
// ------------------------------------------------------------

class Vehicle {
  constructor(make, model, year) {
    this.make = make;               // Shared properties for all vehicles
    this.model = model;
    this.year = year;
    this.isRunning = false;         // Default state: engine off
  }

  start() {
    this.isRunning = true;          // Mutate state
    console.log(`${this.make} ${this.model} started!`);
  }

  stop() {
    this.isRunning = false;
    console.log(`${this.make} ${this.model} stopped.`);
  }
}

// 1. Car class with numDoors
class Car extends Vehicle {           // `extends` sets up the prototype chain: Car → Vehicle
  constructor(make, model, year, numDoors) {
    super(make, model, year);         // MUST call super() first — it runs Vehicle's constructor
                                      // to initialize make, model, year, and isRunning
    this.numDoors = numDoors;         // Then add Car-specific properties
  }

  honk() {                            // Car-specific method (not on Vehicle)
    console.log("Beep beep!");
  }
}

// 2. Motorcycle class with hasSidecar
class Motorcycle extends Vehicle {
  constructor(make, model, year, hasSidecar = false) { // Default parameter: no sidecar
    super(make, model, year);         // Initialize inherited properties via Vehicle constructor
    this.hasSidecar = hasSidecar;     // Motorcycle-specific property
  }
}

// 3. Instantiate and test
const myCar = new Car("Toyota", "Camry", 2023, 4);
myCar.start();  // "Toyota Camry started!"
myCar.honk();   // "Beep beep!"
myCar.stop();   // "Toyota Camry stopped."

const myBike = new Motorcycle("Harley", "Sportster", 2022, true);
myBike.start(); // "Harley Sportster started!"
myBike.stop();  // "Harley Sportster stopped."


// ------------------------------------------------------------
// Exercise 6: Method Overriding
// ------------------------------------------------------------
// Goal: Override parent methods in child classes.

// TODO: Using your Vehicle classes from Exercise 5:
// 1. Override start() in Motorcycle to log "Vroom vroom!" instead.
// 2. Use super.start() inside the override so isRunning still
//    gets set to true.
// 3. Verify that Car.start() still behaves normally.


// ------------------------------------------------------------
// Exercise 7: Private Fields & Getters/Setters
// ------------------------------------------------------------
// Goal: Practice encapsulation with # fields.

class BankAccount {
  // TODO: Add private fields #balance and #owner

  constructor(owner, initialDeposit = 0) {
    // TODO: Set #owner and #balance
  }

  // TODO: Add a getter for balance that returns "$X.XX" format

  // TODO: Add a getter for owner

  deposit(amount) {
    // TODO: If amount > 0, add to #balance and log the new balance
  }

  withdraw(amount) {
    // TODO: If amount > 0 AND amount <= #balance, subtract and log
    //       Otherwise, log "Insufficient funds!"
  }
}

// TODO 1: Create an account with $100 initial deposit.

// TODO 2: Deposit $50 and withdraw $30.

// TODO 3: Try to access #balance directly — what happens?

// TODO 4: Try to withdraw more than the balance — what happens?


// ------------------------------------------------------------
// Exercise 8: Static Methods
// ------------------------------------------------------------
// Goal: Create and use static class members.

class MathHelper {
  // TODO: Add a static method celsiusToFahrenheit(c)
  //       Formula: (c * 9/5) + 32

  // TODO: Add a static method fahrenheitToCelsius(f)
  //       Formula: (f - 32) * 5/9

  // TODO: Add a static method randomBetween(min, max)
  //       Returns a random integer between min and max (inclusive)
}

// TODO 1: Convert 100°C to Fahrenheit (no `new`!).

// TODO 2: Generate 5 random numbers between 1 and 100.

// TODO 3: Add a static method isPrime(n) that returns true/false.


// ------------------------------------------------------------
// Exercise 9: Factory Functions
// ------------------------------------------------------------
// Goal: Create objects with factory functions instead of classes.

function createPlayer(name, level = 1) {
  let health = level * 100;
  let xp = 0;

  return {
    name,
    level,
    // TODO: Add getHealth() that returns health

    // TODO: Add getXP() that returns xp

    // TODO: Add gainXP(amount) that adds to xp and logs it

    // TODO: Add takeDamage(amount) that subtracts from health and logs it
  };
}

// TODO 1: Create two players.

// TODO 2: Have one take damage and the other gain XP.

// TODO 3: Try to directly set health — can you? Why or why not?
//         Write your answer as a comment.

// TODO 4: How is this different from a class with private fields?
//         Write your answer as a comment.


// ------------------------------------------------------------
// Exercise 10: Prototype Exploration
// ------------------------------------------------------------
// Goal: Understand the prototype chain.

class Shape {}
class Circle extends Shape {}

const c = new Circle();

// TODO 1: Log Object.getPrototypeOf(c) — what do you see?

// TODO 2: Log the results of these three checks:
//   c instanceof Circle
//   c instanceof Shape
//   c instanceof Object

// TODO 3: Add a method to Shape.prototype after creating c.
//         Can c access it? Why does this work?
//         Write your answer as a comment.


// ------------------------------------------------------------
// Exercise 11: Putting It All Together — Mini RPG
// ------------------------------------------------------------
// Goal: Combine all concepts. Prepares for GLAB 308A.2.1.

// TODO 1: Create a Character class with:
//   - name, health (100, private), attack, defense
//   - takeDamage(amount) method (reduce health, factor in defense)
//   - static MAX_HEALTH = 100

// TODO 2: Create a Warrior class (extends Character):
//   - Extra property: armor
//   - Method: slash() — returns attack damage

// TODO 3: Create a Mage class (extends Character):
//   - Extra property: mana
//   - Method: castSpell() — returns magic damage, costs mana

// TODO 4: Create a battle(char1, char2) function:
//   - Characters take turns attacking until one reaches 0 health
//   - Log each attack and remaining health
//   - Declare the winner


// ============================================================
// 🎯 Checkpoint: Ready for the Assignment?
// ============================================================
// Before starting GLAB 308A.2.1, make sure you can:
//   [ ] Define a class with a constructor
//   [ ] Instantiate objects with new
//   [ ] Use extends and super for inheritance
//   [ ] Create private fields with #
//   [ ] Write getters and setters
//   [ ] Create static methods
//   [ ] Explain inheritance, encapsulation, abstraction, polymorphism
