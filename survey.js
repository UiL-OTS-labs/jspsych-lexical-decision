////////////////
// SURVEY
///////////////

let repeat_survey = false;

const PREPARE_FOR_SURVEY = "<h1>Please answer some questions first</h1>";

// experiment: one can use the UU style for the HTML survey plugin by appending the style below...
// however, this is not as of yet possible in the second type of survey plugin
// might be solved with milestone with things discussed here:
// https://github.com/jspsych/jsPsych/issues/554#event-3434758022 


// with other survey plugin(s) than html, UU styling is more of a  hassle
// we should discuss css presets for UU/UiL at some point.

const MULTI_CHOICE_HTML =`
    <div class="survey">

    <label for="birth_year">In what year were you born? </label>
    <input type="number" id="birth_year" 
        name="birth_year" placeholder=1999 min=1919 max=2019 required>
    <span class="validity"></span>


    <br>
    <br>

    <label for="birth_month">In what month were you born? </label>
    <input type="number" id="birth_month" name="birth_month" 
        placeholder=7 min=1 max=12 required>
    <span class="validity"></span>

    <br>
    <br>

    <label for="native_language">What is your native language?</label>
    <input type="text" id="native_language" name="native_language"
        pattern="[a-zA-Z]+" placeholder="Dutch" required>
    <span class="validity"></span>
    <br> 
    <br> 
    </div>
    `

// these constants are used in the survery multip[le choice block]
// with this survey plugin, UU styling is not easy to implement
const BILINGUAL_QUESTION = `
    Were you born and raised in a  
    <a href="https://en.wikipedia.org/wiki/Multilingualism" target="_blank">multilingual</a>
    environment?
    `;
const BILINGUAL_OPTIONS = ["No","Yes"];
const DYSLEXIC_QUESTION = `Are you 
    <a href="https://en.wikipedia.org/wiki/Dyslexia" target="_blank">dyslexic</a>?
    `;
const DYSLEXIC_OPTIONS = ["No", "Yes"];
const SEX_QUESTION = `
    What is your
    <a href="https://en.wikipedia.org/wiki/Sex" target="_blank">biological sex</a>?
    `;
const SEX_OPTIONS = ["Female", "Male", "Other", "Prefer not to say"];
const HAND_QUESTION = 'Which hand do you prefer to write with?';
const HAND_OPTIONS = ["Left", "Right"];

// The multi-choice survey plugin DOES have built-in validation, which is nice
let survey_multi_choice_block = {
    type: 'survey-multi-choice',
    data: {
        survey_data_flag: true
    },
    questions: [
        {
            prompt: BILINGUAL_QUESTION,
            name: 'Multilingual',
            options: BILINGUAL_OPTIONS,
            required:true,
            horizontal: true
        },
        {
            prompt: DYSLEXIC_QUESTION,
            name: 'Dyslexic',
            options: DYSLEXIC_OPTIONS,
            required: true,
            horizontal: true
        },
        {
            prompt: SEX_QUESTION,
            name:'Sex',
            options: SEX_OPTIONS,
            required: true,
            horizontal: true
        },
        {
            prompt: HAND_QUESTION,
            name:'HandPreference',
            options: HAND_OPTIONS,
            required: true,
            horizontal: true
        }
    ],
    on_finish: function(data){
        let survey_multi_choice = data.responses;   
        data.survey_multi_choice_responses = survey_multi_choice;
    }
};

// HTML plugin survey block: questions are in the HTML constant
let survey_multi_html_block = {
    type: 'survey-html-form',
    preamble: PREPARE_FOR_SURVEY,
    html: MULTI_CHOICE_HTML,
    on_finish: function(data){
        var survey_html_responses = data.responses;
        data.survey_html_responses = survey_html_responses;
    }
};

let survey_review_survey_data = {
    type: "html-button-response",
    stimulus: function(data){

        let survey_html = 
            jsPsych.data.get().last(2).values()[0].survey_html_responses;
        
        let survey_multi = 
            jsPsych.data.get().last(1).values()[0].survey_multi_choice_responses;
        
        let jsHTML = JSON.parse(survey_html);
        let b_year = jsHTML.birth_year;
        let b_month = jsHTML.birth_month;
        let n_lang = jsHTML.native_language;

        let jsMulti = JSON.parse(survey_multi);
        let bilingual = jsMulti.Multilingual;
        let dyslexic = jsMulti.Dyslexic;
        let sex = jsMulti.Sex;
        let hand_pref = jsMulti.HandPreference;

        return `
            <h1>Your data</h1>
            <div class='survey'>

            <div><strong>Birth year</strong>: ${b_year} </div>
            <div><strong>Birth month</strong>: ${b_month} </div>
            <div><strong>Native language</strong>: ${n_lang} </div>
            <div><strong>Multilingual</strong>: ${bilingual} </div>
            <div><strong>Dyslexic</strong>: ${dyslexic} </div>
            <div><strong>Sex</strong>: ${sex} </div>
            <div><strong>Hand preference</strong>: ${hand_pref} </div>
            <br><br>

            <p>Is this information correct?</p>
            </div>
            `;
    },
    choices: [YES_BUTTON_TEXT, NO_BUTTON_TEXT],
    response_ends_trial: true,
    on_finish: function(data){
        // Repeat the survey if yes (0) was not pressed.
        // this may give multiple entries, up to the researcher to filter out
        repeat_survey = data.button_pressed != 0;         
    }
};

let survey_procedure = {
    timeline: [
        survey_multi_html_block, // uu style
        survey_multi_choice_block, // default style (see index.html styling section)
        survey_review_survey_data,
    ],
    loop_function: function(){
        if (repeat_survey == true){
            return true;
        } else {
            return false;
        }
    }
};