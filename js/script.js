document.getElementById("partyPage").style.display = "none";
document.getElementById("resultSection").style.display = "none";

//Hier maak ik 3 variabelen aan. De eerste is 0, omdat de statements (de verklaringen) vanaf de eerste vraag moeten beginnen.
var statementOrder = 0;

const title = document.getElementById("opinions_title");
const description = document.getElementById("statement_description");

//Loopt door de subject heen
subjects.forEach(subject => {
    subject.myAnswer = '';
    subject.important = false;
})

parties.forEach(oneParty => {
    oneParty.points = 0;
})

let topParties = [];
const bigParty = 10;

/**
 * De Pagina met vragen word geladen
 */
function startFunction() {
    document.getElementById("container").style.display = "none";
    document.getElementById("container-2").style.display = "none";
    document.getElementById("statements").style.display = "block";
    document.getElementById("partyPage").style.display = "none";
    document.getElementById("resultSection").style.display = "none";

    //Zet de eerste vraag klaar
    title.innerHTML = subjects[0].title;
    description.innerHTML = subjects[0].statement;
}

/**
 * @param answer De keuze die je hebt gemaakt (pro(Eens), none(Geen van beide), contra(Oneens))
 */
function NextQuestion(answer) {
    //Het antwoord word toegevoegd aan 'answer'
    subjects[statementOrder].myAnswer = answer;
    subjects[statementOrder].important = document.getElementById('important').checked;
    //Volgende vraag functie word uitgevoerd
    nextStatement();
}

/**
 * De volgende stelling word geladen.
 */
function nextStatement() {
    //Als statmentorder kleiner is dan de lengte van subjects doet die -1 en telt die vanaf dan weer verder.
    // Zonder -1 kom je op 1 getal te hoog uit en heb je dus uiteindelijk een lege vraag.
    if (statementOrder < subjects.length - 1) {
        document.getElementById('important').checked = false;
        statementOrder++;
        //Nieuwe stelling word geladen
        title.innerHTML = subjects[statementOrder].title;
        description.innerHTML = subjects[statementOrder].statement;
        showAnswer(subjects[statementOrder].myAnswer);
        //Bij de laatste vraag telt die alles bij mekaar op
    } else (calculatePoints());
}

/**
 * Als de gebruiker op de pijl klikt dan word de vorige vraag geladen. Als die bij de laatste vraag is word de homepage geladen
 */
function previousQuestion() {
    //Hij gaat door tot de laatste (eerste) vraag en als die bij 0 is gaat die terug naar de homepagina
    if (statementOrder !== 0) {
        statementOrder--;
        //Nieuwe stelling word geladen
        title.innerHTML = subjects[statementOrder].title;
        description.innerHTML = subjects[statementOrder].statement;
        showAnswer(subjects[statementOrder].myAnswer);
    } else {
        document.getElementById("statements").style.display = "none";
        document.getElementById("container").style.display = "block";
        document.getElementById("container-2").style.display = "block";
    }
}

/**
 * Als de gebruiker terug gaat naar de vorige vraag, word het antwoord wat je daar in hebt gevuld getoond
 * @param answer De keuze die je hebt gemaakt (pro(Eens), none(Geen van beide), contra(Oneens))
 */
function showAnswer(answer) {
    document.getElementById('important').checked = false;
    for (var f = 0; f < document.getElementsByClassName('answerSection').length; f++) {
        document.getElementsByClassName("answerSection")[f].style.background = 'black';
        document.getElementsByClassName("answerSection")[f].style.font = 'white';
    }
    if (subjects[statementOrder].important === true) {
        document.getElementById('important').checked = true;
    }
    if (answer === '') {

    } else {
        document.getElementById(answer).style.background = '#01B4DC';
    }
}

/**
 * Deze functie zorgt er voor dat alle punten bij elkaar worden opgeteld. En dat de partijen die het beste bij jou passen worden uitgerekend
 */
function calculatePoints() {
    //Hier loop je door alle subjects heen
    for (var i = 0; i < subjects.length; i++) {
        //Hier loop je door alle subject partijen heen
        for (var b = 0; b < subjects[i].parties.length; b++) {
            //Je vergelijkt je antwoord met de standpunten van de partijen
            if (subjects[i].myAnswer === subjects[i].parties[b].position) {
                var findParty = parties.find(oneParty => oneParty.name === subjects[i].parties[b].name);

                //Hier zeg je dat als important wordt aangeklikt hij 2 punten moet geven en als dat niet gebeurd dan is het maar 1 punt
                if (subjects[i].important === true) {
                    findParty.points += 2;
                } else {
                    findParty.points += 1;
                }
                console.log(findParty);
            }
        }
    }
    displayPartyPage()
}

function displayPartyPage() {
    //Nieuwe pagina word geladen
    document.getElementById("statements").style.display = "none";
    document.getElementById("statement-cont").style.display = "none";
    document.getElementById("partyPage").style.display = "block";

    //De partijen worden op volgorde gezet met de meeste punten
    parties.sort((a, b) => b.points - a.points);
    console.log(parties);

    //Hier worden de partijen getoond
    for (var c = 0; c < parties.length; c++) {
        var c = document.createElement("c");

        document.getElementById('partyOrder').appendChild(c);
    }
}

/**
 * Deze functie word aangeroepen als de gebruiken de zittende partijen selecteerd
 */
function getSeatedParties() {
    checkSelectParty('seated')
    topParties = [];
    topParties = parties.filter(party => {
        return party.secular === true;
    })
}

/**
 * Deze functie word aangeroepen als de persoon alle partijen selecteerd
 */
function getAllParties() {
    checkSelectParty('all')
    topParties = [];
    topParties = parties;
}

/**
 * Alleen de grote partijen worden getoond
 */
function getBiggerParties() {
    checkSelectParty('bigger')
    topParties = [];
    topParties = parties.filter(party => {
        return party.size >= bigParty;
    })
}

/**
 * De kleur van de knop word veranderd al klik je op een van de knoppen
 * @param partyID de value van de knop
 */
function checkSelectParty(partyID) {
    for (var f = 0; f < document.getElementsByClassName('filterParty').length; f++) {
        document.getElementsByClassName('filterParty')[f].style.background = 'white';
    }
    document.getElementById(partyID).style.background = '#01B4DC';
}

/**
 * De Resultaat pagina word geladen
 */
function showResultPage() {
    if (topParties.length === 0) {
        return alert("Klik op een van de onderstaande knoppen s.v.p.");
    }
    document.getElementById("partyPage").style.display = "none";
    document.getElementById("resultSection").style.display = "block";

    //De top 3 partijen worden laten zien
    document.getElementById('1st').innerHTML += topParties[0].name;
    document.getElementById('2nd').innerHTML += topParties[1].name;
    document.getElementById('3rd').innerHTML += topParties[2].name;
}