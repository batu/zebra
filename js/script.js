var myEtsyObject;

// Create more than one graph to compare it to minimym vage

var etsyApi = "https://openapi.etsy.com/v2/listings/active.js?format=jsonp?title=hat&api_key=rpao192ks72abj1sgx7wkkwc";
var term;
var myEtsyObject = {};
var initialButtonCall = true;
var searchTerm, moneyAmount;
var callCount = 0;
console.log(callCount);


$('#input').keypress(function (e) {
 var key = e.which;
 if(key == 13) button();
});

$('#theButton').click(function(){
	button();
	});

//"https://openapi.etsy.com/v2/users/testusername.js?callback=getData&api_key=rpao192ks72abj1sgx7wkkwc";
//https://openapi.etsy.com/v2/listings/active.js?keywords="+terms+"&limit=12&includes=Images:1&api_key="+api_key
	

function callEtsy(term, money){
		etsyUrl = "https://openapi.etsy.com/v2/listings/active.js?keywords="+term+"&limit=12&includes=Images:1&api_key=rpao192ks72abj1sgx7wkkwc";
		//etsyUrl = "https://openapi.etsy.com/v2/listings/active.js?format=jsonp?title=" + term + "&api_key=rpao192ks72abj1sgx7wkkwc";

		$.ajax({
		url: etsyUrl,
		type: "GET",
		dataType: "jsonp",

		error: function(httpReq,status,exception){
		console.log(status+" "+exception);
		},

		success: function(data){

			magic(data,money,term);
			callCount++;
		}
	});

}



function makeD3ChartUp(dataset){
	//Clear the container each time a new chart is made
	term = dataset.term;
	dataset = [dataset.myAmount];
	var w = 120;
	var h = 280;
	var barPadding = 2;

	var yScale = d3.scale.linear()
		.domain([0,3000])
		.range([0,280]);

	var svg = d3.select('#upChart')
		.append("svg")
		.attr("width", w)
		.attr("height", h);


	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x", function(d, i) {
			return i * (w / dataset.length);
		})
		.attr("y", function(d) {
			//return h - d;
			return h - (yScale(d));
		})
		.attr("width", w / dataset.length - barPadding)
		.attr("height", function(d) {
			//return d;
			return yScale(d);
		})
		.attr("fill", function(d){
			var red = Math.min(Math.round(d) * 2, 255);
			//console.log(r);
			var color = 'rgb(211,211,211)';
			return color;
		});

		svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d) {
			return term;
		})
		.attr("text-anchor", "middle")
		.attr("x", function(d, i) {
			return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
		})
		.attr("y", function(d) {
			return h - yScale(d);
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", "22px")
		.attr("fill", "black");
}

function makeD3ChartDown(dataset){
	//Clear the container each time a new chart is made
	term = dataset.term;
	dataset = [dataset.theirAmount];

	var w = 120;
	var h = 280;
	var barPadding = 2;

	var yScale = d3.scale.linear()
		.domain([0,3000])
		.range([0,280]);

	var svg = d3.select('#downChart')
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x", function(d, i) {
			return i * (w / dataset.length);
		})
		.attr("y", function(d) {
			//return h - d;
			return h - (yScale(d));
		})
		.attr("width", w / dataset.length - barPadding)
		.attr("height", function(d) {
			//return d;
			return yScale(d);
		})
		.attr("fill", function(d){
			//console.log(r);
			var color = 'rgb(221,221,221)';
			return color;
		});

	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d) {
			return term;
		})
		.attr("text-anchor", "middle")
		.attr("x", function(d, i) {
			return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
		})
		.attr("y", function(d) {
			return h - yScale(d);
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", "22px")
		.attr("fill", "black");
}




function changeInputBox(){
	$('input').attr("placeholder", "Now enter the item you want to buy from ETSY!");
	$('input').attr("type", "text");
	$('input')
		.not(':button, :submit, :reset, :hidden')
		.val('')
		.removeAttr('checked')
		.removeAttr('selected');
}

function button(){
	console.log("CLicked the button!");
		if (initialButtonCall){
			moneyAmount = $('#input').val();
			initialButtonCall = false;
			changeInputBox();
		} else {
			searchTerm = $('#input').val();
			callEtsy(searchTerm, moneyAmount);
			changeInputBox();
		}
	}

function purchaseText(data,term){
	$( ".yourPurchase" ).empty();
	$( ".theirPurchase" ).empty();

	var title = data.title;
	var myAmount = data.myAmount;
	var theirAmount = data.theirAmount;
	var theirIncome = 2920;
	var myHtmlString = '';
	var theirHtmlString = '';

	myHtmlString += "<span>A </span>";
	myHtmlString += "<span class = 'month'>MONTHS</span>";
	myHtmlString += "<span> work will get you </span>";
	myHtmlString += "<span class = 'times'>" + myAmount + "</span>";
	myHtmlString += "<span>  </span>";
	myHtmlString += "<span class = 'title'>" + term + "</span>";
	myHtmlString += "<span>s! </span>";

	$( ".yourPurchase" ).append(myHtmlString);


	theirHtmlString += "<span>A </span>";
    theirHtmlString += "<span class = 'month'> WHOLE YEAR</span>";
    theirHtmlString += "<span>'s combined salaries of </span>";
    theirHtmlString += "<span class = 'wage'> AVERAGE WAGE </span>";
    theirHtmlString += "<span> will get someone -zebra or human- only </span>";
    theirHtmlString += "<span class = 'times'>" + theirAmount + "</span>";
    theirHtmlString += "<span> </span>";
    theirHtmlString += "<span class = 'title'>" + term + "</span>";
    theirHtmlString += "<span>s! </span>";

	$( ".theirPurchase" ).append(theirHtmlString);

}

function magic(data, money, term){

	if (callCount == 4){
		DONATE();
	}

	myEtsyObject.term = term;
	myEtsyObject.everything = data;
	myEtsyObject.cost = data.results[0].price;
	myEtsyObject.title = data.results[0].title;
	myEtsyObject.myAmount  =  Math.floor(money / myEtsyObject.cost);
	myEtsyObject.theirAmount = Math.floor(2920 / myEtsyObject.cost);

	purchaseText(myEtsyObject,term);
	makeD3ChartUp(myEtsyObject);
	makeD3ChartDown(myEtsyObject);


}

function DONATE(){
	console.log("HERE");
	$('.DONATE').fadeTo(800,1);
	$("#yes").attr("href","http://wherethefuckshouldidonate.com/home.cgi");
	$("#no").attr("href","http://www.you-failed.com/");
}