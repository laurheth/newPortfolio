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

});