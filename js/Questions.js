import Rand from './Rand.js'
import Verify from './Verify.js'

export default class Question {
   
    getQuestions() {
        const questionsQuantity = document.getElementById('questions-number').value
        const questionsDifficulty = document.getElementById('questions-difficulty').value
        const questionCategory = document.getElementById('questions-category').value
        const questionType= document.getElementById('type').value
        fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&difficulty=${questionsDifficulty}&category=${questionCategory}&type=${questionType}`)
            .then(response => response.json())
            .then(data => this.printCards(data.results))
    }

    printCards(questions) {       
        const container = document.getElementById('container-cards');
        container.innerHTML = '';
        questions.forEach((question,index) => {
           
            container.innerHTML += `<section class="mt-2 animated" id="card-${index}">
                                        <div class="card ">
                                            <div class="card-body ">
                                                <h5 class="card-title mb-2 text-muted">${question.question}</h5>
                                                <h6 class="card-subtitle">${question.category}</h6>
                                                <h6 class="card-subtitle">${question.difficulty}</h6>
                                                
                                                
                                             ${this.returnAnswersHTML(question.correct_answer, question.incorrect_answers,index)}     
                      
                                            </div>
                                        </div>
                                    </section>`;
        });
        container.innerHTML+=`<button type="submit"  class="mt-2 btn btn-primary">Comprobar</button>
                              `
        document.getElementById('container-cards').addEventListener('submit',(event)=>{
        event.preventDefault();
        const _verify = new Verify();
        _verify.check();
        });
    }
    
 
    returnAnswersHTML(correct, incorrects,indexCard) {
        const _rand = new Rand(document.getElementById('type').value)
        const randomIndex= _rand.randGenerator();
        incorrects.splice(randomIndex,0,correct);
        let answersHtml = '';
        incorrects.forEach((incorrect,index) => {
            answersHtml += `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="choice-${indexCard}-${randomIndex}" id="answer-id-${indexCard}-${index}" value="${incorrect}" required>
                            <label class="form-check-label" for="answer-id-${indexCard}-${index}">
                            ${incorrect}
                            </label>
                        </div>
                        `;
        })
        return  answersHtml;
    }
}