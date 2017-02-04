# Williams Sonoma Demo Application
### SPA(Angular) - Node/Express API

** These directions are assuming that everyone using this app has node and git installed **

## Client-side Application
  1) Clone into github branch:
  ```
  $ git clone https://github.com/macaframa/wsi-demo-app.git
  ```
  2) Change Directory to folder: 
  ```
  $ cd wsi-demo-app
  ```
  3) Download dependencies for node application
  ```
  $ npm install
  ```
  4) Start Application and Enjoy!
  ```
  $ npm start
  ```
  ** This code will launch a express application listening at port 3000 also, simultaneously start the client-side app in the browser. **
  
## Interacting with the API 
 1) GET data
    send http request to https://quiet-headland-38798.herokuapp.com/api/item with method of GET and retrieve all items in this                 collection.
 2) POST data
    send http request to https://quiet-headland-38798.herokuapp.com/api/item with method of POST accompanied by an object with the following model: 
    ```
    var itemSchema = new Schema({
      name: String,
      price: String,
      poi: Array,
      info: Array,
      img: Object
    }, {
        versionKey: false
    });
    ```
    ** referenced directly from my code **

  3) DELETE data from thise resource by sending an http request to https://quiet-headland-38798.herokuapp.com/api/item/:item_id to delete that specific item from the database. 

# I really love your company and products and am very interested in joining your team. Please enjoy this application. 
