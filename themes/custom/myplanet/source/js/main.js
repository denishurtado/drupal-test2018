/* global require:true */

(function ($, Drupal) {
  'use strict';
  Drupal.behaviors.myplanet = {
    attach: function (context, settings) {
    
    $(document).ready(function(){

    	$('.dh-destination-page-content-hotels').addClass('active');
    	$('.dh-destination-page-links .btn-hotels').addClass('btn-active');

    	$('.dh-hotel-rooms div:first').addClass('dh-hotel-rooms-wrapper');
    	$('.dh-destination-page-content-hotels-item div:first').addClass(' dh-destination-hotels-wrapper');

    	$('#block-webform-2').css('display','none');
    	$('.dh-hotel-page-links .btn-info').addClass('btn-active');

	      $('#btn-details').click(function(event){
	      	event.preventDefault();
	      	$('.dh-destination-page-links .btn-details').addClass('btn-active');
	      	$('.dh-destination-page-links  .btn-hotels').removeClass('btn-active');

	      	$('.dh-destination-page-content-details').css('display','block');
	      	$('.dh-destination-page-content-hotels').css('display','none');
	      });

	      $('#btn-hotels').click(function(event){
	      	event.preventDefault();
	      	$('.dh-destination-page-links  .btn-hotels').addClass('btn-active');
	      	$('.dh-destination-page-links  .btn-details').removeClass('btn-active');

	      	$('.dh-destination-page-content-details').css('display','none');
	      	$('.dh-destination-page-content-hotels').css('display','block');
	      });

	      $('#btn-info').click(function(event){
	      	event.preventDefault();
	      	$('.dh-hotel-page-links .btn-info').addClass('btn-active');
	      	$('.dh-hotel-page-links  .btn-enquiry').removeClass('btn-active');

	      	$('.dh-hotel').css('display','block');
	      	$('#block-webform-2').css('display','none');
	      });

	      $('#btn-Enquiry').click(function(event){
	      	event.preventDefault();
	      	$('.dh-hotel-page-links .btn-enquiry').addClass('btn-active');
	      	$('.dh-hotel-page-links .btn-info').removeClass('btn-active');

	      	$('.dh-hotel').css('display','none');
	      	$('#block-webform-2').css('display','block');
	      });


	      	
	      	$('.hero-wrapper ul').slick({
	      		infinite: true,
	       		dots: true,
	       		autoplay: true
	      	});
    
	       	$('.dh-destination-hotels-wrapper').slick({
	       		infinite: true,
	       		dots: true,
			    vertical: true,
			    slidesToShow: 3,
			    slidesToScroll: 3,
    			verticalSwiping: true,
    			autoplay: true,
    			responsive: [
			    {
			      breakpoint: 1024,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1,
			        vertical: false,
			      	verticalSwiping: false,
			      }
			    }
			  ]  
	       	});
	      	
	      	$('.dh-hotel-rooms-wrapper').slick({
			  infinite: true,
			  slidesToShow: 3,
			  slidesToScroll: 3,
			  autoplay: true,
			   responsive: [
			    {
			      breakpoint: 1024,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1,
			        infinite: true,
			        dots: true
			      }
			    }
			   
			  ]
			});

      });

    },
    leave: function (event) {
    }
  };
})(jQuery, Drupal);
