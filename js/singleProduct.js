document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://wine-product.vercel.app/products/${productId}`, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            const productName = document.querySelector(".product-title");
            productName.textContent = data.name
            const productImage = document.querySelector(".img-wrap img")
            console.log(productImage)
            productImage.src = data.img;
            const productPrice = document.querySelector(".product-price")
            console.log(productPrice)
            productPrice.textContent = data.price
            const productDesc = document.querySelector(".product-desc p")
            console.log(productDesc)
            productDesc.textContent = data.description
            
            
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.error("Lỗi khi gọi API: " + xhr.status);
        }
    };

    xhr.send();

})
