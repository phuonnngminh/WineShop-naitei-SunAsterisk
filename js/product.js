const productContainer = document.querySelector(".row.shop_wrapper.grid_list");
const gridContainer = document.querySelector(".list-product.grid-product");
const toastLiveExample = document.getElementById("liveToast");
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
const listButton = document.querySelector(".btn-list");
const gridButton = document.querySelector(".btn-grid-3");
const pagination = document.getElementById("pagination");

let products = [];
const itemsPerPage = 6;
let currentPage = 1;
let currentDisplayMode = "grid";
let currentCategoryId = null;

const request = new XMLHttpRequest();
request.open("GET", "https://wine-product.vercel.app/products");

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    products = JSON.parse(request.responseText);

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
    }
    shuffleArray(products);

    const categoryRequest = new XMLHttpRequest();
    categoryRequest.open("GET", "https://wine-product.vercel.app/categories");

    categoryRequest.onload = function () {
      if (categoryRequest.status >= 200 && categoryRequest.status < 400) {
        categories = JSON.parse(categoryRequest.responseText);

        // display category & quantity
        displayCategoriesWithProductCount(categories, products);
        const totalItems = products.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        localStorage.setItem("products", JSON.stringify(products));

        const searchInput = document.querySelector(".search-filter");
        const searchButton = document.querySelector(".search-icon");

        function searchProducts(keyword) {
          // Lọc danh sách sản phẩm dựa trên từ khóa
          const searchResults = products.filter((product) =>
            product.name.toLowerCase().includes(keyword.toLowerCase())
          );
          console.log(searchResults)
        
   
          displaySearchResults(searchResults);
          updatePagination(searchResults.length);
        }
        searchInput.addEventListener("input", function (e) {
          const keyword = e.target.value.trim(); 
          console.log(keyword)
        
       
          searchProducts(keyword);
        });
       
        searchButton.addEventListener("click", function () {
          const keyword = searchInput.value.trim();

       
          searchProducts(keyword);
        });

        
        



        function displaySearchResults(searchResults) {
          if (currentDisplayMode !== "grid") {
            return;
          }
        
          const totalItems = searchResults.length;
          productContainer.innerHTML = "";
        
          searchResults.forEach((product) => {
            const productItem = document.createElement("div");
            productItem.classList.add(
              "product",
              "position-relative",
              "me-5",
              "hide-pseudo",
              "grid-type"
            );
        
            productItem.innerHTML = `
            <span class="atb text-black position-absolute hide">Sale</span>
            <a href="#">
              <img src="${product.img}" alt="${product.name}" />
            </a>
            <div class="product-content text-center">
              <h4 class="product-name text-uppercase">
                <a href="#" class="product-link" data-product-id="${product.id}">${product.name}</a>
              </h4>
              <div class="price-box">
                <span class="price-box-new">${product.price}</span>
                <span class="price-box-old">450.000đ</span>
              </div>
              <div class="add-to_cart">
                <a href="#" class="btn text-uppercase bg-black text-white mt-4 rounded-0">
                  Add to cart
                </a>
              </div>
            </div>
    `;
        
            gridContainer.appendChild(productItem);
        
            const productLinks = document.querySelectorAll(".product-link");
            productLinks.forEach((link) => {
              link.addEventListener("click", function (e) {
                e.preventDefault();
                const productId = this.getAttribute("data-product-id");
                window.location.href = `single-product.html?id=${productId}`;
              });
            });
        
            productItem
              .querySelector(".add-to_cart a")
              .addEventListener("click", function (e) {
                e.preventDefault();
        
                const productName = product.name;
                const productPrice = product.price;
                const productImage = product.img;
                const productDescription = product.description;
        
                const cartItem = {
                  name: productName,
                  price: productPrice,
                  image: productImage,
                  description: productDescription,
                  quantity: 1,
                };
        
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const existingCartItemIndex = cart.findIndex(
                  (item) => item.name === productName
                );
        
                if (existingCartItemIndex !== -1) {
                  toastText.textContent = "Sản phẩm đã có trong giỏ hàng";
                  toastBootstrap.show();
                } else {
                  cart.push(cartItem);
                  localStorage.setItem("cart", JSON.stringify(cart));
        
                  const toastText = document.getElementById("toastText");
                  toastText.textContent = "Thêm sản phẩm thành công";
                  toastBootstrap.show();
                }
              });
          });
        }
        function displayProductsInGrid(page) {
          if (currentDisplayMode !== "grid") {
            return;
          }

          // filter category
          const filteredProducts = currentCategoryId
            ? products.filter(
                (product) => product.categoryId === currentCategoryId
              )
            : products;
          productContainer.innerHTML = "";


          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;

          const productsToDisplay = filteredProducts.slice(
            startIndex,
            endIndex
          );
          console.log(productsToDisplay);

          productsToDisplay.forEach((product) => {
            const productItem = document.createElement("div");
            productItem.classList.add(
              "product",
              "position-relative",
              "me-5",
              "hide-pseudo",
              "grid-type"
            );
            productItem.innerHTML = `
              <span class="atb text-black position-absolute hide">Sale</span>
              <a href="#">
                <img src="${product.img}" alt="${product.name}" />
              </a>
              <div class="product-content text-center">
                <h4 class="product-name text-uppercase">
                  <a href="#" class="product-link" data-product-id="${product.id}">${product.name}</a>
                </h4>
                <div class="price-box">
                  <span class="price-box-new">${product.price}</span>
                  <span class="price-box-old">450.000đ</span>
                </div>
                <div class="add-to_cart">
                  <a href="#" class="btn text-uppercase bg-black text-white mt-4 rounded-0">
                    Add to cart
                  </a>
                </div>
              </div>
      `;
            gridContainer.appendChild(productItem);

            const productLinks = document.querySelectorAll(".product-link");
            productLinks.forEach((link) => {
              link.addEventListener("click", function (e) {
                e.preventDefault();
                const productId = this.getAttribute("data-product-id");
                window.location.href = `single-product.html?id=${productId}`;
              });
            });

            productItem
              .querySelector(".add-to_cart a")
              .addEventListener("click", function (e) {
                e.preventDefault();

                // get product
                const productName = product.name;
                const productPrice = product.price;
                const productImage = product.img;
                const productDescription = product.description;

              
                const cartItem = {
                  name: productName,
                  price: productPrice,
                  image: productImage,
                  description: productDescription,
                  quantity: 1, 
                };

 
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const existingCartItemIndex = cart.findIndex(
                  (item) => item.name === productName
                );

                if (existingCartItemIndex !== -1) {
               
                  toastText.textContent = "Sản phẩm đã có trong giỏ hàng";
                  toastBootstrap.show();
                } else {
         
                  cart.push(cartItem);

                  //Save cart to localStorage
                  localStorage.setItem("cart", JSON.stringify(cart));

                  const toastText = document.getElementById("toastText");
                  toastText.textContent = "Thêm sản phẩm thành công";
                  toastBootstrap.show();

      
                }
              });
          });
        }
        //calculate quantity of products for each category
        function getProductCountForCategory(categoryId, products) {
          const productsInCategory = products.filter(
            (product) => product.categoryId === categoryId
          );
          return productsInCategory.length;
        }

     
        function displayCategoriesWithProductCount(categories, products) {
          const sidebarList = document.querySelector(".sidebar-list");

          categories.forEach((category) => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            const productCount = getProductCountForCategory(
              category.id,
              products
            );

            link.href = "#/"; // Đặt href theo nhu cầu của bạn
            link.textContent = `${category.name} (${productCount})`;
            listItem.appendChild(link);
            sidebarList.appendChild(listItem);
            
            link.addEventListener("click", function (event) {
              event.preventDefault();
              const links = document.querySelectorAll(".sidebar-list a");
              links.forEach(function(otherLink) {
                otherLink.classList.remove("active");
              });
              
              link.classList.add("active")
              // console.log("first")
              currentCategoryId = category.id; // Lưu danh mục hiện tại được chọn
              currentPage = 1; // Reset trang về trang 1
              gridContainer.innerHTML = "";
              displayProductsInGrid(currentPage);
              productContainer.innerHTML = "";
              displayProductsInList(currentPage);
            });
          });
        }

        function displayProductsInList(page) {
          if (currentDisplayMode !== "list") {
            return;
          }

       
          const filteredProducts = currentCategoryId
            ? products.filter(
                (product) => product.categoryId === currentCategoryId
              )
            : products;

          gridContainer.innerHTML = "";
          // productContainer.innerHTML = "";
          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          // const productsToDisplay = products.slice(startIndex, endIndex);
          const productsToDisplay = filteredProducts.slice(
            startIndex,
            endIndex
          );

          productsToDisplay.forEach((product) => {
            const productItem = document.createElement("div");
            productItem.classList.add("col-12", "product");
            productItem.innerHTML = `
        <div class="product-inner">
          <div class="thumb">
            <a href="#/" class="image">
              <img class="fit-image" src="${product.img}" alt="${product.name}" />
            </a>
          </div>
          <div class="content">
            <h5 class="title text-uppercase">
              <a href="#" class="product-link" data-product-id="${product.id}">${product.name}</a>
            </h5>
            <span class="price">
              <span class="new">${product.price}</span>
            </span>
            <p class="desc">${product.description}</p>
            <!-- Cart Button Start -->
            <div class="cart-btn action-btn">
                <div class="action-cart-btn-wrapper d-flex align-items-center">
                    <div class="add-to_cart">
                        <a class="btn bg-black text-white text-uppercase rounded-0" href="">
                            Add to cart
                        </a>
                    </div>
                    <a href="wishlist.html" title="Wishlist" class="action">
                        <i class="fa-solid fa-heart"></i>
                        Yêu thích
                    </a>
                    <a href="#/" class="action quickview" data-bs-toggle="modal"
                    data-bs-target="#quick-view" title="Quickview">
                        <i class="fa-solid fa-code-compare"></i>
                        So sánh
                    </a>
                </div>
            </div>
            <!-- Cart Button End -->
          </div>
        </div>
      `;

            productContainer.appendChild(productItem);

            productItem
              .querySelector(".add-to_cart a")
              .addEventListener("click", function (e) {
                e.preventDefault();

                // Lấy thông tin sản phẩm
                const productName = product.name;
                const productPrice = product.price;
                const productImage = product.img;
                const productDescription = product.description;

                // Tạo một đối tượng chứa thông tin sản phẩm
                const cartItem = {
                  name: productName,
                  price: productPrice,
                  image: productImage,
                  description: productDescription,
                  quantity: 1, // Bạn có thể thay đổi số lượng theo nhu cầu
                };

                // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const existingCartItemIndex = cart.findIndex(
                  (item) => item.name === productName
                );

                if (existingCartItemIndex !== -1) {
                  // Hiển thị thông báo sản phẩm đã có trong giỏ hàng
                  toastBootstrap.show();
                } else {
                  // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm vào mảng giỏ hàng
                  cart.push(cartItem);

                  // Lưu giỏ hàng vào localStorage
                  localStorage.setItem("cart", JSON.stringify(cart));

                  const toastText = document.getElementById("toastText");
                  toastText.textContent = "Thêm sản phẩm thành công";
                  toastBootstrap.show();

                  // window.location.href = "cart.html";
                }
              });
          });
        }

        const allCategoryLink = document.querySelector(".all-category");

        allCategoryLink.addEventListener("click", function (e) {
          e.preventDefault();
          location.reload();
        });

        function updatePagination() {
          pagination.innerHTML = "";
          for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement("li");
            pageItem.classList.add("page-item");
            const pageLink = document.createElement("a");
            pageLink.classList.add("page-link");
            pageLink.href = "#/";
            pageLink.textContent = i;

            if (i === currentPage) {
              pageLink.classList.add("active");
            }

            pageLink.addEventListener("click", function () {
              currentPage = i;
              if (currentDisplayMode === "grid") {
                gridContainer.innerHTML = "";
                displayProductsInGrid(currentPage);
              } else if (currentDisplayMode === "list") {
                productContainer.innerHTML = "";
                displayProductsInList(currentPage);
              }
              updatePagination();
            });

            pageItem.appendChild(pageLink);
            pagination.appendChild(pageItem);
          }
        }

        displayProductsInGrid(currentPage);
        updatePagination();

        listButton.addEventListener("click", function () {
          if (!listButton.classList.contains("active")) {
            currentDisplayMode = "list";
            displayProductsInList(currentPage);
            listButton.classList.add("active");
            gridButton.classList.remove("active");
            updatePagination();
          }
        });

        gridButton.addEventListener("click", function () {
          if (!gridButton.classList.contains("active")) {
            currentDisplayMode = "grid";
            displayProductsInGrid(currentPage);
            gridButton.classList.add("active");
            listButton.classList.remove("active");
            updatePagination();
          }
        });
      }
    };
    categoryRequest.send();

  } else {
    console.error("Error fetching products:", request.statusText);
  }
};

request.onerror = function () {
  console.error("An error occurred while fetching products.");
};

request.send();





