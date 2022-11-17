document.addEventListener("DOMContentLoaded",() => {
    const acmenu = [];
    for (let i = 0; i < 9; i++) {
        let qa = document.getElementById("qa-" + (i+1));
        if (qa != null)
            acmenu.push(qa);
    }
    for(let i = 0; i < acmenu.length; i++){
        let content = document.getElementById("answer-" + (i+1));

        acmenu[i].addEventListener('click', () => {
            content.classList.toggle("is-open");
        });
    }
});