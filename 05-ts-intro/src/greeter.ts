function greeter(name: string, date: Date = new Date()): string {
  return `Hello ${name}! from Typescript on ${date.toDateString()}`;
}

// document.getElementById("results")!.innerHTML = greeter("Boris"); // we have risk if the element is not in the HTML file, so we use this ->

const elem = document.getElementById('results');
if(elem !== null) {
    elem.innerHTML = greeter('Boris');
}


function printId(id: number | string) {
    if(typeof id === "string"){
        console.log("Your ID is: " + id.toUpperCase());
    } else {
        console.log("Your ID is: " + ++id);
    }
    console.log("Your ID is: " + id);
}

function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
      // Here: 'x' is 'string[]'
      console.log("Hello, " + x.join(" and "));
    } else {
      // Here: 'x' is 'string'
      console.log("Welcome lone traveler " + x);
    }
}

function logValue(x: Date | string) {
    if (x instanceof Date) {
      console.log(x.toUTCString());
    } else {
      console.log(x.toUpperCase());
    }
}

type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}

let x = Math.random() < 0.5 ? 10 : "hello world!";
x = 1;
console.log(x);
x = "string";
console.log(x);


// printId(40);
// printId("50")

// welcomePeople("me");
// welcomePeople(["me","you"]);

// logValue("Boris");
// logValue(Date());