$(document).ready(function () {
  const selectedAmenities = [];
  const selectedCities = [];
  const selectedStates = [];

  $('input[type="checkbox"]').change(function () {
    const checkboxId = $(this).attr('id');
    const itemId = $(this).data('id');
    const itemType = $(this).data('type');

    if (this.checked) {
      if (itemType === 'amenity') {
        selectedAmenities.push(itemId);
      } else if (itemType === 'city') {
        selectedCities.push(itemId);
      } else if (itemType === 'state') {
        selectedStates.push(itemId);
      }
    } else {
      if (itemType === 'amenity') {
        const index = selectedAmenities.indexOf(itemId);
        if (index > -1) {
          selectedAmenities.splice(index, 1);
        }
      } else if (itemType === 'city') {
        const index = selectedCities.indexOf(itemId);
        if (index > -1) {
          selectedCities.splice(index, 1);
        }
      } else if (itemType === 'state') {
        const index = selectedStates.indexOf(itemId);
        if (index > -1) {
          selectedStates.splice(index, 1);
        }
      }
    }

    updateLocationsText();
  });

  function updateLocationsText() {
    const locationsText = getSelectedLocationsText();
    $('.locations h4').text(locationsText);
  }

  function getSelectedLocationsText() {
    const selectedLocations = [];

    selectedStates.forEach(function (stateId) {
      selectedLocations.push('State ID: ' + stateId);
    });

    selectedCities.forEach(function (cityId) {
      selectedLocations.push('City ID: ' + cityId);
    });

    return selectedLocations.join(', ');
  }

  $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  function performPlacesSearch() {
    const amenities = selectedAmenities;
    const cities = selectedCities;
    const states = selectedStates;
    
    const requestData = {
      amenities: amenities,
      cities: cities,
      states: states
    };

    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify(requestData),
      success: function (response) {
        $('.places').empty(); // Clear existing places before adding new ones
        response.forEach(function (place) {
          const article = $('<article></article>').addClass('place');
          const title = $('<h2></h2>').text(place.name);
          const price = $('<div></div>').addClass('price_by_night').text('$' + place.price_by_night);
          const description = $('<div></div>').addClass('information').append($('<div></div>').text(place.description));

          article.append(title, price, description);
          $('.places').append(article);
        });
      }
    });
  }

  $('button').click(function () {
    performPlacesSearch();
  });
});
