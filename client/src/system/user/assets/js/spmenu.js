document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('sp-burgerMenu');
    const navGlobal = document.getElementById('c-nav--global');
    const header = document.getElementById('l-header');

    if (btn) {
        btn.addEventListener('click', () => {
            btn.classList.toggle('is-open');
            navGlobal.classList.toggle('is-open');
            header.classList.toggle('is-open');
        });
    }

    const spMenu = document.querySelectorAll('.c-nav--global__menu li a');
    if(spMenu){
        for(var i=0; i<spMenu.length; i++)
        spMenu[i].addEventListener('click', ()=>{
            btn.click();
        })
    }
});


