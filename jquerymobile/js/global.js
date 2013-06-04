$(document).ready(function() {
	var siteRss = [
		{title: 'Joyent', url: 'http://joyent.com/blog/feed'},
		{title: 'Sphinx', url: 'http://sphinxsearch.com/blog/feed/'},
		{title: 'Labo Web SUPINFO', url: 'http://www.labo-web.com/feed/'},
	];

	var siteHtml = "";

	$.each(siteRss, function(id, val) {
		siteHtml +='<li>\
			<a id="' + id +'">\
			<p><h1 class="titre">' + val.title + '</h1></p>\
			</a>\
			</li>'; 
	});

	$("#listSiteRss").html(siteHtml);
	$("#listSiteRss").listview().listview("refresh");

	$('#siteRss ul li a').click(function() {
		var id = $(this).attr('id');
		var fluxRss = [];

		if ($("#listFluxRss").html() == "" || $('#fluxRss div[data-role=header] h1').html() != siteRss[id].title) {
			$.ajax({
				type: "GET",
				url: 'proxy.php?url='+siteRss[id].url,
				dataType: "xml",
				success: function (xml) {
					$(xml).find('item').each( function(id,val){
						elementRss = {
								title:$(val).find('title').text(),
								url:$(val).find('link').text()
						}

						fluxRss.push(elementRss);
					});

					var fluxHtml = "";

					$.each(fluxRss, function(id, val) {
						fluxHtml +='<li>\
							<a href="' + val.url +'">\
							<p><h1 class="titre">' + val.title + '</h1></p>\
							</a>\
							</li>'; 
					});

					$('#fluxRss div[data-role=header] h1').html(siteRss[id].title)
					$("#listFluxRss").html(fluxHtml);

					$.mobile.changePage("#fluxRss", {
						transition: "slide"
					});

					$("#listFluxRss").listview().listview("refresh");
				}
			});
		} else {
			$.mobile.changePage("#fluxRss", {
				transition: "slide"
			});
		}
	});
});