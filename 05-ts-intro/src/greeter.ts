function greeter(name: string): string{
    return `Hello ${name}! from Typescript`;
}

// document.getElementById('results')!.innerHTML = greeter('Boris'); // we have risk if the element is not in the HTML file, so we use this ->
const elem = document.getElementById('results');
if(elem != null) {
    elem.innerHTML = greeter('Boris');
}