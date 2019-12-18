$(document).ready(function() {
    $('.itemContainer').on('click',function() {
        $('.itemContainer').removeClass('selected');
        $(this).addClass('selected');
    });
});