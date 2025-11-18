$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.

  $('.selectable-pet').click(function() { //when the image is selected
    $('.selectable-pet').removeClass('selected'); //remove selected pet from all pets
    $(this).addClass('selected'); //add selected to the image that was clicked
    selectedPetIndex = $(this).data("index"); //store the index
  });

  $('#finish-selection').click(function() { //when finish is clicked
    const name = $('#pet-name').val().trim(); //get pet name and trim spaces
    if(selectedPetIndex === null) { //error check for no image
      alert("Please select a pet image!");
      return;
    }
    if(name === "") { //error check for no name
      alert("Please enter a name for your pet!");
      return;
    }

    const selectedPet = petOptions[selectedPetIndex]; //get stats of chosen index
    pet_info.name = name;
    pet_info.weight = selectedPet.weight;
    pet_info.happiness = selectedPet.happiness;
    pet_info.times = selectedPet.times;
    pet_info.image = selectedPet.image;

    $('.pet-image').attr('src', pet_info.image); //image on main screen

    const bgMusic = document.getElementById("bg-music"); //background music
    bgMusic.volume = 0.2; 
    bgMusic.play();

    $('.pet-selection-popup').slideUp(400, function() {
      $('.dashboard').slideDown(400);
      checkAndUpdatePetInfoInHtml(); //update info
    });
  });

  // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.pet-button').click(clickedPetButton);

  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();
});

// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = {name:"My Pet Name", weight:0, happiness:0, times:0, image:""};
var selectedPetIndex = null;

const petOptions = [ //stats of the pets
  {weight: 10, happiness: 5, times:0, image: "images/cat.jpg"},
  {weight: 8, happiness: 6, times:0, image: "images/surfer.jpg"},
  {weight: 12, happiness: 4, times:0, image: "images/crazedCat.jpg"},
  {weight: 9, happiness: 7, times:0, image: "images/bear.jpg"},
  {weight: 5, happiness: 2, times:0, image: "images/angel.jpg"},
  {weight: 9, happiness: 10, times:0, image: "images/tank.jpg"},
  {weight: 3, happiness: 2, times:0, image: "images/togeluga.jpg"}
];

function clickedTreatButton() { //treat, the pet gets +2 happiness and +1 weight
  pet_info.happiness += 2;
  pet_info.weight += 1;
  playSound("button-sound");
  showPetComment(`${pet_info.name}: So tasty!!`);
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() { //play, the pet gets +3 happiness and -1 weight
  pet_info.happiness += 3;
  pet_info.weight -= 1;
  playSound("button-sound");
  showPetComment(`${pet_info.name}: Lets play more!!`);
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() { //excercise, the pet gets -2 happiness and -2 weight
  pet_info.happiness -= 2;
  pet_info.weight -= 2;
  playSound("button-sound");
  showPetComment(`${pet_info.name}: I am so tired!!`);
  checkAndUpdatePetInfoInHtml();
}

function clickedPetButton() { //pet, the pet gets +1 pet times
  pet_info.times += 1;
  playSound("button-sound");
  showPetComment(`${pet_info.name}: More pets please!!`);
  checkAndUpdatePetInfoInHtml();
}

function playSound(id) { //function for sound effect
  const sound = document.getElementById(id);
  sound.currentTime = 0;
  sound.play();
}

// Updates your HTML with the current values in your pet_info object
function checkAndUpdatePetInfoInHtml() { //check for stats to be never zero, if less than zero, make it zero
  if (pet_info.weight < 0) pet_info.weight = 0;
  if (pet_info.happiness < 0) pet_info.happiness = 0;

  $('.name').text(pet_info.name);
  $('.weight').text(pet_info.weight);
  $('.happiness').text(pet_info.happiness);
  $('.times').text(pet_info.times);
}

function showPetComment(message) {
  const $commentBox = $('<div class="pet-comment"></div>').text(message).hide(); //comment box is hidden
  $('.dashboard').find('.comment-area').append($commentBox); //append to dashboard
  $commentBox.slideDown(400).delay(1000).slideToggle(400, function() { //slideDown and SlideToggle, I used it here to animate the pet's comment
    $(this).remove(); 
  });
}