var previousFlippedID;
var previousFlippedClass;

function flip(card) {
    if(previousFlippedID != card.id && previousFlippedClass != "card") {
        $("#" + previousFlippedID).toggleClass('flipped');
    }
    $("#" + card.id).toggleClass('flipped');
    previousFlippedClass = card.className;
    previousFlippedID = card.id;
}