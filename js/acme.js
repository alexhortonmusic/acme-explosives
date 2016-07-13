"use strict";
$(document).ready(function () {

	var ajaxOne = function() {
	  return new Promise((resolve, reject) => {
	    $.ajax({
	      url: "js/categories.json",
	    }).done(function(data) {
	      resolve(data);
	    }).fail(function(xhr, status, error) {
	      reject(error);
	    });
	  });
	};

	var ajaxTwo = function() {
	  return new Promise((resolve, reject) => {
	    $.ajax({
	      url: "js/types.json"
	    }).done(function(data) {
	      resolve(data);
	    }).fail(function(xhr, status, error) {
	      reject(error);
	    });
	  });
	};

	var ajaxThree = function() {
	  return new Promise((resolve, reject) => {
	    $.ajax({
	      url: "js/products.json"
	    }).done(function(data) {
	      resolve(data);
	    }).fail(function(xhr, status, error) {
	      reject(error);
	    });
	  });
	};

	// promises
	$('#acmeSelect').on('change', function (event) {
		var array = [];
		ajaxOne()
			.then(function (data1) {
				console.log("data1", data1);
				array.push(data1);
				return ajaxTwo();
			})
			.then(function(data2) {
				console.log("data2", data2);
				array.push(data2);
				return ajaxThree();
			})
			.then(function(data3) {
				console.log("data3", data3);
				array.push(data3);
				return printToPage(array, event);
			});
	});


	function printToPage(data, event) {
		let selectValue = event.target.value.toLowerCase();
		let category = data[0].categories;
		let categoryFire = category[0].name;
		let categoryDemo = category[1].name;
		let type = data[1].types;
		let prodArr = data[2].products;
		let prodObj = prodArr[0];
		let output = $('#output');
		let htmlStr = '';
		for (let key in prodObj) {
			var product = prodObj[key]; // gives you key/value pairs (value is another object)
			if (selectValue === 'fireworks') {
				category = "Fireworks";
				if (product.type < 2) {
					if (product.type === 0) {
						product.type = "Personal";
					} else if (product.type === 1) {
						product.type = "Commercial";
					}
					htmlStr += `
						<div class="col-md-4 productCard">
							<h3 class="productName">${product.name}</h3>
							<h4>${product.description}</h4>
							<p>${product.type} ${category}</p>
						</div>
					`;
				}
			} else if (selectValue === "demolitions") {
					category = "Demolitions";
					if (product.type > 1) {
						if (product.type === 2) {
							product.type = "Commercial";
						} else {
							product.type = "Military";
						}
						htmlStr += `
						<div class="col-md-4 productCard">
							<h3 class="productName">${product.name}</h3>
							<h4>${product.description}</h4>
							<p>${product.type} ${category}</p>
						</div>
					`;
					}
				}
			}
			output.append(htmlStr);
		}
});
