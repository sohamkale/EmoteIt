// external js: isotope.pkgd.js

// init Isotope
var $grid = $(".grid").isotope({
    itemSelector: ".element-item",
    layoutMode: "fitRows"
});
// filter functions
var filterFns = {};
// bind filter button click
$(".filters-button-group").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
});
// change is-checked class on buttons
$(".button-group").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "button", function () {
        $buttonGroup.find(".is-checked").removeClass("is-checked");
        $(this).addClass("is-checked");
    });
});