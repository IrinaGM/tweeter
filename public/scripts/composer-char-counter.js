$(document).ready(function () {
  $("textarea").on("input", function () {
    //find the length of the textarea
    let countCharsInput = $(`#${this.id}`).val().length;
    const maxChars = 140;
    //find the element with class counter
    const counterElm = $(this).parents().find(".counter");
    let countDiff = maxChars - countCharsInput;
    //set the value of the found class to the difference
    counterElm.val(countDiff);

    //change class on the counter element based on the value
    if (countDiff < 0) {
      counterElm.addClass("red-text");
    } else {
      counterElm.removeClass("red-text");
    }
  });
});
