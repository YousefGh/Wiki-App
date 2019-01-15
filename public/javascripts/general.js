function loader() {

	document.getElementById("searchTerm")
	.addEventListener("keyup", function(event) {
		event.preventDefault();
		var element = document.getElementById('cont');

		if(document.getElementById('searchTerm').value === ''){
			console.log('xxxxx');

			while (element.firstChild) {
				element.removeChild(element.firstChild);
			}

		} else {
			getWiki();
		}
	});

}


function getWiki() {

	var ourRequest = new XMLHttpRequest();
	var searchTerm = document.getElementById('searchTerm').value ;
	var wikiEndPoint = "https://en.wikipedia.org"
	var action = "/w/api.php?action=opensearch&format=json&origin=*&search=";
	console.log(searchTerm);

	var url = wikiEndPoint + action + searchTerm;

	ourRequest.open('GET', url);
	ourRequest.onload = function() {

		var ourData = JSON.parse(ourRequest.responseText);
		var element = document.getElementById('cont');
		/*for(var i = 0 ; i < ourData[1].length ; i++){

		}*/
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}

		if (ourData[1] === undefined ){
			element.insertAdjacentHTML(
				'afterbegin',
				'<div id="resultError">'+
				'<i class="fa fa-search not" aria-hidden="true"></i><h1>No Results Found</h1>'+
				'</div>');
		}else if (ourData[1].length === 0 ){
			element.insertAdjacentHTML(
				'afterbegin',
				'<div id="resultError">'+
				'<i class="fa fa-search not" aria-hidden="true"></i><h1>No Results Found</h1>'+
				'</div>');
		} else if(searchTerm === ''){
			console.log('xxxxx');
		}

		else {
			for(var i = ourData[1].length -1; i >= 0 ; i--){
				
				element.insertAdjacentHTML(
					'afterbegin', '<a target="_blank" href=" '+ourData[3][i] +' ">' +
					'<div class="box animated fadeIn"> ' +
					'<div class="box-content">' + 
					' <h1 id="title">'+ourData[1][i] +'</h1> <br><br><br><br>'+
					'<h4 id="subtitle">'+ourData[2][i] +
					'</h4></div></div><br>' +
					'</a>'
					);
			}
		}
	}	

	ourRequest.send();
}

/*https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +"&format=json&callback=?*/

