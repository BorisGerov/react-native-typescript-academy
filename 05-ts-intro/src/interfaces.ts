// type Point = {
//     x: number;
//     y: number;
//     z?: number;
//   };

// interface Point {
//     x: number;
//     y: number;
//     z?: number;
// }

// interface Point {
//     [key: string]: number;
// }
  // Exactly the same as the earlier example
// function printCoord(pt: Point) {
//     for(const key in pt) {
//         console.log(`The coordimate's ${key} value is ` + pt[key]);
//     }
//     // console.log("The coordinate's x value is " + pt.x);
//     // console.log("The coordinate's y value is " + pt.y);
//     // console.log("The coordinate's z value is " + pt.z);
//   }

// interface Counter {
//     counter: 0 | 1; 
// }
// const obj: Counter = {counter: 1};
// // eslint-disable-next-line no-constant-condition
// if (1 === 1) {
//   obj.counter = 1;
// }

// const obj = { counter: 0 | 1};
// // eslint-disable-next-line no-constant-condition
// if (1 === 1) {
//   obj.counter = 1;
// }

// const obj: Counter = {counter: 1};
//   obj.counter = 1;


// const req = {url: "https://example.com", method: "GET" };
// handleRequest(req.url, req.method as "GET");

// function handleRequest(url: string, method: "GET" | "POST") {
//     return console.log(url + method);
// }
   
//   printCoord({ x: 111, y: 222 , z:333});