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
});
