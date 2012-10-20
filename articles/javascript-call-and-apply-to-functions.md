

As per:


    function foo() {
        // this is my function
    }
    
    
    function bar() {
        console.log(this);
    }
    
    bar.apply(foo);​
    
As per creationix's Step library, interesting pattern, where is it useful?