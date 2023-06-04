$(document).ready(function() {
    const selectedAmenities = {};
  
    $('li.amenity input[type="checkbox"]').change(function() {
      const amenityId = $(this).data('id');
      const amenityName = $(this).data('name');
  
      if (this.checked) {
        selectedAmenities[amenityId] = amenityName;
      } else {
        delete selectedAmenities[amenityId];
      }
  
      const amenityNames = Object.values(selectedAmenities).sort();
      $('.amenities h4').text('Amenities: ' + amenityNames.join(', '));
    });
  });  