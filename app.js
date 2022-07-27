const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 400;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
// const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");

const carWidth = 30;
const carHeight = 50;
const dummyCarSpeed = 1;
// const dummyCarColor = 'red'
const N = 100;
const cars = generateCars(N);
console.log(carCanvas.height);
const traffic = [
	new Car(
		road.getLaneCenter(1),
		-100,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(0),
		-300,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(2),
		-300,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(0),
		-550,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(1),
		-700,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(0),
		-700,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(1),
		-900,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(2),
		-1100,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(0),
		-1100,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(1),
		-1400,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(0),
		-1600,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(2),
		-1700,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(0),
		-1800,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(1),
		-1800,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(2),
		-1900,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(0),
		-1900,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
	new Car(
		road.getLaneCenter(1),
		-2000,
		carWidth,
		carHeight,
		"DUMMY",
		dummyCarSpeed,
		getRandomColor()
	),
];

let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
	for (let i = 0; i < cars.length; i++) {
		cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
		if (i != 0) {
			NeuralNetwork.mutate(cars[i].brain, 0.1);
		}
	}
}
animate();

function generateCars(N) {
	const cars = [];

	for (let i = 0; i < N; i++) {
		// You can change "AI" to "KEYS" to use keys instead of Self driving
		cars.push(new Car(road.getLaneCenter(1), 100, carWidth, carHeight, "AI"));
	}

	return cars;
}

function save() {
	localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
	localStorage.removeItem("bestBrain");
}
function animate(time) {
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].update(road.borders, []);
	}
	for (let i = 0; i < cars.length; i++) {
		cars[i].update(road.borders, traffic);
	}

	bestCar = cars.find((car) => car.y === Math.min(...cars.map((s) => s.y)));

	carCanvas.height = window.innerHeight;
	networkCanvas.height = window.innerHeight;
	carCtx.save();
	carCtx.translate(0, -bestCar.y + carCanvas.height * 0.5);

	road.draw(carCtx);
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].draw(carCtx);
	}

	carCtx.globalAlpha = 0.2;
	for (let i = 0; i < cars.length; i++) {
		cars[i].draw(carCtx);
	}
	carCtx.globalAlpha = 1;
	bestCar.draw(carCtx, true);

	carCtx.restore();

	networkCtx.lineDashOffset = -time / 50;
	Visualizer.drawNetwork(networkCtx, bestCar.brain);
	requestAnimationFrame(animate);
}
