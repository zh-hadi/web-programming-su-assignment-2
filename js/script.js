function handelSearch() {
    const searchText = document.getElementById('search_input_text').value;
    
    toggleLoaderAnimation(true);
    setTimeout(()=> {
        loadData(searchText);
    }, 1000);
}

const loadData =async (search) => {
    const api = `https://openapi.programming-hero.com/api/phones?search=${search}`;

    const res = await fetch(api);
    const data = await res.json();

    renderData(data.data, search);
}

const renderData = (data, search) => {
    const productContainer = document.getElementById('product_container');
    productContainer.innerHTML = "";
    document.getElementById('not-found-message')?.remove();

    let content = "";
    data.forEach(item => {
        content += `<div class="card">
                    <div class="card-image">
                        <img src="${item.image}">
                    </div>

                    <h3 class="cart-title">${item.phone_name}</h3>
                    <p class="cart-description">There are many variations of passages of available, but the majority
                        have suffered</p>

                    <div class="cart-price">
                        <span>$</span>
                        <span>999</span>
                    </div>
                    
                    <div class="cart-btn">
                        <button onClick="modalOpen('${item.slug}')" class="btn-primary pointer">Show Details</button>
                    </div>
                </div>`
    });

    toggleLoaderAnimation(false);
    
    if(data.length > 0){
        productContainer.innerHTML = content;
    }else {
        productContainer.insertAdjacentHTML("beforebegin", `<div id="not-found-message" class="not-found">No Phones found for "${search}"</div>`);
    }
}

const toggleLoaderAnimation = (loading) => {
    document.getElementById('loader-section').style.opacity = loading ? 1 : 0;
}


// modal open
const modalOpen = (slug) => {
    const modal = document.getElementById('product-modal');
    const overlay = document.getElementById('overlay');

    console.log(slug);
    modal.style.display = 'block';
    overlay.style.display = 'block';

    loadPhoneDetails(slug);
}

// modal close
const modalClose = () => {
    const modal = document.getElementById('product-modal');
    const overlay = document.getElementById('overlay');

    modal.style.display = 'none';
    overlay.style.display = 'none';
}

const loadPhoneDetails =async (slug) => {
    const api = `https://openapi.programming-hero.com/api/phone/${slug}`;

    const res = await fetch(api);
    const data = await res.json();

    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = "";

    modalContent.innerHTML = `<div class="modal-img">
                <img src="${data.data.image}" alt="iphone">
            </div>
            <div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam error dolorum unde rem non iusto explicabo corporis repellat odit blanditiis deleniti hic illo, incidunt tempora quas earum? Eaque, cupiditate soluta.</p>
            </div>`;
}