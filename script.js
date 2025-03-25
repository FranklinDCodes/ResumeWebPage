
// load content
async function loadContent() {

    // content category id tracker
    let intIdNumber = 1;

    // where the content will be added
    let objContentBlock = document.querySelector('#divContentBlockContainer');

    // content category names
    let arrCategoryNames = ["education", "work", "research", "smart", "projects", "extracurriculars"]
  
    for (const strCategoryName of arrCategoryNames) {

        // fetch html
        let response = await fetch(`content/${strCategoryName.toLowerCase()}.html`);
        const html = await response.text();

        // create new div for content
        let objNewDivElement = document.createElement('div');
        objNewDivElement.setAttribute("id", `divTab${intIdNumber}ContentBlock`);

        // hide if not first element
        if (intIdNumber !== 1) {
            objNewDivElement.setAttribute("class", "d-none");
        }

        // set content
        objNewDivElement.innerHTML = html;
        
        // add new div to content area
        objContentBlock.appendChild(objNewDivElement);

        // increment id
        intIdNumber ++;

    }
        
}

document.addEventListener("DOMContentLoaded", function() {
    
    loadContent();

})

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

        // de-select current selected and hide current content
        document.querySelector(`#${strSelectedTabId}`).classList.remove("tab-selected");
        document.querySelector(`#${strSelectedTabId}ContentBlock`).classList.add("d-none");

        // add selected class to current
        this.classList.add("tab-selected");

        // set new selected tab
        strSelectedTabId = this.id;

        // set new tab block title
        document.querySelector('#txtTabBlockTitle').textContent = this.textContent;

        // unhide content
        document.querySelector(`#${strSelectedTabId}ContentBlock`).classList.remove("d-none");

        // scroll screen if at the top and first click
        // set first click to false
        if (boolFirstClick && window.scrollY <= 150) {
            document.querySelector('#divTabBlock').scrollIntoView();
            boolFirstClick = false;
        }
        else if (boolFirstClick) {
            boolFirstClick = false;
        }

    });
    
});
