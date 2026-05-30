var slides;
var slideIndex = 0;
var intervaleID = null;

function initializeSlider(){
    var container = document.getElementById("slides");
    slides = container.getElementsByTagName("img");

    if(slides.length > 0){
        slides[slideIndex].className = "displaySlide";
        intervaleID = setInterval("nextSlide()", 5000)
    }
}

function showSlide(index){
    if(index >= slides.length){
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slides.length - 1;
    }
    else{
        slideIndex = index;
    }
    var i;
    for(i = 0; i < slides.length; i++){
        slides[i].className = ""; 
    }

    slides[slideIndex].className = "displaySlide"
}

function nextSlide(){
    clearInterval(intervaleID);
    showSlide(slideIndex + 1);
    intervaleID = setInterval("nextSlide()", 5000);
}

function prevSlide(){
    clearInterval(intervaleID);
    showSlide(slideIndex - 1);
    intervaleID = setInterval("nextSlide()", 5000);
}

function toggleSection(sectionId){
    closeAllSections();

    var section = document.getElementById(sectionId);
    if(section){
        section.style.display = "block";
        
        var rows = document.querySelectorAll(".clickable-row");
        rows.forEach(function(row){
            row.classList.remove("active-row");
        });

        event.currentTarget.classList.add('active-row');

        section.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }
}

function closeSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'none';
        
        var rows = document.querySelectorAll('.clickable-row');
        rows.forEach(function(row) {
            row.classList.remove('active-row');
        });
    }
}

function closeAllSections() {
    var sections = document.querySelectorAll('.detail-section');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });
    
    var rows = document.querySelectorAll('.clickable-row');
    rows.forEach(function(row) {
        row.classList.remove('active-row');
    });

    document.addEventListener('click', function(event) {
    if (!event.target.closest('.clickable-row') && !event.target.closest('.detail-section')) {
        closeAllSections();
    }
    });

    document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.classList.contains('clickable-row')) {
        event.target.click();
    }
    });

    document.addEventListener('DOMContentLoaded', function() {
    closeAllSections();
    });

}

function checkAnswers() {
    const correctAnswers = {
        q1: 'b',
        q2: 'c',
        q3: 'c',
        q4: 'b',
        q5: 'd',
        q6: 'b',
        q7: 'c',
        q8: 'b',
        q9: 'b',
        q10: 'c'
    };
            
    let score = 0;
    let feedback = '';
            
    for (let i = 1; i <= 10; i++) {
        const questionId = `q${i}`;
        const userAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
                
        if (userAnswer && userAnswer.value === correctAnswers[questionId]) {
            score++;
            feedback += `<p><span class="correct">✓ Question ${i}: Correct!</span></p>`;
        } else {
            const correctOption = String.fromCharCode(97 + correctAnswers[questionId].charCodeAt(0) - 97);
            let correctText = '';
                    
            switch(i) {
                case 1: correctText = 'Quartz glass';
                    break;
                case 2: correctText = 'Femtosecond laser';
                    break;
                case 3: correctText = '7 TB';
                    break;
                case 4: correctText = 'Warner Bros.';
                    break;
                case 5: correctText = 'Tens to hundreds of thousands of years'; 
                    break;
                case 6: correctText = 'Polarization-sensitive microscopy'; 
                    break;
                case 7: correctText = 'Writable and rewritable (Project Silica is WORM - Write Once Read Many)'; 
                    break;
                case 8: correctText = 'Voxels'; 
                    break;
                case 9: correctText = 'Machine learning algorithms'; 
                    break;
                case 10: correctText = 'University of Southampton'; 
                    break;
            }
                    
            const userAnswerText = userAnswer ? 
                document.querySelector(`label[for="${questionId}${userAnswer.value}"]`).textContent : 'No answer';
                        
            feedback += `<p><span class="incorrect">✗ Question ${i}: Incorrect</span><br>
                        Your answer: ${userAnswerText}<br>
                        Correct answer: ${correctText}</p>`;
        }
    }
            
    const percentage = (score / 10) * 100;
    let scoreText = `<strong>Your score: ${score}/10 (${percentage}%)</strong>`;
            
    if (percentage >= 90) {
        scoreText += "<br><br>Expert level! You're a Project Silica master.";
    } else if (percentage >= 70) {
        scoreText += "<br><br>Great job! You have a solid understanding of Project Silica.";
    } else if (percentage >= 50) {
        scoreText += "<br><br>Good effort! Review the material to improve your knowledge.";
    } else {
        scoreText += "<br><br>Keep learning! Project Silica is fascinating technology worth exploring further.";
    }
            
    document.getElementById('score').innerHTML = scoreText;
    document.getElementById('feedback').innerHTML = feedback;
    document.getElementById('resultContainer').style.display = 'block';
    document.getElementById('resultContainer').scrollIntoView({ behavior: 'smooth' });
}
    