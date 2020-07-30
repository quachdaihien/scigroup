// Accrodion Single
var Accordion = function (options) {
    var element = typeof options.element === 'string' ?
        document.getElementById(options.element) : options.element,
        openTab = options.openTab,
        oneOpen = options.oneOpen || false,

        titleClass = 'accordion-title',
        contentClass = 'accordion-content';

    render();

    function render() {
        // attach classes to buttons and containers
        [].forEach.call(element.querySelectorAll('button'),
            function (item) {
                item.classList.add(titleClass);
                item.nextElementSibling.classList.add(contentClass);
            });

        // attach only one click listener
        element.addEventListener('click', onClick);

        // accordion starts with all tabs closed
        closeAll();

        // sets the open tab - if defined
        if (openTab) {
            open(openTab);
        }
    }

    function onClick(e) {
        if (e.target.className.indexOf(titleClass) === -1) {
            return;

        }

        if (oneOpen) {
            closeAll();
            removeActive();
            e.target.classList.add("active");
        } else {
            e.target.classList.toggle("active");
        }

        toggle(e.target.nextElementSibling);
    }
    function removeActive() {
        [].forEach.call(element.querySelectorAll('.' + titleClass), function (item) {
            item.classList.remove("active");
        });
    }

    function closeAll() {
        [].forEach.call(element.querySelectorAll('.' + contentClass), function (item) {
            item.style.height = 0;
        });
    }

    function toggle(el) {

        var height = el.scrollHeight;

        if (el.style.height === '0px' || el.style.height === '') {
            el.style.height = height + 'px';
        } else {
            el.style.height = 0;
        }
    }

    function getTarget(n) {
        return element.querySelectorAll('.' + contentClass)[n - 1];
    }

    function open(n) {
        var target = getTarget(n);

        if (target) {
            if (oneOpen) closeAll();
            target.style.height = target.scrollHeight + 'px';
        }
    }

    function close(n) {
        var target = getTarget(n);

        if (target) {
            target.style.height = 0;
        }
    }

    function destroy() {
        element.removeEventListener('click', onClick);
    }

    return {
        open: open,
        close: close,
        destroy: destroy
    };
};

// Accrodion Multil
var acc = document.getElementsByClassName("accordions-title");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

//Tabs

let tab_navs = document.querySelectorAll("ul.tabs li");
let tab_links = document.querySelectorAll('ul.tabs li.tab-link');
// let tab_contents = document.querySelectorAll('.tab-content');

for(let tab_nav of tab_navs){
    tab_nav.addEventListener('click', (e) => {
        let tab_id = e.target.getAttribute('data-tab');

        let navParent = e.target.parentElement;
        let navChildrens = navParent.children;

        for(let navChildren of navChildrens){
            navChildren.classList.remove('current');
        }

        // Remove Current tabcontent
        let navParent2 = e.target.parentElement.parentElement;
        let navChildrens2 = navParent2.children;

        for(let navChildren2 of navChildrens2){
            navChildren2.classList.remove('current');
        }
        
        let tab_id_active = document.getElementById(tab_id);

        tab_nav.classList.add('current');
        tab_id_active.classList.add('current');
    });
}

//Tabs Single

const tab_nav_sis = document.querySelectorAll('.tabs .tab');

for(let tab_nav_si of tab_nav_sis ){
    tab_nav_si.addEventListener('click', (e) => {
        let navParent = e.target.parentElement;
        let navChildrens = navParent.children;

        for(let navChildren of navChildrens){
            navChildren.classList.remove('active');
        }
      
        tab_nav_si.classList.add('active');     
    });
}

//Tabs Single IMG

const tab_nav_si_imgs = document.querySelectorAll('.tabs .tab img');
for(let tab_nav_si_img of tab_nav_si_imgs ){
    tab_nav_si_img.addEventListener('click', (e) => {
        let navParent = e.target.parentElement.parentElement;
        let navChildrens = navParent.children;

        for(let navChildren of navChildrens){
            navChildren.classList.remove('active');
        }
      
        tab_nav_si_img.classList.add('active');    
    });
}

// modal
let modalButton = document.getElementsByClassName('modal-btn');
let modals = document.getElementsByClassName('modal');
let modalClose = document.getElementsByClassName('modal-close');
let closePic = document.getElementsByClassName('modal-closePic');
let modalBG = document.getElementsByClassName('modal-bg');

for (let i = 0; i < modalButton.length; i++) {
    for (let j = 0; j < modals.length; j++) {
        let modalCheck = function () {
            let x = modalButton[j].getAttribute('data-modal');
            let y = modals[j].getAttribute('id');
            if (x == y) {
                return true;
            }
        }

        //Show Modal
        modalButton[j].addEventListener("click", () => {
            if (modalCheck()) {
                modals[j].style.display = "block";
            }
        });

        //Hide Modal
        let modalHide = function (n) {
            for (let i = 0; i < n.length; i++) {
                n[i].addEventListener("click", () => {
                    if (modalCheck()) {
                        modals[j].style.display = "none";
                    }
                });
            }
        }

        modalHide(modalClose);
        modalHide(modalBG);
        modalHide(closePic);
    }
}

// Video Popup

// Chèn Box Modal
let container = document.getElementsByTagName('body');
container[0].insertAdjacentHTML('beforeEnd',
`<div class="modal modal-clipBox" id="modal-clip">
    <div class="modal-closePic">&times;</div>
    <div class="modal-bg"></div>
    <div class="modal-box modal-box-img animate-zoom">
        <div class="modal-pic">
            <iframe id="youtube" width="640" height="350"
                src="" frameborder="0"
                allowfullscreen></iframe>
        </div>
    </div>
</div>`
);

let modalVideos = document.getElementsByClassName('modal-clip');
for(let modalVideo of modalVideos){

    let modalSrc = modalVideo.getAttribute('data-video');

    modalSrc = `//www.youtube-nocookie.com/embed/${modalSrc}?rel=0&controls=1&autoplay=1&nocookie=true`;

    //Tat Popup Video Button Close
    let modalClipBoxs = document.getElementsByClassName('modal-clipBox');

    // console.log(modalClipBoxs[0]);

    let youtube = document.getElementById('youtube');
    modalVideo.addEventListener('click', () => {
        youtube.setAttribute('src', modalSrc);
        setTimeout(() => {
            modalClipBoxs[0].style.display = "block";
        },200);
    });
    
    for(let item of closePic){
        for(let modalClipBox of modalClipBoxs){
            item.addEventListener("click", () => {
                modalClipBox.style.display = "none";                    
            });
        }

    }

    // Tat Popup Video Background
    for(let item of modalBG){
        for(let modalClipBox of modalClipBoxs){
            item.addEventListener("click", () => {
                modalClipBox.style.display = "none";
            });
        }

    }
}