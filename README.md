# Project Title
Chuckun Specials E-commerce Pool store

## Overview

Chuckun Specials E-commerce Pool store is a online website that provide a platform for both buyers and sellers to find or list their billiard items

### Problem

As pool becomes more popular in Canada, there's an uprising demand for pool cues and accessories. However, there are not too many options for pool players to build their gear from. Also, as pool players upgrade their cues quite often, it’d be convenient if there’s a website for them to list and sell their old cues and buy new ones. Chuckun Specials is created to help them with both of their needs. 

### User Profile

- Online buyers that need to find a product in demand:
    - a pool cue in either brand-new or used condition
    - find and filter their selections by brands and types
    - add items to their cart and proceed to checkout
- Online sellers that wants to sell their cues:
    - Adding items to their stores
    - Modifying items' name, quantity, brand or description


### Features

- As a user, I want to be able to find an item by searching or filtering
- As a user, I want to be able to see some suggestions on the main page
- As a user, I want to be able to check out as guest
- As a user, I want to be able to create an account to list my items
- As a user, I want to be able to login to see my existing cart and list items
- As a logged in user, I want to list new items with specific description
- As a logged in user, I want to see my existing cart from a previous login

## Implementation

### Tech Stack

- React
- Javascript
- MySQL
- Express
- Client libraries: 
    - react
    - react-router
    - axios
- Server libraries:
    - knex
    - express

### APIs

- No external APIs will be used for the first sprint

### Sitemap

- Home page
- Item page
- Cart page
- Checkout page
- Store page
- List new items/ edit listed items page
- Register
- Login

### Mockups

#### All pages sketch on excalidraw: https://excalidraw.com/#json=Az2yegHRNBTHOc2qxZdpM,rCkHuHgcWftvqH2ZD9HTiw


### Data
- I'm planning to have 3 tables: inventory, user, and cart.
    - Inventory: id, user_id, name, quantity, media(include pictures or videos of the item), description, brand, tag, type
    - User: id, user_name, user_email 
    - Cart: id, user_id, item:[{item_id, quantity}]

### Endpoints

**GET /inventory**

- Get the list of all items

Response:
```
[
    {
        "id": 1,
        "user_id": 11,
        "name": "JFlower Jf11",
        "price": 300,
        "quantity": 3,
        "description": "A pretty good cue.",
        "brand": "jflower".
        "tag": ["beginner", "carbon"]
        "type": "playing cue"
    },
    ...
]
```

**GET /inventory?tag**

- Get pool cue by the tag

Querry:
- querry: tag name

Response:
```
{
    "id": 1,
    "user_id": 11,
    "name": "JFlower Jf11",
    "price": 300,
    "quantity": 3,
    "description": "A pretty good cue.",
    "brand": "jflower".
    "tag": ["beginner"]
    "type": "playing cue"
}
```

**GET /cart?user={user_id}**

- Get existing cart of an user

Querry:
- querry: user_name

Parameters:
- token: JWT of the logged in user

Response:
```
{
    "id": 1,
    "user_id": 11,
    item:[{item_id: 23, quantity: 1}]
}
```

**PUT /inventory/:id?user={user_id}**

- Logged in store owner can edit and update their listing

Parameters:
- id: Item id
- token: JWT of the logged in user
- item's information

Response:
```
{
    "id": 1,
    "user_id": 11,
    "name": "JFlower Jf11",
    "price": 300,
    "quantity": 3,
    "description": "A pretty good cue.",
    "brand": "jflower".
    "tag": ["beginner"]
    "type": "playing cue"
}
```

**POST /inventory/:id?user={user_id}**

- Logged in store owner can add a new listing

Parameters:
- id: Item id
- token: JWT of the logged in user
- new item's information

Response:
```
{
    "id": 40,
    "user_id": 11,
    "name": "JFlower Jf11",
    "price": 300,
    "quantity": 3,
    "description": "A pretty good cue.",
    "brand": "jflower".
    "tag": ["beginner"]
    "type": "playing cue"
}
```

**POST /users/register**

- Add a user account

Parameters:

- email: User's email
- password: User's provided password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /users/login**

- Login a user

Parameters:
- email: User's email
- password: User's provided password

Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

### Auth

- JWT auth
    - Before adding auth, all API requests will be using a fake user with id 1
    - Added after core features have first been implemented
    - Store JWT in localStorage, remove when a user logs out
    - Add states for logged in showing different UI in places listed in mockups

## Roadmap

- Create client
    - react project with routes and boilerplate pages

- Create server
    - express project with routing, with placeholder 200 responses

- Create migrations

- Gather 15 pool items from 3 different branches

- Create seeds with 3 sellers and 15 samples of pool items

- Deploy client and server projects so all commits will be reflected in production

- Feature: Home Page
    - Create home page closely to the sketch
    - Use GET /inventory?tag=beginners to show suggestion for beginners
    - Use POST /cart?user={user_id} when users click on cart 
    - Create additional endpoint for search and filter items

- Feature: Item Page
    - Show certain item description and ability to add item to cart
    - Create GET /inventory/:id 

- Feature: Cart Page
    - See the list of all items in the existing cart. 
    - Will be redirected to Home Page if remove all items from cart.
    - Create GET /cart?user{user_id}

- Feature: Store Page
    - See all items from 1 sellers
    - Go to Item Page when clicking on Item if user is a buyer
    - Go to List/Edit Item Page if user is the store owner
    - Create GET /user/:userId/inventory 

- Feature: List/Edit Item Page
    - Can only be accessed by the sellers
    - Create Post and put to /inventory/:id

- Feature: Signup page
    - Implement register page + form
    - Create POST /users/register endpoint

- Feature: Login page
    - Implement login page + form
    - Create POST /users/login endpoint

- Feature: Checkout page
    - Add checkout button that will alert client know that order was placed successfully
    - Redirect buyer to the Home Page

- Feature: Implement JWT tokens
    - Server: Update expected requests / responses on protected endpoints
    - Client: Store JWT in local storage, include JWT on axios calls

- Bug fixes

- DEMO DAY

## Nice-to-haves
- Add security method for user profile and password
- Forgot password functionality 
- Rating and comment system for each item and seller