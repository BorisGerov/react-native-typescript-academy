const Fib = (n) => ({
    *[Symbol.iterator] (){
        let previous = 0, current = 0;
        for(let i = 0; i < n  ; i++){
            yield current;
            [previous, current] = [current , (previous + current) || 1];
        }
        
    }
})

for(let num of Fib(10)){
    console.log(num);
}
