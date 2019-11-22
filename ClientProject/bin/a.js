//
// function soCheGa(){
//     nauNuocSoi();
//     vatLongGa();
// }
// function nauNuocSoi(){
//    /* setTimeout(function(){
//         console.log("nau nuoc soi")
//     }, 1000)*/
//     console.log("nau nuoc soi");
// }
// function vatLongGa(){
//     console.log("vat long ga");
// }
// console.log("1");
// console.log("2");
// console.log("3");
// console.log("4");
// console.log("5");
// console.log("6");
// console.log("7");
// console.log("8");
// soCheGa();
//
//

function printNumber(number){
    return new Promise((resolve, reject) => {
        setTimeout(
    () => {
        console.log(number)
        resolve()
    },
    Math.floor(Math.random() * 100) + 1
)
})
}

 function printAll(){
 printNumber(1);
 printNumber(2);
printNumber(4);
 printNumber(5);
printNumber(6);
console.log(1);
console.log(2);
console.log(3);
console.log("f");
console.log(5);
console.log(6);
}
// async function printAll(){
//     await printNumber(1);
//     await printNumber(2);
//     await printNumber(4);
//     await printNumber(5);
//     await printNumber(6);
// }
printAll();
