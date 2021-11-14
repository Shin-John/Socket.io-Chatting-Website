
window.onload = async () => {
    const response = await fetch("/visitors");
    const data = await response.json();
    const visitors = data.activeVisitors;


    document.getElementById("visCount").innerHTML="Total Visitors: "+visitors;
    console.log(visitors);
}

document.getElementById("Login").addEventListener("click", () => {
    window.location.href = "/session.html";
        
});

function getName()
{
    const a = document.getElementById("username").value;
    console.log(a);
    if(a == "")
    {
        document.getElementById("nameSubmission").innerHTML="Please submit a name.<br>Refresh the page";
    }
    else{
        document.getElementById("nameSubmission").innerHTML="You chose the name: "+a;
    }
    localStorage.setItem("username", a);
}

let form = document.getElementById("nameSubmission");
form.addEventListener("submit", event => {
    event.preventDefault(); 
    getName();
});
