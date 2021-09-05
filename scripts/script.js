/**
 * Function to display the results of the contact form!
 */
function displayContactResult() {
    // Get the URL search parameters
    const url = new URL(window.location);
    const params = Object.fromEntries((new URLSearchParams(url.search)).entries())

    if (params && params.sendResult) {
        // A result exists! What is the result?
        let resultText = "";
        if (params.sendResult === "success") {
            resultText = `Email sent! I will get back to you as soon as I can!`;
        } else if (params.sendResult === "fail") {
            resultText = `Uh oh. Something went wrong when sending that e-mail. Please try again another time, or try to contact me via <a href="https://www.linkedin.com/in/lauren-hetherington-57b54569/">my LinkedIn</a>!`;
        }

        // I'm a bit worried about people bookmarking a url with a result tag in it, hah.
        // Use timestamp as a quick and easy sanity check
        const time = Math.floor(Date.now() / 1000);

        // Time is weird. Lets just not!
        if (params.time && time - parseInt(params.time) > 86400) {
            return;
        }

        // Not a valid result. Get outta here!
        if (!resultText) {
            return;
        } else {
            resultText = `<p>${resultText}</p>`;
        }

        // Set up the spot to display it.
        const $contactResultDiv = $('#contactResultDiv');

        // Apply the expected class
        $contactResultDiv.addClass("contactResult");

        // Insert some content
        $contactResultDiv.append(resultText);
    }
}

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

    // Display any results from the contact form, if used.
    displayContactResult();

});