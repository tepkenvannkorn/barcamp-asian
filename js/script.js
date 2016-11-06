/**
 *	PROJECT			:		CAMWP DEV
 *	DEVELOPER		:		CAMWP DEV Team
 *	DEVELOPER URI	:		https://camwpdev.com
 *	DATE			:		05-Nov-2016
 */
 
$( function() {

	var BarcampAsian = {
		
		someVariables: 2,
		
		baseURL: 'https://camwpdev.com/wp-json/wp/v2/',
		
		postType: 'posts',
		
		init: function() {
			
			this.getREST();
			
			this.displayContent();
			
		},
		
		test: function() {
			
			console.log( 'Hello World! - ' + this.someVariables );
			
		},
		
		getREST: function() {
			
			$.ajax({
				
				'url' : BarcampAsian.baseURL + BarcampAsian.postType,
				
				'type' : 'GET',
				
				'dataType' : 'json',
				
			}).done( function( response ) {
				
				var posts = [];
				
				if ( response.length ) {
					
					$( response ).each( function( index, val ) {
						
						var postID = val.id;
						
						var postLink = encodeURI( val.link );
						
						var postTitle = val.title.rendered;
						
						// Add all results in the loop to an array
						
						posts.push( '<li><a href="#" data-id="' + postID + '">' + postTitle + '</a></li>' );
						
					});
					
				}
				
				// Append the array into the DOM
				
				$( '.main-link' ).append( posts );
				
			});
			
		},
		
		displayContent: function() {
			
			$( '.main-link' ).on( 'click', 'a', function( e ) {
				
				e.preventDefault();
				
				$.ajax({
					
					'url' : BarcampAsian.baseURL + BarcampAsian.postType + '/' + $( this ).attr( 'data-id' )
					
				}).done( function( response ) {
					
					var $content = $( '.content' ).empty();
					
					var postTitle = '<h2>' + response.title.rendered + '</h2>';
					
					var postContent = response.content.rendered;
					
					$content.append( postContent );
					
				});
				
			});
			
		}
		
	}
	
	$( document ).ready( function() {
		
		BarcampAsian.init();
		
	});
	
});