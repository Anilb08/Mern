// # Callbacks -> 
    //  A javaScript callback is a function which is to be executed after another
    //  function has finished execution.

    // simply said - 
           /*
           Any function that is passed as an argument to another function 
           so that it can be executed in that other function is called as a callback function.
           */

// ex- 

// callback and callback hell 

// const fruits = ["Apple","banana","Kiwi"];

// const animateAll = (animate) => {
//     // below is the callback hell
//      setTimeout( () => {
//         animate(fruits[0]);
//         setTimeout( () => { 
//            animate(fruits[1]);
//            setTimeout(() =>{
//             animate(fruits[2])
//            },1000)
//         },1000)
//      },1000)
// }


// const animate = (fruit) => {
//     console.log("Animating...",fruit);
// }

// animateAll(animate);







// # Promises  -> 

          /* 
          A promises is an object that will produce a single value sometime in the future.
          if the promise is succesful, it will produce a resolved value, but if something goes wrong then it will produce a reason why the promise failed.

          simply said :- it behaves very much similar to real life promises.

          */

     // ex - 
     
     
   // const fruits = ["Apple", "Banana", "Ciwi"];

   // const animationOne = (fruit, animate) =>{
   //     return new Promise((res,rej) =>{
   //       setTimeout(() => {
   //          animate(fruit);
   //          res(true);
   //       },1000);
   //     })
   // }


   // const animateAll = (animate)=> {
   //    animationOne(fruits[0], animate)
   //    .then(() => animationOne(fruits[1], animate))
   //    .then(() => animationOne(fruits[2],animate))
   //    .catch((err) => console.log("something went wrong....",err));
   // }

   // const animate = (fruit) =>{
   //    console.log("Animating....",fruit)
   // }

   // animateAll(animate);






   // # Async/Await  ->


       /*
       Async/Await makes it easier to write promises.
       The keyword 'async' before a function makes the function return a promise always.
        And the keyword 'await' is used inside async functions, which makes the program wait until the Promise resolves.
       */


        //ex - 

      //   let fruits = ["apple","banana","ciwi"]

      //   const animationOne = (fruit, animate) => {
      //    return new Promise((res,rej) => {
      //       setTimeout(() =>{
      //       animate(fruit);
      //       res(true);
      //       },1000)
      //    });
      //   }

      //   const animateAll = async(animate) => {
      //      await animationOne(fruits[0],animate);
      //      await animationOne(fruits[1],animate);
      //      await animationOne(fruits[2],animate);
      //   }

      //   const animate = (fruit) => {
      //    console.log("Animating.....",fruit);
      //   }

      //   animateAll(animate);








// # Strict Mode -> 

   /*
   The "use strict" directive enables javaScripts strict mode.
   This was introduced in ECMAScript 5. it enforces stricter parsing and error handling on the code at runtime. it also helps 
   you write cleaner code and catch errors and bugs that might otherwise go unnoticed.
    */
   //ex 
   //  "use strict";
   //  x=56;
   //  console.log(x);





 // # Higher order function -> 
 
     /*
         Functions can be assigned to variable in the same way that 
         strings or arrays can. they can be passed into other functions as parameters
         or returned from them as well.

         simple words - 
                 it is function that accepts functions as parameters and/or returns a functions.

                 ex - map, filter, reduce, some, every, forEach, sort etc.
     */


    // ex - 

     // higher order functions with Array.map() and Array.filter()

   //   const ages = [23,45,12,67,18];

   //   const doubleAges = ages.map((age) => age*2);
   //   console.log(doubleAges);




// # Closures -> 

    /*
    A closure is the combination of a function bundled together(enclosed)
    with references to its surrounding state (the lexical enivornment).

    simple words - 
           A closure gives you access to an outer function's variable and functions from an inner functions.
    */

    // ex- 
     // closures 
   //   function createHustler(name){
   //    let greetHi = 'hi ';
   //    function greet(){
   //       return greetHi + name +', welcome to hustlers group';
   //    }
   //    return greet;
   //   }

   //   let greetFn = createHustler('Anil');
   //   console.log(greetFn());

