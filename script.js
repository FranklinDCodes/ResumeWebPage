
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

        // de-select current selected 
        document.querySelector(`#${strSelectedTabId}`).classList.remove("tab-selected");

        // add selected class to current
        this.classList.add("tab-selected");

        // set new selected tab
        strSelectedTabId = this.id;

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
