class Controls {
	constructor(type) {
		this.forward = false;
		this.left = false;
		this.right = false;
		this.reverse = false;

		switch (type) {
			case "KEYS":
				this.#addEventListeners();
				break;
			case "DUMMY":
				this.forward = true;
				break;
		}
	}

	#addEventListeners() {
		// We used arrow function because it will change 'this' keyword context from class to the DOM
		document.onkeydown = (event) => {
			switch (event.key) {
				case "ArrowLeft":
					this.left = true;
					break;
				case "ArrowRight":
					this.right = true;
					break;
				case "ArrowUp":
					this.forward = true;
					break;
				case "ArrowDown":
					this.reverse = true;
					break;
			}

			console.table(this);
		};
		document.onkeyup = (event) => {
			switch (event.key) {
				case "ArrowLeft":
					this.left = false;
					break;
				case "ArrowRight":
					this.right = false;
					break;
				case "ArrowUp":
					this.forward = false;
					break;
				case "ArrowDown":
					this.reverse = false;
					break;
			}
		};
	}
}
