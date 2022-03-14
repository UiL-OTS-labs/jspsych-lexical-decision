////////////////
// SURVEY
///////////////

let repeat_survey = false;


class ParticipantInfo {

    _hand_pref = null;
    birth_year = 0;
    _gender = null;

    static LEFT = 0;
    static RIGHT = 1;
    static HAND_OPTIONS = new Set(
        [ParticipantInfo.RIGHT, ParticipantInfo.LEFT]
    );

    static MALE = 0;
    static FEMALE = 1;
    static GENDER_OTHER = 3;
    static GENDER_UNSPECIFIED = 4;
    static GENDER_OPTIONS = new Set(
        [
            ParticipantInfo.MALE,
            ParticipantInfo.FEMALE,
            ParticipantInfo.GENDER_OTHER,
            ParticipantInfo.GENDER_UNSPECIFIED
        ]
    );

    set hand_pref(value) {
        if (ParticipantInfo.HAND_OPTIONS.has(value))
            this._hand_pref = value;
        else {
            let msg = `Value "${value}" not in ParticipantInfo.HAND_OPTIONS`
            throw new RangeError(msg);
        }
    }

    get hand_pref() {
        return this._hand_pref;
    }

    set gender(value) {
        if (ParticipantInfo.GENDER_OPTIONS.has(value)) {
            this._gender = value;
        }
        else {
            let msg = `Value "${value}" not in ParticipantInfo.GENDER_OPTIONS`
            throw new RangeError(msg);
        }
    }

    get gender() {
        return this._gender;
    }
}

let participant_info = new ParticipantInfo();

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
        placeholder="Dutch" required>
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
const BILINGUAL_OPTIONS = [NO_BUTTON_TEXT, YES_BUTTON_TEXT];

const DYSLEXIC_QUESTION = `Are you 
    <a href="https://en.wikipedia.org/wiki/Dyslexia" target="_blank">dyslexic</a>?
    `;
const DYSLEXIC_OPTIONS = [NO_BUTTON_TEXT, YES_BUTTON_TEXT];

const SEX_QUESTION = `
    What is your
    <a href="https://en.wikipedia.org/wiki/Sex" target="_blank">biological sex</a>?
    `;
const SEX_OPTIONS = [
    GENDER_FEMALE, GENDER_MALE, GENDER_OTHER, GENDER_PREFER_NOT_SAY
];
const GENDER_OPTION_MAP = {
    [GENDER_FEMALE] : ParticipantInfo.FEMALE,
    [GENDER_MALE] : ParticipantInfo.MALE,
    [GENDER_OTHER] : ParticipantInfo.GENDER_OTHER,
    [GENDER_PREFER_NOT_SAY] : ParticipantInfo.GENDER_UNSPECIFIED
};

const HAND_QUESTION = 'Which hand do you prefer to write with?';
const HAND_OPTIONS = [LEFT_TEXT, RIGHT_TEXT];

const HAND_OPTIONS_MAP = {
    [LEFT_TEXT]: ParticipantInfo.LEFT,
    [RIGHT_TEXT]: ParticipantInfo.RIGHT
};


// The multi-choice survey plugin DOES have built-in validation, which is nice
let survey_multi_choice_block = {
    type: jsPsychSurveyMultiChoice,
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
    on_finish : function(data) {
        let response = data.response;
        participant_info.gender = GENDER_OPTION_MAP[response.Sex];
        participant_info.hand_pref = HAND_OPTIONS_MAP[response.HandPreference];
    }
};

// HTML plugin survey block: questions are in the HTML constant
let survey_multi_html_block = {
    type: jsPsychSurveyHtmlForm,
    preamble: PREPARE_FOR_SURVEY,
    html: MULTI_CHOICE_HTML,
};

let survey_review_survey_data = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function(data){

        let survey_1 = 
            jsPsych.data.get().last(2).values()[0].response;
        
        let survey_2 = 
            jsPsych.data.get().last(1).values()[0].response;
        
        let b_year      = survey_1.birth_year;
        let b_month     = survey_1.birth_month;
        let n_lang      = survey_1.native_language;

        let bilingual   = survey_2.Multilingual;
        let dyslexic    = survey_2.Dyslexic;
        let sex         = survey_2.Sex;
        let hand_pref   = survey_2.HandPreference;

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
        repeat_survey = data.response !== 0;
    }
};

let survey_procedure = {
    timeline: [
        survey_multi_html_block, // uu style
        survey_multi_choice_block, // default style (see index.html styling section)
        survey_review_survey_data,
    ],
    loop_function: function(){
        if (repeat_survey === true){
            return true;
        } else {
            return false;
        }
    }
};

