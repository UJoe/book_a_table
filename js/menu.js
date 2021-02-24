window.addEventListener("load", _load);

function _load() {

	let toppings = [
		{
			name: "Margherita",
			price: 800,
		},
		{
			name: "Funghi",
			price: 800,
		},
		{
			name: "Prosciutto",
			price: 900,
		},
		{
			name: "Salame",
			price: 900,
		},
		{
			name: "Hawaii",
			price: 1000,
		},
		{
			name: "Vegetáriano",
			price: 1000,
		},
		{
			name: " Bolognese",
			price: 1100,
		},
		{
			name: "Quatro Formaggie",
			price: 1100,
		},
		{
			name: "Hungaricum",
			price: 1200,
		},
		{
			name: "Mexicano",
			price: 1200,
		},
		{
			name: "Hercules",
			price: 1500,
		},
		{
			name: "Maximus",
			price: 1500,
		},
	]

	let toppingList = "<div>";

	for (let i=0; i<toppings.length; i++){
		if (i!=0 && i%6==0) {toppingList = toppingList +`</div><div>`;}
		toppingList = toppingList +	`<div class="menu_items" >${toppings[i].name} pizza - ${toppings[i].price} Ft</div>`;
	};
	toppingList = toppingList +`</div>`;

	document.getElementById("pizza").innerHTML = toppingList;
}