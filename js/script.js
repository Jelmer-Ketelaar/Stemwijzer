//Variabelen
var statementOrder = 0;

var title = document.getElementById("opinions_title");
var description = document.getElementById("statement_description");

subjects.forEach(subject => {
    subject.myAnswer = '';
    subject.important = false;
})

/**
 * De Pagina met vragen word geladen
 */
function startFunction() {
    document.getElementById("container").style.display = "none";
    document.getElementById("container-2").style.display = "none";
    document.getElementById("statements").style.display = "block";

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
    //Volgende vraag functie word uitgevoerd
    nextStatement();
}

/**
 * De volgende stelling word geladen.
 */
function nextStatement() {
    if (statementOrder < subjects.length - 1) {
        statementOrder++;
        //Nieuwe stelling word geladen
        title.innerHTML = subjects[statementOrder].title;
        description.innerHTML = subjects[statementOrder].statement;
        document.getElementById('important').checked = false;
        showAnswer(subjects[statementOrder].myAnswer);
    }
}

/**
 * Als de gebruiker op de pijl klikt dan word de vorige vraag geladen
 */
function previousQuestion() {
    if (statementOrder !== 0) {
        statementOrder--;
        //Nieuwe stelling word geladen
        title.innerHTML = subjects[statementOrder].title;
        description.innerHTML = subjects[statementOrder].statement;
        showAnswer(subjects[statementOrder].myAnswer);
    } else {
        // in dit geval nog de homepage
        document.getElementById("statements").style.display = "none";
        document.getElementById("container").style.display = "block";
        document.getElementById("container-2").style.display = "block";
    }
}

/**
 * Als de gebruiker terug gaat naar een eerder ingevulde vraag word het antwoord wat je daar in hebt gevuld getoond
 * @param answer de mening die je hebt ingevoerd
 */
function showAnswer(answer) {
    document.getElementById('important').checked = false;
    for (var f = 0; f < document.getElementsByClassName('answerSection').length; f++) {
        document.getElementsByClassName("answerSection")[f].style.background = 'white';
    }
    if (subjects[statementOrder].important == true) {
        document.getElementById('important').checked = true;
    }
    if (answer == '') {
        return
    } else {
        document.getElementById(answer).style.background = 'green';
    }
}