console.log('====================================');
console.log("Connected");
console.log('====================================');
// Fetch data from the API
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
        const productContainer = document.getElementById('product-container');

        // function to generate product card HTML
        function generateProductCard(product) {
            const discount = Math.round((1 - (product.price / product.compare_at_price)) * 100);
            
            
            let detailsClass = '';
            if (product.title === 'RCB Tshirt'){
                // cardClass = 'rcb-tshirt';
                detailsClass = 'rcb-tshirt-details';
            }
            else if (product.title === 'Yellow casual dress') {
                // cardClass = 'yellow-casual-dress';
                detailsClass = 'yellow-casual-dress-details';
            }

            return `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="product-details ">
                    ${product.badge_text ? `<span class="badge">${product.badge_text}</span>` : ""}
                    <div class=" pd ${detailsClass}">
                    <div class="top">
                        <h3 class="title">${product.title}</h3>
                        <p class="vendor">•     ${product.vendor}</p>
                    </div>
                    <div class="bottom">    
                        <p class="price">Rs ${product.price}.00</p>
                        <p class="compare-price">${product.compare_at_price}.00</p>
                        <p class="discount">${discount}% Off</p>
                    </div> 
                    </div>   
                    </div>
                    <button class="add-to-cart-btn">Add to cart</button>
                </div>
            `;
        }

        // function to display product cards based on category
        function displayProducts(categoryIndex) {
            productContainer.innerHTML = '';

            data.categories[categoryIndex].category_products.forEach(product => {
                const productCard = generateProductCard(product);
                productContainer.innerHTML += productCard;
            });
        }

        // initial display of products
        displayProducts(0); // Display Men category by default
        document.getElementById('men-tab').style.backgroundColor="#000"
        document.getElementById('men-tab').style.color="#fff"
        male=document.getElementById("m")
        male.style.display = 'block';
        female=document.getElementById("w")
        kid=document.getElementById("k")

        // Event listeners for tab switching
        document.getElementById('men-tab').addEventListener('click', () => {
            displayProducts(0);
            setActiveTab(0);
            if (male.style.display="none") {
                male.style.display = 'block';
                female.style.display="none"
                kid.style.display="none"
              } else {
                male.style.display = 'none';
              }
            male.style.display = 'block';
        });

        document.getElementById('women-tab').addEventListener('click', () => {
            displayProducts(1);
            setActiveTab(1);
            if (female.style.display="none") {
                female.style.display = 'block';
                male.style.display="none"
                kid.style.display="none"
              } else {
                female.style.display = 'none';
              }
        });

        document.getElementById('kids-tab').addEventListener('click', () => {
            displayProducts(2);
            setActiveTab(2);
            if (kid.style.display="none") {
                kid.style.display = 'block';
                female.style.display="none"
                male.style.display="none"
              } else {
                kid.style.display = 'none';
              }
            }); 

        // Function to set active tab and update button colors
        function setActiveTab(tabIndex) {
            const tabButtons = document.querySelectorAll('.tab-btn');
            tabButtons.forEach((button, index) => {
                if (index === tabIndex) {
                    button.classList.add('active');
                    button.style.backgroundColor = '#000'; 
                    button.style.color = '#fff'; 
                } else {
                    button.classList.remove('active');
                    button.style.backgroundColor = '';
                    button.style.color = ''; 
                }
            });
        }
    })
    .catch(error => console.error('Error fetching data:', error));
    
