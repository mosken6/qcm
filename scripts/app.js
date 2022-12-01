let data = [{
    id:1,
    question:"What is the capital of Ukraine",
    choices:["Kieve","Hamburg","New Di Genero","Moscow"],
    correctChoice:"C"
},
{
    id:2,
    question:"Who Invented Chrome",
    choices:["Google","Microsoft","Oracle","Google President"],
    correctChoice:"Google President"
},
{
    id:3,
    question:"What is the name of the first of independent women",
    choices:["Google","Microsoft","Oracle","Google President"],
    correctChoice:"Google President"
},
{
    id:4,
    question:"Who Invented Chrome",
    choices:["Google","Microsoft","Oracle","Google President"],
    correctChoice:"Google President"
},
{
    id:5,
    question:"Who Invented Chrome",
    choices:["Google","Microsoft","Oracle","Google President"],
    correctChoice:"Google President"
},
{
    id:6,
    question:"Who Invented Chrome",
    choices:["Google","Microsoft","Oracle","Google President"],
    correctChoice:"Google President"
},
{
    id:7,
    question:"Who Invented Chrome",
    choices:["Google","Microsoft","Oracle","Google President"],
    correctChoice:"Google President"
},
{
    id:8,
    question:"Who Invented Chrome",
    choices:["Google","Microsoft","Oracle","Google President"],
    correctChoice:"Google President"
},
{
    id:9,
    question:"Who Invented Chrome",
    choices:["Google","Microsoft","Oracle","Google President"],
    correctChoice:"Google President"
},
{
    id:10,
    question:"Who Invented Chrome",
    choices:["Google","Microsoft","Oracle","Google President"],
    correctChoice:"Google President"
},
{
    id:11,
    question:"Who Invented Chrome",
    choices:["Google","Microsoft","Oracle","Google President"],
    correctChoice:"Google President"
},
{
    id:12,
    question:"FSDJ",
    choices:["Google","Microsoft","Oracle","Google President"],
    correctChoice:"Google President"
}];


let question = document.querySelector("#question");
let choices = document.querySelector("#choices");
let timer = document.querySelector("#timer");
let answer = document.querySelector("#answer");
let i = 0;
let btn = document.querySelector("#btn");
let next = document.querySelector("#next");
let showAnswer = document.querySelector("#showanswer");
let questionContainer = document.querySelector("#question-container");
let greenSwitch = document.querySelectorAll(".green-switch")
let minute = document.querySelector("#minute .value");
let second = document.querySelector("#second .value");
let groups = document.querySelector("#groups")
let toHide = document.querySelector("#to-hide")
let groupsCount;

btn.onclick = function () {
    groupsCount = document.querySelector('input[type="number"]').value;
    console.log(groupsCount)
    if (groupsCount<=10 && groupsCount>=2)
    {
        toHide.style.display = "none";
        let groupsDiv = "";
        for(let i = 0; i < groupsCount; i++)
        {
            groupsDiv += `<div class="group-container"><div class="group" id="group${i+1}"><div class="group-name">Group ${i+1}</div><div class="group-score">0</div></div><button id="button${i+1}">+100</button></div>`
        }
        groups.innerHTML = groupsDiv;

        for(let i = 0; i < groupsCount; i++)
        {
            document.querySelector(`#button${i+1}`).onclick = function () {
                let n = document.querySelector(`#group${i+1} .group-score`).textContent;
                n = Number(n) + 100;
                document.querySelector(`#group${i+1} .group-score`).textContent = n;
            }
        }
        showQuestions();
    }
}

function countDownTimer()
{
    if (questionContainer.getAttribute("data-value") != "pause")
    {
        if (second.textContent == 0)
        {
            if (minute.textContent == 0)
            {
                chooseAnswer();
            }
            else {
                minute.textContent = `0${minute.textContent-1}`;
                second.textContent = 59;
            }
        }
        else if (second.textContent > 0)
        {
            second.textContent = `${second.textContent>10?(second.textContent-1):`0${second.textContent-1}`}`;
        }
    }
}

setInterval(countDownTimer,1000);

next.onclick = showQuestions;
showAnswer.onclick = chooseAnswer;


function chooseAnswer()
{
    answer.textContent = data[i-1].correctChoice;
    answer.style.display = "flex"
    for(let element of greenSwitch)
    {
        element.style.backgroundColor = "rgb(31, 214, 153)";
    }
    questionContainer.setAttribute("data-value","pause")
}

function showQuestions() 
{
    if (data[i]) {
        for(let element of greenSwitch)
        {
            element.style.backgroundColor = "rgb(31, 129, 214)";
        }
        questionContainer.setAttribute("data-value","")
        answer.style.display = "none"
        question.textContent = data[i].question;
        questionContainer.style.display = "block"
        timer.style.display = "flex"
        next.style.display = "block"
        showAnswer.style.display = "block"
        btn.style.display = "none"
        let mcq = "";
        for (let choice of data[i].choices) {
            mcq += `<input type="radio" id="${choice}" name="choice"> <label for="${choice}">${choice}</label><br>`
        }
        choices.innerHTML = mcq;
        i++;
        second.textContent = "30";
        minute.textContent = "01";
    }
    else {
        let winner = "";
        let max = 0;
        for (let j = 0; j < groupsCount; j++) {
            if (document.querySelector(`#group${j+1} .group-score`).textContent > max)
            {
                max = document.querySelector(`#group${j+1} .group-score`).textContent;
                winner = document.querySelector(`#group${j+1} .group-name`).textContent;
            }
        }
        questionContainer.innerHTML = `<h3 style="text-align: center">The Winner</h3><h1 style="text-align: center">${winner}</h1>`;
        questionContainer.setAttribute("data-value","pause")
        next.remove()
        timer.remove()
        showAnswer.remove()
    }
    if (!data[i])
    {
        next.textContent = "Finish"
    }
}