const Fib = {
    n: 5,
    [Symbol.iterator]: function() {
        let i = 1;
        let tmp = 0;
        let previous =0 , after1 =0;
        return {
            next: () => {
                if(i++ <= this.n){
                    tmp = after1;
                    [previous, after1] = [after1 , (previous + after1) || 1];
                    return {
                        value: tmp,
                        done: false
                    }  
                }
                else {
                    return { 
                        done: true
                    }
                } 
            }
        }
    }
}

console.log([...Fib]);
for(let num of Fib){
    console.log(num);
}