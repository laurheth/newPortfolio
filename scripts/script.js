$(document).ready(function() {
    // items within the portfolio section to reveal insides on mobile / on click
    $('.itemContainer').on('click',function() {
        $('.itemContainer').removeClass('selected');
        $(this).addClass('selected');
    });

    // open the hamburger menu!
    $('.hamburgerButton').on('click',function() {
        $(this).toggleClass('open');
        $('.menu').toggleClass('open');
    });

    // on clicking something in the menu, close the menu
    $('.menu a').on('click', function() {
        $('.menu').removeClass('open');
        $('.hamburgerButton').removeClass('open');
    });

});