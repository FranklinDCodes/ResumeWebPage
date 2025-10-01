
// tab categories
var arrCategoryNames = ["education", "work", "research", "smart", "projects", "extracurriculars"]


// load content
async function loadContent() {

    // content category id tracker
    let intIdNumber = 1;

    // where the content will be added
    let objContentBlock = document.querySelector('#divTextContent');
  
    for (const strCategoryName of arrCategoryNames) {

        // fetch html
        let response = await fetch(`content/${strCategoryName.toLowerCase()}.html`);
        const html = await response.text();

        // create new div for content  block
        let objNewDivElement = document.createElement('div');
        objNewDivElement.setAttribute("id", `divTab${intIdNumber}ContentBlock`);
        objNewDivElement.setAttribute("class", "d-flex flex-column mt-5 text-start col-12");

        // hide if not first element
        if (intIdNumber !== 1) {
            objNewDivElement.classList.add("d-none");
        }

        // set content
        objNewDivElement.innerHTML = html;
        
        // add new div to content area
        objContentBlock.appendChild(objNewDivElement);

        // add new div to small tab
        let objNewSmallDivElement = objNewDivElement.cloneNode(true);
        objNewSmallDivElement.id += "Small";
        document.querySelector(`#divTextContent${intIdNumber}`).appendChild(objNewSmallDivElement);

        // increment id
        intIdNumber ++;

    }
        
}

// load content on document loaded
document.addEventListener("DOMContentLoaded", function() {
    loadContent();
})

// hide small panels when it resizes
window.addEventListener('resize', () => {

    const boolLargeScreen = window.innerWidth >= 992;

    // actively set display at larger sizes
    if (!boolLargeScreen) {


        document.querySelector(`#${strSelectedTabId}Block`).style.display = 'none';

    }


});

// store selected tab
let strSelectedTabId = "divTab1";

// get all tabs
let arrTabs = document.querySelectorAll('.tab');

// false if any tab has been clicked
let boolFirstClick = true;

// add on click to tabs
arrTabs.forEach(objDivTab => {

    objDivTab.addEventListener('click', function() {

        // check if already selected
        if (this.classList.contains("tab-selected")) {
            return;
        }

        // set new selected tab
        strSelectedTabId = this.id;

        // de-select current selected and hide current content
        document.querySelector(`#${strSelectedTabId} button`).classList.remove("tab-selected");
        document.querySelector(`#${strSelectedTabId}ContentBlock`).classList.add("d-none");

        // add selected class to current
        document.querySelector(`#${strSelectedTabId} button`).classList.add("tab-selected");

        // unhide content
        document.querySelector(`#${strSelectedTabId}ContentBlock`).classList.remove("d-none");

        // check if big tab block is showing
        let strTabBlockDisplay = window.getComputedStyle(document.querySelector('#divTabBlock')).display;

        if (strTabBlockDisplay == "block") {

            // scroll screen if at the top and first click
            // set first click to false
            if (boolFirstClick && window.scrollY <= 150) {
                document.querySelector(`#${strSelectedTabId}Block`).scrollIntoView();
                boolFirstClick = false;
            }
            else if (boolFirstClick) {
                boolFirstClick = false;
            }

        }
        else {

            // scroll down small content window
            $(`${strSelectedTabId}Block`).slideDown(1000);
            document.querySelector(`#${strSelectedTabId}Block`).classList.remove('d-none');

        }

    });
    
});
