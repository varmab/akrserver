function a(){
    setTimeout(()=>{
        console.log("a is completed")
        b();
    },5000)
}

function b(){
    console.log("b is completed")
}

a();

