$(document).ready(function () {
  const selectedAmenities = [];

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      selectedAmenities.push(amenityName);
    } else {
      const index = selectedAmenities.indexOf(amenityName);
      if (index > -1) {
        selectedAmenities.splice(index, 1);
      }
    }

    updateAmenitiesText();
  });

  function updateAmenitiesText () {
    const amenitiesText = selectedAmenities.join(', ');
    $('.amenities h4').text(amenitiesText);
  }

  $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (response) {
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
});
