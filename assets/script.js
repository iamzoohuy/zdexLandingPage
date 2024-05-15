"use strict";

(() => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const navMenu = $(".nav-menu"),
        headerNav = $(".header__nav"),
        overlay = $("header .overlay"),
        priceSlides = $$("ul.price__slide"),
        projectRight = $(".project__right");
    
    // Handle header responsive
    navMenu.addEventListener("click", e => {
        headerNav.classList.add("active");
    })

    overlay.addEventListener("click", e => {
        headerNav.classList.remove("active");
    })

    // Call API get data
    const apiUrl = "https://api.llama.fi/protocols";
    async function getData(url) {
        let myObject = await fetch(url);
        let myText = await myObject.text();
        return JSON.parse(myText);
    }

    getData(apiUrl)
        .then(data => {
            priceHandle(data);
            projectHandle(data);
        })

    // Handle price data
    function priceHandle(data) {
        let html = ``;
        for (let i = 0; i < 15; ++i) {
            let tvl = data[i].tvl;
            html +=
            `<li class="price__slide-item">
                <h4>${data[i].name}</h4>
                <strong>$${
                    (tvl / 1e9) > 1 ?
                    (tvl / 1e9).toFixed(1) + "B+" :
                    (tvl / 1e6).toFixed(1) + "M+"
                }</strong>
            </li>`;
        }
        priceSlides.forEach(ul => {
            ul.innerHTML = html;
        });
    }

    // Handle project image data
    function projectHandle(data) {
        let html = `<ul class="project__right-list">`;
        for (let i = 0; i < 17; ++i) {
            html += `<li><img src="${data[i].logo}"></li>`
            if (i === 5 || i === 10) {
                html += `</ul><ul class="project__right-list">`
            }
        }
        projectRight.innerHTML = html += '<ul/>';
    }
})()